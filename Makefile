CONTAINER_RUNTIME=/usr/bin/podman
BUILD_FILE=./Containerfile
LOCAL_PORT=3000

local-init:
	yarn install 
	yarn start

build-container:

	${CONTAINER_RUNTIME} build --build-arg SERVICE_HOST=localhost -t platform-changelog-ui:latest -f ${BUILD_FILE} .

run-container:

	${CONTAINER_RUNTIME} run -d -p ${LOCAL_PORT}:8080 --name platform-changelog-ui platform-changelog-ui:latest && \
	echo "Container is running on port ${LOCAL_PORT}"

run-nginx:
	podman run -it --rm -d -p 8080:80 --name web nginx
	echo "Nginx is running on port 8080"

run-container-interactive:

	${CONTAINER_RUNTIME} run -it -p ${LOCAL_PORT}:8000 --name platform-changelog-ui platform-changelog-ui:latest

reset-container:

	${CONTAINER_RUNTIME} stop platform-changelog-ui && ${CONTAINER_RUNTIME} rm platform-changelog-ui

full-start-container: build-container run-container

