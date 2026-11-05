---
title: PayFlow
summary: "A simulated, distributed payment platform built to work through the problems that matter in transaction systems: duplicate requests, partial failures, and consistency across services."
status: Portfolio project, runs locally. No real money, cards, or financial credentials are processed.
order: 1
tag: Flagship project
flagship: true
stack:
  - Java 21
  - Spring Boot 3.3
  - Spring Cloud Gateway
  - Kafka
  - PostgreSQL 16
  - Flyway
  - Redis 7
  - Prometheus
  - Grafana
  - Docker
  - Kubernetes (kind)
  - GitHub Actions
  - Testcontainers
links:
  - label: GitHub
    url: https://github.com/samuel-mahembe/Payflow
---

## Problem

How do you guarantee that a duplicate request cannot charge someone twice? How do you keep a payment strongly consistent while the ledger, notifications, and analytics catch up later? What happens when a dependency is slow, down, or returns garbage?

## Approach

Idempotency keys backed by a unique constraint in PostgreSQL, with Redis as a fast path only. A transactional outbox publishes events to Kafka, and every consumer is idempotent because delivery is at-least-once. Failed messages retry, then move to dead-letter topics, so one bad message never blocks a partition. A compensating credit reverses a debit if the destination credit fails.

## Architecture

Seven services behind an API gateway: Payment, Account, Fraud, Ledger, Notification, and Analytics Consumer, plus the gateway itself. Each service that keeps durable data has its own database. Payments are decided in one PostgreSQL transaction, and everything downstream of Kafka is eventually consistent. Six architecture decision records explain the main choices.

## Result

72 passing tests across the seven services. A load test on a single machine ran 200 requests at each concurrency level. All 200 succeeded at 10 concurrent workers, at 11.33 requests per second. At 50 workers, throughput fell to 9.58 requests per second and 78 requests failed, which exposed the connection pool as the limiting factor. End-to-end testing also caught a Spring Retry bug that reported insufficient funds as a service outage, which mocked unit tests had missed.

## Limitations

Not deployed to the cloud. No authentication. Fraud scoring is simulated and rule-based, and `REVIEW` decisions are auto-declined. Kafka topics use a single partition locally. The compensating credit is attempted once, not retried durably. The connection pool bottleneck at 50 concurrent requests is identified but not yet tuned.
