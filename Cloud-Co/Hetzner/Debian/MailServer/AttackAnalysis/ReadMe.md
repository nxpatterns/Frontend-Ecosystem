# Mail Server Attack Analysis

## Pattern Analysis (Examples)

1. **158.94.210.39** - Pure PREGREET botnet (~11k attempts over weeks)
2. **91.92.240.6** - PREGREET botnet (~4k attempts)
3. **45.144.212.19** - Spam relay attempts + PREGREET, fake hostname "WIN-4TTI4DH7SGH"
4. **77.83.39.4** - PREGREET botnet (~2.5k attempts)
5. **23.132.164.173** - PREGREET botnet (~2k attempts)

**Why these are NOT security researchers:**

- Security scanners have identifiable hostnames (shodan.io, censys.io, shadowserver.org)
- They DON'T violate SMTP protocol (PREGREET = protocol violation)
- They DON'T attempt spam relay ("Relay access denied")
- These use generic/fake hostnames ("User", "WIN-...")

**Permanent block recommended:**

```bash
    # Block top 5 persistent botnets
    for ip in 158.94.210.39 91.92.240.6 45.144.212.19 77.83.39.4 23.132.164.173; do
      sudo iptables -I DOCKER-USER 1 -s $ip -j DROP
    done

    sudo netfilter-persistent save
```

Other legitimate scanners to NOT block:

- shodan.io
- shadowserver.org
- censys.io
- binaryedge.io
- stretchoid.com (Microsoft Azure scanning)

## Basics

```bash

# Auth attacks
docker logs mailserver 2>&1 | grep "lost connection after AUTH" | grep -oE '\[([0-9]{1,3}\.){3}[0-9]{1,3}\]' | tr -d '[]' | sort | uniq -c | sort -rn

# PREGREET attacks
docker logs mailserver 2>&1 | grep "PREGREET" | grep -oE '\[([0-9]{1,3}\.){3}[0-9]{1,3}\]' | tr -d '[]' | sort | uniq -c | sort -rn

# SSL attacks
docker logs mailserver 2>&1 | grep "SSL_accept" | grep -oE '\[([0-9]{1,3}\.){3}[0-9]{1,3}\]' | tr -d '[]' | sort | uniq -c | sort -rn

# Real-time attack monitoring
docker logs -f mailserver 2>&1 | grep --line-buffered -E "PREGREET|AUTH|SSL_accept|reject|Relay"

# 1. Confirm Docker container IP
docker inspect mailserver | grep IPAddress

# 2. Extract only external IPs (exclude e.g. IP from Docker bridge network & own IPs)
# Daily attack summary (after some time)
docker logs mailserver 2>&1 | grep -E "connect from|CONNECT from|PREGREET|AUTH|reject|Relay" | grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}' | grep -v -E '^172\.|^127\.|^46\.4\.116\.171' | sort | uniq -c | sort -rn

# oder auch (unfortuntalely SSL_accept can also be abused by legit users, so use with caution)
docker logs mailserver 2>&1 | grep -E "connect from|CONNECT from|PREGREET|AUTH|SSL_accept|reject|Relay|improper command|lost connection after|timeout" | grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}' | grep -v -E '^172\.|^127\.|^46\.4\.116\.171' | sort | uniq -c | sort -rn



```

## Permanent Ban

### Show

```bash

# Show active blocks with packet counters
sudo iptables -L DOCKER-USER -n -v | grep DROP | awk '{print $1 " packets blocked from " $8}'

# Show permanent blocks
sudo iptables -L DOCKER-USER -n -v | head -10

# Count total permanent blocks
sudo iptables -L DOCKER-USER -n -v | grep DROP | wc -l
```

### Ban

```bash
# Ban an IP permanently (example IP: 199.45.155.64)
sudo iptables -I DOCKER-USER 1 -s 199.45.155.64 -j DROP

# Save the iptables rules to make them persistent
sudo netfilter-persistent save

# Verify
sudo iptables -L DOCKER-USER -n -v | head -5
```

