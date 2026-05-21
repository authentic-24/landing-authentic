FROM nginx:alpine

# Reemplaza el puerto 80 por el 8080 en la configuración por defecto de Nginx
RUN sed -i 's/listen       80;/listen 8080;/g' /etc/nginx/conf.d/default.conf

# Copia los archivos de tu web
COPY . /usr/share/nginx/html

# Informa que ahora usamos el puerto 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]