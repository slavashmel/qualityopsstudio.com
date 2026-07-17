#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/qualityopsstudio.com/app"

cd "$APP_DIR"

git fetch origin main
git reset --hard origin/main
npm install
npm run build

chown -R qualityops:qualityops "$APP_DIR"
sudo systemctl restart qualityopsstudio.service
sudo systemctl --no-pager --full status qualityopsstudio.service
