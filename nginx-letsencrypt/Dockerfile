FROM nginx:1.17.6-alpine
RUN apk update && apk add bash 
RUN apk add inotify-tools openssl ca-certificates
# RUN yum install certbot python2-certbot-nginx yum install python2-acme
RUN wget https://dl.eff.org/certbot-auto
RUN mv certbot-auto /usr/local/bin/certbot-auto
RUN chown root /usr/local/bin/certbot-auto
RUN chmod 0755 /usr/local/bin/certbot-auto
RUN /usr/local/bin/certbot-auto --help
WORKDIR /opt
COPY entrypoint.sh nginx-letsencrypt
COPY certbot-auto.sh certbot-auto.sh
COPY default.conf /etc/nginx/conf.d/default.conf
COPY ssl-options/ /etc/ssl-options
RUN chmod +x nginx-letsencrypt && \
    chmod +x certbot-auto.sh 
ENTRYPOINT ["./nginx-letsencrypt"]

# FROM nginx:1.15-alpine 
# RUN apk add inotify-tools certbot openssl ca-certificates
# RUN yum install certbot python2-certbot-nginx yum install python2-acme
# WORKDIR /opt
# COPY entrypoint.sh nginx-letsencrypt
# COPY certbot.sh certbot.sh
# COPY default.conf /etc/nginx/conf.d/default.conf
# COPY ssl-options/ /etc/ssl-options
# RUN chmod +x nginx-letsencrypt && \
#     chmod +x certbot.sh 
# ENTRYPOINT ["./nginx-letsencrypt"]