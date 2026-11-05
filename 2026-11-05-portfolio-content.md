# Portfolio Content

Status: approved by Samuel on 2026-11-05 to start the build. Open questions in Part 1 and anything marked `TODO(verify)` stay off the site until resolved.

How to read this file:

- Part 1 lists what Samuel needs to answer.
- Part 2 is the website copy.
- Lines starting with "Note:" are for review and never go on the site.
- Nothing marked `TODO(verify)` gets published until it is resolved or removed.

---

# Part 1: Questions for Samuel

## Decisions

1. **Hero headline.** Using the plan draft for now. Samuel can change it at any time.
2. **Writing section.** All three old articles link to `#`, so nothing shows they were published. Part 2 omits this section unless you send real links for the articles or a DeepRead LinkedIn post.
3. **Skills.** Are you happy to list Kafka and Redis, based on PayFlow? They are marked as proposed in Part 2.
4. **TelOne Digital Shop.** The old site lists this recharge and voucher platform, but the plan does not. Should it stay in?
5. **New items from your resume.** I added the SAP data pipelines, the microservices work, and Code for Boston to 03 Experience, reworded and without metrics. Keep or cut each one.

## Facts to confirm

6. **Voucher Management System.** The plan places this work at TelOne, and your resume places it at Econet. Which is correct?
7. **Hult MSc.** The end date of Aug 2026 has passed. Is the degree complete?
8. **CallSight.** Is this the Econet call-center work, or a separate client project? The old site calls it a "Client Project" and the name "CallSight" only appears in an image filename. If it was employer or client work, are you allowed to show it publicly? What problem did it solve, and what was the result?
9. **Churn project and ML.** The old site tags it "ML" and the repo description mentions machine learning. The repo holds only data cleaning and EDA notebooks, with no README and no model notebook. Did you build a model, and where is it? What were the key findings?
10. **Resume PDF.** `Samuel_Mahembe.pdf` includes your phone number. Please provide a copy without it to publish on the site, or confirm you are happy for the number to be public.

## Settled

- Econet volume: millions of transactions per day. Samuel will update his resume, which currently says thousands.
- No stats row. The site does not mirror the resume, so it carries no percentage claims. This replaces the stats row in plan Phase 4 and the count-up in plan Phase 5.
- TelOne stays on the site, although the resume omits it.
- Job titles: Software Engineer at Econet, Junior Software Engineer at TelOne.
- University of Zimbabwe: Feb 2018 to Feb 2022, per the resume.
- Flagship: PayFlow. Real-time Payment Fraud Detection is listed as upcoming.
- DeepRead: GitHub repo only, with no live demo link, using the model in the repo's settings.
- Certifications: as listed on the old site.

---

# Part 2: Website copy

## Site metadata

- Page title: Samuel Mahembe, Software Engineer
- Meta description: Software engineer building data and transaction systems. Open to full-time Software Engineering and Data Engineering roles.

## Nav

- Wordmark: Samuel Mahembe
- Links: About, Work, Experience, Skills, Lab, Contact
- Action: Resume `TODO(verify: public copy of the PDF, see question 10)`

## Hero

**Headline:** I build systems that move money and data reliably.

Note: alternatives if Samuel wants to swap. Reliable systems for high-volume money and data. Transaction systems that hold up. Data you can trust. From transaction systems to data platforms, built for production.

**Role line:** Software Engineer, Data and Transaction Systems

**Location:** Greater Boston

**Intro:** Software engineer with 3+ years building enterprise platforms that handle high-volume transactional and operational data across telecommunications, payments, and internal business operations. Now focused on data engineering: pipelines, data models, and cloud data platforms. MSc Business Analytics at Hult International Business School. `TODO(verify: degree status)`

**Buttons:** View work, Resume PDF

## 01 About

I started out building enterprise applications at TelOne Zimbabwe, then spent three years at Econet Wireless Zimbabwe working across backend, frontend, APIs, databases, and mobile. Much of that work sat close to revenue: recharge platforms, voucher systems, and the transaction data behind them.

Supporting dashboards and data models at Econet showed me how much depends on the data underneath. That is the direction I am moving in now: pipelines, data models, and cloud data platforms, built with the same care for reliability as a payment system.

I recently studied for an MSc in Business Analytics at Hult International Business School in Boston. `TODO(verify: degree status and wording)`

**Availability:** Open to full-time Software Engineering and Data Engineering roles.

Note: the first two paragraphs are my own framing of the facts in the plan. Please check that they sound like you and are true.

## 02 Selected Work

Note: every case study below has the same fields: problem, approach, architecture, stack, result, limitations, links.

### PayFlow (flagship)

Summary: A simulated, distributed payment platform built to work through the problems that matter in transaction systems: duplicate requests, partial failures, and consistency across services.

