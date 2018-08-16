openssl req -config local.tripmapper.com.conf -new -sha256 -newkey rsa:2048 \
-nodes -keyout server.key -x509 -days 365 \
-out server.crt
