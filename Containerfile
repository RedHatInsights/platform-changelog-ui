FROM registry.redhat.io/ubi8/ubi-minimal:latest

WORKDIR /usr/src/app

ARG SERVICE_HOST
ENV API_HOST=${SERVICE_HOST:+$SERVICE_HOST}
ENV API_HOST=${SERVICE_HOST:-localhost}

USER 0

RUN microdnf module disable nodejs && \
    microdnf module enable nodejs:16
RUN microdnf install nodejs nginx

COPY package.json yarn.lock ./
RUN npm install --global yarn && yarn install


COPY src ./src
COPY public ./public
COPY jsconfig.json ./

RUN yarn build

RUN rm -rfv /usr/share/nginx/html && \
    mv /usr/src/app/build /usr/share/nginx/html && \
    chown nginx:nginx -R /usr/share/nginx/html && \
    chmod 777 -R /var/log/nginx && \
    mkdir -p /var/cache/nginx && \
    chown nginx:nginx -R /var/cache/nginx

# This file is not used in openshift, but is in the image
# in the event it is used for local development
COPY nginx.conf /etc/nginx/nginx.conf

RUN sed -i s/API_HOST/$API_HOST/g /etc/nginx/nginx.conf

EXPOSE 8080
STOPSIGNAL SIGTERM
USER 100

CMD ["nginx", "-g", "daemon off;"]