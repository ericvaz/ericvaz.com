# ericvaz.com

Personal website for Eric Vaz, Full Professor of Geography and Environmental Studies at Toronto Metropolitan University, founder-advisor, and geospatial intelligence specialist.

## Structure

```
/
├── index.html                  Main site (editorial portfolio; HTML + CSS + JS inline) — the default front door
├── terra/index.html            Terra OS — retro System-7-style desktop portfolio (reached via the "Terra OS" nav door)
├── classic/index.html          Legacy URL: noindex redirect to /
├── spatstat/
│   ├── index.html              Free interactive Spatial Statistics course (runs Python in-browser via Pyodide)
│   └── <module>/index.html     Static, individually indexable per-module pages (generated)
├── build-spatstat-pages.mjs    Generates the per-module pages from the course curriculum
├── covers/                     Springer monograph cover images
├── portrait.png, banner.png    Portrait and social/OG image
├── CNAME, .nojekyll            GitHub Pages custom-domain + Jekyll-off config
├── robots.txt, sitemap.xml     Crawler directives + sitemap
└── beta/                       Experimental drafts (not linked from the site)
```

The main site lives at the root; the retro **Terra OS** experience is one click away at `/terra/` (linked from the nav). The old `/classic/` path now redirects to the root.

## Updating the main site (`index.html`)

**Publications:** Edit the `PUBLICATIONS` array near the bottom of `index.html`. The
dashboard list is a curated selection; the headline figure (90+) is a fixed value in
the `.dash-stat` block and does not auto-count the array.

**Headline stats:** Edit the four `.dash-stat` values directly (Peer-Reviewed Articles,
Monographs & Edited Volumes, Years of Research & Advisory, Citations).

**Testimonials:** Edit the `TESTIMONIALS` array. A few are shown per visit.

**Books:** Add a cover to `/covers` and a new entry to the `.books-grid` section.

**Projects:** Edit the `#ventures` section markup directly (personal projects, framed as
independent work in a personal capacity).

**Navigation:** The top nav is four file-menu dropdowns (About / Research / Practice /
Connect) plus the "Terra OS" door.

## Spatial Statistics course (`/spatstat/`)

A free, interactive course: write and run real Python (NumPy, SciPy, Matplotlib via
Pyodide) in the browser. To edit lessons, change the `SPATSTAT_CURRICULUM` object in
`spatstat/index.html`, then regenerate the static per-module pages:

```
node build-spatstat-pages.mjs
```

## SEO

Each page includes a meta description, Open Graph and Twitter card tags, a canonical
URL, and JSON-LD structured data (`Person`, `WebSite`, and `Course`, with `sameAs`
links to Google Scholar, ORCID, LinkedIn, and the podcast). `/classic/` is `noindex`
and redirects to the root so ranking consolidates on one URL. Update `sitemap.xml`
`lastmod` on major edits.

## Style note

Prose avoids em dashes and en dashes; use commas, colons, or parentheses instead.

## Deployment

Served via GitHub Pages with custom domain `ericvaz.com`. Push to `main` to deploy.
