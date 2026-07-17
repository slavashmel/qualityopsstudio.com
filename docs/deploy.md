# QualityOps Studio VPS deployment

Production runs on the shared German VPS at `31.76.40.132`.

## Runtime

- App root: `/opt/qualityopsstudio.com`
- Git checkout: `/opt/qualityopsstudio.com/app`
- Secrets: `/opt/qualityopsstudio.com/secrets`
- Runtime user: `qualityops`
- Node: `>=22.13.0`
- App service: `qualityopsstudio.service`
- Local app port: `3108`
- Public proxy: nginx for `qualityopsstudio.com` and `www.qualityopsstudio.com`

## First install outline

```bash
adduser --system --group --home /opt/qualityopsstudio.com --shell /usr/sbin/nologin qualityops
mkdir -p /opt/qualityopsstudio.com/app /opt/qualityopsstudio.com/secrets
chown -R qualityops:qualityops /opt/qualityopsstudio.com

git clone git@github.com:slavashmel/qualityopsstudio.com.git /opt/qualityopsstudio.com/app
cd /opt/qualityopsstudio.com/app
npm install
npm run build

cp deploy/qualityopsstudio.service /etc/systemd/system/qualityopsstudio.service
systemctl daemon-reload
systemctl enable --now qualityopsstudio.service

cp deploy/nginx/qualityopsstudio.com.conf /etc/nginx/sites-available/qualityopsstudio.com
ln -s /etc/nginx/sites-available/qualityopsstudio.com /etc/nginx/sites-enabled/qualityopsstudio.com
nginx -t
systemctl reload nginx

certbot --nginx -d qualityopsstudio.com -d www.qualityopsstudio.com
```

## Deploy update

```bash
/opt/qualityopsstudio.com/app/deploy/pull_and_restart.sh
```
