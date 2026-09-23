/* =====================================================================
   FRANCA CECE CROCHET  —  SITE SETTINGS
   File: js/config.js

   This is the ONE place for everything about the brand that isn't a
   product: contact details, social links, colors, image paths and the
   WhatsApp message wording. Products live in js/products.js.

   Look for the  ✏️ CHANGE THIS  notes below.
   ===================================================================== */

const SITE = {

  /* ---------- ✏️ 1. CONTACT & SOCIAL LINKS ---------------------------
     WhatsApp number: country code + number, digits only.
     No "+", no spaces, no leading zero.
     Nigeria example: 0803 123 4567  →  "2348031234567"
     Leave any link as "" (empty quotes) and it disappears from the site. */
  whatsappNumber: "2348162515402",                        // ✏️ CHANGE THIS
  instagram:      "https://www.instagram.com/francaceceofficial?stkn=MWRxcWV3aTBzYTA0Ng==",           // ✏️ paste your full Instagram link
    email:          "francacececrochet@gmail.com",          // ✏️ CHANGE THIS

  brandName: "Franca Cece Crochet",

  /* ---------- ✏️ 2. BRAND COLOURS -----------------------------------
     Change a color here and it updates across the whole website.
     Gold is only used for lines, icons and small highlights — keep it
     that way and the site stays elegant rather than flashy. */
  colors: {
    burgundy:     "#6B1230",   // main brand color (buttons, headings)
    burgundyDeep: "#3F0A1C",   // darker burgundy (footer, hover states)
    gold:         "#C9A96E",   // champagne gold accent
    goldSoft:     "#E8DCC3",   // pale champagne (soft borders/tints)
    cream:        "#F6EEE1",   // warm cream (alternate sections)
    ivory:        "#FDFAF4",   // main page background
    text:         "#2E1A20",   // body text
    muted:        "#786569"    // secondary text
  },

  /* ---------- ✏️ 3. IMAGE PATHS -------------------------------------
     Drop your photo into the matching folder with the same file name
     (or change the name here). If a photo is missing, the site shows an
     elegant placeholder instead of a broken image.
       Logo        → images/logo/logo.png
       Hero photos → images/hero/…             (portrait, about 1200 x 1500)
       About photo → images/about/about.jpg    (portrait, about 1000 x 1250)
       Products    → images/products/…         (set per product in products.js) */
  images: {
    logo:  "images/logo/logo.png",
    about: "images/about/about.jpeg"
  },

  /* ---------- ✏️ 3b. HERO SLIDER --------------------------------------
     The top-of-homepage photo now rotates through up to 6 images.
     List them in the order you want them to appear — one path per line.
     Fewer than 6 is fine (2 or 3 works too). Save each photo into
     images/hero/ with a matching name.
     A slide with a missing file simply shows the placeholder, so it's
     safe to list a photo here before you've added it. */
  heroSlides: [
    "images/hero/hero-1.jpg.jpeg",
    "images/hero/hero-2.jpg.jpeg",
    "images/hero/hero-3.jpg.jpeg",
    "images/hero/hero-4.jpg.jpeg",
    "images/hero/hero-5.jpg.jpeg",
    "images/hero/hero-6.jpg.jpeg"
  ],

  // How long each hero photo stays on screen, in seconds.
  heroSlideSeconds: 6,

  /* ---------- ✏️ 4. PRICES -------------------------------------------- */
  currencySymbol: "₦",
  priceOnRequestText: "Price on request",   // shown when a product has no price

  /* ---------- ✏️ 5. WHATSAPP MESSAGES --------------------------------
     {product} is replaced with the product name automatically. */
  messages: {
    product: "Hello Franca Cece Crochet, I would like to order the {product}. Please send me the available options and payment details.",
    custom:  "Hello Franca Cece Crochet, I would like to make a custom order. Here's what I have in mind...",
    general: "Hello Franca Cece Crochet, I'd love to know more about your pieces.",
    restock: "Hello Franca Cece Crochet, the {product} is sold out. Could you let me know when it will be available again?"
  },

  /* ---------- 6. PRODUCT STATUS WORDING ------------------------------
     The four statuses a product can have (set in products.js).
     You can change the wording of the labels and buttons here. */
  statuses: {
    available: { label: "Available",    button: "Order on WhatsApp" },
    preorder:  { label: "Pre-order",    button: "Pre-order on WhatsApp" },
    custom:    { label: "Custom order", button: "Order on WhatsApp" },
    soldout:   { label: "Sold out",     button: "Sold out" }
  },

  /* ---------- 7. SHOP OPTIONS ---------------------------------------- */
  // Put featured products first in the shop? (true / false)
  featuredFirst: true,

  // Order of the category filter buttons. Any category not listed here
  // is added afterwards automatically, so you never have to touch this
  // when you add a new category.
  categoryOrder: [
    "Crochet Earrings",
    "Scrunchies",
    "Hair Accessories",
    "Crochet Bags",
    "Swimwear",
    "Crochet Tops",
    "Crochet Caps"
  ]
};


/* ---------------------------------------------------------------------
   Applies the colors above to the website. You don't need to edit this.
   --------------------------------------------------------------------- */
(function applyTheme() {
  const root = document.documentElement;
  Object.keys(SITE.colors).forEach(function (key) {
    const cssName = "--" + key.replace(/([A-Z])/g, "-$1").toLowerCase();
    root.style.setProperty(cssName, SITE.colors[key]);
  });
})();
