FROM nginx
RUN mkdir /app
COPY ./ /app
WORKDIR /app
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
