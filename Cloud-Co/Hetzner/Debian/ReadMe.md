# Hetzner Debian Setup

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=5 orderedList=true} -->

<!-- code_chunk_output -->

1. [Getting](#getting)
2. [Initial Setup](#initial-setup)
    1. [Update & Upgrade](#update--upgrade)
    2. [Manage Initial Host Name](#manage-initial-host-name)
3. [Install ISPConfig](#install-ispconfig)

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
hostnamectl set-hostname server.my-domain.com
echo "127.0.0.1 server.my-domain.com server" >> /etc/hosts
```

Create a new A-Record in your DNS settings pointing to the server's IP address:

```plaintext
A   server.my-domain.com   <your-server-ip>
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
