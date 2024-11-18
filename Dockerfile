# Usar imagem oficial do Node.js
FROM node:18

# Instalar MongoDB
RUN apt-get update && apt-get install -y mongodb

# Definir diretório de trabalho
WORKDIR /app

# Copiar os arquivos do projeto
COPY . .

# Instalar dependências
RUN npm install

# Expor porta do MongoDB
EXPOSE 27017

# Rodar MongoDB e o app
CMD mongod --fork --logpath /var/log/mongodb.log && npm start
