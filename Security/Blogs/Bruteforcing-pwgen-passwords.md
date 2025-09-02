# Bruteforcing `pwgen` passwords

By Steinar H. Gunderson
Source: <https://blog.sesse.net/blog/tech/2025-08-30-10-56_bruteforcing_pwgen_passwords.html>

## Problem

I received this information from an esteemed colleague. The standard password generator libraries might perhaps not be as secure as assumed.

**Gunderson** claims that `pwgen`'s default "pronounceable" mode appears to offer 47.63 bits of entropy but actually provides only ~38 bits due to phoneme-based construction rules.

The probability distribution is severely skewed; some passwords are millions of times more likely than others. While theoretically requiring 138 billion attempts for 50% crack probability, the actual figure is merely 405 million attempts.

He successfully created a brute-force tool that generates passwords by likelihood order, with real-world cracks occurring after just 400,000 attempts.

His conclusion: `pwgen`'s phoneme-based passwords are unsuitable for anything requiring genuine security.

## Solution
If you want to generate reasonably secure passwords, you should better use:

```bash
# Linux (e.g. Debian)
tr -dc 'A-Za-z0-9@#$%^&*()_+=,;' < /dev/urandom | head -c 32
# macOS
# Set locale to C (treats bytes as raw)
LC_ALL=C tr -dc 'A-Za-z0-9@#$%^&*()_+=,;' < /dev/urandom | head -c 32
```

While you retain full control over character set selection, I've deliberately included commas and semicolons in this configuration as a defensive measure.

Should any system unfortunately resort to plaintext password storage (a practice that represents a fundamental security violation in today's standards) these characters typically function as delimiters or control characters in databases and CSV formats. This inclusion helps prevent potential parsing conflicts that could compromise password integrity in such poorly-designed systems.

## Conclusion
As a matter of prudent security practice, password generators should be regarded with healthy skepticism unless you possess clear understanding of their underlying mechanisms and implementation details. Trust, but verify!
