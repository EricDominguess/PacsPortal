# Estágio 1: Build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copia os .csproj e restaura dependências
COPY PortalDoCliente.Domain/PortalDoCliente.Domain.csproj PortalDoCliente.Domain/
COPY PortalDoCliente.Infrastructure/PortalDoCliente.Infrastructure.csproj PortalDoCliente.Infrastructure/
COPY PortalDoCliente.API/PortalDoCliente.API.csproj PortalDoCliente.API/
RUN dotnet restore PortalDoCliente.API/PortalDoCliente.API.csproj

# Copia todo o código e publica
COPY . .
RUN dotnet publish PortalDoCliente.API/PortalDoCliente.API.csproj -c Release -o /app/publish --no-restore

# Estágio 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Production

EXPOSE 5000
ENTRYPOINT ["dotnet", "PortalDoCliente.API.dll"]
