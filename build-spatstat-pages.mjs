/* ============================================================
   build-spatstat-pages.mjs
   Generates a static, individually-indexable page per active
   module from the SPATSTAT_CURRICULUM in spatstat/index.html.
   Each page is a genuine readable tutorial (crawlable content)
   with a CTA into the interactive app. Single source of truth:
   edit the curriculum, then re-run:  node build-spatstat-pages.mjs
   ============================================================ */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const SRC = path.join(ROOT, "spatstat", "index.html");
const html = fs.readFileSync(SRC, "utf8");

const m = html.match(/window\.SPATSTAT_CURRICULUM = ([\s\S]*?);\n<\/script>/);
if (!m) { console.error("Could not find SPATSTAT_CURRICULUM"); process.exit(1); }
const C = eval("(" + m[1] + ")");

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const SCHOLAR = "https://scholar.google.com/citations?user=EfpbSEYAAAAJ&hl=en";

// module-specific SEO copy (targets the real search clusters)
const SEO = {
  "spatial-autocorrelation": {
    title: "Spatial Autocorrelation & Moran's I in Python — free tutorial",
    desc: "Learn spatial autocorrelation and Moran's I in Python: build a spatial weights matrix, form the spatial lag, code Moran's I, run a permutation test, and read a Moran scatterplot. Free, interactive, runs in your browser.",
    keywords: "spatial autocorrelation python, Moran's I python, spatial weights matrix, spatial lag, Moran scatterplot, permutation test, global spatial autocorrelation, spatial statistics tutorial"
  },
  "interpolation": {
    title: "Interpolation & Kriging in Python — free tutorial (variograms, ordinary kriging)",
    desc: "Learn kriging in Python: fit trend surfaces, compute an empirical semivariogram, fit a spherical model (nugget, sill, range), and solve the ordinary kriging system with an uncertainty map. Free, interactive, runs in your browser.",
    keywords: "kriging python tutorial, ordinary kriging python, variogram python, semivariogram python, trend surface, geostatistics python, spatial interpolation python, nugget sill range"
  },
  "hot-spot-analysis": {
    title: "Hot Spot Analysis & LISA in Python — free tutorial (Local Moran's I)",
    desc: "Learn hot-spot analysis and LISA in Python: compute Local Moran's I, classify HH/LL/HL/LH quadrants, test significance with conditional permutation, and draw a LISA cluster map of significant hot and cold spots. Free and interactive.",
    keywords: "LISA cluster map, local Moran's I python, hot spot analysis python, cold spot, Anselin local indicators of spatial association, LISA python, cluster and outlier analysis"
  }
};

const pathName = id => (C.paths.find(p => p.id === id) || {}).name || "";

function renderBlock(b) {
  if (b.kind === "prose") return `<div class="prose">${b.html}</div>`;
  if (b.kind === "aside") return `<aside class="aside">${b.html}</aside>`;
  if (b.kind === "code")
    return `<figure class="code"><figcaption><span class="tag">${esc(b.tag || "Example")}</span>${esc(b.caption || "")}</figcaption><pre><code>${esc(b.code)}</code></pre></figure>`;
  if (b.kind === "exercise")
    return `<figure class="code ex"><figcaption><span class="tag tag-task">Try it yourself</span>${esc(b.caption || "Exercise")}</figcaption>
      <div class="ex-prompt">${b.prompt || ""}</div>
      <pre><code>${esc(b.solution || b.starter || "")}</code></pre>
      <p class="ex-note">In the <a href="/spatstat/#/module/INTERACTIVE">interactive version</a> this line is blanked out and you write it yourself, with a hint, a solution, and an automatic check.</p></figure>`;
  if (b.kind === "cite")
    return `<div class="further"><div class="ey">${esc(b.eyebrow || "Further reading")}</div><h3>${esc(b.title || "")}</h3><ul>${(b.items || []).map(it => `<li><a href="${it.url}" target="_blank" rel="noopener">${esc(it.text)}</a>${it.note ? " — " + esc(it.note) : ""}</li>`).join("")}</ul></div>`;
  return "";
}

