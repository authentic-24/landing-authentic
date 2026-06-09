FROM nginx:alpine

# 1. Creamos un archivo de configuración personalizado para Nginx
RUN echo "server { \
    listen 8080; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
    try_files \$uri \$uri/ =404; \
    } \
    \
    # Configuración crítica para archivos grandes \
    client_body_buffer_size 16k; \
    client_header_buffer_size 1k; \
    client_max_body_size 100M; \
    large_client_header_buffers 4 8k; \
    sendfile on; \
    tcp_nopush on; \
    tcp_nodelay on; \
    keepalive_timeout 65; \
    }" > /etc/nginx/conf.d/default.conf

# 2. Copiamos los archivos
COPY . /usr/share/nginx/html

# 3. Exponemos el puerto
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]