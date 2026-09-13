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
| `work-vr.jpg` | VR teaching platform | work | **missing** |
| `og-card.jpg` | 1200×630 social preview card | all | **missing** |
| `favicon.png` | 1:1 512 px browser tab icon | all | **missing** |

`_originals/` holds the full-resolution uploads. It is git-ignored — regenerate the web-sized versions
from there rather than re-exporting from scratch.

## Licensing

`reanalysis-map.png` is Figure 1 of Fang, Liu & Margulis, *Scientific Data* **9**, 677 (2022),
doi:10.1038/s41597-022-01768-7 — **CC BY 4.0**, reused with attribution in the figure caption on
`research.html`. Keep that caption if the image stays.

The RSHub figure came from Yiwen directly, not from the IEEE PDF. **IEEE holds copyright on the published
RSHub paper**, so never lift a figure from that PDF — regenerate it.

Field photographs with identifiable colleagues: ask them first.
