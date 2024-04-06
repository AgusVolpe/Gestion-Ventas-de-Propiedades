# Establece la imagen base en este caso es node:21
FROM node:21-alpine3.18 as build

# Copia todo el contenido del directorio actual al directorio /app en la imagen
COPY . /app

# Se mueve al directorio app
WORKDIR /app

# Copia el package.json en el directorio actual 'app'
COPY package.json package.json

# Instala las dependencias del proyecto utilizando npm
RUN npm install \
    && npm install --save-dev @angular/cli@17.0.10 sass \
    && npx ng build

# Establece una nueva etapa en la construcción utilizando la imagen de nginx para el build del proyecto
FROM nginx:1.25.3-alpine as runtime

# Expone el puerto 80 para permitir la comunicación
EXPOSE 80

# Copia los archivos generados en la etapa de construcción desde el directorio /app/dist/shopping-cart/browser al directorio /usr/share/nginx/html en la imagen de nginx
COPY --from=build /app/dist/gestion-ventas/browser /usr/share/nginx/html

# Define el comando para ejecutar nginx al iniciar el contenedor
CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;'"]