# Estágio 1: Compilação (Build)
FROM node:20-alpine AS build
WORKDIR /app

# Copia os arquivos de dependências e instala
COPY package*.json ./
RUN npm install

# Copia o resto do código fonte e renderiza o build de produção
COPY . .
RUN npm run build

# Estágio 2: Produção (Servidor Nginx)
FROM nginx:stable-alpine

# Copia os arquivos compilados do estágio anterior para a pasta pública do Nginx
# (Nota: mude para /app/build se o seu projeto usar Create React App em vez de Vite)
COPY --from=build /app/dist /usr/share/nginx/html

# Ajuste clássico para sistemas Single Page Application (SPA) não darem erro 404 ao atualizar rotas internas
RUN sed -i 's/try_files $uri $uri\/ =404;/try_files $uri $uri\/ \/index.html;/g' /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]