# Portfolio Rebuild Plan (prompt for Claude Code)

You are rebuilding Samuel Mahembe's personal portfolio from scratch in this repository.
Read this whole file before doing anything. Work one phase at a time. At the end of every phase, stop, summarize what you did and what comes next, and wait for Samuel to type "continue".

## Ground rules (apply to every phase)

1. Before deleting, overwriting, moving, or renaming any existing file, show Samuel the exact list of changes and wait for confirmation.
2. Never touch files outside this repository folder.
3. New documents you create (not code files) use the naming format YYYY-MM-DD-descriptive-name.
4. In all website copy and documents: no em dashes, no en dashes, no arrow characters. Use commas, periods, colons, or the word "to".
5. Only claim what Samuel can evidence. If a fact is uncertain, mark it `TODO(verify)` in the content file and ask him. Never invent metrics, articles, testimonials, or certifications.
6. At the end of each phase, list every file you created or modified with its path.
7. Commit to git at the end of each approved phase with a clear message. Work on a branch called `rebuild`, never directly on `main`, until Phase 7.

## Decisions already made

- Hosting: stay on GitHub Pages at `https://samuel-mahembe.github.io/portfolio/`.
- Approach: full rebuild. The old Bootstrap/jQuery template is archived, not reused.
- Stack: Astro (static output) + Tailwind CSS v4 + TypeScript. Use React islands only where interactivity needs it, with Motion (`motion` package, motion.dev) for animation. Prefer CSS and View Transitions for simple effects.
- Positioning: Software Engineer building data and transaction systems at scale. Data Engineering is the target direction. AI work (DeepRead) is a strong secondary highlight, not the headline.

---

## Phase 0: Setup and skills

