# Franca Cece Crochet website

A single-page boutique storefront. Customers browse, then order on WhatsApp.
No installation needed: open `index.html` in a browser to preview it.

## What to edit (only two files)

| I want to change… | Edit this file |
|---|---|
| WhatsApp number, Instagram, TikTok, email | `js/config.js` (section 1) |
| Brand colors | `js/config.js` (section 2) |
| Prices' currency symbol, WhatsApp message wording | `js/config.js` |
| Products (add, remove, hide, edit) | `js/products.js` |

Everything is marked with **✏️ CHANGE THIS** comments.

## First 3 things to do

1. **Add your WhatsApp number** in `js/config.js`. Country code + number, digits only. Example: `0803 123 4567` becomes `2348031234567`.
2. **Replace the sample products** in `js/products.js` with your real pieces and prices.
3. **Add your photos** (see below).

## Adding a product

Open `js/products.js`, copy the template at the top, paste it at the end of the list, fill it in, and save. That's all. The shop grid, category filter, product page and WhatsApp message all update by themselves.

- **Hide a product:** add `hidden: true,`
- **Mark it sold out / pre-order / custom:** set `status:` to `"soldout"`, `"preorder"` or `"custom"`
- **Feature it:** set `featured: true`
- **New category:** just type a new category name. A filter button appears automatically.

## Photos

Save your photos in these folders. If a photo is missing, the site shows a neat placeholder, so nothing looks broken.

| Photo | Put it here | Suggested size |
|---|---|---|
| Logo | `images/logo/logo.png` | already added |
| Hero slider (top of homepage) | `images/hero/hero-1.jpg` … `hero-6.jpg` | portrait, about 1200 x 1500 |
| About section | `images/about/about.jpg` | portrait, about 1000 x 1250 |
| Products | `images/products/` | portrait 4:5, about 1000 x 1250 |

The homepage photo is now a slider: it shows each hero photo for 10 seconds, then fades to the next, and loops. You can list up to 6 photos (2 or 3 is fine too) in `js/config.js` under `heroSlides`, and change how long each one shows with `heroSlideSeconds`. Small dots under the photo let a visitor jump to a specific one.

For products, list the file names in the product's `images: [ ... ]` line. The first photo is the main one; extra photos become thumbnails. Keep file sizes under about 400 KB so the site loads fast on phones (free tools like squoosh.app can shrink them).

Tip: use lowercase names with dashes, no spaces. Example: `mini-market-bag-1.jpg`.

## Putting it online (free options)

Upload the whole folder to any of these:
- **Netlify Drop** (app.netlify.com/drop): drag the folder in, get a link in seconds
- **GitHub Pages** or **Vercel**: also free

Later you can connect your own domain, such as francacececrochet.com.

## Folder map

```
index.html          the page structure and wording (About text lives here)
css/styles.css      the design
js/config.js        ✏️ contact details, colors, image paths, messages
js/products.js      ✏️ your product catalogue
js/app.js           the code that builds the shop (no need to touch)
images/             logo, hero, about, products
```
