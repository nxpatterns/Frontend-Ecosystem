# OAuth

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Sources](#sources)
  - [Documents](#documents)
  - [Whimsical Online Diagram Editor](#whimsical-online-diagram-editor)
- [v1.0](#v10)
- [v2.0](#v20)
- [v2.1 (In Progress)](#v21-in-progress)
- [v3.0 (Hypothetical)](#v30-hypothetical)
- [Glossar](#glossar)

<!-- /code_chunk_output -->

## Sources

### Documents

- [OAuth v2.0: https://oauth.net/2/](https://oauth.net/2/)
- [OAuth v2.1: https://oauth.net/2.1/](https://oauth.net/2.1/) (Still in Progress)

### Whimsical Online Diagram Editor

- [OAuth v2.0](https://whimsical.com/oauth-2-0-flow-E6nZrsrE7FrhTJEpqGuBXp)
- [OAuth v2.1](https://whimsical.com/oauth-2-1-flow-H971xpurNoQZJQwHHpmgrk)

## v1.0

```mermaid
sequenceDiagram
Client -> Authorization Server: Request Token
Authorization Server -> Client: Provide Token
Client -> Resource Server: Access Protected Resource
Resource Server -> Client: Provide Protected Resource
```

## v2.0

```mermaid
sequenceDiagram
Client -> Authorization Server: Request Authorization
Authorization Server -> Client: Redirect to Authorization Endpoint
Client -> Authorization Server: Provide Credentials
Authorization Server -> Client: Authorization Code
Client -> Authorization Server: Exchange Authorization Code for Access Token
Authorization Server -> Client: Access Token
Client -> Resource Server: Access Protected Resource
Resource Server -> Client: Provide Protected Resource
```

## v2.1 (In Progress)

```mermaid
sequenceDiagram
Client -> Authorization Server: Request Authorization with PKCE
Authorization Server -> Client: Redirect to Authorization Endpoint
Client -> Authorization Server: Provide Credentials and PKCE Code Verifier
Authorization Server -> Client: Authorization Code
Client -> Authorization Server: Exchange Authorization Code and PKCE Code Verifier for Access Token
Authorization Server -> Client: Access Token (JWT)
Client -> Resource Server: Access Protected Resource with Access Token
Resource Server -> Client: Provide Protected Resource
```

## v3.0 (Hypothetical)

```mermaid
sequenceDiagram
Client -> Authorization Server: Request Authorization
Authorization Server -> Client: Redirect to Authorization Endpoint
Client -> Authorization Server: Provide Credentials with MFA
Authorization Server -> Client: Authorization Code
Client -> Authorization Server: Exchange Authorization Code for Access Token
Authorization Server -> Client: Access Token with JWT
Client -> Resource Server: Access Protected Resource
Resource Server -> Client: Provide Protected Resource with Enhanced Security
```

## Glossar

- **PKEC**: Proof Key for Code Exchange
- **MFA**: Multi-Factor Authentication
- **JWT**: JSON Web Token
