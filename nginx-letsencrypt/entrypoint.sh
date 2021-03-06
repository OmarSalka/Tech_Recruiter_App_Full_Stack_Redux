#!/bin/sh
# Create a self signed default certificate, so Ngix can start before we have
# any real certificates.

#Ensure we have folders available

if [[ ! -f /usr/share/nginx/certificates/fullchain.pem ]];then
    mkdir -p /usr/share/nginx/certificates
fi

if [[ ! -f /usr/share/nginx/certificates/cert.crt ]]; then
    openssl genrsa -out /usr/share/nginx/certificates/privkey.pem 4096
    openssl req -new -key /usr/share/nginx/certificates/privkey.pem -out /usr/share/nginx/certificates/cert.csr -nodes -subj \
    "/CN=techrecruiterapp.com"
    # "/C=PT/ST=World/L=World/O=${DOMAIN:-www.techrecruiterapp.com}/OU=techrecruiterapp/CN=${DOMAIN:-www.techrecruiterapp.com}/EMAIL=${EMAIL:-omariosalkos@gmail.com}"
    openssl x509 -req -days 365 -in /usr/share/nginx/certificates/cert.csr -signkey /usr/share/nginx/certificates/privkey.pem -out /usr/share/nginx/certificates/fullchain.pem
fi

### Send certbot Emission/Renewal to background
$(while :; do /opt/certbot-auto.sh; sleep "${RENEW_INTERVAL:-12h}"; done;) &

### Check for changes in the certificate (i.e renewals or first start)
$(while inotifywait -e close_write /usr/share/nginx/certificates; do nginx -s reload; done) &

nginx -g "daemon off;"
