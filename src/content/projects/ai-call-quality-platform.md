---
# TODO(verify): status, problem, approach, result, limitations, and whether this is the
# Econet call-center work that can be shown publicly. See question 8 in the content file.
# Held off the site by draft: true until answered.
title: AI-Powered Call Quality Platform
summary: A call recording and analysis app with real-time transcription and summarization.
status: To be confirmed
order: 3
draft: true
stack:
  - Python
  - FastAPI
  - Angular 19
  - MongoDB
  - OpenAI APIs
  - nginx
  - Docker
links:
  - label: GitHub
    url: https://github.com/samuel-mahembe/ai-powered-call-recorder-app
---

## Architecture

An Angular frontend served by nginx, which proxies API calls to a FastAPI backend. Call records and summaries are stored in MongoDB, and everything runs in Docker.
