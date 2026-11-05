---
title: DeepRead
summary: A RAG app that lets people bring their own knowledge base from web pages or uploaded documents, then ask questions and get answers that cite their sources.
status: Public on GitHub, runs locally or with Docker.
order: 2
stack:
  - Python
  - LangChain text splitters
  - ChromaDB
  - all-MiniLM-L6-v2 embeddings
  - Groq (openai/gpt-oss-120b)
  - Streamlit
  - Docker
  - pytest
links:
  - label: GitHub
    url: https://github.com/samuel-mahembe/deepread
---

## Problem

A regular LLM call answers from its training data, so it makes things up when asked about specific documents it has never seen.

## Approach

Retrieve the relevant passages from the user's own sources and put them in the prompt, so the answer is grounded and every claim can be checked against an excerpt. Each user gets a private, session-scoped index. Zero-cost by design: embeddings run locally and generation uses Groq's free tier.

## Architecture

Two phases. Ingestion scrapes or parses a source, cleans it, splits it into 500-character chunks with 50 characters of overlap, embeds them, and stores them in ChromaDB. Querying embeds the question, runs a vector search, and sends the top passages to the LLM. Optional cross-encoder reranking is off by default.

## Result

A working end-to-end pipeline that accepts URLs and PDF, DOCX, TXT, and MD files, with an offline test suite, SSRF guards on URL fetching, and file size limits.

## Limitations

Some sites return 403 on scraping, and the app reports this clearly instead of failing silently. Pages that need JavaScript to render are not supported. Version 2 plans Playwright and a Next.js frontend.
