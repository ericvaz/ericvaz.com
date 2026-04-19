# ericvaz.com

Personal academic website for Eric Vaz, Full Professor of Geography and Environmental Studies at Toronto Metropolitan University.

## Structure

```
/
├── index.html          Single-file site (HTML + CSS + JS inline)
├── CNAME               Custom domain config for GitHub Pages
├── .nojekyll           Disables Jekyll processing
└── covers/             Springer monograph cover images
    ├── 978-3-030-36479-3.webp   Regional Intelligence (2020)
    ├── 978-3-031-19871-7.webp   Geography of Happiness (2023)
    ├── 978-3-031-24731-6.webp   Regional & Urban Change — Ontario (2023)
    ├── 978-3-031-76906-1.webp   Regional Knowledge Economies (2024)
    ├── 978-3-032-19210-3.webp   Regional & Urban Change — Northern Canada (2026)
    ├── 978-3-319-95135-5.webp   Resilience & Regional Dynamics (2018)
    └── 978-3-662-62177-6.webp   Sustainable Development in Southern Europe (2020)
```

## Updating

**Publications:** Edit the `PUBLICATIONS` array near the bottom of `index.html`. Append new entries with year, title, authors, venue, and theme tags (`giscience`, `regional`, `business`, `health`, `environment`, `heritage`).

**Testimonials:** Edit the `TESTIMONIALS` array near the bottom of `index.html`. Change `approved: false` to `approved: true` and paste the approved quote. Up to three are randomly displayed on each visit.

**Books:** Add new cover to the `/covers` folder and a new entry to the `.books-grid` section in `index.html`.

## Deployment

Served via GitHub Pages with custom domain `ericvaz.com`.
