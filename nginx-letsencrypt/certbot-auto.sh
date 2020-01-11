if [[ ! -f /var/www/certbot-auto ]]; then
    mkdir -p /var/www/certbot-auto
fi
certbot-auto certonly \
		--verbose 
        --config-dir "/etc/letsencrypt" \
		--agree-tos \
		--domains "www.techrecruiterapp.com" \
		--domains "techrecruiterapp.com" \
		--email "omariosalkos@gmail.com" \
		--expand \
		--noninteractive \
		--webroot -w /var/www/certbot-auto \
		--dry-run
		$OPTIONS || true

if [[ -f "/etc/letsencrypt/live/techrecruiterapp.com/privkey.pem" ]]; then
    cp "/etc/letsencrypt/live/techrecruiterapp.com/privkey.pem" /usr/share/nginx/certificates/privkey.pem
    cp "/etc/letsencrypt/live/techrecruiterapp.com/fullchain.pem" /usr/share/nginx/certificates/fullchain.pem
fi
# /usr/local/bin/certbot-auto
# 		--os-packages-only \
		# --debug \
		# --debug-challenges \
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