## Other Checks

```bash
# 1. Check for successfully sent emails (status=sent)
docker logs mailserver 2>&1 | grep "status=sent" | grep -oE 'from=<[^>]+>' | head -20

# 2. Check which IPs actually delivered mail (not rejected)
docker logs mailserver 2>&1 | grep "status=sent" | grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}' | grep -v '^172\.' | sort | uniq -c | sort -rn

# 3. Check for failed login attempts
docker logs mailserver 2>&1 | grep "SASL LOGIN authentication failed" | grep -oE '\[([0-9]{1,3}\.){3}[0-9]{1,3}\]' | tr -d '[]' | sort | uniq -c | sort -rn
```

## Quick reference commands for future

Fail2Ban filters need logpaths like `/var/lib/docker/containers/<container_id>/<container_id>-json.log` to work inside Docker containers. You can detect it via:

```bash
docker inspect mailserver | grep -A 5 "LogPath"
```

After restoring a backup the container ID may change, so make sure to update the Fail2Ban logpath accordingly. The filter configurations are usually in `/etc/fail2ban/jail.local` or `/etc/fail2ban/jail.d/`. In our case in `/etc/fail2ban/jail.local`.

```bash

#Daily security check
sudo iptables -L DOCKER-USER -n -v | grep DROP | awk '{print $1 " packets from " $8}'

# Live attack monitoring
docker logs -f mailserver 2>&1 | grep --line-buffered -E "PREGREET|AUTH|reject|improper"

# New attackers (after some time)
docker logs mailserver 2>&1 | grep -E "connect from|PREGREET|AUTH|reject" | grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}' | grep -v -E '^172\.|^127\.|^46\.4\.116\.171' | sort | uniq -c | sort -rn | head -10

# fail2ban status
sudo fail2ban-client status

# Show fail2ban jails
sudo fail2ban-client status postfix-sasl # Example for postfix-sasl jail
sudo fail2ban-client -d # Show detailed info
cat /etc/fail2ban/jail.local # Show filter configurations
```

## Miscellaneous

