# NodeJS Image
FROM node:18

# Install MongoDB
RUN apt-get update && apt-get install -y mongodb

# Define workdir
WORKDIR /app

# Copy files
COPY . .

# Install Dependencies
RUN npm install

# App port
EXPOSE 5000

# MondoDB port
EXPOSE 27017

# Run MongoDB and app
CMD mongod --fork --logpath /var/log/mongodb.log && node server.js
