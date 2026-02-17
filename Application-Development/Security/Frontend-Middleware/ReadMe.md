# Security Checklist

> Under construction & no claim to completeness

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Cross-site scripting (XSS)](#cross-site-scripting-xss)
- [Content Security Policy (CSP) - Frontend & Middleware](#content-security-policy-csp-frontend-middleware)
  - [Threats](#threats)
    - [Mitigating cross site scripting](#mitigating-cross-site-scripting)
    - [Mitigating packet sniffing attacks](#mitigating-packet-sniffing-attacks)
- [Cross Site Scripting (XSS) - Frontend](#cross-site-scripting-xss-frontend)
  - [Prevention](#prevention)
- [X-DNS-Prefetch-Control - Frontend & Middleware](#x-dns-prefetch-control-frontend-middleware)
  - [Turning on and off prefetching](#turning-on-and-off-prefetching)
- [The Expect-CT header - Middleware](#the-expect-ct-header-middleware)
- [Frameguard - X-Frame-Options - Middleware](#frameguard-x-frame-options-middleware)
- [HTTP Strict Transport Security (HSTS) - Frontend & Middleware](#http-strict-transport-security-hsts-frontend-middleware)
- [ieNoOpen - Internet Explorer, restrict untrusted HTML](#ienoopen-internet-explorer-restrict-untrusted-html)
- [What is `X-Content-Type-Options=nosniff`?](#what-is-x-content-type-optionsnosniff)
- [The Referrer-Policy HTTP header](#the-referrer-policy-http-header)
- [XSS Filter Evasion Cheat Sheet](#xss-filter-evasion-cheat-sheet)

<!-- /code_chunk_output -->

## Cross-site scripting (XSS)

is a type of security vulnerability typically found in web applications. XSS attacks enable attackers to inject client-side scripts into web pages viewed by other users. A cross-site scripting vulnerability may be used by attackers to bypass access controls such as the same-origin policy. Cross-site scripting carried out on websites accounted for roughly 84% of all security vulnerabilities documented by Symantec up until 2007. In 2017, XSS attacks were still considered a major threat vector. XSS effects vary in range from petty nuisance to significant security risk, depending on the sensitivity of the data handled by the vulnerable site and the nature of any security mitigation implemented by the site's owner network.

## Content Security Policy (CSP) - Frontend & Middleware

is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement to distribution of malware.

If the site doesn't offer the CSP header, browsers likewise use the standard same-origin policy.

To enable CSP, you need to configure your web server to return the Content-Security-Policy HTTP header. (Sometimes you may see mentions of the X-Content-Security-Policy header, but that's an older version and you don't need to specify it anymore.)

Alternatively, the `<meta>` element can be used to configure a policy, for example:

`<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">`

### Threats

#### Mitigating cross site scripting

A primary goal of CSP is to mitigate and report XSS attacks. XSS attacks exploit the browser's trust of the content received from the server. Malicious scripts are executed by the victim's browser because the browser trusts the source of the content, even when it's not coming from where it seems to be coming from.

CSP makes it possible for server administrators to reduce or eliminate the vectors by which XSS can occur by specifying the domains that the browser should consider to be valid sources of executable scripts. A CSP compatible browser will then only execute scripts loaded in source files received from those allowlisted domains, ignoring all other script (including inline scripts and event-handling HTML attributes).

As an ultimate form of protection, sites that want to never allow scripts to be executed can opt to globally disallow script execution.

#### Mitigating packet sniffing attacks

In addition to restricting the domains from which content can be loaded, the server can specify which protocols are allowed to be used; for example (and ideally, from a security standpoint), a server can specify that all content must be loaded using HTTPS. A complete data transmission security strategy includes not only enforcing HTTPS for data transfer, but also marking all cookies with the secure attribute and providing automatic redirects from HTTP pages to their HTTPS counterparts. Sites may also use the Strict-Transport-Security HTTP header to ensure that browsers connect to them only over an encrypted channel.

## Cross Site Scripting (XSS) - Frontend

Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious scripts are injected into otherwise benign and trusted websites.

> [Details here](https://owasp.org/www-community/attacks/xss/)

### Prevention

> [Checklist](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

## X-DNS-Prefetch-Control - Frontend & Middleware

The X-DNS-Prefetch-Control HTTP response header controls DNS prefetching, a feature by which browsers proactively perform domain name resolution on both links that the user may choose to follow as well as URLs for items referenced by the document, including images, CSS, JavaScript, and so forth.

This prefetching is performed in the background, so that the DNS is likely to have been resolved by the time the referenced items are needed. This reduces latency when the user clicks a link.

### Turning on and off prefetching

You can either send the X-DNS-Prefetch-Control header server-side, or from individual documents, using the http-equiv attribute on the `<meta>` element, like this: `<meta http-equiv="x-dns-prefetch-control" content="off">`. You can reverse this setting by setting content to "on".

Similarly, the link element can be used to resolve hostnames without providing a complete URL, but only, by preceding the hostname with two slashes:

`<link rel="dns-prefetch" href="//www.mozilla.org/contribute/">`

Forced prefetching of hostnames might be useful, for example, on the homepage of a site to force pre-resolution of domain names that are referenced frequently throughout the site even though they are not used on the home page itself. This will improve the overall performance of site even though the performance of the home page may not be affected.

## The Expect-CT header - Middleware

The Expect-CT header lets sites opt in to reporting and/or enforcement of Certificate Transparency requirements, to prevent the use of misissued certificates for that site from going unnoticed.

## Frameguard - X-Frame-Options - Middleware

`Clickjacking` is an ingenious technique for hiding an invisible `<iframe>` containing malicious code, but positioned on top of a thing that looks enticing to click on. The user would then be enticed into clicking on the malicious button. The frameguard module for Helmet will set a header instructing the browser on how to treat an `<iframe>`. For documentation, see https://helmetjs.github.io/docs/frameguard/.

`app.use(helmet.frameguard({ action: 'deny' }));`

This setting denies all such `<iframe>` content.

## HTTP Strict Transport Security (HSTS) - Frontend & Middleware

is a web security policy mechanism that helps to protect websites against man-in-the-middle attacks such as protocol downgrade attacks and cookie hijacking. It allows web servers to declare that web browsers (or other complying user agents) should automatically interact with it using only HTTPS connections, which provide Transport Layer Security (TLS/SSL), unlike the insecure HTTP used alone. HSTS is an IETF standards track protocol and is specified in RFC 6797.

## ieNoOpen - Internet Explorer, restrict untrusted HTML

Just set `X-Download-Options` header to `noopen`. Some web applications will serve untrusted HTML for download. By default, some versions of IE will allow you to open those HTML files in the context of your site, which means that an untrusted HTML page could start doing bad things in the context of your pages.

## What is `X-Content-Type-Options=nosniff`?

`<meta content="text/html; charset=UTF-8; X-Content-Type-Options=nosniff" http-equiv="Content-Type" />`

It prevents the browser from doing MIME-type sniffing. Most browsers are now respecting this header, including Chrome/Chromium, Edge, IE >= 8.0, Firefox >= 50 and Opera >= 13. See :

https://blogs.msdn.com/b/ie/archive/2008/09/02/ie8-security-part-vi-beta-2-update.aspx?Redirected=true

https://stackoverflow.com/questions/18337630/what-is-x-content-type-options-nosniff

## The Referrer-Policy HTTP header

The Referrer-Policy HTTP header controls how much referrer information (sent via the Referer header) should be included with requests.

The original header name `Referer` is a misspelling of the word "referrer". The Referrer-Policy header does not share this misspelling.

```http
Referrer-Policy: no-referrer
Referrer-Policy: no-referrer-when-downgrade
Referrer-Policy: origin
Referrer-Policy: origin-when-cross-origin
Referrer-Policy: same-origin
Referrer-Policy: strict-origin
Referrer-Policy: strict-origin-when-cross-origin
Referrer-Policy: unsafe-url
```

## XSS Filter Evasion Cheat Sheet

https://owasp.org/www-community/xss-filter-evasion-cheatsheet