```bash

# Check Postfix TLS protocol settings
docker exec -it mailserver postconf | grep -E "tls_(mandatory_)?protocols"

# Set Postfix to disable SSLv2, SSLv3, TLSv1, and TLSv1.1
docker exec -it mailserver postconf -e 'smtp_tls_mandatory_protocols = !SSLv2,!SSLv3,!TLSv1,!TLSv1.1'
docker exec -it mailserver postconf -e 'lmtp_tls_mandatory_protocols = !SSLv2,!SSLv3,!TLSv1,!TLSv1.1'
docker exec -it mailserver postconf -e 'lmtp_tls_protocols = !SSLv2,!SSLv3,!TLSv1,!TLSv1.1'

# Reload Postfix to apply changes
docker exec -it mailserver postfix reload

# Verify changes
docker exec -it mailserver postconf | grep -E "tls_(mandatory_)?protocols"

# Check Postfix connection rate limiting settings
docker exec -it mailserver postconf | grep -E "(anvil_rate|smtpd_client_connection)"

# Set Postfix connection rate limiting (example values)
docker exec -it mailserver postconf -e 'smtpd_client_connection_rate_limit = 10'
docker exec -it mailserver postconf -e 'smtpd_client_connection_count_limit = 20'

# Reload Postfix to apply changes
docker exec -it mailserver postfix reload

# Verify changes
docker exec -it mailserver postconf | grep -E "smtpd_client_connection_(rate|count)_limit"

# Check Dovecot authentication rate limiting settings
docker exec -it mailserver doveconf | grep -E "(mail_max_userip|auth_policy)"

# Check Dovecot authentication logging settings
docker exec -it mailserver doveconf | grep -E "(auth_policy_log_only|auth_failure)"

# Install Fail2Ban if not already installed
sudo apt update && sudo apt install fail2ban -y

# After Installation verify Fail2Ban status
sudo systemctl status fail2ban

# Create custom config:
sudo nano /etc/fail2ban/jail.local

# Paste this content:

    [DEFAULT]
    bantime = 1h
    findtime = 10m
    maxretry = 5

    [sshd]
    enabled = false

# Save: `Ctrl+O`, `Enter`, `Ctrl+X`
# Now start fail2ban:

    sudo systemctl restart fail2ban
    sudo systemctl status fail2ban

# We need to know where Docker stores mailserver logs for fail2ban to read.

docker inspect mailserver | grep -A 5 "LogPath"

# fail2ban needs a filter to detect attack patterns. Create one for the PREGREET attacks we saw:
sudo nano /etc/fail2ban/filter.d/postfix-pregreet.conf

# Paste this content:

[Definition]
failregex = ^.*postfix/postscreen\[\d+\]: PREGREET \d+ after [\d\.]+ from \[<HOST>\]:\d+:
ignoreregex =

# Save: Ctrl+O, Enter, Ctrl+X
# Now test the filter against your actual log:

sudo fail2ban-regex /var/lib/docker/containers/<container-id>/<container-id>-json.log /etc/fail2ban/filter.d/postfix-pregreet.conf

# Watch fail2ban log in real-time:
sudo tail -f /var/log/fail2ban.log

# Check mailserver internal temp directory
docker exec -it mailserver ls -la /tmp/docker-mailserver/

# Check Postfix accounts file
docker exec -it mailserver cat /tmp/docker-mailserver/postfix-accounts.cf

# Update mail server email (example)
docker exec -it mailserver setup email update noreply@example.com

# Check Docker volume mounts for mailserver
docker inspect mailserver | grep -A 50 "Mounts"

# Must backup:
# /opt/mailserver/docker-data/dms/ (emails, config, state)
# /etc/letsencrypt (SSL certs)
# Docker Compose file
# /etc/fail2ban/jail.local + filters

# Locate Docker Compose file
find /opt/mailserver -name "docker-compose.yml" -o -name "compose.yaml" 2>/dev/null
# e.g. /opt/mailserver/docker-compose.yml

# Identify all running services (exclude systemd and user services)
systemctl list-units --type=service --state=running | grep -v "systemd\|user@"

# Before any Backup update system packages
sudo apt update && sudo apt upgrade -y

# This will take a few minutes. After completion, check if kernel was updated:
uname -r
dpkg -l | grep linux-image-amd64 | grep ^ii

# Get DKIM Key
docker exec -it mailserver cat /tmp/docker-mailserver/opendkim/keys/example.com/mail.txt

# Query Current DNS Records
dig +short example.com A
dig +short example.com MX
dig +short example.com TXT
dig +short _dmarc.example.com TXT
dig +short mail._domainkey.example.com TXT

# Check PTR (Reverse DNS)
dig +short -x <your_server_ip>

# Show Postfix data directory
docker exec -it mailserver postconf data_directory
# e.g. data_directory = /var/lib/postfix

# It can be a symlink:
docker exec -it mailserver ls -al /var/lib/postfix
/var/lib/postfix -> /var/mail-state/lib-postfix

# Check Postfix lib-postfix directory contents
docker exec -it mailserver ls -la /var/mail-state/lib-postfix/

# Show White List in Postfix
docker exec -it mailserver strings /var/lib/postfix/postscreen_cache.db | head -50

# Nuclear: Clear entire postscreen cache (resets all, legitimate mail delayed)
docker exec -it mailserver rm /var/lib/postfix/postscreen_cache.db
docker restart mailserver

# Re-Check iptables INPUT rules
sudo iptables -L INPUT -n -v

# If you update filter, you need to restart fail2ban
sudo systemctl restart fail2ban


```
