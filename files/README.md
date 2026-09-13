# Put downloadable documents here

| Filename | What it is |
|---|---|
| `Yiwen_Fang_CV.pdf` | The CV. Every page links to it from the left rail. |

Export the PDF from `20260829-Academia-CV.md` and rename it to exactly `Yiwen_Fang_CV.pdf`.
Keep the filename stable — if you rename it later, links you have already shared will break.

Do **not** put cover letters, research statements, teaching statements or anything position-specific
in this folder. This repository is public. `.gitignore` already blocks those filename patterns as a
safety net, but the rule is: only put a document here if you would hand it to a stranger.

**Notebooks are never published from here.** `*.ipynb` is git-ignored repo-wide. The RSHub demo notebook
is kept locally as a working copy only — `research.html` links the upstream demos at
github.com/zjuiEMLab/rshub instead. The local copy also still carries a live API token in cell 7's stored
output, which is a second reason it must not ship.
