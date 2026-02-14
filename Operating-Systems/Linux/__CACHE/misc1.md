# Simple Command Lines

## Source & Credits: @livingdevops

```plaintext
Daily stuff:
• ps aux | grep {process} - Find that sneaky process
• lsof -i :{port} - Who's hogging that port?
• df -h - The classic "we're out of space" checker
• netstat -tulpn - Network connection detective
• kubectl get pods | grep -i error - K8s trouble finder

Log related commands:
• tail -f /var/log/* - Real-time log watcher
• journalctl -fu service-name - SystemD log stalker
• grep -r "error" . - The error hunter
• zcat access.log.gz | grep "500" - Compressed log ninja
• less +F - The better tail command

Container cli:
• docker ps --format '{{.Names}} {{.Status}}' - Clean status check
• docker stats --no-stream - Quick resource check
• crictl logs {container} - Raw container stories
• docker exec -it - The container backdoor
• podman top - Process peek inside containers

System Detectives:
• htop - System resource storyteller
• iostat -xz 1 - Disk performance poet
• free -h - Memory mystery solver
• vmstat 1 - System vital signs
• dmesg -T | tail - Kernel's recent gossip

Network stuff:
• curl -v - HTTP conversation debugger
• dig +short - Quick DNS lookup
• ss -tunlp - Socket statistics simplified
• iptables -L - Firewall rule reader
• traceroute - Path finder

File and stuff:
• find . -name "*.yaml" -type f - YAML hunter
• rsync -avz - Better file copier
• tar -xvf - The unzipper (yes, we all google this)
• ln -s - Symlink wizard
• chmod +x - Make it executable

Performance:
• strace -p {pid} - System call spy
• tcpdump -i any - Network packet sniffer
• sar -n DEV 1 - Network stats watch
• uptime - Load average at a glance
• top -c - Classic process viewer

Git Essentials:
• git log --oneline - History simplified
• git reset --hard HEAD^ - The "oops" eraser
• git stash - The work hider
• git diff --cached - What's staged?
• git blame - The "who did this?" resolver

Quick Fixes:
• sudo !! - Run last command with sudo
• ctrl+r - Command history search
• history | grep - Command time machine
• alias - Command shortcut maker
• watch - Command repeater
```
