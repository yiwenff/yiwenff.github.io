# yiwenff.github.io

Personal academic website of Yiwen Fang, Ph.D. Static HTML, no build step, no dependencies.

## Structure

```
.
├── index.html            Biography · selected work · selected publications · contact
├── research.html         Three research tracks · Snow Reanalysis case study · teaching
├── work.html             PhysEarth-Agent · RSHub · datasets & field · funding
├── publications.html     All 14 peer-reviewed · under review · archived datasets
├── css/site.css          One stylesheet for every page; palette at the top under :root
├── img/                  Images — see img/README.md for the exact filenames needed
├── files/                Yiwen_Fang_CV.pdf
├── .gitignore
└── README.md
```

`_archive/` and `HANDOFF.md` are local working files and are git-ignored. They never reach the public site.

## Editing

- **Text** — edit the HTML directly. Plain, readable markup.
- **Look** — edit `css/site.css` only. Colours are at the top under `:root`.
- **Nav** — the left rail is repeated in all four HTML files; change all four together.

## Local preview

```
python3 -m http.server 8000
```

Then open http://localhost:8000

## Deploy

GitHub Pages serves this repository from its root. Push to `main` and it is live within a minute.
