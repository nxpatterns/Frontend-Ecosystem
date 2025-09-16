# Hetzner Debian Setup (Deployment Only)

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=true} -->

<!-- code_chunk_output -->

1. [Prerequisites](#prerequisites)
    1. [Generate a SSH Key (ed25519)](#generate-a-ssh-key-ed25519)
        1. [Quantum Security (ToDo)](#quantum-security-todo)
2. [Initial Setup](#initial-setup)
    1. [SSH Setup](#ssh-setup)
        1. [Verify](#verify)
    2. [Update & Upgrade](#update--upgrade)
    3. [Manage Initial Host Name](#manage-initial-host-name)
        1. [Verification](#verification)
    4. [Small Bash Improvements](#small-bash-improvements)
    5. [Secure Standard Server Domain](#secure-standard-server-domain)
        1. [Install Certbox](#install-certbox)
        2. [Add SSL Certificate](#add-ssl-certificate)
        3. [Verfication](#verfication)
            1. [Check systemd timer:](#check-systemd-timer)
        4. [Enable SSL & Restart Apache](#enable-ssl--restart-apache)
        5. [Verification](#verification-1)
    6. [Create New Sudo User](#create-new-sudo-user)
        1. [Verify](#verify-1)
    7. [Install Node with n](#install-node-with-n)
    8. [Generate a "Coming Soon" Page (Optional)](#generate-a-coming-soon-page-optional)
3. [Install Docker (Secure with Key Check)](#install-docker-secure-with-key-check)
4. [Install Portainer (Optional)](#install-portainer-optional)
    1. [Update User Permissions](#update-user-permissions)
    2. [Install Portainer](#install-portainer)

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

### Secure Standard Server Domain

e.g. `dev.example.com`

#### Install Certbox

```bash
apt update && apt install certbot python3-certbot-apache
```

#### Add SSL Certificate

Important: Ensure the necessary ports are opened in the firewall. Refer to your checklist for the specific ports required. This process can also be managed via ISPConfig, which is generally the preferred method. However, since we want to access ISPConfig over HTTPS, we are performing this step here before setting up ISPConfig.

```bash
sudo certbot --apache -d example.com -d www.example.com
```

Follow the prompts to complete the certificate installation. At the end, you will see something like:

```bash
Successfully received certificate.

Certificate is saved at:
/etc/letsencrypt/live/example.com/fullchain.pem

Key is saved at:
/etc/letsencrypt/live/example.com/privkey.pem

This certificate expires on 2025-12-11.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

Deploying certificate

Successfully deployed certificate for example.com to
/etc/apache2/sites-available/000-default-le-ssl.conf

Congratulations!
You have successfully enabled HTTPS on https://example.com
```

#### Verfication

##### Check systemd timer:

```bash
systemctl list-timers | grep certbot
```

You should see something like:

```plaintext
Fri 2025-09-12 15:40:10 UTC 6h left
- - certbot.timer certbot.service
```

**What this means:**

- Certbot renewal is scheduled via systemd timer (not traditional cron)
- Next renewal attempt: Friday at 15:40:10 UTC
- Timer is active and will trigger `certbot.service`

For more details:

```bash
# Show timer configuration
systemctl cat certbot.timer

# Show service configuration
systemctl cat certbot.service

# Check timer status
systemctl status certbot.timer
```

Example:

```bash
systemctl cat certbot.timer
# /lib/systemd/system/certbot.timer
[Unit]
Description=Run certbot twice daily

[Timer]
OnCalendar=*-*-* 00,12:00:00
RandomizedDelaySec=43200
Persistent=true

[Install]
WantedBy=timers.target
```

This means the timer is set to run twice daily at midnight and noon, with a randomized delay of up to 12 hours to avoid all renewals happening at the same time.

**Why this design:**

- **Load distribution** - Prevents millions of servers hitting Let's Encrypt simultaneously
- **Reliability** - Two chances per day if one fails
- **Efficiency** - Most runs do nothing (just check if renewal needed)

The frequent schedule is deceptive - actual certificate renewal only happens when <30 days remain.

#### Enable SSL & Restart Apache

```bash
a2enmod ssl
systemctl restart apache2
```

#### Verification

```bash
sudo certbot certificates

# Should show your domain with its certificate details
```

```bash
sudo apache2ctl -S

VirtualHost configuration:
*:443                  example.com (/etc/apache2/sites-enabled/000-default-le-ssl.conf:2)
*:80                   www.example.com (/etc/apache2/sites-enabled/000-default.conf:1)
ServerRoot: "/etc/apache2"
Main DocumentRoot: "/var/www/html"
Main ErrorLog: "/var/log/apache2/error.log"
Mutex ssl-stapling: using_defaults
Mutex ssl-cache: using_defaults
Mutex default: dir="/var/run/apache2/" mechanism=default
Mutex watchdog-callback: using_defaults
Mutex rewrite-map: using_defaults
Mutex ssl-stapling-refresh: using_defaults
PidFile: "/var/run/apache2/apache2.pid"
Define: DUMP_VHOSTS
Define: DUMP_RUN_CFG
User: name="www-data" id=33
Group: name="www-data" id=33
```

```bash
ls -la /etc/apache2/sites-enabled/

total 8
drwxr-xr-x 2 root root 4096 Sep 12 09:00 .
drwxr-xr-x 8 root root 4096 Sep 12 09:00 ..
lrwxrwxrwx 1 root root   35 Sep 12 08:59 000-default.conf -> ../sites-available/000-default.conf
lrwxrwxrwx 1 root root   52 Sep 12 09:00 000-default-le-ssl.conf -> /etc/apache2/sites-available/000-default-le-ssl.conf
```

Use `dig` to verify DNS resolution:

```bash
dig dev.example.com A
```

### Create New Sudo User

If we create a new sudo user, we don't want to give him the ability to modify/delete/.. `root` user. And you shouldn't use the `root` user for everyday tasks too.

```shell
adduser admin
usermod -aG sudo admin
```

You will need first to add his public key to setup SSH access:

```bash
mkdir -p /home/admin/.ssh
echo "his-public-key-here" > /home/admin/.ssh/authorized_keys
chown -R admin:admin /home/admin/.ssh
chmod 700 /home/admin/.ssh
chmod 600 /home/admin/.ssh/authorized_keys
```

And now you should use `visudo` (on Debian based systems) to edit the sudoers file:

```bash
visudo
```

And add the following information (before `@includedir /etc/sudoers.d`):

```bash
admin ALL=(ALL:ALL) ALL, \
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
su - admin
# Check sudo permissions generally
sudo -l
# Check sudo permissions for specific user
sudo -U admin -l
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

### Install Node with n

```bash
curl -fsSL https://raw.githubusercontent.com/tj/n/master/bin/n | sudo bash -s lts

sudo npm install -g n

# Verify
n --version
which n
```

### Generate a "Coming Soon" Page (Optional)

```bash
cd /var/www
sudo npx create-html-boilerplate example.com
sudo chown -R www-data:www-data example.com
```

Change document root in Apache:

```bash
sudo nano /etc/apache2/sites-available/000-default-le-ssl.conf

# Change DocumentRoot to:
DocumentRoot /var/www/example.com

# Reload Apache
sudo systemctl reload apache2
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

## Install Portainer (Optional)

Use admin user to install Portainer:

### Update User Permissions

```bash
# Add admin to docker group
sudo usermod -aG docker admin

# Logout and login again, or:
newgrp docker

# Test without sudo:
docker ps
```

### Install Portainer

```bash
# Create Portainer data volume
docker volume create portainer_data

# Portainer data is stored at:
# /var/lib/docker/volumes/portainer_data/_data/

# Verify volume location (only sudo)
ls -la /var/lib/docker/volumes/portainer_data/_data/
````

or:

```bash
docker volume inspect portainer_data
[
  {
    "CreatedAt": "2025-09-12T13:55:49Z",
    "Driver": "local",
    "Labels": null,
    "Mountpoint": "/var/lib/docker/volumes/portainer_data/_data",
    "Name": "portainer_data",
    "Options": null,
    "Scope": "local"
  }
]

```

Install and run Portainer container:

```bash
docker run -d -p 8000:8000 -p 9443:9443 --name portainer \
    --restart=always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v portainer_data:/data \
    portainer/portainer-ce:2.21.4
```

Verify Portainer installation:

```bash
docker ps | grep portainer
docker logs portainer
```

### Access Portainer

Better create a DNS A-Record for easier access:

```plaintext
A   portainer.example.com   <your-server-ip>
```

And configure Firewall to allow access to port 9443.

Open your web browser and navigate to: <https://portainer.example.com:9443>

Set up your admin account and start managing your Docker environment through the Portainer web interface.

### Local Docker Preparations (Optional)

```bash
# Local machine - tag with version
docker tag cloudlib:latest cloudlib:v1.0.0
docker save cloudlib:v1.0.0 | gzip > cloudlib-v1.0.0.tar.gz
```
