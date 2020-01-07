# if [[ ! -f /var/www/techrecruiterapp.com ]]; then
#     mkdir -p /var/www/techrecruiterapp.com
# fi
# certbot certonly \
#         --config-dir "${LETSENCRYPT_DIR:-/etc/letsencrypt}" \
# 		--agree-tos \
# 		--domains "www.techrecruiterapp.com,techrecruiterapp.com" \
# 		--email "omariosalkos@gmail.com" \
# 		--expand \
# 		--noninteractive \
# 		--webroot \
# 		--webroot-path /var/www/techrecruiterapp.com \
# 		--dry-run \
# 		$OPTIONS || true

# if [[ -f "${LETSENCRYPT_DIR:-/etc/letsencrypt}/live/techrecruiterapp.com/privkey.pem" ]]; then
#     cp "${LETSENCRYPT_DIR:-/etc/letsencrypt}/live/techrecruiterapp.com/privkey.pem" /usr/share/nginx/certificates/privkey.pem
#     cp "${LETSENCRYPT_DIR:-/etc/letsencrypt}/live/techrecruiterapp.com/fullchain.pem" /usr/share/nginx/certificates/fullchain.pem
# fi
if [[ ! -f /var/www/certbot ]]; then
    mkdir -p /var/www/certbot
fi
certbot certonly \
        --config-dir "${LETSENCRYPT_DIR:-/etc/letsencrypt}" \
		--agree-tos \
		--domains "www.techrecruiterapp.com,techrecruiterapp.com" \
		--email "omariosalkos@gmail.com" \
		--expand \
		--noninteractive \
		--webroot \
		--webroot-path /var/www/certbot \
		--dry-run \
		$OPTIONS || true

if [[ -f "${LETSENCRYPT_DIR:-/etc/letsencrypt}/live/techrecruiterapp.com/privkey.pem" ]]; then
    cp "${LETSENCRYPT_DIR:-/etc/letsencrypt}/live/techrecruiterapp.com/privkey.pem" /usr/share/nginx/certificates/privkey.pem
    cp "${LETSENCRYPT_DIR:-/etc/letsencrypt}/live/techrecruiterapp.com/fullchain.pem" /usr/share/nginx/certificates/fullchain.pem
fi