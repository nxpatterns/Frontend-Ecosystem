# Hetzner Debian Setup (DEV Server)

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=true} -->

<!-- code_chunk_output -->

1. [Prerequisites](#prerequisites)
    1. [Generate a SSH Key (ed25519)](#generate-a-ssh-key-ed25519)
        1. [Quantum Security (ToDo)](#quantum-security-todo)
2. [Initial Setup](#initial-setup)
    1. [SSH Setup](#ssh-setup)
        1. [Verify](#verify)
    2. [Create New Sudo User](#create-new-sudo-user)
        1. [Verify](#verify-1)
    3. [Update & Upgrade](#update--upgrade)
    4. [Manage Initial Host Name](#manage-initial-host-name)
        1. [Verification](#verification)
    5. [Small Bash Improvements](#small-bash-improvements)
3. [Install ISPConfig](#install-ispconfig)
4. [Secure Standard Server Domain](#secure-standard-server-domain)
    1. [Install Certbox](#install-certbox)
    2. [Add SSL Certificate](#add-ssl-certificate)
    3. [Enable SSL & Restart Apache](#enable-ssl--restart-apache)
    4. [Verification](#verification-1)
5. [Install Docker (Secure with Key Check)](#install-docker-secure-with-key-check)
6. [Install GitLab & GitLab Runner (via Docker)](#install-gitlab--gitlab-runner-via-docker)
    1. [GitLab Directory Structure](#gitlab-directory-structure)
    2. [GitLab Docker Compose File](#gitlab-docker-compose-file)
    3. [Compose & Verify](#compose--verify)
    4. [Initial Root Password](#initial-root-password)
7. [GitLab Getting Started](#gitlab-getting-started)
    1. [Initial Steps](#initial-steps)
    2. [SSL Issues (Tricky!)](#ssl-issues-tricky)
    3. [Renewing the Certificate](#renewing-the-certificate)
    4. [SSL Certificate Management Decision](#ssl-certificate-management-decision)
    5. [Reverse Proxy for GitLab](#reverse-proxy-for-gitlab)
        1. [Update GitLab to HTTP-only](#update-gitlab-to-http-only)
        2. [Restart GitLab](#restart-gitlab)
        3. [Enable Apache Modules](#enable-apache-modules)
        4. [Create Apache Directives](#create-apache-directives)
    6. [Debugging](#debugging)
        1. [Port and Service Verification](#port-and-service-verification)
        2. [Apache Configuration Verification](#apache-configuration-verification)
        3. [Connectivity Testing](#connectivity-testing)
        4. [Log Analysis](#log-analysis)
        5. [SSL Certificate Debugging](#ssl-certificate-debugging)
        6. [GitLab Administration](#gitlab-administration)
        7. [Common Issues Resolution](#common-issues-resolution)
            1. [Issue: Proxy modules not loaded](#issue-proxy-modules-not-loaded)
            2. [Issue: Container not accessible](#issue-container-not-accessible)
        8. [GitLab SSH Authentication Troubleshooting](#gitlab-ssh-authentication-troubleshooting)
            1. [MacOS](#macos)
            2. [Windows](#windows)
            3. [Common Solution](#common-solution)
8. [Mail Server](#mail-server)
    1. [Successful Solution Steps](#successful-solution-steps)
        1. [Timezone Update](#timezone-update)
        2. [Port 25 Configuration](#port-25-configuration)
        3. [Update/Fix DNS Records](#updatefix-dns-records)
        4. [Postfix Configuration Update](#postfix-configuration-update)
        5. [DKIM Configuration](#dkim-configuration)
        6. [Floating IP for Reverse DNS](#floating-ip-for-reverse-dns)
        7. [Postfix Network Binding Configuration](#postfix-network-binding-configuration)
        8. [IPv4 Preference for Gmail Compatibility](#ipv4-preference-for-gmail-compatibility)
        9. [DMARC Policy Adjustment](#dmarc-policy-adjustment)
        10. [Gmail Compatibility](#gmail-compatibility)
9. [GitLab Mailer Configuration](#gitlab-mailer-configuration)

<!-- /code_chunk_output -->

## Prerequisites

### Generate a SSH Key (ed25519)

Generate a SSH Key (ed25519) on your local machine.

**ed25519** is a modern and secure elliptic curve algorithm that offers better security and performance compared to older algorithms like RSA.

While it is more resistant to certain attacks than older algorithms, **ed25519** could still be vulnerable to future quantum computers.

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

OpenSSH client (incl. ssh-keygen) is included by default since Windows 10 version 1809 (2018).If not available, install via Windows Features:

Settings → Apps → Optional Features → Add Feature
Search "OpenSSH Client" → Install

Or via PowerShell (as admin):

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Client*
```

On Linux/MacOS, the default location is `~/.ssh/id_ed25519` and `~/.ssh/id_ed25519.pub`.

On Windows, it might be in a different location depending on the SSH client you are using. But, most probably it will be located in `C:\Users\<YourUsername>\.ssh\id_ed25519` and `C:\Users\<YourUsername>\.ssh\id_ed25519.pub`.

Never share your private key (`id_ed25519`) with anyone. The public key (`id_ed25519.pub`) is meant to be shared and added to the `~/.ssh/authorized_keys` file on the server you want to access.

#### Quantum Security (ToDo)

NTRU is a lattice-based cryptographic algorithm that is designed to be secure against quantum attacks. It has been implemented in various libraries, such as:

- **NTRUEncrypt**: A public key encryption system based on the NTRU algorithm.
- **NTRUSign**: A digital signature scheme based on NTRU.

These implementations can be used for secure communication and data protection in a post-quantum world.

## Initial Setup

### SSH Setup

Create the server using the Hetzner Cloud Console. Choose the desired specifications, including the image (Debian), server type, and location.

You will need to set up SSH keys for secure access to your server. This can be done through the Hetzner Cloud Console.

Important: If you want to connect with `ssh root@ip`, ensure the name of your SSH key is the standard name `id_rsa.pub`. If you use a different name, you will need to specify it in your SSH command, like:

```shell
ssh -i /path/to/your/private_key root@ip
```

On macOS/Linux:

```bash
ssh -i ~/.ssh/id_ed25519 root@ip
```

On Windows, e.g.:

```bash
ssh -i C:\Users\<YourUsername>\.ssh\id_ed25519 root@ip
```

Better, you create a config file for SSH to simplify the connection process. Create or edit the `~/.ssh/config` file on your local machine and add the following (the indentation is important):

```plaintext
Host your-alias-name
    HostName ip
    User root
    IdentityFile ~/.ssh/id_ed25519.pub
```

Now you can connect with a simple command:

```shell
ssh your-alias-name
```

#### Verify

```shell
# On server, check the key is in authorized_keys
cat /root/.ssh/authorized_keys
```

On your local machine, check:

```shell
cat ~/.ssh/config
ls -la ~/.ssh/id_ed25519*
cat ~/.ssh/id_ed25519.pub
```

Compare the two public keys (on server and local machine) to ensure they match, that means the content of `id_ed25519.pub` with the entered key in `/root/.ssh/authorized_keys`.

Test SSH Key authentication manually:

```bash
ssh -i ~/.ssh/id_ed25519 -v root@ip
```

The `-v` flag shows verbose output - you'll see if it's trying the key or not.

**Common issues**:

- Public key not added to server's `authorized_keys`
- Wrong permissions on key files
- Wrong key path in config

### Create New Sudo User

If we create a new sudo user, we don't want to give him the ability to modify/delete/.. `root` user. And you shouldn't use the `root` user for everyday tasks too.

```shell
adduser colleague-username
usermod -aG sudo colleague-username
```

You will need first to add his public key to setup SSH access:

```bash
mkdir -p /home/colleague-username/.ssh
echo "his-public-key-here" > /home/colleague-username/.ssh/authorized_keys
chown -R colleague-username:colleague-username /home/colleague-username/.ssh
chmod 700 /home/colleague-username/.ssh
chmod 600 /home/colleague-username/.ssh/authorized_keys
```

And now you should use `visudo` (on Debian based systems) to edit the sudoers file:

```bash
visudo
```

And add the following information (before `@includedir /etc/sudoers.d`):

```bash
colleague-username ALL=(ALL:ALL) ALL, \
    !/usr/bin/passwd root, \
    !/usr/bin/usermod root, \
    !/usr/bin/userdel root, \
    !/usr/bin/chsh root, \
    !/usr/sbin/usermod root, \
    !/usr/sbin/userdel root, \
    !/bin/su - root, \
    !/usr/bin/sudo -u root, \
    !/bin/nano /root/.ssh/*, \
    !/bin/vi /root/.ssh/*, \
    !/bin/vim /root/.ssh/*
```

**Important:** This is only necessary during the initial server setup phase and only if two people need to administer/setup the server simultaneously. Ideally, permission management should be handled via group assignments and never on an individual basis. We will configure these groups in a later section of this documentation.

#### Verify

Check Syntax:

```bash
visudo -c
```

Switch to the new user:

```bash
su - colleague-username
# Check sudo permissions generally
sudo -l
# Check sudo permissions for specific user
sudo -U colleague-username -l
```

and try allowed and not allowed commands:

```bash
sudo apt update                       # OK
sudo systemctl status ssh             # OK
sudo passwd root                      # NOT OK
sudo nano /root/.ssh/authorized_keys  # NOT OK
```

Change back to the root user:

```bash
su - # or
exit
# Alternative if exit doesn't work
logout
```

If you want to add special configuration to `/etc/ssh/sshd_config`, you can do so by editing the file:

```bash
nano /etc/ssh/sshd_config
```

Afterward, restart the SSH service:

```bash
systemctl restart sshd
```

### Update & Upgrade

```bash
apt update && apt upgrade -y
```

### Manage Initial Host Name

```bash
hostnamectl set-hostname sub.domain.com
```

Add it to `/etc/hosts`:

```plaintext
# replace 188.x.x.x with your server's IP address

127.0.0.1 localhost
188.x.x.x www.example.com example.com

# Or Sub Domain
# 188.x.x.x dev.example.com dev

# First entry is canonical, rest are aliases. You can reorder aliases:
# All Subdomains are resolved to the same IP
# (And maybe main domains hosted somewhere else)
188.x.x.x dev.example.com demo.whatever.com example

# The following lines are desirable for IPv6 capable hosts
::1 localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters

```

Create a new A-Record in your DNS settings pointing to the server's IP address:

```plaintext
A   example.com   <your-server-ip>

# Or Sub Domain
A   dev.example.com   <your-server-ip>
```

If you want to use different servers for different subdomains, you can create additional Records like:

```plaintext
A   dev.example.com   <your-server-ip>
A   test.example.com   <your-server-ip>
A   @   <your-server-ip> # for the main domain, e.g. example.com
CNAME   www.example.com example.com
```

#### Verification

```bash
hostname -f
# Should return: www.example.com

ping www.example.com
# Should resolve to 188.x.x.x
```

### Small Bash Improvements

Remove some commented lines (for colorization) and add some useful aliases in your `.bashrc` file:

```bash
# You may uncomment the following lines if you want `ls' to be colorized:
export LS_OPTIONS='--color=auto'
eval "$(dircolors)"
alias ls='ls $LS_OPTIONS'
alias ll='ls $LS_OPTIONS -l'
alias l='ls $LS_OPTIONS -lA'
#
# Some more alias to avoid making mistakes:
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'
. "/root/.acme.sh/acme.sh.env"
```

Then activate it:

```bash
source ~/.bashrc
```

## Install ISPConfig

```shell
wget -O ispconfig3-install.sh https://get.ispconfig.org
bash ispconfig3-install.sh
```

You will get the message:

```bash
WARNING! This script will reconfigure your entire server!
It should be run on a freshly installed server and all current configuration that you have done will most likely be lost!
Type 'yes' if you really want to continue: yes
```

then after you type `yes`, the installation will start. And you will get:

```bash
[INFO] Installation ready.
[INFO] Your ISPConfig admin password is: ....
[INFO] Your MySQL root password is: ...
[INFO] Warning: Please delete the log files in /root/ispconfig-install-log/setup-* once you don't need them anymore because they contain your passwords!
```

Important: Delete them immediately!

```bash
rm -rf /root/ispconfig-install-log/setup-*
```

## Secure Standard Server Domain

e.g. `dev.example.com`

### Install Certbox

```bash
apt update && apt install certbot python3-certbot-apache
```

### Add SSL Certificate

```bash
certbot --apache -d dev.example.com
```

### Enable SSL & Restart Apache

```bash
a2enmod ssl
systemctl restart apache2
```

### Verification

```bash
dig dev.example.com A
```

## Install Docker (Secure with Key Check)

```bash
# First update & upgrade
apt update && apt upgrade -y

# Install Docker prerequisites
apt install -y ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Add the official Docker repository to your Debian/Ubuntu system's APT sources. Note: The GPG key must already exist at /etc/apt/keyrings/docker.gpg or apt will fail during update.

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update again (with activated Docker repository above)
apt update

# Install Docker Engine, CLI, Containerd, and Docker Compose
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start Docker
systemctl enable docker
systemctl start docker
```

## Install GitLab & GitLab Runner (via Docker)

### GitLab Directory Structure

```bash
mkdir -p /srv/gitlab/{config,data,logs}
```

### GitLab Docker Compose File

**Important**: While the configuration provided here is correct, we use a reverse proxy setup. Refer to the relevant chapter and follow the instructions outlined there. For details on the decision-making process, see the chapter `SSL Certificate Management Decision`.

Create `/srv/gitlab/docker-compose.yml` with the following content:

```yaml
version: '3.6'
services:
  gitlab:
    image: 'gitlab/gitlab-ce:latest'
    restart: always
    hostname: 'https://git.example.com'
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'https://git.example.com'
        letsencrypt['enable'] = true
        letsencrypt['contact_emails'] = ['your-email@domain.com']  # CHANGE THIS
        gitlab_rails['gitlab_shell_ssh_port'] = 2222
    ports:
      - '8090:80' # HTTP auf 8090
      - '8443:443' # HTTPS auf 8443
      - '2222:22'  # SSH auf 2222
    volumes:
      - '/srv/gitlab/config:/etc/gitlab'
      - '/srv/gitlab/logs:/var/log/gitlab'
      - '/srv/gitlab/data:/var/opt/gitlab'
    shm_size: '256m'
```

### Compose & Verify

```bash
cd /srv/gitlab
# docker compose down # if you have to
docker-compose up -d
```

Check Composer Logs & Status

```bash
docker compose logs -f gitlab
docker compose ps
```

### Initial Root Password

```bash
docker exec -it gitlab-gitlab-1 cat /etc/gitlab/initial_root_password
```

You'll see:

```plaintext
WARNING: This value is valid only in the following conditions

1. If provided manually (either via `GITLAB_ROOT_PASSWORD` environment variable or via `gitlab_rails['initial_root_password']` setting in `gitlab.rb`, it was provided before database was seeded for the first time (usually, the first reconfigure run).

2. Password hasn't been changed manually, either via UI or via command line.

If the password shown here doesn't work, you must reset the admin password following https://docs.gitlab.com/ee/security/reset_user_password.html#reset-your-root-password.

Password: ....=

# NOTE: This file will be automatically deleted in the first reconfigure run after 24 hours.
```

## GitLab Getting Started

### Initial Steps

Your GitLab instance allows anyone to register for an account, which is a security risk on public-facing GitLab instances. You should deactivate new sign ups if public users aren't expected to register for an account.

### SSL Issues (Tricky!)

Try

```bash
certbot certonly --manual --preferred-challenges dns -d git.example.com
```

You'll get the info:

```plaintext
Please deploy a DNS TXT record under the name:
_acme-challenge.git.example.com.
with the following value:
0T2kQx3Goo5J-XEw76FHRpe471GsAVQujrLu2igKSoU
Before continuing, verify the TXT record has been deployed.

- - - - - - - - - - - - - - - -
Press Enter to Continue
```

Then you need to add the TXT record in your DNS settings before. Then **you have to check, if the value is set, before pressing Enter!**.

```bash
dig -t TXT _acme-challenge.git.example.com
```

Then you will get the Info:

```plaintext
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/git.example.com/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/git.example.com/privkey.pem
This certificate expires on 2025-11-19.
These files will be updated when the certificate renews.

NEXT STEPS:
- This certificate will not be renewed automatically. Autorenewal of --manual certificates requires the use of an authentication hook script (--manual-auth-hook) but one was not provided. To renew this certificate, repeat this same certbot command before the certificate's expiry date.
```

### Renewing the Certificate

```bash
certbot renew
```

### SSL Certificate Management Decision

We evaluated two primary options for SSL certificate management. The first option involved using `Hetzner DNS API` automation through the `certbot-dns-hetzner plugin`, which would enable automatic certificate renewal by creating and removing DNS TXT records via the Hetzner DNS API. The second option was implementing an IPConfig reverse proxy where SSL termination is handled by IPConfig with automatic Let's Encrypt renewal.

We decided to implement the IPConfig reverse proxy approach primarily due to security considerations. The Hetzner DNS API token grants full DNS control over all domains in the account, creating a significant security risk. If the server were compromised, an attacker would gain access to modify DNS records, redirect domains, or perform DNS hijacking attacks across all managed domains. This represents an unacceptable blast radius for a potential security incident.

The IPConfig reverse proxy approach follows the principle of least privilege by handling SSL termination without requiring elevated DNS permissions. This solution provides operational simplicity as it eliminates the need for API token management, rotation, or monitoring.

The trade-off involves creating a dependency on IPConfig for SSL management, but this is acceptable given the eliminated DNS security risk and reduced operational complexity.

### Reverse Proxy for GitLab

#### Update GitLab to HTTP-only

```yaml
version: '3.6'
services:
  gitlab:
    image: 'gitlab/gitlab-ce:latest'
    restart: always
    hostname: 'git.example.com'
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'https://git.example.com'
        nginx['listen_port'] = 80
        nginx['listen_https'] = false
        nginx['proxy_set_headers'] = {
          'X-Forwarded-Proto' => 'https',
          'X-Forwarded-Ssl' => 'on'
        }
    ports:
      - '8090:80'
      - '2222:22'
    volumes:
      - '/srv/gitlab/config:/etc/gitlab'
      - '/srv/gitlab/logs:/var/log/gitlab'
      - '/srv/gitlab/data:/var/opt/gitlab'
    shm_size: '256m'
```

#### Restart GitLab

```bash
cd /srv/gitlab
docker compose down
docker compose up -d
```

#### Enable Apache Modules

```bash
a2enmod proxy
a2enmod proxy_http
a2enmod headers
systemctl reload apache2
```

#### Create Apache Directives

Login in IPConfig, create a new site, e.g. `git.example.com` and change to the options tab and enter the following directives into the `Apache Directives` textarea:

```apache
ProxyPreserveHost On
ProxyPass / http://127.0.0.1:8090/
ProxyPassReverse / http://127.0.0.1:8090/

# Additional headers for GitLab
ProxyPassReverse / http://127.0.0.1:8090/
RequestHeader set X-Forwarded-Proto "https"
RequestHeader set X-Forwarded-For %h
```

Apply/Save Changes. Then Enable SSL in the "Domain" tab (Let's Encrypt). And restart Apache.

```bash
systemctl restart apache2
```

### Debugging

These are the commands I used intermittently for debugging, Checking Ports, Services etc...

#### Port and Service Verification
Check if GitLab container is running and ports are exposed:

```bash
# Verify GitLab container status
docker ps | grep gitlab

# Check if port 8090 is listening
sudo netstat -tlnp | grep 8090

# Alternative command
sudo ss -tlnp | grep 8090
```

#### Apache Configuration Verification
Verify Apache proxy configuration:

```bash
# Check Apache status
sudo systemctl status apache2

# Test Apache configuration syntax
sudo apache2ctl configtest

# List enabled sites (should show your GitLab site)
ls -la /etc/apache2/sites-enabled/ | grep git

# View site configuration
sudo apache2ctl -S | grep git

# Enable required modules (if not already enabled)
sudo a2enmod proxy proxy_http headers
sudo systemctl restart apache2
```

#### Connectivity Testing
Test HTTP connectivity at different levels:

```bash
# Test direct container access
curl -I http://127.0.0.1:8090

# Test through Apache with host header
curl -I http://127.0.0.1 -H "Host: git.example.com"

# Test external domain resolution
curl -I http://git.example.com
```

#### Log Analysis
Monitor logs for troubleshooting:

```bash
# GitLab container logs
docker logs gitlab-gitlab-1 -f

# Apache error logs for your domain
tail -f /var/log/ispconfig/httpd/git.example.com/error.log

# Apache service logs
journalctl -xeu apache2.service
```

#### SSL Certificate Debugging
Verify Let's Encrypt certificate and DNS challenges:

```bash
# Check DNS TXT record propagation
# (replace with your actual challenge)
dig TXT _acme-challenge.git.example.com @8.8.8.8
dig TXT _acme-challenge.git.example.com @1.1.1.1

# Manual certificate request (if automatic fails)
certbot certonly --manual --preferred-challenges dns -d git.example.com
```

#### GitLab Administration
Reset GitLab root password if needed:

```bash
# Interactive password reset
docker exec -it gitlab-gitlab-1 gitlab-rake "gitlab:password:reset"

# Reset specific user password
docker exec -it gitlab-gitlab-1 gitlab-rake "gitlab:password:reset[username]"

# Search logs for password-related entries
docker logs gitlab-gitlab-1 | grep -i password
```

#### Common Issues Resolution
Issue: Apache site not enabled

```bash
sudo a2ensite git.example.com
sudo systemctl reload apache2
```

##### Issue: Proxy modules not loaded

```bash
sudo a2enmod proxy proxy_http headers
sudo systemctl restart apache2
```

##### Issue: Container not accessible

Verify container is running: `docker ps`

Check port binding: `docker port gitlab-gitlab-1`

Test direct container access: `curl http://127.0.0.1:8090`

#### GitLab SSH Authentication Troubleshooting

Most problems stem from using the default id_rsa key instead of id_ed25519 (wrong key generated with incorrect command), or the SSH key not being uploaded at all. During cloning, HTTPS and SSH methods are often confused - when choosing HTTPS, SSH keys have no effect. In this case, a personal access token works better. Additionally, the SSH port might be incorrectly specified, as we have port 2222 configured here instead of the default port 22, and if no port is specified, port 22 is assumed by default. In summary, the key type, authentication method, and port are the most common sources of errors.

And check these too:

- User permissions on the repository
- SSH-Agent not running on Windows
- Incorrect SSH key permissions (chmod 600)

##### MacOS

If you are a macOS user, ensure that your SSH key is added to the SSH agent:

```bash
# Start the SSH agent
eval "$(ssh-agent -s)"

# Add your SSH private key
ssh-add ~/.ssh/id_ed25519

# Verify
ssh-add -l

# Correct Remote (e.g. Port 2222 ist missing)
git remote set-url origin ssh://git@git.example.com:2222/group-name/project-name.git

# Test Connection
ssh -T git@git.example.com


# Debug SSH Connection
ssh -v git@git.example.com
```

Also, check your SSH config file (`~/.ssh/config`) for the correct settings:

```bash
Host git.example.com
  Port 2222 # Important
  User git
  IdentityFile ~/.ssh/id_ed25519 # important (not standard)
```

Test your SSH connection:

```bash
ssh -T git@git.example.com
```

If you encounter issues, check the following:

- Ensure your public key is added to your GitLab account.
- Verify the correct permissions on your SSH key files:

```bash
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub
```

##### Windows

It is recommended to use a personal access token instead of relying on SSH keys, as Windows terminals may not behave like Linux terminals and could lead to issues when using Git in the terminal. Personal access tokens provide a more consistent and reliable authentication method.

- GitLab UI → User Settings → Access Tokens
- Create token with write_repository scope
- Use your username and the token (not password) when prompted

##### Common Solution

Create/Update your SSH config file (`~/.ssh/config`) with the correct settings:

```bash
  HostName git.example.com
    User git
    Port 2222 # our configuration
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes
```

Clone with explicit Port (ssh://)

```bash
git clone ssh://git@git.example.com:2222/group/fe.git
```

Test with the correct port:

```bash
ssh -T -p 2222 git@git.example.com
```

## Mail Server

ISPConfig automatically installs Postfix, Dovecot, and other essential components for a complete mail server solution. While the web interface simplifies email account and domain management, several critical configuration challenges must be addressed to ensure reliable email delivery.

The primary challenge with any new mail server is reputation establishment. Modern mail providers employ sophisticated filtering mechanisms that automatically reject emails from unknown or improperly configured servers. This results in emails appearing in your Sent folder while never reaching their intended recipients - a deceptive scenario that can persist unnoticed for extended periods.

### Successful Solution Steps

#### Timezone Update

**Purpose:** Synchronizes server time with your local timezone to enable accurate log correlation and troubleshooting.

**Why necessary:** Mail server logs use timestamps extensively. When investigating delivery failures, having consistent timezone across all components eliminates confusion when correlating sent emails with corresponding error messages in various log files.

```bash
timedatectl set-timezone Europe/Vienna
systemctl restart postfix
```

#### Port 25 Configuration

**Purpose**: Enables your server to receive incoming emails from external mail servers and send outbound emails.

**Why necessary**: Port 25 (SMTP) is the standard port for mail server communication. Cloud providers typically block this port by default to prevent spam. Without proper port 25 access, external mail servers cannot deliver emails to your server, and your server cannot establish proper SMTP connections with other mail servers.

- Contact Hetzner Support for outbound Port 25 unblocking
- Hetzner Cloud Firewall: Add Port 25 as inbound rule
  - Without firewall rule, external mail servers could not connect
- Verify connectivity: `telnet your-server-ip 25`

#### Update/Fix DNS Records

**Purpose**: Establishes your server's identity and authorization to send emails for your domains.

**Why necessary**: Modern email systems rely on DNS-based authentication mechanisms (SPF, DKIM, DMARC) to combat spam and phishing. Without proper DNS records, receiving mail servers will either reject your emails outright or classify them as spam.

Sub-Domain Management can be very tricky:

```plaintext
subdomain.example.com IN MX 10 mail.example.com
mail.example.com IN A 192.0.2.1

subdomain.example.com IN TXT "v=spf1 mx a ip4:188.x.x.x ~all" # Adjust IP accordingly
_dmarc.subdomain.example.com IN TXT "v=DMARC1; p=none; rua=mailto:dmarc@example.com"
```

**Critical considerations**:

- MX records must point to A records, never to CNAME records
- SPF records authorize specific IP addresses to send emails for your domain
- DMARC provides policy instructions for handling authentication failures

#### Postfix Configuration Update

**Purpose**: Configures Postfix to handle virtual domains correctly and prevent mail routing conflicts.

**Why necessary**: Default Postfix installations often include the server's hostname in `mydestination`, which can cause mail routing conflicts when using virtual domains managed by ISPConfig. This misconfiguration leads to emails being processed locally instead of through the virtual domain system.

```bash
postconf -e "mydestination = localhost, localhost.localdomain"
```

**Verification**: Check current settings with `postconf mydestination`

#### DKIM Configuration

**Purpose**: Implements cryptographic email signing to verify email authenticity and prevent tampering.

**Why necessary**: DKIM (DomainKeys Identified Mail) provides cryptographic proof that emails originated from your server and haven't been modified in transit. Major email providers increasingly require DKIM signatures for inbox delivery.

1. Enable DKIM in ISPConfig: Navigate to Email → Domain → Click DKIM button to activate DKIM for your domain. Then click "Generate new DKIM keys". Note the selector (e.g., `default`) and the generated public key.

2. Add the provided TXT record to your DNS settings:

```plaintext
default._domainkey.subdomain.example.com IN TXT "v=DKIM1; k=rsa; p=YOUR_PUBLIC_KEY"
```

3. Convert ISPConfig key format for Rspamd compatibility.

Unfortunately ISPConfig generates keys in a format incompatible with Rspamd, requiring conversion.

If you don't do that, you will see errors in your mail log like `"cannot load dkim key"` or `"invalid key format"` like: "rspamd[xxxx]: <xxx>; dkim_sign; `cannot load dkim key` /var/lib/amavis/dkim/subdomain.example.com.private: `unsupported key format`" and "rspamd[xxxx]: <xxx>; dkim_sign; `cannot parse DKIM key`: error:0906D064:PEM routines:PEM_read_bio:bad base64 decode", etc.

```bash
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt \
  -in /var/lib/amavis/dkim/subdomain.example.com.private \
  -out /tmp/converted.key
mv /tmp/converted.key /var/lib/amavis/dkim/subdomain.example.com.private
```

4. Configure Rspamd mappings to use the DKIM keys.

(Rspamd needs to know which key to use for signing emails from your domain. This is done through mapping files.)

Update the Rspamd mapping configuration.

```bash
echo "subdomain.example.com default" > /etc/rspamd/local.d/dkim_domains.map
echo "default /var/lib/amavis/dkim/subdomain.example.com.private" > /etc/rspamd/local.d/dkim_selectors.map
chown _rspamd:_rspamd /var/lib/amavis/dkim/subdomain.example.com.*
chmod 600 /var/lib/amavis/dkim/subdomain.example.com.private
```

#### Floating IP for Reverse DNS

**Purpose:** Establishes consistent IP reputation and proper reverse DNS resolution for your mail server.

**Why necessary:** Reverse DNS (PTR records) verification is a fundamental anti-spam check. If your server's IP address doesn't reverse-resolve to your mail server's domain, many recipients will reject your emails. Floating IPs provide stable IP addresses that can be properly configured with PTR records.

You need a Floating IP to set up Reverse DNS (PTR record) in Hetzner Cloud. Assign the Floating IP to your server and then set the PTR record to match your mail domain. The reason for that is to ensure that the reverse DNS lookup for your mail server's IP address resolves to the correct domain name, which is important for email deliverability and to prevent your emails from being marked as spam.

First you need to change to your server (Hetzner Console) and go the network tab. Then click on the button "Create Floating IP" and you have to give it a name first. You will get an IP Adress (most probably from your cloud server location) assigned. And Hetzner will show you the command to add it to your server:

```bash
sudo ip addr add 88.x.x.x dev eth0 # Floating IP
```

Then click "Add Reverse DNS" in the menu (three dots) and set the PTR record to point to your mail server's domain name (e.g., mail.example.com).

```plaintext
88.x.x.x -> mail.example.com
```

Update your DNS A record for mail.example.com to point to the Floating IP address.

```plaintext
mail.example.com IN A 88.x.x.x
```

#### Postfix Network Binding Configuration

**Purpose**: Ensures Postfix uses the correct IP address for outbound connections and presents the proper banner.

**Why necessary**: When multiple IP addresses are available, Postfix must be explicitly configured to use the Floating IP for outbound connections. This ensures consistency between your DNS records and actual network behavior, which is crucial for reputation and deliverability.

```bash
postconf -e "smtp_bind_address = 88.198.90.221"
postconf -e "smtpd_banner = mail.trybox.eu ESMTP"
systemctl restart postfix
```

**Verification**: Check with `postconf smtp_bind_address smtpd_banner`

#### IPv4 Preference for Gmail Compatibility

**Purpose**: Optimizes email delivery to providers with IPv6 connectivity issues while maintaining dual-stack compatibility.

**Why necessary**: Some major email providers (notably Gmail) have inconsistent IPv6 handling that can result in connection timeouts or rejections. By preferencing IPv4 for outbound connections, you avoid these compatibility issues while still supporting IPv6 for inbound connections.

```bash
postconf -e "smtp_address_preference = ipv4"
systemctl reload postfix
```

**Important**: Do not set `inet_protocols = ipv4` as this breaks webmail and other ISPConfig components that require IPv6 support.

#### DMARC Policy Adjustment

**Purpose**: Implements a gradual approach to DMARC enforcement during initial reputation building.

**Why necessary**: New mail servers benefit from relaxed DMARC policies during the initial reputation building phase. Setting `p=none` allows you to monitor DMARC alignment issues without having legitimate emails rejected, while still collecting valuable feedback reports.

```plaintext
_dmarc  IN  TXT  "v=DMARC1; p=none; ruf=mailto:dmarc@example.com"
```

**Progression strategy**: Start with `p=none` → `p=quarantine` (after 2-3 months) → `p=reject` (after 6+ months of clean operation)

**Testing note**: When testing your configuration via [https://mxtoolbox.com/](https://mxtoolbox.com/), you'll see "DMARC Quarantine/Reject policy not enabled" - this is informational, not an error, and is expected when using `p=none`.

#### Gmail Compatibility

Check this document: <https://support.google.com/a/answer/81126>

**Key factors for Gmail acceptance**:

- Gradual volume increase (start with <100 emails/day)
- Consistent sending patterns and timing
- Low complaint rates (<0.1%)
- Proper authentication (SPF, DKIM, DMARC alignment)
- Engagement metrics (opens, replies, forwards)

**Expected timeline**: New servers typically require 4-8 weeks of consistent sending to establish sufficient reputation with Gmail's systems.

## GitLab Mailer Configuration

We need to update out yaml-file, but before that, we need to create a secure password for the standard gitlab email address.

Use

```bash
# Linux (e.g. Debian)
tr -dc 'A-Za-z0-9@#$%^&*()_+=,;' < /dev/urandom | head -c 32
# macOS
# Set locale to C (treats bytes as raw)
LC_ALL=C tr -dc 'A-Za-z0-9@#$%^&*()_+=,;' < /dev/urandom | head -c 32
```
