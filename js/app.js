/* =====================================================================
   FRANCA CECE CROCHET  —  SITE CODE
   File: js/app.js

   You don't need to edit this file.
   • Products      → js/products.js
   • Contact, colors, images, wording → js/config.js

   What this file does: builds the shop from your product list, opens
   the product pages, and creates the WhatsApp order messages.
   ===================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Small helpers
     ------------------------------------------------------------------ */
  var $  = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function icon(name) {
    return '<svg class="icon" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  }

  function slugify(text) {
    return String(text).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  var whatsappDigits = String(SITE.whatsappNumber).replace(/\D/g, "");
  if (/x/i.test(SITE.whatsappNumber)) {
    console.warn("Franca Cece Crochet: add your real WhatsApp number in js/config.js");
  }

  function waLink(message) {
    return "https://wa.me/" + whatsappDigits + "?text=" + encodeURIComponent(message);
  }

  function openExternal(url) {
    var win = window.open(url, "_blank");
    if (win) { win.opener = null; } else { window.location.href = url; }
  }

  /* ------------------------------------------------------------------
     Product data → clean, safe list
     ------------------------------------------------------------------ */
  var STATUS_KEYS = ["available", "preorder", "custom", "soldout"];
  var STATUS = SITE.statuses;

  var seenIds = {};
  var items = (typeof PRODUCTS !== "undefined" && Array.isArray(PRODUCTS) ? PRODUCTS : [])
    .filter(function (p) { return p && p.name && !p.hidden; })
    .map(function (p, index) {
      var id = p.id ? slugify(p.id) : slugify(p.name);
      if (!id || seenIds[id]) { id = (id || "product") + "-" + (index + 1); }
      seenIds[id] = true;
      return {
        id: id,
        name: String(p.name),
        category: p.category ? String(p.category) : "More Pieces",
        type: p.type || "",
        status: STATUS_KEYS.indexOf(p.status) > -1 ? p.status : "available",
        featured: !!p.featured,
        price: p.price,
        pricePrefix: p.pricePrefix || "",
        shortDescription: p.shortDescription || "",
        description: p.description || p.shortDescription || "",
        images: (Array.isArray(p.images) ? p.images : (p.image ? [p.image] : [])).filter(Boolean),
        colors: Array.isArray(p.colors) ? p.colors : [],
        sizes: Array.isArray(p.sizes) ? p.sizes : [],
        care: p.care || "",
        note: p.note || "",
        whatsappMessage: p.whatsappMessage || ""
      };
    });

  if (SITE.featuredFirst) {
    items = items
      .map(function (p, i) { return { p: p, i: i }; })
      .sort(function (a, b) { return (b.p.featured - a.p.featured) || (a.i - b.i); })
      .map(function (x) { return x.p; });
  }

  var byId = {};
  items.forEach(function (p) { byId[p.id] = p; });

  // Categories: your preferred order first, then any others as they appear
  var categories = [];
  (SITE.categoryOrder || []).forEach(function (c) {
    if (items.some(function (p) { return p.category === c; })) { categories.push(c); }
  });
  items.forEach(function (p) { if (categories.indexOf(p.category) === -1) { categories.push(p.category); } });

  /* ------------------------------------------------------------------
     Formatting + WhatsApp message builders
     ------------------------------------------------------------------ */
  function priceHTML(p) {
    if (p.price === null || p.price === undefined || p.price === "") { return esc(SITE.priceOnRequestText); }
    var n = Number(p.price);
    var text = isNaN(n) ? String(p.price) : SITE.currencySymbol + n.toLocaleString("en-US");
    var prefix = p.pricePrefix ? '<span class="prefix">' + esc(p.pricePrefix) + "</span>" : "";
    return prefix + esc(text);
  }

  function productMessage(p, selection) {
    var template = p.status === "soldout" ? SITE.messages.restock : (p.whatsappMessage || SITE.messages.product);
    var msg = template.split("{product}").join(p.name);
    var extras = [];
    if (selection && selection.color) { extras.push("Color: " + selection.color); }
    if (selection && selection.size)  { extras.push("Size: " + selection.size); }
    if (extras.length) { msg += "\n\n" + extras.join("\n"); }
    return msg;
  }

  /* ------------------------------------------------------------------
     Images with a graceful placeholder underneath
     (if a photo file is missing, the placeholder simply stays visible)
     ------------------------------------------------------------------ */
  function mediaHTML(src, alt, opts) {
    opts = opts || {};
    return '<div class="media">' +
      '<div class="ph"><img class="ph-logo" src="' + esc(SITE.images.logo) + '" alt="">' +
      (opts.logoOnly ? "" : '<span class="ph-text">Photo coming soon</span>') + "</div>" +
      (src ? '<img class="main" src="' + esc(src) + '" alt="' + esc(alt || "") + '" decoding="async"' +
        (opts.eager ? "" : ' loading="lazy"') + ">" : "") +
      "</div>";
  }

  // Missing image files: remove the broken <img> so the placeholder shows
  document.addEventListener("error", function (e) {
    var t = e.target;
    if (t && t.tagName === "IMG" && t.classList.contains("main")) { t.remove(); }
  }, true);

  /* ------------------------------------------------------------------
     Logo + fixed images (hero, about)
     ------------------------------------------------------------------ */
  $$("img[data-logo]").forEach(function (img) { img.src = SITE.images.logo; });

  $$("[data-media]").forEach(function (el) {
    el.innerHTML = mediaHTML(SITE.images[el.getAttribute("data-media")], el.getAttribute("data-alt"), {
      eager: true,
      logoOnly: el.hasAttribute("data-logo-only")
    });
  });

  /* ------------------------------------------------------------------
     HERO SLIDER — rotates through SITE.heroSlides (up to 6 photos),
     each shown for SITE.heroSlideSeconds, then crossfades to the next.
     ------------------------------------------------------------------ */
  (function heroSlider() {
    var track = $("#heroSlider");
    var dotsEl = $("#heroDots");
    if (!track) { return; }

    var slides = (SITE.heroSlides || []).slice(0, 6);
    if (!slides.length) { slides = [""]; }

    track.innerHTML = slides.map(function (src, i) {
      return '<div class="hero-slide' + (i === 0 ? " is-active" : "") + '" data-slide="' + i + '">' +
        mediaHTML(src, "Franca Cece Crochet", { eager: i === 0, logoOnly: true }) + "</div>";
    }).join("");

    if (slides.length < 2) { dotsEl.hidden = true; return; }

    dotsEl.innerHTML = slides.map(function (_, i) {
      return '<button class="dot" type="button" role="tab" data-dot="' + i + '" aria-label="Show photo ' + (i + 1) + '" aria-selected="' + (i === 0) + '"></button>';
    }).join("");

    var slideEls = $$(".hero-slide", track);
    var dotEls = $$(".dot", dotsEl);
    var index = 0;
    var timer = null;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function go(next) {
      index = (next + slideEls.length) % slideEls.length;
      slideEls.forEach(function (el, i) { el.classList.toggle("is-active", i === index); });
      dotEls.forEach(function (el, i) { el.setAttribute("aria-selected", String(i === index)); });
    }

    function restart() {
      if (timer) { clearInterval(timer); }
      if (reduceMotion) { return; }               // respect reduced-motion: no auto-advance
      timer = setInterval(function () { go(index + 1); }, (SITE.heroSlideSeconds || 10) * 1000);
    }

    dotsEl.addEventListener("click", function (e) {
      var dot = e.target.closest("[data-dot]");
      if (!dot) { return; }
      go(Number(dot.getAttribute("data-dot")));
      restart();
    });

    // Pause while the tab is hidden so it doesn't jump ahead when you return
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { if (timer) { clearInterval(timer); } }
      else { restart(); }
    });

    restart();
  })();

  // Every element marked data-wa="general" opens WhatsApp with that message
  $$("[data-wa]").forEach(function (el) {
    var key = el.getAttribute("data-wa");
    el.href = waLink(SITE.messages[key] || SITE.messages.general);
  });

  /* ------------------------------------------------------------------
     SHOP: filters + product grid
     ------------------------------------------------------------------ */
  var grid = $("#productGrid");
  var filtersEl = $("#filters");
  var activeCategory = "All";

  function cardHTML(p) {
    var st = STATUS[p.status];
    var soldout = p.status === "soldout";
    var action = soldout
      ? '<button class="btn btn-sm" type="button" disabled>' + esc(st.button) + "</button>"
      : '<a class="btn btn-solid btn-sm" href="' + waLink(productMessage(p)) + '" target="_blank" rel="noopener">' + esc(st.button) + "</a>";

    return '<article class="card' + (soldout ? " is-soldout" : "") + '">' +
      '<button class="card-media" type="button" data-open="' + esc(p.id) + '" aria-label="View details: ' + esc(p.name) + '">' +
        mediaHTML(p.images[0], p.name) +
        (p.featured && !soldout ? '<span class="tag-featured">Featured</span>' : "") +
        (soldout ? '<span class="tag-soldout">Sold out</span>' : "") +
      "</button>" +
      '<div class="card-body">' +
        '<h3 class="card-name">' + esc(p.name) + "</h3>" +
        '<p class="card-price">' + priceHTML(p) + "</p>" +
        '<p class="status status-' + p.status + '">' + esc(st.label) + "</p>" +
        (p.shortDescription ? '<p class="card-desc">' + esc(p.shortDescription) + "</p>" : "") +
        '<div class="card-actions">' +
          '<button class="btn btn-outline btn-sm" type="button" data-open="' + esc(p.id) + '">View Details</button>' +
          action +
        "</div>" +
      "</div>" +
    "</article>";
  }

  function renderFilters() {
    if (categories.length < 2) { filtersEl.hidden = true; return; }
    var all = ["All"].concat(categories);
    filtersEl.innerHTML = all.map(function (c) {
      return '<button class="chip" type="button" data-cat="' + esc(c) + '" aria-pressed="' + (c === activeCategory) + '">' + esc(c) + "</button>";
    }).join("");
  }

  function renderGrid() {
    if (!items.length) {
      grid.innerHTML = '<div class="empty"><p>New pieces are on the way. In the meantime, you can ask for something made just for you.</p>' +
        '<a class="btn btn-solid" href="#custom">Start a Custom Order</a></div>';
      return;
    }
    var list = activeCategory === "All" ? items : items.filter(function (p) { return p.category === activeCategory; });
    grid.innerHTML = list.map(cardHTML).join("");
  }

  filtersEl.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-cat]");
    if (!btn) { return; }
    activeCategory = btn.getAttribute("data-cat");
    $$(".chip", filtersEl).forEach(function (c) {
      c.setAttribute("aria-pressed", c.getAttribute("data-cat") === activeCategory);
    });
    renderGrid();
  });

  grid.addEventListener("click", function (e) {
    var opener = e.target.closest("[data-open]");
    if (opener) { openProduct(opener.getAttribute("data-open")); }
  });

  renderFilters();
  renderGrid();

  /* ------------------------------------------------------------------
     PRODUCT DETAILS window
     ------------------------------------------------------------------ */
  var modal = $("#modal");
  var panel = $("#modalPanel");
  var modalBody = $("#modalBody");
  var current = null;          // product being shown
  var selection = {};          // chosen color / size
  var lastFocus = null;
  var openedInternally = false;

  function syncScrollLock() {
    document.body.classList.toggle("lock", !modal.hidden || !$("#mobileMenu").hidden);
  }

  function optionGroup(key, label, values) {
    if (!values.length) { return ""; }
    return '<div><span class="opt-label" id="lbl-' + key + '">' + label + ' <small>(optional)</small></span>' +
      '<div class="opt-chips" role="group" aria-labelledby="lbl-' + key + '">' +
      values.map(function (v) {
        return '<button class="chip" type="button" data-opt="' + key + '" data-val="' + esc(v) + '" aria-pressed="false">' + esc(v) + "</button>";
      }).join("") + "</div></div>";
  }

  function renderProduct(p) {
    var st = STATUS[p.status];
    var soldout = p.status === "soldout";
    var imgs = p.images.length ? p.images : [""];
    var paragraphs = String(p.description).split(/\n\s*\n/).map(function (t) {
      return "<p>" + esc(t.trim()) + "</p>";
    }).join("");

    var thumbs = imgs.length > 1
      ? '<div class="pd-thumbs" role="group" aria-label="Product photos">' + imgs.map(function (src, i) {
          return '<button class="pd-thumb" type="button" data-thumb="' + i + '" aria-label="Show photo ' + (i + 1) + '"' +
            (i === 0 ? ' aria-current="true"' : "") + ">" + mediaHTML(src, "") + "</button>";
        }).join("") + "</div>"
      : "";

    var cta = soldout
      ? '<p class="pd-soldout">This piece is sold out right now. Message us and we will let you know when it is available again.</p>' +
        '<div class="pd-cta"><a class="btn btn-outline btn-block" id="pdOrder" href="#" target="_blank" rel="noopener">' + icon("chat") + " Ask About Restock</a></div>"
      : '<div class="pd-cta"><a class="btn btn-solid btn-block" id="pdOrder" href="#" target="_blank" rel="noopener">' + icon("chat") + " " + esc(st.button) + "</a>" +
        '<p class="pd-foot">This opens WhatsApp so we can confirm details and payment.</p></div>';

    modalBody.innerHTML =
      '<div class="pd">' +
        '<div class="pd-gallery"><div class="pd-main"><div id="pdMain">' + mediaHTML(imgs[0], p.name, { eager: true }) + "</div>" +
          (soldout ? '<span class="tag-soldout">Sold out</span>' : "") + "</div>" + thumbs + "</div>" +
        '<div class="pd-info">' +
          '<p class="pd-cat">' + esc(p.category) + "</p>" +
          '<h2 id="pd-title">' + esc(p.name) + "</h2>" +
          '<p class="pd-price">' + priceHTML(p) + "</p>" +
          '<div class="pd-meta"><span class="status status-' + p.status + '">' + esc(st.label) + "</span>" +
            (p.type ? '<span class="pd-type">' + esc(p.type) + "</span>" : "") + "</div>" +
          '<div class="pd-desc">' + paragraphs + "</div>" +
          (p.note ? '<p class="pd-note">' + esc(p.note) + "</p>" : "") +
          '<div class="pd-options">' + optionGroup("color", "Color", p.colors) + optionGroup("size", "Size", p.sizes) + "</div>" +
          (p.care ? '<p class="pd-care"><strong>Care:</strong> ' + esc(p.care) + "</p>" : "") +
          cta +
        "</div>" +
      "</div>";

    updateOrderLink();
    attachSwipe(imgs, p);
  }

  function updateOrderLink() {
    var link = $("#pdOrder");
    if (link && current) { link.href = waLink(productMessage(current, selection)); }
  }

  function showImage(index) {
    var imgs = current.images.length ? current.images : [""];
    index = (index + imgs.length) % imgs.length;
    $("#pdMain").innerHTML = mediaHTML(imgs[index], current.name, { eager: true });
    $$(".pd-thumb").forEach(function (t, i) {
      if (i === index) { t.setAttribute("aria-current", "true"); } else { t.removeAttribute("aria-current"); }
    });
    selection.img = index;
  }

  function attachSwipe(imgs) {
    var main = $("#pdMain");
    if (!main || imgs.length < 2) { return; }
    var startX = null;
    main.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    main.addEventListener("touchend", function (e) {
      if (startX === null) { return; }
      var dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) > 45) { showImage((selection.img || 0) + (dx < 0 ? 1 : -1)); }
    });
  }

  modalBody.addEventListener("click", function (e) {
    var thumb = e.target.closest("[data-thumb]");
    if (thumb) { showImage(Number(thumb.getAttribute("data-thumb"))); return; }

    var opt = e.target.closest("[data-opt]");
    if (opt) {
      var key = opt.getAttribute("data-opt");
      var wasOn = opt.getAttribute("aria-pressed") === "true";
      $$('[data-opt="' + key + '"]', modalBody).forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
      if (!wasOn) { opt.setAttribute("aria-pressed", "true"); }
      selection[key] = wasOn ? "" : opt.getAttribute("data-val");
      updateOrderLink();
    }
  });

  function showProduct(id) {
    var p = byId[id];
    if (!p) { return; }
    if (modal.hidden) { lastFocus = document.activeElement; }
    current = p;
    selection = { img: 0 };
    renderProduct(p);
    modal.hidden = false;
    panel.scrollTop = 0;
    syncScrollLock();
    panel.focus({ preventScroll: true });
    document.title = p.name + " | " + SITE.brandName;
  }

  function hideProduct() {
    if (modal.hidden) { return; }
    modal.hidden = true;
    current = null;
    openedInternally = false;
    syncScrollLock();
    document.title = originalTitle;
    if (lastFocus && lastFocus.focus) { lastFocus.focus({ preventScroll: true }); }
  }

  var originalTitle = document.title;

  function openProduct(id) {
    openedInternally = true;
    window.location.hash = "#p/" + id;
  }

  function closeProduct() {
    if (modal.hidden) { return; }
    if (openedInternally) {
      openedInternally = false;
      window.history.back();          // returns to where the customer was browsing
    } else {
      hideProduct();
      try { window.history.replaceState(null, "", window.location.pathname + window.location.search + "#shop"); }
      catch (err) { window.location.hash = "#shop"; }
    }
  }

  function route() {
    var match = window.location.hash.match(/^#p\/(.+)$/);
    var id = match ? decodeURIComponent(match[1]) : null;
    if (id && byId[id]) { showProduct(id); } else { hideProduct(); }
  }

  window.addEventListener("hashchange", route);

  modal.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]")) { closeProduct(); }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (!modal.hidden) { closeProduct(); }
      else if (!menu.hidden) { setMenu(false); }
      return;
    }
    // Keep keyboard focus inside the product window while it is open
    if (e.key === "Tab" && !modal.hidden) {
      var focusable = $$("button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])", modal)
        .filter(function (el) { return el.offsetParent !== null; });
      if (!focusable.length) { return; }
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ------------------------------------------------------------------
     CUSTOM ORDER form → WhatsApp
     ------------------------------------------------------------------ */
  var pieceSelect = $("#cf-piece");
  pieceSelect.innerHTML = ['<option value="">Choose a type of piece</option>']
    .concat(categories.map(function (c) { return "<option>" + esc(c) + "</option>"; }))
    .concat(["<option>Something else</option>"]).join("");

  $("#customForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target;
    var lines = [SITE.messages.custom, ""];
    function add(label, value) { value = (value || "").trim(); if (value) { lines.push(label + ": " + value); } }
    add("Name", f.name.value);
    add("Piece", f.piece.value);
    add("Colors", f.colors.value);
    add("Size / measurements", f.size.value);
    add("Details", f.details.value);
    openExternal(waLink(lines.join("\n").trim()));
  });

  /* ------------------------------------------------------------------
     Contact tiles + footer links (from js/config.js)
     ------------------------------------------------------------------ */
  var contacts = [
    { name: "WhatsApp",  note: "Chat with us",  icon: "chat",      href: waLink(SITE.messages.general), primary: true, external: true, show: true },
    { name: "Instagram", note: "Follow along",  icon: "instagram", href: SITE.instagram, external: true, show: !!SITE.instagram },
    { name: "TikTok",    note: "Watch us make", icon: "tiktok",    href: SITE.tiktok,    external: true, show: !!SITE.tiktok },
    { name: "Email",     note: SITE.email,      icon: "mail",      href: "mailto:" + SITE.email,        show: !!SITE.email }
  ].filter(function (c) { return c.show; });

  function linkAttrs(c) { return c.external ? ' target="_blank" rel="noopener"' : ""; }

  $("#contactGrid").innerHTML = contacts.map(function (c) {
    return '<a class="contact-tile' + (c.primary ? " is-primary" : "") + '" href="' + esc(c.href) + '"' + linkAttrs(c) + ">" +
      icon(c.icon) + "<strong>" + esc(c.name) + "</strong><span>" + esc(c.note) + "</span></a>";
  }).join("");

  $("#footerSocial").innerHTML = contacts.map(function (c) {
    return '<a href="' + esc(c.href) + '"' + linkAttrs(c) + ">" + icon(c.icon) + " " + esc(c.name) + "</a>";
  }).join("");

  $("#year").textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     Mobile menu
     ------------------------------------------------------------------ */
  var menu = $("#mobileMenu");
  var toggle = $("#menuToggle");

  function setMenu(open) {
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    $("use", toggle).setAttribute("href", open ? "#i-close" : "#i-menu");
    syncScrollLock();
  }

  toggle.addEventListener("click", function () { setMenu(menu.hidden); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) { setMenu(false); } });
  window.matchMedia("(min-width: 980px)").addEventListener("change", function (e) { if (e.matches) { setMenu(false); } });

  /* ------------------------------------------------------------------
     Highlight the current section in the desktop navigation
     ------------------------------------------------------------------ */
  if ("IntersectionObserver" in window) {
    var links = {};
    $$(".nav-desktop a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        Object.keys(links).forEach(function (k) { links[k].classList.toggle("is-active", k === entry.target.id); });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) { spy.observe(s); } });
  }

  // Open a product directly if the page was opened with a product link
  route();
})();