- **Status:** Portfolio project, runs locally. No real money, cards, or financial credentials are processed.
- **Problem:** How do you guarantee that a duplicate request cannot charge someone twice? How do you keep a payment strongly consistent while the ledger, notifications, and analytics catch up later? What happens when a dependency is slow, down, or returns garbage?
- **Approach:** Idempotency keys backed by a unique constraint in PostgreSQL, with Redis as a fast path only. A transactional outbox publishes events to Kafka, and every consumer is idempotent because delivery is at-least-once. Failed messages retry, then move to dead-letter topics, so one bad message never blocks a partition. A compensating credit reverses a debit if the destination credit fails.
- **Architecture:** Seven services behind an API gateway: Payment, Account, Fraud, Ledger, Notification, and Analytics Consumer, plus the gateway itself. Each service that keeps durable data has its own database. Payments are decided in one PostgreSQL transaction, and everything downstream of Kafka is eventually consistent. Six architecture decision records explain the main choices.
- **Stack:** Java 21, Spring Boot 3.3, Spring Cloud Gateway, Kafka, PostgreSQL 16, Flyway, Redis 7, Prometheus, Grafana, Docker, Kubernetes (kind), GitHub Actions, Testcontainers.
- **Result:** 72 passing tests across the seven services. A load test on a single machine ran 200 requests at each concurrency level. All 200 succeeded at 10 concurrent workers, at 11.33 requests per second. At 50 workers, throughput fell to 9.58 requests per second and 78 requests failed, which exposed the connection pool as the limiting factor. End-to-end testing also caught a Spring Retry bug that reported insufficient funds as a service outage, which mocked unit tests had missed.
- **Limitations:** Not deployed to the cloud. No authentication. Fraud scoring is simulated and rule-based, and `REVIEW` decisions are auto-declined. Kafka topics use a single partition locally. The compensating credit is attempted once, not retried durably. The connection pool bottleneck at 50 concurrent requests is identified but not yet tuned.
- **Links:** [GitHub](https://github.com/samuel-mahembe/Payflow)

Note: drafted from the repo's README and docs. Please confirm you can explain all of it in an interview.

### DeepRead

Summary: A RAG app that lets people bring their own knowledge base from web pages or uploaded documents, then ask questions and get answers that cite their sources.

- **Status:** Public on GitHub, runs locally or with Docker.
- **Problem:** A regular LLM call answers from its training data, so it makes things up when asked about specific documents it has never seen.
- **Approach:** Retrieve the relevant passages from the user's own sources and put them in the prompt, so the answer is grounded and every claim can be checked against an excerpt. Each user gets a private, session-scoped index. Zero-cost by design: embeddings run locally and generation uses Groq's free tier.
- **Architecture:** Two phases. Ingestion scrapes or parses a source, cleans it, splits it into 500-character chunks with 50 characters of overlap, embeds them, and stores them in ChromaDB. Querying embeds the question, runs a vector search, and sends the top passages to the LLM. Optional cross-encoder reranking is off by default.
- **Stack:** Python, LangChain text splitters, ChromaDB, `all-MiniLM-L6-v2` embeddings, Groq (`openai/gpt-oss-120b`), Streamlit, Docker, pytest.
- **Result:** A working end-to-end pipeline that accepts URLs and PDF, DOCX, TXT, and MD files, with an offline test suite, SSRF guards on URL fetching, and file size limits.
- **Limitations:** Some sites return 403 on scraping, and the app reports this clearly instead of failing silently. Pages that need JavaScript to render are not supported. Version 2 plans Playwright and a Next.js frontend.
- **Links:** [GitHub](https://github.com/samuel-mahembe/deepread)

### AI-Powered Call Quality Platform (see question 8)

Summary: A call recording and analysis app with real-time transcription and summarization.

- **Status:** `TODO(verify)`
- **Problem:** `TODO(verify: and whether this is the Econet call-center work)`
- **Approach:** `TODO(verify)`
- **Architecture:** An Angular frontend served by nginx, which proxies API calls to a FastAPI backend. Call records and summaries are stored in MongoDB, and everything runs in Docker.
- **Stack:** Python, FastAPI, Angular 19, MongoDB, OpenAI APIs, nginx, Docker.
- **Result:** `TODO(verify)`
- **Limitations:** `TODO(verify)`
- **Links:** [GitHub](https://github.com/samuel-mahembe/ai-powered-call-recorder-app)

### Customer Churn Analytics Dashboard (academic, see question 9)

Summary: A telecom churn analysis and Tableau dashboard that shows what drives customers to leave.

- **Status:** Academic project `TODO(verify)`
- **Problem:** Identify high-risk telecom customers and explain the main churn drivers, to support retention decisions.
- **Approach:** Clean the raw customer data, explore it for business insights in Python notebooks, then present the drivers in an interactive Tableau dashboard.
- **Architecture:** Not applicable, this is an analysis project.
- **Stack:** Python, Jupyter, Tableau. `TODO(verify: machine learning)`
- **Result:** `TODO(verify: key findings)`
- **Limitations:** `TODO(verify)`
- **Links:** [Tableau dashboard](https://public.tableau.com/views/ChurnDashboard_17678081653080/ChurnDrivers), [GitHub](https://github.com/samuel-mahembe/telco-churn-analytics)

### Real-time Payment Fraud Detection (upcoming)

Summary: An upcoming real-time fraud detection system for payment transactions.

- **Status:** Upcoming
- **Planned stack:** Java/Spring Boot, Kafka, Python ML scoring, LLM explanation layer, Redis, PostgreSQL, monitoring.

Note: this is a short card with no detail page until there is work to link to. It is the one project without the full set of case study fields.

### Dropped from the old site

3D Helmet Design, plus the generic "Machine Learning Model", "Data Pipeline Automation", and "Advanced Analytics System" cards, unless you provide real details.

## 03 Experience

### Econet Wireless Zimbabwe

Software Engineer
Aug 2022 to Aug 2025, Harare

- Built and supported enterprise platforms processing millions of transactions per day, across revenue and internal operations.
- Decomposed a monolithic payment platform into microservices and reworked its transaction-processing logic.
- Built transactional data pipelines that bring SAP platform data into the daily corporate financial data store.
- Delivered end-to-end solutions across backend, frontend, APIs, databases, and mobile, turning business requirements into production applications and integrations.
- Improved release reliability and team efficiency through GitLab CI/CD automation.
- Supported analytics platforms, dashboards, and data models that improved visibility into workforce, revenue, and operational performance.
- Built an AI-driven call-center optimization solution that reduced customer waiting times.

**Platforms:**

- Electronic Recharge Platform: agent airtime purchasing with automated transactions and reporting.
- YoGames Hub: customer gaming platform with leaderboards and engagement features.
- VanSales: offline-first dealer app for selling Econet products and services in remote regions.
- Online Interviews Platform: candidate onboarding and hiring workflow with application status tracking.

**Tech:** Java, Python, SQL, Angular, React, REST APIs, Microservices, GitLab CI/CD, Docker, SOAP, Android, USSD.

### TelOne Zimbabwe

Junior Software Engineer
Mar 2020 to Feb 2021, Harare

- Improved the candidate experience on a Careers Platform built with C# and Angular, with application status tracking.
- Enhanced the Voucher Management System and transaction monitoring. `TODO(verify: employer, see question 6)`
- Analyzed payment and voucher transaction data to identify volume, adoption, and revenue trends.

**Tech:** C#, Angular, SQL, Agile/Scrum, Git.

### Code for Boston

Software Engineer Assistant, Open Source (volunteer)
Aug 2026 to Present, Boston

- Built a Python pipeline that collects and transforms incident-case data from web sources for the National Police Data Coalition project.
- Improved search-query logic for the Boston Circular Economy project, to make results in its map-based search more relevant.

Note: this order puts volunteer work after the paid roles. It can move to the top, since it is current.

## 04 Skills, Education, Certifications

### Skills

- **Languages:** Java, Python, SQL, JavaScript/TypeScript, C#
- **Backend and APIs:** Spring Boot, REST, Microservices, SOAP, FastAPI
- **Data:** Data modeling, ETL/ELT, Data warehousing, BigQuery, Pandas, Tableau, Power BI, PostgreSQL
- **Cloud and DevOps:** AWS, GCP, Docker, Kubernetes, GitLab CI/CD
- **Frontend:** Angular, React
- **Proposed additions from PayFlow:** Kafka, Redis `TODO(verify)`

### Education

- MSc Business Analytics, Data Science. Hult International Business School, Boston. Sep 2025 to Aug 2026. `TODO(verify: completed)`
- Bachelor of Business Studies and Computer Science. University of Zimbabwe. Feb 2018 to Feb 2022.

### Certifications

- AWS Certified Cloud Practitioner, Amazon Web Services
- OCP: Java SE 17 Developer, Oracle
- Data Visualization and Communication with Tableau, Duke University

Note: this matches the three certifications shown on the old site.

## Writing

Omitted unless real links are provided. See question 2.

## 05 Contact

**Heading:** Get in touch

**Text:** I am open to full-time Software Engineering and Data Engineering roles. Email is the best way to reach me.

- Email: samuelmahembe3@gmail.com
- LinkedIn: https://www.linkedin.com/in/samuel-mahembe
- GitHub: https://github.com/samuel-mahembe

**Footer:** Samuel Mahembe, Greater Boston

## 06 Lab

**Heading:** Payment stream simulator

**Label:** Simulated. All transactions are fake and generated in your browser.

**Intro:** A live feed of made-up payment transactions. Each one gets a risk score from a simple rules and logistic-style function, and flagged transactions show the reason.

**Flag reasons:** velocity spike, unusual amount, new device

**Controls:** Pause, Speed, Fraud rate

**How it works:** This demo scores transactions in your browser and is not a production model. For how I approach real payment systems, see the PayFlow case study.

Note: the plan orders the sections with Lab as 06 and Contact as 05. It may read better with Contact last. I can settle this in Phase 6.

## 404 page

**Heading:** Page not found

**Text:** This page does not exist or has moved.

**Link:** Back to home
