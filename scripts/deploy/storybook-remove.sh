#!/usr/bin/env bash
set -euo pipefail
channel=${1:?Preview required}
[[ "$channel" =~ ^pr-[1-9][0-9]*$ ]]
: "${SSH_USER:?Deployment target required}"
: "${SSH_KNOWN_HOSTS:?Trusted server key required}"
install -d -m 700 "$HOME/.ssh"
printf '%s\n' "$SSH_KNOWN_HOSTS" >> "$HOME/.ssh/known_hosts"
chmod 600 "$HOME/.ssh/known_hosts"
ssh -F /dev/null -a -x -T -o BatchMode=yes -o StrictHostKeyChecking=yes \
  -o ConnectTimeout=15 -o ServerAliveInterval=15 -o ServerAliveCountMax=4 \
  "$SSH_USER" "remove $channel"
