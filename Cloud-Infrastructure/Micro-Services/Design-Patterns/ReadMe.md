# Micro-Services Design-Patterns

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Micro-Services Design-Patterns](#micro-services-design-patterns)
  - [Overview](#overview)
    - [Database Per Service](#database-per-service)
    - [Saga Pattern](#saga-pattern)
    - [API Gateway](#api-gateway)
    - [Aggregator Pattern](#aggregator-pattern)
      - [Java Design Patterns](#java-design-patterns)
      - [Azure Architecture Center | Microsoft Learn](#azure-architecture-center--microsoft-learn)
      - [DZone](#dzone)
      - [OpenReplay Blog](#openreplay-blog)
    - [Circuit Breaker](#circuit-breaker)
    - [CQRS (Command Query Responsibility Segregation)](#cqrs-command-query-responsibility-segregation)
    - [Asynchronous Messaging](#asynchronous-messaging)
    - [Event Sourcing](#event-sourcing)
    - [Strangler Pattern](#strangler-pattern)
    - [Decomposition Patterns](#decomposition-patterns)

<!-- /code_chunk_output -->

## Overview

### Database Per Service

Each service has its own database, improving scalability and reducing coupling. More details can be found at [Microservices.io](https://microservices.io/patterns/data/database-per-service.html) and [AWS Prescriptive Guidance](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/database-per-service.html).

### Saga Pattern

Manages data consistency across distributed transactions via a series of local transactions. Learn more at [Microservices.io - Saga](https://microservices.io/patterns/data/saga.html).

### API Gateway

Provides a single entry point for multiple microservices, simplifying client interactions. Information available at [Microservices.io - API Gateway](https://microservices.io/patterns/apigateway.html).

### Aggregator Pattern

Gathers data from various services to return a unified response.

#### Java Design Patterns

Provides a comprehensive guide to the Aggregator Microservices Pattern, explaining its intent, applicability, and consequences. It includes a real-world example of a web marketplace needing product and inventory information, demonstrating how an aggregator service can streamline client interactions with system microservices by providing a single aggregation point. This resource is particularly useful for understanding the pattern's implementation in Java. Visit [Java Design Patterns](https://java-design-patterns.com/patterns/aggregator-microservices/) for more details.

#### Azure Architecture Center | Microsoft Learn

Offers a catalog of design patterns for microservices, addressing challenges and enhancing application release velocity through decomposition into small autonomous services. While it doesn't provide a direct link to the Aggregator pattern, it offers a wealth of related patterns that can be used in conjunction with or as alternatives to the Aggregator pattern. Learn more at [Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/microservices/design/patterns).

#### DZone

Explores the implementation of an aggregator service using AWS Lambda. It covers the architecture, performance considerations, and a detailed example of a ticketing application. This article is beneficial for understanding how to implement aggregator services in a serverless architecture. For detailed implementation, see [DZone](https://dzone.com/articles/microservices-aggregator-design-pattern-using-aws).

#### OpenReplay Blog

Discusses common architecture patterns for microservices, including the Aggregator pattern. This pattern is highlighted for its ability to reduce the number of requests made by the client, thereby improving performance. The blog provides a scenario where the Aggregator pattern is particularly useful, like in e-commerce websites needing to show consolidated product information from various suppliers. Read more at [OpenReplay Blog](https://blog.openreplay.com/architecture-patterns-for-microservices).

### Circuit Breaker

Prevents failure in one service from cascading to others by monitoring for failures and redirecting traffic. More at [Martin Fowler - Circuit Breaker](https://martinfowler.com/bliki/CircuitBreaker.html).

### CQRS (Command Query Responsibility Segregation)

Separates read and write operations for improved performance and scalability. Learn more at [Microsoft - CQRS](https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs).

### Asynchronous Messaging

Enables services to communicate without waiting for responses, enhancing responsiveness. Details can be found at [AWS - Asynchronous Messaging](https://aws.amazon.com/messaging/).

### Event Sourcing

Tracks changes in application state as a sequence of events, facilitating state reconstruction. More information at [Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html).

### Strangler Pattern

Gradually replaces parts of a monolithic application with microservices. Learn more at [Martin Fowler - StranglerFigApplication](https://martinfowler.com/bliki/StranglerFigApplication.html).

### Decomposition Patterns

Breaks down a monolith into microservices based on business capabilities, subdomains, or transactions. More details at [Microservices.io - Decomposition](https://microservices.io/patterns/decomposition/decompose-by-business-capability.html).
