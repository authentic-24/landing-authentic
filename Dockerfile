FROM nginx:alpine

# Configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos de tu web
COPY . /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
                                                                    