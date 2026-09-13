# Put your images here

Export at **max ~1400 px on the long edge**, under ~400 KB each. Filenames must match exactly — the HTML
looks for these names. Scientific figures are shown with `object-fit:contain` (class `fit`), so they are
letterboxed rather than cropped: axes, colourbars and legends survive whatever the slot's aspect ratio is.

Until a file exists the page shows a neutral hatch at the right size, so the layout never breaks.

| Filename | What it is | Appears on | Status |
|---|---|---|---|
| `portrait.jpg` | Headshot, 1:1 800 px | index | **done** |
| `work-snowreanalysis.png` | NSIDC landing pages, WUS + HMA reanalysis | index, work | **done** |
| `work-rshub.png` | RSHub system architecture diagram | index, work | **done** |
| `work-altay.png` | Altay elevation / SWE season / WY2018–2025 volumes | index, work | **done** |
| `work-spatiotemporal-analysis.png` | American Cordillera study domains — WUS, Sierra, Andes | index, work | **done** |
| `reanalysis-map.png` | Fig. 1 of the *Sci Data* 2022 paper — WUS domain, in situ sites, ASO tiles | research | **done** |
| `og-card.jpg` | 1200×630 social preview card | all | **missing** |
| `regions-map.svg` | World map marking the four regions covered | research | **done** |
| `paper-wna-resolution.png` | *TC* 2023 Fig. 3 — peak SWE across ten products by resolution | research | **done** |
| `paper-snowcci.png` | *TC* 2025 Fig. 9 — Snow CCI vs Landsat reanalysis | research | **done** |
| `paper-hma-swe.png` | *TC* 2021 Fig. 3a — HMA peak SWE climatology (cropped from the 2-panel figure) | research | **done** |
| `favicon.png` | 1:1 512 px browser tab icon | all | **missing** |

`_originals/` holds the full-resolution uploads. It is git-ignored — regenerate the web-sized versions
from there rather than re-exporting from scratch.

## Licensing — figures taken from published papers

Every reused figure was licence-checked through Crossref before download, not assumed. All four below are
**CC BY 4.0**, and each carries its citation in a `.cite` line directly under it on `research.html`.
**Keep those citations if the figures stay** — CC BY requires attribution.

| File | Source | Licence |
|---|---|---|
| `reanalysis-map.png` | Fang, Liu & Margulis, *Sci Data* **9**, 677 (2022), Fig. 1 | CC BY 4.0 |
| `paper-wna-resolution.png` | Fang et al., *The Cryosphere* **17**, 5175 (2023), Fig. 3 | CC BY 4.0 |
| `paper-snowcci.png` | Sun et al., *The Cryosphere* **19**, 2017 (2025), Fig. 9 | CC BY 4.0 |
| `paper-hma-swe.png` | Liu, Fang & Margulis, *The Cryosphere* **15**, 5261 (2021), Fig. 3a | CC BY 4.0 |

`regions-map.svg` is generated from Natural Earth `ne_110m_land` (public domain), projected
equirectangular and simplified. Regenerate it rather than hand-editing the path data.

**Do NOT reuse figures from these**, even though they are Yiwen's own papers — the publisher holds them:
*GRL* 2019 (10.1029/2019GL082507), *GRL* 2022 (10.1029/2022GL100082), and the IEEE GRSM RSHub paper.

## Licensing

`reanalysis-map.png` is Figure 1 of Fang, Liu & Margulis, *Scientific Data* **9**, 677 (2022),
doi:10.1038/s41597-022-01768-7 — **CC BY 4.0**, reused with attribution in the figure caption on
`research.html`. Keep that caption if the image stays.

The RSHub figure came from Yiwen directly, not from the IEEE PDF. **IEEE holds copyright on the published
RSHub paper**, so never lift a figure from that PDF — regenerate it.

Field photographs with identifiable colleagues: ask them first.
