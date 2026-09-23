/* =====================================================================
   FRANCA CECE CROCHET  —  PRODUCT CATALOGUE
   File: js/products.js

   Every product on the website comes from the list below.
   The shop, filters, product pages and WhatsApp messages all build
   themselves from it, so you only ever edit THIS file.

   ---------------------------------------------------------------------
   HOW TO ADD A PRODUCT
   1. Copy the template below.
   2. Paste it at the end of the PRODUCTS list (before the final  ];  ).
   3. Fill it in, save, refresh the website. Done.

   HOW TO REMOVE A PRODUCT
   • Temporarily:  add   hidden: true,   to that product.
   • Permanently:  delete its whole { ... }, block.

   HOW TO ADD / RENAME A CATEGORY
   Just type the category name in a product. New names create a new
   filter button automatically. Categories with no visible products
   never show up.

   ---------------------------------------------------------------------
   TEMPLATE (copy this):

   {
     id: "my-new-piece",                 // unique, lowercase, no spaces (use -)
     name: "My New Piece",
     category: "Crochet Bags",
     type: "Made to order",              // e.g. "Ready-made" or "Made to order"
     status: "available",                // "available" | "preorder" | "custom" | "soldout"
     featured: false,                    // true = shown first with a "Featured" tag
     hidden: false,                      // true = hide from the website
     price: 15000,                       // number only, or null for "Price on request"
     pricePrefix: "",                    // optional, e.g. "From"
     shortDescription: "One line shown on the product card.",
     description: "Full description shown on the product page.\n\nA blank line starts a new paragraph.",
     images: [                           // first image is the main one
       "images/products/my-new-piece-1.jpg",
       "images/products/my-new-piece-2.jpg"   // optional extra photos
     ],
     colors: ["Burgundy", "Cream"],      // [] if not applicable
     sizes: ["S", "M", "L"],             // [] if not applicable
     care: "How to care for it.",        // optional
     note: "",                           // optional message, e.g. "Ready in 2 weeks"
     whatsappMessage: ""                 // optional custom message ({product} = name)
   },

   ---------------------------------------------------------------------
   ⚠️  The products below are SAMPLES so you can see how the shop looks.
   Replace the names, prices, descriptions and photos with your real
   pieces, and delete the samples you don't need.
   ===================================================================== */

