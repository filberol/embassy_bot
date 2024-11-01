FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

ARG COMMIT_NAME="No commit info"
ENV COMMIT_NAME=$COMMIT_NAME
CMD ["npm", "run", "docker"]
