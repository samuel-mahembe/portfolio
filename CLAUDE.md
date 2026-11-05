# Samuel Mahembe Portfolio

Full rebuild of this portfolio. The phased plan is in `2026-11-05-portfolio-rebuild-plan.md`. Work one phase at a time. At the end of every phase, stop, summarize what you did and what comes next, and wait for Samuel to type "continue".

## Ground rules (apply to every phase)

1. Before deleting, overwriting, moving, or renaming any existing file, show Samuel the exact list of changes and wait for confirmation.
2. Never touch files outside this repository folder. One approved exception: Impeccable may download its engine to `~/.impeccable/bin/`.
3. New documents you create (not code files) use the naming format YYYY-MM-DD-descriptive-name.
4. In all website copy and documents: no em dashes, no en dashes, no arrow characters. Use commas, periods, colons, or the word "to".
5. Only claim what Samuel can evidence. If a fact is uncertain, mark it `TODO(verify)` in the content file and ask him. Never invent metrics, articles, testimonials, or certifications.
6. At the end of each phase, list every file you created or modified with its path.
7. Commit to git at the end of each approved phase with a clear message. Work on a branch called `rebuild`, never directly on `master`, until Phase 7.

## Decisions already made

- Hosting: stay on GitHub Pages at `https://samuel-mahembe.github.io/portfolio/`.
- Approach: full rebuild. The old Bootstrap/jQuery template is archived, not reused.
- Stack: Astro (static output) + Tailwind CSS v4 + TypeScript. Use React islands only where interactivity needs it, with Motion (`motion` package, motion.dev) for animation. Prefer CSS and View Transitions for simple effects.
- Positioning: Software Engineer building data and transaction systems at scale. Data Engineering is the target direction. AI work (DeepRead) is a strong secondary highlight, not the headline.
- Base branch: `master` is the latest branch and is connected to GitHub Actions. Where the plan says `main` (the Phase 1 tag, the Phase 7 pull request), use `master`.
- Skills: `.claude/skills/design-taste-frontend/` is 38 MB and stays local through `.gitignore`. A fresh clone must reinstall it from `Leonxlnx/taste-skill`.
- Design direction: where the taste skill conflicts with the plan (for example, on photographs or shader effects), the plan wins.
