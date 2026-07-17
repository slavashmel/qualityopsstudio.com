#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/qualityopsstudio.com/app"

git config --global --add safe.directory "$APP_DIR" >/dev/null 2>&1 || true
cd "$APP_DIR"

git fetch origin main
git reset --hard origin/main
npm install
npm run build

install -m 0644 deploy/qualityopsstudio.service /etc/systemd/system/qualityopsstudio.service
install -m 0644 deploy/nginx/qualityopsstudio.com.conf /etc/nginx/sites-available/qualityopsstudio.com
ln -sfn /etc/nginx/sites-available/qualityopsstudio.com /etc/nginx/sites-enabled/qualityopsstudio.com
systemctl daemon-reload
nginx -t
chown -R qualityops:qualityops "$APP_DIR"
sudo systemctl restart qualityopsstudio.service
sudo systemctl --no-pager --full status qualityopsstudio.service
sudo systemctl reload nginx
