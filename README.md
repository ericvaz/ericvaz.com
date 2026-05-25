# ericvaz.com

Personal website for Eric Vaz, Full Professor of Geography and Environmental Studies at Toronto Metropolitan University, founder-advisor, and geospatial intelligence specialist.

## Structure

```
/
├── index.html          Single-file site (HTML + CSS + JS inline)
├── CNAME               Custom domain config for GitHub Pages
├── .nojekyll           Disables Jekyll processing
├── robots.txt          Crawler directives
├── sitemap.xml         Sitemap for search engines
└── covers/             Springer monograph cover images
```

## Page sections

01 About, 02 Research, 03 Books, 04 Practice, 05 Selected Projects,
06 UK & Europe, 07 Recognition, 08 Publications, 09 Speaking, 10 Contact.
Writing and Voices appear as unnumbered supporting sections.

## Updating

**Publications:** Edit the `PUBLICATIONS` array near the bottom of `index.html`. The
dashboard list is a curated selection; the headline figure (90+) is set as a fixed
value in the `.dash-stats` block and does not auto-count the array.

**Headline stats:** Edit the four `.dash-stat` values directly in `index.html`
(Peer-Reviewed Articles, Monographs & Edited Volumes, Years of Research & Advisory,
Citations).

**Testimonials:** Edit the `TESTIMONIALS` array. Three are randomly displayed per visit.

**Books:** Add a cover to `/covers` and a new entry to the `.books-grid` section.

**Projects:** Edit the `#ventures` section markup directly. These are personal projects, framed as independent work in personal capacity.

## SEO

`index.html` includes meta description, Open Graph and Twitter card tags, a canonical
URL, and JSON-LD `Person` structured data. Update `sitemap.xml` `lastmod` on major edits.

## Style note

Prose avoids em dashes and en dashes; use commas, colons, or parentheses instead.

## Deployment

Served via GitHub Pages with custom domain `ericvaz.com`.
