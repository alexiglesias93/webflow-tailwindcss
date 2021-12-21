# [Work In Progress] Webflow - TailwindCSS Adapter

Utility adapter to develop websites/apps in [Webflow](https://webflow.com/) using [TailwindCSS](https://tailwindcss.com/) utility approach.

## Current approach

Currently, this tool only generates a `.css` file containing all TailwindCSS's classes rewritten to Webflow's internal convention.

This allows importing the file in a project using an `HTML Embed` component and start using TailwindCSS classes right away:

```html
<link
  href="https://cdn.jsdelivr.net/gh/alexiglesias93/webflow-tailwindcss@master/webflow.css"
  rel="stylesheet"
  type="text/css"
/>
```

### Why?

This current approach is intended only for projects that are meant to be exported and lately converted into an app using a framework like Svelte, React or Vue.

**Do not use it in Webflow live sites!** The `.css` file weights roughly `3.5MB`.

## Roadmap

- [x] CDN Import for development-only in Webflow.
- [ ] Webflow to TailwindCSS class naming converter on exported sites.
- [ ] TailwindCSS adapter for production Webflow live sites.
