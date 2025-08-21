# Hetzner Debian Setup (DEV Server)

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=5 orderedList=true} -->

<!-- code_chunk_output -->

1. [Getting](#getting)
2. [Initial Setup](#initial-setup)
    1. [Update & Upgrade](#update--upgrade)
    2. [Manage Initial Host Name](#manage-initial-host-name)
        1. [Verification](#verification)
    3. [Small Bash Improvements](#small-bash-improvements)
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
    3. [Compose](#compose)

<!-- /code_chunk_output -->

## Getting

## Initial Setup

Create the server using the Hetzner Cloud Console. Choose the desired specifications, including the image (Debian), server type, and location.

You will need to set up SSH keys for secure access to your server. This can be done through the Hetzner Cloud Console.

Important: If you want to connect with `ssh root@ip`, ensure the name of your SSH key is the standard name `id_rsa.pub`. If you use a different name, you will need to specify it in your SSH command, like:

```shell
ssh -i /path/to/your/private_key root@ip
```

Better, you create a config file for SSH to simplify the connection process. Create or edit the `~/.ssh/config` file on your local machine and add the following (the indentation is important):

```plaintext
Host your-alias-name
    HostName ip
    User root
    IdentityFile /path/to/your/private_key
```

Now you can connect with a simple command:

```shell
ssh your-alias-name
```

### Update & Upgrade

```shell
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
      - '80:80'
      - '443:443'
      - '2222:22'
    volumes:
      - '/srv/gitlab/config:/etc/gitlab'
      - '/srv/gitlab/logs:/var/log/gitlab'
      - '/srv/gitlab/data:/var/opt/gitlab'
    shm_size: '256m'
```

### Compose

```bash
cd /srv/gitlab
docker-compose up -d
```
