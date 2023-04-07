# Platform Changelog UI

Global Platform Commit History Organizer Frontend

For backend code, see [Platform Changelog Go](https://www.github.com/redhatinsights/platform-changelog-go)

## Requirements

It is recommended to use [Podman](https://www.podman.io/) to run the application.

    podman 
    node version 14 or higher
    npm
    yarn

## Run the app locally

### Using a Makefile

The following shortcuts are available via the [Makefile](./Makefile):

    make local-init # standup the app locally using nodejs and yarn
    make build-container # build the container image
    make run-container # run the container in the background
    make run-container-interactive # run the container in the foreground
    make reset-container # stop and remove the current container
    make full-start-container # build and run in the background

The above commands assume podman is used, however, you can override this to use docker by setting an environment variable.

    CONTAINER_RUNTIME=/usr/bin/docker make local-init

The following vars are available if further adjustments need to be made when running `make`:

    LOCAL_PORT # defaults to 3000
    BUILD_FILE # defaults to Containerfile

### Manual Run

To run the ui as a container:
```
$ podman build -t platform-changelog-ui:latest .
$ podman run -it -p 3000:3000 --name platform-changelog platform-changelog-ui:latest
```

To remove a previous container:
```
$ podman rm platform-changelog
```

When accessing the api, you may have to change the proxy address in ```ui/package.json``` from ```localhost``` to your IP.


You can now access the application UI on `http://localhost:3000/ui/`. 


To reset your local database:
```
$ docker-compose down --volumes
```

## Define a service
First, add your service to `services.yml` under `services` with the name of your
service  as the key.

The following attributes are required:
```yaml
display_name:
name:
```
along with one of:
```yaml
gh_repo:
# or
gl_repo:
```