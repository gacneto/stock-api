# --- Estágio 1: Builder (Construtor) ---
# Usamos uma imagem Node.js para construir nossa aplicação. 'alpine' é uma versão leve.
FROM node:18-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de dependência primeiro para aproveitar o cache do Docker
COPY package*.json ./

# Instala as dependências de produção e desenvolvimento
RUN npm install

# Copia todo o resto do código do projeto para o container
COPY . .

# Executa o comando de build do NestJS, que cria a pasta 'dist' com o código otimizado
RUN npm run build

# --- Estágio 2: Production (Produção) ---
# Começamos de uma nova imagem limpa para manter a imagem final pequena
FROM node:18-alpine

WORKDIR /usr/src/app

# Copia apenas a pasta 'dist' (nosso app compilado) e 'node_modules' do estágio anterior
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

# O comando que será executado para iniciar nossa API quando o container subir
CMD ["node", "dist/main"]