const PRODUCTS = [

  {
    id: "petal-drop-earrings",
    name: "Petal Drop Earrings",
    category: "Crochet Earrings",
    type: "Ready-made",
    status: "available",
    featured: true,
    hidden: false,
    price: 3500,
    pricePrefix: "",
    shortDescription: "Lightweight floral drops with a soft, sculpted shape.",
    description: "Small crochet petals gathered into a light, easy-to-wear drop.\n\nEach pair is made by hand, so no two are exactly alike.",
    images: [
      "images/products/Ear Ring/petal-drop-earrings-1.jpeg",
      "images/products/Ear Ring/petal-drop-earrings-2.jpeg"
    ],
    colors: ["Burgundy", "Cream", "Champagne"],
    sizes: [],
    care: "Keep dry and store flat. Spot clean gently if needed.",
    note: "",
    whatsappMessage: ""
  },

  {
    id: "Amara-drop-earrings",
    name: "Amara Drop Earrings",
    category: "Crochet Earrings",
    type: "Ready-made",
    status: "available",
    featured: true,
    hidden: false,
    price: 3500,
    pricePrefix: "",
    shortDescription: "Lightweight floral drops with a soft, sculpted shape.",
    description: "Small crochet petals gathered into a light, easy-to-wear drop.\n\nEach pair is made by hand, so no two are exactly alike.",
    images: [
      "images/products/Ear Ring/Amara Drop ear ring 1.jpeg",
      "images/products/Ear Ring/Amara Drop ear rings 2.jpeg"
    ],
    colors: ["Burgundy", "Cream", "Champagne"],
    sizes: [],
    care: "Keep dry and store flat. Spot clean gently if needed.",
    note: "",
    whatsappMessage: ""
  },

   {
    id: "Bold-flower stud-earrings",
    name: "Bold Flower Stud Earrings",
    category: "Crochet Earrings",
    type: "Ready-made",
    status: "available",
    featured: true,
    hidden: false,
    price: 2000,
    pricePrefix: "",
    shortDescription: "Lightweight floral drops with a soft, sculpted shape.",
    description: "Small crochet petals gathered into a light, easy-to-wear drop.\n\nEach pair is made by hand, so no two are exactly alike.",
    images: [
      "images/products/Ear Ring/BOLD FLOWER EAR STUDS 1.jpeg",
      "images/products/Ear Ring/BOLD FLOWER EAR STUDS 2.jpeg"
    ],
    colors: ["Burgundy", "Cream", "Champagne"],
    sizes: [],
    care: "Keep dry and store flat. Spot clean gently if needed.",
    note: "",
    whatsappMessage: ""
  },

  

  {
    id: "everyday-scrunchie",
    name: "3 pcs Everyday Scrunchie",
    category: "Scrunchies",
    type: "Ready-made",
    status: "available",
    featured: false,
    hidden: false,
    price: 7000,
    pricePrefix: "",
    shortDescription: "A soft crochet scrunchie that holds without tugging.",
    description: "A textured crochet scrunchie for everyday wear, gentle on the hair and easy to style.",
    images: ["images/products/Scrunchies/3pcs  ruffle scrunchies.jpeg"],
    care: "Hand wash gently in cool water and lay flat to dry.",
    note: "",
    whatsappMessage: ""
  },

   {
    id: "Classic Crochet Scrunchie",
    name: "Classic Crochet Scrunchie",
    category: "Scrunchies",
    type: "Ready-made",
    status: "available",
    featured: false,
    hidden: false,
    price: 5000,
    pricePrefix: "",
    shortDescription: "A soft crochet scrunchie that holds without tugging.",
    description: "A textured crochet scrunchie for everyday wear, gentle on the hair and easy to style.",
    images: ["images/products/Scrunchies/Classic Crochet Scrunchie.jpeg"],
    care: "Hand wash gently in cool water and lay flat to dry.",
    note: "",
    whatsappMessage: ""
  },


   {
    id: "Full Ruffle Scrunchie",
    name: "Full Ruffle Scrunchie",
    category: "Scrunchies",
    type: "Ready-made",
    status: "available",
    featured: false,
    hidden: false,
    price: 3500,
    pricePrefix: "",
    shortDescription: "A soft crochet scrunchie that holds without tugging.",
    description: "A textured crochet scrunchie for everyday wear, gentle on the hair and easy to style.",
    images: ["images/products/Scrunchies/Crochet scrunchie 3.jpeg"],
    care: "Hand wash gently in cool water and lay flat to dry.",
    note: "",
    whatsappMessage: ""
  },



  {
    id: "ribbon-hair-clip-set",
    name: "Ribbon Hair Clip Set",
    category: "Hair Accessories",
    type: "Ready-made",
    status: "available",
    featured: false,
    hidden: false,
    price: 3000,
    pricePrefix: "",
    shortDescription: "A set of small crochet bow clips.",
    description: "Small crochet bows on secure clips, made to be worn together or on their own.",
    images: ["images/products/Hair Accessories/baby pink crochet hair bow.jpeg"],
    sizes: [],
    care: "Spot clean gently and let air dry.",
    note: "",
    whatsappMessage: ""
  },

  {
    id: "ribbon-hair-clip-set",
    name: "Ribbon Hair Clip Set",
    category: "Hair Accessories",
    type: "Ready-made",
    status: "available",
    featured: false,
    hidden: false,
    price: 3000,
    pricePrefix: "",
    shortDescription: "A set of small crochet bow clips.",
    description: "Small crochet bows on secure clips, made to be worn together or on their own.",
    images: ["images/products/Hair Accessories/ribbon hair clip.jpeg"],
    sizes: [],
    care: "Spot clean gently and let air dry.",
    note: "",
    whatsappMessage: ""
  },

  {
    id: "mini-Bow-bag",
    name: "Mini Bow Bag",
    category: "Crochet Bags",
    type: "Made to order",
    status: "available",
    featured: true,
    hidden: false,
    price: 15500,
    pricePrefix: "",
    shortDescription: "A compact everyday bag with a structured shape.",
    description: "Room for your phone, keys and essentials, in a neat crochet stitch that keeps its shape.\n\nChoose your color and we will make it for you.",
    images: [
      "images/products/Crochet Bags/bow bag 1.jpeg",
      "images/products/Crochet Bags/bow bag 2.jpeg",
      "images/products/Crochet Bags/bow bag 3.jpeg",
      "images/products/Crochet Bags/bow bag 4.jpeg"
    ],
    colors: ["Blue", "baby pink", "Butter Yellow"],
    sizes: [],
    care: "Spot clean only. Store stuffed lightly to keep its shape.",
    note: "Made to order. We will confirm timing when you message us.",
    whatsappMessage: ""
  },

  {
    id: "mini-Donut-bag",
    name: "Mini Donut Bag",
    category: "Crochet Bags",
    type: "Made to order",
    status: "available",
    featured: true,
    hidden: false,
    price: 18000,
    pricePrefix: "",
    shortDescription: "A compact everyday bag with a structured shape.",
    description: "Room for your phone, keys and essentials, in a neat crochet stitch that keeps its shape.\n\nChoose your color and we will make it for you.",
    images: [
      "images/products/Crochet Bags/Donut bag 1.jpeg",
      "images/products/Crochet Bags/Donut bag 2.jpeg",
      "images/products/Crochet Bags/Donut bag 3.jpeg"
    ],
    colors: ["Blue", "baby pink", "Butter Yellow"],
    sizes: [],
    care: "Spot clean only. Store stuffed lightly to keep its shape.",
    note: "Made to order. We will confirm timing when you message us.",
    whatsappMessage: ""
  },

  {
    id: "mini-Phone-bag",
    name: "Mini Phone Bag",
    category: "Crochet Bags",
    type: "Made to order",
    status: "available",
    featured: true,
    hidden: false,
    price: 6000,
    pricePrefix: "",
    shortDescription: "A compact everyday bag with a structured shape.",
    description: "Room for your phone, keys and essentials, in a neat crochet stitch that keeps its shape.\n\nChoose your color and we will make it for you.",
    images: [
      "images/products/Crochet Bags/phone bag 1.jpeg",
      "images/products/Crochet Bags/phone bag 2.jpeg"
    ],
    sizes: [],
    care: "Spot clean only. Store stuffed lightly to keep its shape.",
    note: "Made to order. We will confirm timing when you message us.",
    whatsappMessage: ""
  },

  {
    id: "Crochet Ruffle Shoulder Bag",
    name: "Crochet Ruffle Shoulder Bag",
    category: "Crochet Bags",
    type: "Made to order",
    status: "available",
    featured: true,
    hidden: false,
    price: 18000,
    pricePrefix: "",
    shortDescription: "A compact everyday bag with a structured shape.",
    description: "Room for your phone, keys and essentials, in a neat crochet stitch that keeps its shape.\n\nChoose your color and we will make it for you.",
    images: [
      "images/products/Crochet Bags/Crochet Ruffle Shoulder Bag 1.jpeg",
      "images/products/Crochet Bags/Crochet Ruffle Shoulder Bag 2.jpeg",
      "images/products/Crochet Bags/Crochet Ruffle Shoulder Bag 3.jpeg",
      "images/products/Crochet Bags/Crochet Ruffle Shoulder Bag 4.jpeg"
    ],
    colors: ["Blue", "baby pink", "Butter Yellow"],
    sizes: [],
    care: "Spot clean only. Store stuffed lightly to keep its shape.",
    note: "Made to order. We will confirm timing when you message us.",
    whatsappMessage: ""
  },

  

  {
    id: "Boho Crochet Beach Outfit ",
    name: "Boho Crochet Beach Outfit ",
    category: "Swimwear",
    type: "Made to order",
    status: "custom",
    featured: true,
    hidden: false,
    price: 28000,
    pricePrefix: "From",
    shortDescription: "A crochet swim set made to your measurements.",
    description: "A two-piece crochet set made for your body. Send us your measurements and preferred color and we will confirm the details with you.",
    images: [
      "images/products/beach wears/Boho Crochet Beach Outfit 1.jpeg",
      "images/products/beach wears/Boho Crochet Beach Outfit 2.jpeg",
      "images/products/beach wears/Boho Crochet Beach Outfit 3.jpeg",
      "images/products/beach wears/Boho Crochet Beach Outfit 4.jpeg"
    ],
    colors: ["Burgundy", "Cream", "Champagne"],
    sizes: ["XS", "S", "M", "L", "XL"],
    care: "Rinse in cool water after wearing. Lay flat to dry.",
    note: "Made to your measurements. Price is confirmed once we have your details.",
    whatsappMessage: ""
  },

  {
    id: "crochet maxi Outfit ",
    name: "crochet maxi Outfit ",
    category: "Swimwear",
    type: "Made to order",
    status: "custom",
    featured: true,
    hidden: false,
    price: 30000,
    pricePrefix: "From",
    shortDescription: "A crochet swim set made to your measurements.",
    description: "A two-piece crochet set made for your body. Send us your measurements and preferred color and we will confirm the details with you.",
    images: [
      "images/products/beach wears/crochet maxi 1.jpeg",
      "images/products/crochet maxi 2.jpeg"
    ],
    colors: ["Burgundy", "Cream", "Champagne"],
    sizes: ["XS", "S", "M", "L", "XL"],
    care: "Rinse in cool water after wearing. Lay flat to dry.",
    note: "Made to your measurements. Price is confirmed once we have your details.",
    whatsappMessage: ""
  },

  

  {
    id: "African Flower Crochet Top ",
    name: "African Flower Crochet Top ",
    category: "Crochet Tops",
    type: "Ready-made",
    status: "soldout",
    featured: false,
    hidden: false,
    price: 12000,
    pricePrefix: "",
    shortDescription: "A soft matching set for little ones.",
    description: "A handmade top set, handmade in soft yarn.",
    images: [
      "images/products/Crochet Tops/African Flower Crochet Top 1.jpeg",
      "images/products/Crochet Tops/African Flower Crochet Top 2.jpeg",
      "images/products/Crochet Tops/African Flower Crochet Top 3.jpeg"],
    colors: ["Cream"],
    sizes: [],
    care: "Hand wash gently and lay flat to dry.",
    note: "",
    whatsappMessage: ""
  },

  {
    id: "Soft Girl Ruffle Hat",
    name: "Soft Girl Ruffle Hat",
    category: "Crochet Caps",
    type: "Made to order",
    status: "custom",
    featured: false,
    hidden: false,
    price: null,
    pricePrefix: "",
    shortDescription: "Bring an idea or inspiration photo and we will make it.",
    description: "Have a piece in mind that you can't find anywhere? Tell us what you're picturing, including colors, size and any inspiration photos, and we will let you know what is possible.",
    images: [
      "images/products/Crochet caps/Crochet ruffle hat 1.jpeg",
      "images/products/Crochet caps/Crochet ruffle hat 2.jpeg",
      "images/products/Crochet caps/Crochet ruffle hat 3.jpeg",
      "images/products/Crochet caps/Crochet ruffle hat 4.jpeg",
      "images/products/Crochet caps/Crochet ruffle hat 5.jpeg"
    ],
    colors: [],
    sizes: [],
    care: "",
    note: "Price depends on the design and is confirmed after we talk.",
    whatsappMessage: "Hello Franca Cece Crochet, I would like to make a custom piece. Here's what I have in mind..."
  }

];
