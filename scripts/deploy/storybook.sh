#!/usr/bin/env bash
set -euo pipefail
channel=${1:?Channel required}
[[ "$channel" =~ ^(main|release-[A-Za-z0-9._-]+|pr-[1-9][0-9]*|releases/v?[0-9]+\.[0-9]+\.[0-9]+(-[A-Za-z0-9.-]+)?)$ ]]
[[ "$channel" != *..* ]]
revision=$(git rev-parse HEAD)
[[ "$revision" =~ ^[a-f0-9]{40}$ ]]
: "${SSH_USER:?Deployment target required}"
: "${SSH_KNOWN_HOSTS:?Trusted server key required}"
install -d -m 700 "$HOME/.ssh"
printf '%s\n' "$SSH_KNOWN_HOSTS" >> "$HOME/.ssh/known_hosts"
chmod 600 "$HOME/.ssh/known_hosts"
tar -czf - -C storybook-static . | ssh -F /dev/null -a -x -T \
  -o BatchMode=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=15 \
  -o ServerAliveInterval=15 -o ServerAliveCountMax=4 \
  "$SSH_USER" "deploy $channel $revision"