const CSS = `*{box-sizing:border-box}
:root{--green:#1f9d63;--green-700:#136e44;--green-50:#e9f6ef;--green-100:#d6efe0;--ink:#14181f;--ink-2:#2a2f39;--gray:#5f6b7a;--muted:#8b94a3;--bg:#f5f7f9;--card:#fff;--line:#e9ecf0;--term-bg:#0e1726;--term-fg:#e6eaf2;--sans:"Inter",system-ui,-apple-system,Segoe UI,Roboto,sans-serif;--mono:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:16px;line-height:1.65;-webkit-font-smoothing:antialiased}
a{color:var(--green-700)}
.bar{position:sticky;top:0;z-index:5;background:rgba(255,255,255,.9);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.bar-in{max-width:820px;margin:0 auto;padding:.7rem 1.2rem;display:flex;align-items:center;gap:1rem;font-weight:600;font-size:.92rem}
.bar a{color:var(--gray);text-decoration:none}.bar a:hover{color:var(--green-700)}
.bar .crumb{flex:1;color:var(--muted)}.bar .crumb b{color:var(--ink)}
.bar .run{background:var(--green);color:#fff;border-radius:9px;padding:.45rem .85rem;font-weight:700;white-space:nowrap}
main{max-width:820px;margin:0 auto;padding:1.6rem 1.2rem 4rem}
.eyebrow{color:var(--green-700);font-weight:800;font-size:.74rem;letter-spacing:.08em;text-transform:uppercase}
h1{font-size:2.1rem;letter-spacing:-.02em;margin:.3rem 0 .5rem;line-height:1.12}
h2{font-size:1.45rem;letter-spacing:-.02em;margin:2.2rem 0 .4rem;padding-top:1.2rem;border-top:1px solid var(--line)}
h3{font-size:1.1rem;margin:1.2rem 0 .3rem}
.lede{font-size:1.12rem;color:var(--gray);margin:.2rem 0 1.2rem}
.cta{display:inline-flex;align-items:center;gap:.5rem;background:var(--green);color:#fff;font-weight:700;text-decoration:none;border-radius:11px;padding:.8rem 1.3rem;margin:.3rem 0 1.4rem}
.cta:hover{background:var(--green-700)}
.prose{margin:.9rem 0}.prose code{font-family:var(--mono);font-size:.86em;background:#eef1f4;padding:.06em .35em;border-radius:5px;color:#28415f}
.prose ul{padding-left:1.2rem}
.aside{border-left:3px solid var(--green);background:var(--green-50);padding:.7rem 1rem;border-radius:0 10px 10px 0;margin:1.2rem 0;color:var(--ink-2)}
.aside strong{color:var(--green-700)}
.hh{color:#e5573f;font-weight:800}.ll{color:#3b82c4;font-weight:800}.hl{color:#f3a594;font-weight:800}.lh{color:#9cc2e6;font-weight:800}
figure.code{margin:1.3rem 0;border:1px solid var(--line);border-radius:13px;overflow:hidden;background:#fff;box-shadow:0 1px 2px rgba(16,24,40,.05)}
figure.code.ex{border-color:var(--green-100)}
figcaption{font-family:var(--mono);font-size:.74rem;color:var(--gray);padding:.55rem .8rem;background:#fbfcfd;border-bottom:1px solid var(--line)}
.tag{display:inline-block;font-size:.6rem;font-weight:800;text-transform:uppercase;letter-spacing:.06em;padding:.13rem .44rem;border-radius:6px;margin-right:.5rem;background:#eef1f4;color:#5f6b7a}
.tag-task{background:var(--green);color:#fff}
.ex-prompt{padding:.75rem .9rem;font-size:.96rem;color:var(--ink-2);border-bottom:1px solid var(--line)}
.ex-prompt code{font-family:var(--mono);font-size:.85em;background:#eef1f4;padding:.05em .3em;border-radius:5px}
pre{margin:0;padding:.85rem 1rem;background:var(--term-bg);color:var(--term-fg);overflow-x:auto;font-family:var(--mono);font-size:13px;line-height:1.55}
.ex-note{margin:0;padding:.55rem .9rem;font-size:.82rem;color:var(--muted);background:#fbfcfd;border-top:1px solid var(--line)}
.further{border:1px solid var(--green-100);background:linear-gradient(120deg,var(--green-50),#fff 70%);border-radius:13px;padding:1rem 1.15rem;margin:1.6rem 0}
.further .ey{font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--green-700)}
.further h3{margin:.25rem 0 .5rem}.further ul{margin:.2rem 0;padding-left:1.1rem}
.more{margin-top:2.4rem;border-top:1px solid var(--line);padding-top:1.4rem}
.more h2{border:0;padding:0;margin:0 0 .7rem;font-size:1.15rem}
.more a{display:block;padding:.6rem .2rem;text-decoration:none;color:var(--ink);font-weight:600;border-bottom:1px solid var(--line)}
.more a:hover{color:var(--green-700)}
footer{max-width:820px;margin:0 auto;padding:1.4rem 1.2rem 3rem;color:var(--muted);font-size:.85rem}
footer a{color:var(--gray)}`;