1. Check `node -v` (need 20 or newer) and `git status`. Report the results.
2. Create branch `rebuild`.
3. Install these design skills for this project (check each repo's README for the current install command; the `npx skills add` form is the expected one):
   - Taste skill (design direction guardrails). Search GitHub for "taste-skill" for Claude Code and confirm the repo with Samuel before installing.
   - Impeccable: `npx skills add pbakaus/impeccable`
   - Emil Kowalski design engineering skills: `npx skills add emilkowalski/skill`
   If an install command fails, clone the repo and copy the skill folder into `.claude/skills/`.
4. Create a `CLAUDE.md` at the repo root that contains the Ground rules and Decisions above, so future sessions follow them.
5. Stop and report.

## Phase 1: Archive the old site

1. Create a git tag `v1-template` on the current `main` commit so the old site is always recoverable.
2. Propose moving everything that belongs to the old template into `_legacy/`. Expected list (confirm against the actual folder): `about-us.html`, `blog.html`, `contact.html`, `contact_process.php`, `elements.html`, `index.html`, `portfolio.html`, `portfolio-details.html`, `services.html`, `single-blog.html`, `css/`, `js/`, `fonts/`, `vendors/`, `Ronin-doc/`, `img/`, `data/`, `prepros-6.config`, `.DS_Store` files.
3. Keep at repo root: `.git/`, `.gitignore`, `.idea/` (ignore it), this plan file, `CLAUDE.md`.
4. Images worth reusing later (copy, do not move, into the new `public/` in Phase 3 only if Samuel agrees): `img/projects/callsight.png`, `img/projects/Telco.png`, `img/projects/transcript.png`, `img/econet.png`, `img/EconetLogo.png`, `img/telone.jpg`, `img/favicon.png`.
5. Show the list, wait for confirmation, then use `git mv` to move the files. Add `_legacy/` to the Astro build exclusions later (Astro only builds from `src/` and `public/`, so it will not be published).
6. Stop and report.

## Phase 2: Content file (no code yet)

Create `2026-11-05-portfolio-content.md` with all final website copy. Use the facts below. Samuel must approve this file before any design work starts.

### Identity
- Name: Samuel Mahembe
- Location: Greater Boston
- Role line: Software Engineer, Data and Transaction Systems
- Hero headline draft (offer 3 alternatives, Samuel picks one): "I build systems that move money and data reliably."
- Short intro: Software engineer with 3+ years building enterprise platforms that handle high-volume transactional and operational data across telecommunications, payments, and internal business operations. Now focused on data engineering: pipelines, data models, and cloud data platforms. MSc Business Analytics at Hult International Business School.
- Availability line: Open to full-time Software Engineering and Data Engineering roles. (NOT internships.)
- Email: samuelmahembe3@gmail.com
- LinkedIn: https://www.linkedin.com/in/samuel-mahembe
- GitHub: https://github.com/samuel-mahembe (the old site used the wrong handle `samuelmahembe`)

### Stats row (verify each with Samuel)
- 3+ years in production
- Millions of transactions per day (Econet platforms) `TODO(verify exact wording)`
- +15% revenue (TelOne Voucher Management System)
- 30% better candidate experience (TelOne Careers Platform)

### Experience
**Econet Wireless Zimbabwe**, Software Development Engineer | Data & Analytics, Aug 2022 to Aug 2025, Harare
- Built and supported enterprise systems handling high-volume transactional and operational data across revenue and internal operations.
- Delivered end-to-end solutions across backend, frontend, APIs, databases, and mobile, turning business requirements into production applications and integrations.
- Improved release reliability and team efficiency through GitLab CI/CD automation.
- Supported analytics platforms, dashboards, and data models that improved visibility into workforce, revenue, and operational performance.
- Built an AI-driven call-center optimization solution that reduced customer waiting times.
- Platforms: Electronic Recharge Platform, YoGames Hub, VanSales (offline-first dealer app), Online Interviews Platform.
- Tech: Java, Python, SQL, Angular, React, REST APIs, Microservices, GitLab CI/CD, Docker, SOAP, Android, USSD.

**TelOne Zimbabwe**, Junior Software Engineer, Mar 2020 to Feb 2021, Harare
- Improved candidate experience by 30% on a Careers Platform built with C# and Angular, with application status tracking.
- Enhanced the Voucher Management System and transaction monitoring, contributing to a 15% revenue increase.
- Analyzed payment and voucher transaction data to identify volume, adoption, and revenue trends.
- Tech: C#, Angular, SQL, Agile/Scrum, Git.

### Selected work (case studies, each: problem, approach, architecture, stack, result, honest limitations, links)
1. **Real-time Payment Fraud Detection** (flagship, status `TODO(verify: in progress or shipped)`): Java/Spring Boot, Kafka, Python ML scoring, LLM explanation layer, Redis, PostgreSQL, monitoring.
2. **DeepRead**, a deployed RAG app: Python, LangChain, ChromaDB, local `all-MiniLM-L6-v2` embeddings, Groq (Llama 3.3 70B), Streamlit. Repo `samuel-mahembe/deepread`. Zero-cost by design. Honest limitation: some sites return 403 on scraping, v2 plans Playwright and a Next.js frontend. `TODO(verify live demo URL)`
3. **CallSight / AI-Powered Call Quality Platform**: Python, Angular, OpenAI APIs. `TODO(verify details and whether it is the Econet call-center work)`
4. **Customer Churn Analytics Dashboard** (academic): Tableau, Python, ML. `TODO(verify)`
Drop from the old site: 3D Helmet Design, the generic "Machine Learning Model", "Data Pipeline Automation", and "Advanced Analytics System" cards, unless Samuel provides real details.

### Education
- MSc Business Analytics, Data Science, Hult International Business School, Boston, Sep 2025 to Aug 2026
- Bachelor of Business Studies and Computer Science, University of Zimbabwe, 2018 to 2021 `TODO(verify end year: profile PDF says 2021)`

### Certifications (profile PDF list; old site listed AWS Cloud Practitioner and OCP Java 17, ask which are real)
- Oracle Cloud Infrastructure 2023 Certified DevOps Professional
- HCIA Datacom
- Software Architecture Foundations
- Data Visualization and Communication with Tableau (Duke University, Coursera)
- `TODO(verify)` AWS Certified Cloud Practitioner, OCP Java SE 17

### Skills (grouped, no proficiency bars)
- Languages: Java, Python, SQL, JavaScript/TypeScript, C#
- Backend and APIs: Spring Boot, REST, Microservices, SOAP, FastAPI
- Data: Data modeling, ETL/ELT, Data warehousing, BigQuery, Pandas, Tableau, Power BI
- Cloud and DevOps: AWS, GCP, Docker, GitLab CI/CD
- Frontend: Angular, React

### Writing
The old site listed three articles (Medium and LinkedIn, Nov 2024 to Jan 2025). Ask Samuel whether each is real and published. Only include real ones with real links. If none, include the DeepRead LinkedIn post link instead, or omit the section.

Stop and wait for approval of the content file.

## Phase 3: Scaffold and design system

1. Scaffold Astro in the repo root (`npm create astro@latest . -- --template minimal --typescript strict --no-git`), add Tailwind v4 (`npx astro add tailwind`) and React (`npx astro add react`), then `npm i motion`.
2. `astro.config.mjs`: `site: 'https://samuel-mahembe.github.io'`, `base: '/portfolio'`. Every internal link and asset path must respect the base (use `import.meta.env.BASE_URL`).
3. Use the taste skill to set the direction before writing styles. Target feel: calm, editorial, engineering-precise. References: jainamgogree.vercel.app (monospace section labels like `// selected.work`, sparse headline, stats row, purposeful live demo) and ilyas-hassan.github.io (numbered sections 01 to 06, consistent project card structure).
4. Design tokens as CSS variables: one neutral scale, ONE accent color, dark theme default with a light theme toggle that respects `prefers-color-scheme`.
5. Fonts (self-host via Fontsource): Geist or Inter Tight for text, JetBrains Mono for labels and numbers, optionally one serif display face (for example Instrument Serif) for the hero headline only.
6. Content lives in Astro content collections: `src/content/projects/*.md` and `src/content/experience/*.md`, so adding a project means adding a Markdown file.
7. No stock photos, no icon soup of technology logos, no skill percentage bars.
8. Stop and show Samuel the running site (`npm run dev`) with the empty layout and typography.

## Phase 4: Build sections (stop for review after each one)

Order:
1. Nav (name wordmark, anchor links, theme toggle, Resume link) and Hero (headline, role line, intro, two buttons: View work, Resume PDF; stats row).
2. 01 About (short narrative, photo optional, availability line).
3. 02 Selected Work (case study cards linking to `/portfolio/projects/<slug>/` detail pages built from the collection).
4. 03 Experience (timeline with impact bullets).
5. 04 Skills, Education, Certifications (compact).
6. 05 Contact and footer.
Every section must be fully responsive (test at 375px, 768px, 1280px) and accessible (semantic HTML, focus states, contrast AA).

## Phase 5: Motion

Use Emil Kowalski's skills. Principles: motion should explain, not decorate. Short durations (150 to 300ms for UI, up to 600ms for reveals), ease-out curves, no bounce on content, stagger small. Add:
- Subtle fade-and-rise reveals on scroll (once only).
- Stats count up when they enter the viewport.
- Hover states on project cards (slight lift, border/accent change).
- View Transitions between the home page and project detail pages.
- Full support for `prefers-reduced-motion` (disable all non-essential motion).
Run the skill's animation review pass and fix what it flags.

## Phase 6: Lab (one signature demo)

Build `06 Lab` with a single live demo as a React island: a simulated payment transaction stream. Transactions appear in a feed in real time (generated client-side, fake data clearly labeled "simulated"), each scored by a simple rules plus logistic-style function, flagged ones highlighted with a short reason ("velocity spike", "unusual amount", "new device"). Controls: pause, speed, fraud rate slider. Include a small "How it works" note that links to the Fraud Detection case study. Keep the bundle small and lazy-load the island (`client:visible`).

Optional later phase (do not build now): an "Ask my portfolio" chat using Groq, which needs a serverless proxy because GitHub Pages cannot hide API keys.

## Phase 7: Audit and deploy

1. Run Impeccable's audit and polish commands across the whole site and fix the findings.
2. Check Lighthouse (aim for 95+ on all four scores), check every link, check the 404 page, add Open Graph and Twitter meta tags with a generated social image, add a favicon, keep the existing Google Analytics tag `G-RLXSZX3Z6Z`.
3. Add `.github/workflows/deploy.yml` using the official `withastro/action` and `actions/deploy-pages`.
4. Tell Samuel to set GitHub repo Settings, Pages, Source: "GitHub Actions".
5. Open a pull request from `rebuild` to `main`, let Samuel review, then merge. Confirm the live site at `https://samuel-mahembe.github.io/portfolio/`.
6. Final report: every file created or modified, and anything left as `TODO(verify)`.
