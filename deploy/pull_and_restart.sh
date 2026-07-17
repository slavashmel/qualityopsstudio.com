#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/qualityopsstudio.com/app"
SSH_KEY="/opt/qualityopsstudio.com/secrets/github_deploy_ed25519"
KNOWN_HOSTS="/opt/qualityopsstudio.com/secrets/github_known_hosts"
export GIT_SSH_COMMAND="ssh -i $SSH_KEY -o UserKnownHostsFile=$KNOWN_HOSTS -o StrictHostKeyChecking=yes -o IdentitiesOnly=yes"

cd "$APP_DIR"

git fetch origin main
git reset --hard origin/main
npm install
npm run build

chown -R qualityops:qualityops "$APP_DIR"
sudo systemctl restart qualityopsstudio.service
sudo systemctl --no-pager --full status qualityopsstudio.service