const active = C.modules.filter(x => x.status === "active");

function buildModule(mod) {
  const seo = SEO[mod.id] || { title: mod.title + " — Spatial Statistics", desc: mod.blurb, keywords: "" };
  const url = `https://ericvaz.com/spatstat/${mod.id}/`;
  const teaches = mod.lessons.map(l => l.title);
  const lessonsHTML = mod.lessons.map(l =>
    `<section><h2>${esc(l.title)}</h2>${l.blocks.map(renderBlock).join("\n")}</section>`
  ).join("\n").replaceAll("/spatstat/#/module/INTERACTIVE", `/spatstat/#/module/${mod.id}`);

  const others = active.filter(x => x.id !== mod.id);
  const moreHTML = `<div class="more"><h2>More free modules</h2>${others.map(o =>
    `<a href="/spatstat/${o.id}/">${esc(o.title)} — ${esc(o.blurb)}</a>`).join("")}<a href="/spatstat/">All modules &amp; the interactive course →</a></div>`;

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Person", "@id": "https://ericvaz.com/#eric", "name": "Eric Vaz", "url": "https://ericvaz.com/", "jobTitle": "Full Professor of Geography and Environmental Studies", "affiliation": { "@type": "CollegeOrUniversity", "name": "Toronto Metropolitan University" }, "sameAs": [SCHOLAR, "https://orcid.org/0000-0003-1738-2677", "https://www.linkedin.com/in/ericnvaz", "https://open.spotify.com/show/0ECGFXqx3F9GSlr7YksOAo", "https://podcasts.apple.com/ca/podcast/geography-of-opportunity/id1851837987", "https://ericvazshow.substack.com/"] },
      { "@type": "LearningResource", "@id": url + "#resource", "name": seo.title, "description": seo.desc, "url": url, "inLanguage": "en", "isAccessibleForFree": true, "learningResourceType": "tutorial", "teaches": teaches, "isPartOf": { "@id": "https://ericvaz.com/spatstat/#course" }, "author": { "@id": "https://ericvaz.com/#eric" } },
      { "@type": "BreadcrumbList", "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Spatial Statistics", "item": "https://ericvaz.com/spatstat/" },
        { "@type": "ListItem", "position": 2, "name": mod.title, "item": url } ] }
    ]
  };

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(seo.title)}</title>
<meta name="description" content="${esc(seo.desc)}">
<meta name="keywords" content="${esc(seo.keywords)}">
<meta name="author" content="Eric Vaz">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(seo.title)}">
<meta property="og:description" content="${esc(seo.desc)}">
<meta property="og:site_name" content="ericvaz.com">
<meta property="og:image" content="https://ericvaz.com/banner.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(seo.title)}">
<meta name="twitter:description" content="${esc(seo.desc)}">
<meta name="twitter:image" content="https://ericvaz.com/banner.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<style>${CSS}</style>
</head>
<body>
<div class="bar"><div class="bar-in">
  <a href="/spatstat/">Spatial Statistics</a>
  <span class="crumb">/ <b>${esc(mod.title)}</b></span>
  <a class="run" href="/spatstat/#/module/${mod.id}">Run it interactively →</a>
</div></div>
<main>
  <p class="eyebrow">Module ${mod.n} · ${esc(pathName(mod.path))} · Free &amp; interactive</p>
  <h1>${esc(seo.title.replace(/ — .*/, ""))}</h1>
  <p class="lede">${esc(mod.blurb)} Written by Eric Vaz. Read it here, or open the interactive version to write and run the Python yourself, in your browser, on real open data.</p>
  <a class="cta" href="/spatstat/#/module/${mod.id}">Open the interactive version (write &amp; run the code) →</a>
  ${lessonsHTML}
  ${moreHTML}
</main>
<footer>A free learning resource at <a href="/spatstat/">ericvaz.com/spatstat</a>. Lessons run real Python in your browser via Pyodide; data is fetched live from open repositories. &copy; Eric Vaz — reuse freely with attribution. See more on <a href="${SCHOLAR}">Google Scholar</a>.</footer>
</body>
</html>
`;
}

let written = [];
for (const mod of active) {
  const dir = path.join(ROOT, "spatstat", mod.id);
  fs.mkdirSync(dir, { recursive: true });
  const out = path.join(dir, "index.html");
  fs.writeFileSync(out, buildModule(mod));
  written.push(`spatstat/${mod.id}/index.html`);
}
console.log("Generated:\n - " + written.join("\n - "));
