FROM node as react-build
WORKDIR /var/www/html
COPY package.json ./
COPY package-lock.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]