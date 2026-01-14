# Mail Server Attack Analysis

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

# 2. Extract only external IPs (exclude e.g. IP from Docker bridge network)

# Daily attack summary (after some time)
docker logs mailserver 2>&1 | grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}' | grep -v -E '^172\.|^127\.|^46\.4\.116\.171' | sort | uniq -c | sort -rn | head -20
```

## Permanent Ban

### Show

```bash
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
