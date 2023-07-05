# Stage 1: Compile and build Angular
FROM node:latest as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build

#Stage 2: Servewith nginx
FROM nginx:latest
COPY --from=build /usr/local/app/dist/chat-app /usr/share/nginx/html
EXPOSE 80