FROM node:21-alpine
WORKDIR /app
RUN mkdir dist
COPY package.json package-lock.json ./
RUN npm install --omit-dev
EXPOSE 3000
COPY dist dist
ENTRYPOINT ["npm", "start"]