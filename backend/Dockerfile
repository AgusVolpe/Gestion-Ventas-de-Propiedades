FROM mcr.microsoft.com/dotnet/sdk:8.0 as build

WORKDIR /source

COPY . .

RUN dotnet restore \
    && dotnet publish --configuration Release -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 as runtime

COPY --from=build /publish/ /app

WORKDIR /app

EXPOSE 8080

ENTRYPOINT [ "dotnet", "Api.dll"]