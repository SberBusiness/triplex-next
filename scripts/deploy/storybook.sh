#!/usr/bin/env bash
set -euo pipefail
channel=${1:?Channel required}
revision=${2:?Revision required}
archive=${3:?Archive required}
[[ "$channel" =~ ^(main|release-0|pr-[1-9][0-9]*|releases/[01]\.[0-9]+\.0)$ ]]
[[ "$revision" =~ ^[a-f0-9]{40}$ ]]
[[ -f "$archive" && ! -L "$archive" ]]
: "${SSH_USER:?Deployment target required}"
: "${SSH_KNOWN_HOSTS:?Trusted server key required}"
install -d -m 700 "$HOME/.ssh"
printf '%s\n' "$SSH_KNOWN_HOSTS" >> "$HOME/.ssh/known_hosts"
chmod 600 "$HOME/.ssh/known_hosts"
# The archive is opaque data: never unpack or execute PR files on this runner.
ssh -F /dev/null -a -x -T \
  -o BatchMode=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=15 \
  -o ServerAliveInterval=15 -o ServerAliveCountMax=4 \
  "$SSH_USER" "deploy $channel $revision" < "$archive"
