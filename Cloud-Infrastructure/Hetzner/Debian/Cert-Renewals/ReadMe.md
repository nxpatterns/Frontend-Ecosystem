# Cert Renewals

## Quick Renew Command

This will delete the existing certificate and create a new one using Certbot with the Apache plugin for the specified domain.

```bash
# e.g. git.takemarco.trybox.eu
certbot delete --cert-name git.takemarco.trybox.eu
certbot --apache -d git.takemarco.trybox.eu
```

## Details

### Re-Check System Overview

Replace placeholder with your domain:

```plaintext
Domain: sub.example.com
Setup: GitLab in Docker (port 8090) → Apache reverse proxy (host)
Cert Location: /etc/letsencrypt/live/sub.example.com/
```

### Pre-Renewal Check

```bash
# 1. Check memory (needs >4GB free)
free -h

# 2. Check if GitLab is healthy
docker ps | grep gitlab
# Wait for "(healthy)" status, not "(health: starting)"

# 3. Kill stuck pnpm/node processes if memory is low
ps aux --sort=-%mem | head -20
pkill -9 pnpm && pkill -9 node  # if necessary

# 4. Ensure swap exists (8GB minimum)
swapon --show

# If missing:
fallocate -l 8G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

### Common Issues

- **"manual plugin not working"** → Old cert used --manual, must delete first
- **GitLab crash-looping** → Out of memory, kill pnpm processes + add swap
- **Memory exhausted** → Target: >4GB free before renewal
- **Port 80/443 in use** → Stop conflicting services (e.g., GitLab omnibus)

### Verification

```bash
certbot certificates
systemctl status apache2
curl -I https://sub.example.com
```
