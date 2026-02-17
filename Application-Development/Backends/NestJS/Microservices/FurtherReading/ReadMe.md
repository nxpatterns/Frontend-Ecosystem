# Further Reading

NestJS Documentation - [Microservices](https://docs.nestjs.com/microservices/basics)

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Custom transporters](#custom-transporters)
- [NATS](#nats)
- [MQTT](#mqtt)
- [AMQP](#amqp)
- [RabbitMQ](#rabbitmq)
- [Kafka](#kafka)
- [Redis](#redis)
- [WebSockets](#websockets)
- [gRPC](#grpc)
- [GraphQL](#graphql)

<!-- /code_chunk_output -->


## Custom transporters

- [Custom Transporters](https://docs.nestjs.com/microservices/custom-transport)

Nest provides a variety of **transporters** out-of-the-box, as well as an API allowing developers to build new custom transport strategies. Transporters enable you to connect components over a network using a pluggable communications layer and a very simple application-level message protocol (read full [article](https://dev.to/nestjs/integrate-nestjs-with-external-services-using-microservice-transporters-part-1-p3)).

> **Hint** Building a microservice with Nest does not necessarily mean you must use the `@nestjs/microservices` package. For example, if you want to communicate with external services (let's say other microservices written in different languages), you may not need all the features provided by `@nestjs/microservice` library. In fact, if you don't need decorators (`@EventPattern` or `@MessagePattern`) that let you declaratively define subscribers, running a [Standalone Application](https://docs.nestjs.com/application-context) and manually maintaining connection/subscribing to channels should be enough for most use-cases and will provide you with more flexibility.

With a custom transporter, you can integrate any messaging system/protocol (including Google Cloud Pub/Sub, Amazon Kinesis, and others) or extend the existing one, adding extra features on top (for example, [QoS](https://github.com/mqttjs/MQTT.js/blob/master/README.md#qos) for MQTT).

> **Hint** To better understand how Nest microservices work and how you can extend the capabilities of existing transporters, we recommend reading the [NestJS Microservices in Action](https://dev.to/johnbiundo/series/4724) and [Advanced NestJS Microservices](https://dev.to/nestjs/part-1-introduction-and-setup-1a2l) article series.

## NATS

- [NATS](https://nats.io/)
- [NATS Streaming](https://docs.nats.io/nats-streaming-concepts/intro)

## MQTT

- [MQTT](https://mqtt.org/)
- [MQTT Tutorials](https://mqtt.org/getting-started/)

## AMQP

- [AMQP](https://www.amqp.org/)
- [AMQP Tutorials](https://www.rabbitmq.com/tutorials/amqp-concepts.html)

## RabbitMQ

- [RabbitMQ](https://www.rabbitmq.com/)
- [RabbitMQ Tutorials](https://www.rabbitmq.com/getstarted.html)

## Kafka

- [Kafka](https://kafka.apache.org/)
- [Kafka Tutorials](https://kafka.apache.org/quickstart)
- [KafkaJS](https://kafka.js.org/)

## Redis

- [Redis](https://redis.io/)
- [Redis Tutorials](https://redis.io/topics/quickstart)

## WebSockets

- [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Socket.IO](https://socket.io/)
- [Socket.IO Client](https://socket.io/docs/v3/client-api/index.html)
- [Socket.IO Server](https://socket.io/docs/v3/server-api/index.html)
- [Socket.IO Redis Adapter](https://socket.io/docs/v3/using-multiple-nodes/index.html)

## gRPC

- [gRPC](https://grpc.io/)
- [gRPC Tutorials](https://grpc.io/docs/languages/node/basics/)

## GraphQL

- [GraphQL](https://graphql.org/)
- [GraphQL Tutorials](https://graphql.org/learn/)
- [GraphQL Code Generator](https://graphql-code-generator.com/)
- [GraphQL Code Generator Plugins](https://graphql-code-generator.com/docs/plugins/index)
- [GraphQL Code Generator Plugins - NestJS](https://graphql-code-generator.com/docs/plugins/nestjs)
- [GraphQL Code Generator Plugins - TypeScript](https://graphql-code-generator.com/docs/plugins/typescript)
- [GraphQL Code Generator Plugins - TypeScript Apollo Angular](https://graphql-code-generator.com/docs/plugins/typescript-apollo-angular)
