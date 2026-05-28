FROM nginx:alpine

# Módulo mp4 para streaming de video
RUN apk add --no-cache nginx-mod-http-mp4 || true

# Configuración personalizada de Nginx
RUN printf 'server {\n\
    listen 8080;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    # Aumentar límite de body y timeout para archivos grandes\n\
    client_max_body_size 100M;\n\
\n\
    # Tipo correcto para mp4\n\
    types {\n\
        video/mp4  mp4;\n\
        text/html  html htm;\n\
        text/css   css;\n\
        application/javascript js;\n\
        image/png  png;\n\
        image/jpeg jpg jpeg;\n\
        image/x-icon ico;\n\
        image/svg+xml svg;\n\
        font/woff2 woff2;\n\
        font/woff  woff;\n\
    }\n\
\n\
    location ~* \.mp4$ {\n\
        add_header Accept-Ranges bytes;\n\
        add_header Cache-Control "public, max-age=604800";\n\
    }\n\
\n\
    location / {\n\
        try_files $uri $uri/ =404;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

# Copia los archivos de tu web
COPY . /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
