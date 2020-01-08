if [[ ! -f /var/www/certbot ]]; then
    mkdir -p /var/www/certbot
fi
certbot certonly \
		--debug \
        --config-dir "${LETSENCRYPT_DIR:-/etc/letsencrypt}" \
		--agree-tos \
		--domains "www.techrecruiterapp.com" \
		--domains "techrecruiterapp.com" \
		--email "omariosalkos@gmail.com" \
		--expand \
		--noninteractive \
		--debug-challenges \
		--webroot -w /var/www/certbot \
		--dry-run \
		$OPTIONS || true

if [[ -f "${LETSENCRYPT_DIR:-/etc/letsencrypt}/live/techrecruiterapp.com/privkey.pem" ]]; then
    cp "${LETSENCRYPT_DIR:-/etc/letsencrypt}/live/techrecruiterapp.com/privkey.pem" /usr/share/nginx/certificates/privkey.pem
    cp "${LETSENCRYPT_DIR:-/etc/letsencrypt}/live/techrecruiterapp.com/fullchain.pem" /usr/share/nginx/certificates/fullchain.pem
fi
# if [[ ! -f /var/www/certbot ]]; then
#     mkdir -p /var/www/certbot
# fi
# certbot certonly \
#         --config-dir "${LETSENCRYPT_DIR:-/etc/letsencrypt}" \
# 		--agree-tos \
# 		--domains "www.techrecruiterapp.com,techrecruiterapp.com" \
# 		--email "omariosalkos@gmail.com" \
# 		--expand \
# 		--noninteractive \
# 		--webroot \
# 		--webroot-path /var/www/certbot \
# 		--dry-run \
# 		$OPTIONS || true

# if [[ -f "${LETSENCRYPT_DIR:-/etc/letsencrypt}/live/techrecruiterapp.com/privkey.pem" ]]; then
#     cp "${LETSENCRYPT_DIR:-/etc/letsencrypt}/live/techrecruiterapp.com/privkey.pem" /usr/share/nginx/certificates/privkey.pem
#     cp "${LETSENCRYPT_DIR:-/etc/letsencrypt}/live/techrecruiterapp.com/fullchain.pem" /usr/share/nginx/certificates/fullchain.pem
# fi