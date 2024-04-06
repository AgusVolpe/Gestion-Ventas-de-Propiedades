# Establece la imagen base como el SDK de .NET
FROM mcr.microsoft.com/dotnet/sdk:8.0.101-jammy-amd64 as build

# Copia todo el contenido del directorio actual al directorio '/source' en la imagen
COPY . /source

# Se mueve al directorio '/source/Novit.Academia'
WORKDIR /source/Api

# Ejecuta la restauración de las dependencias del proyecto y publica la aplicación
RUN dotnet restore \
    && dotnet publish --configuration Release -o /publish

# Establece una nueva etapa en la construcción utilizando la imagen de ASP.NET
FROM mcr.microsoft.com/dotnet/aspnet:8.0.1-jammy-amd64 as runtime

# Expone el puerto 5000 para permitir la comunicación
EXPOSE 5000

ENV ASPNETCORE_URLS="http://0.0.0.0:5000"

# Copia los archivos publicados desde la etapa de compilación al directorio '/app' en la imagen de ASP.NET
COPY --from=build /publish/ /app

#Se mueve al directoio '/app'
WORKDIR /app

# Define el punto de entrada para ejecutar la aplicación al iniciar el contenedor
ENTRYPOINT [ "dotnet", "Api.dll"]