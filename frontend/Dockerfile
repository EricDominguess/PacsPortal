# Estágio 1: Compilação (Build)
FROM node:20-alpine AS build
WORKDIR /app

# Argumento de build para a URL da API (vazio = usa proxy reverso do nginx)
ARG VITE_API_URL=""
ENV VITE_API_URL=$VITE_API_URL

# Copia os arquivos de dependências e instala
COPY package*.json ./
RUN npm install

# Copia o resto do código fonte e renderiza o build de produção
COPY . .
RUN npm run build

# Estágio 2: Produção (Servidor Nginx)
FROM nginx:stable-alpine

# Copia os arquivos compilados do estágio anterior para a pasta pública do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Config do Nginx com proxy reverso para a API
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
