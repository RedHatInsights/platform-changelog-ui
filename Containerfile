FROM registry.access.redhat.com/ubi8/nodejs-14-minimal

ENV SKIP_PREFLIGHT_CHECK=true
WORKDIR /usr/src/app/
USER root
COPY . .


RUN npm install
CMD ["npm", "start"]
