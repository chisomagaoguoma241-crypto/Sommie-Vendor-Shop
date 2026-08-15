# Sommie Vendor Shop

Sommie Vendor Shop is a polished, **frontend-only** e-commerce demonstration built with plain HTML, CSS, and JavaScript. The repository deliberately separates the customer storefront from the vendor-side operations dashboard while sharing a browser-local product catalogue.

## Run locally

Serve the repository from its root with any static server. For example:

```bash
python3 -m http.server 8080
```

Then open the customer storefront at `http://localhost:8080/customer/index.html` and the vendor dashboard at `http://localhost:8080/admin/index.html`.

## Project map

| Area | Entry point | Purpose |
|---|---|---|
| Customer storefront | `customer/index.html` | Editorial shopping experience with catalogue, product details, cart, wishlist, checkout, account, and support pages. |
| Vendor dashboard | `admin/index.html` | Product management, order patterns, category management, analytics, settings, and profile controls. |
| Shared catalogue state | `customer/assets/js/data.js` | Product seed data and browser-local storage helpers used by both interfaces. |
| Customer behavior | `customer/assets/js/app.js`, `customer/assets/js/storefront.js` | Shared navigation, product rendering, search, filtering, cart, wishlist, and checkout interactions. |
| Dashboard behavior | `admin/assets/js/admin.js` | Product CRUD modal, filters, browser-local product updates, theme preference, and administrative UI interactions. |

## Browser-local demonstration behavior

The experience has no server, database, authentication provider, payment processor, or external admin API. Catalogue edits in the vendor dashboard are saved to `localStorage` and immediately flow through to the storefront in the same browser. Cart contents, wishlists, lightweight account preferences, and theme choices use the same browser-local approach.

Orders, operational indicators, and support-row patterns in the dashboard are **explicitly illustrative interface data**. The review area intentionally contains no seeded ratings, testimonials, or customer reviews.

## Brand and visual system

The customer site uses the **Modern Mercantile** direction: warm paper surfaces, charcoal copy, an editorial serif, a compact utility sans, and **Vermilion Signal `#F04D36`** for intentional actions and status. The command dashboard shifts to a slate operational shell with mint data accents while retaining the Sommie cut-out “O” mark.

Generated original brand imagery is stored in `customer/assets/images/`. Product photography is loaded from responsive remote image URLs and receives a warm-neutral catalogue treatment in the customer stylesheet.

## Production handoff

For production, replace browser-local helpers with authenticated server endpoints and a persistent product, customer, order, inventory, and checkout system. Maintain the current rule that customer reviews and ratings are only displayed after authentic collection and moderation.
