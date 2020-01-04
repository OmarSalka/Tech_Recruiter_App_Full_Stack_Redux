if [[ ! -f /var/www/certbot ]]; then
    mkdir -p /var/www/certbot
fi
certbot certonly \
        --config-dir "${LETSENCRYPT_DIR:-/etc/letsencrypt}" \
		--agree-tos \
		# --domains "$DOMAIN" \
		--domains "www.techrecruiterapp.com" \
		# --email "$EMAIL" \
		--email "omarsalka9@gmail.com" \
		--expand \
		--noninteractive \
		--webroot \
		--webroot-path /var/www/certbot \
		$OPTIONS || true

# if [[ -f "${LETSENCRYPT_DIR:-/etc/letsencrypt}/live/$DOMAIN/privkey.pem" ]]; then
#     cp "${LETSENCRYPT_DIR:-/etc/letsencrypt}/live/$DOMAIN/privkey.pem" /usr/share/nginx/certificates/privkey.pem
#     cp "${LETSENCRYPT_DIR:-/etc/letsencrypt}/live/$DOMAIN/fullchain.pem" /usr/share/nginx/certificates/fullchain.pem
if [[ -f "${LETSENCRYPT_DIR:-/etc/letsencrypt}/live/www.techrecruiterapp.com/privkey.pem" ]]; then
    cp "${LETSENCRYPT_DIR:-/etc/letsencrypt}/live/www.techrecruiterapp.com/privkey.pem" /usr/share/nginx/certificates/privkey.pem
    cp "${LETSENCRYPT_DIR:-/etc/letsencrypt}/live/www.techrecruiterapp.com/fullchain.pem" /usr/share/nginx/certificates/fullchain.pem
fi