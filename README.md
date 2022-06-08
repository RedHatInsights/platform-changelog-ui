# gumbaroo
Global Platform Commit History Organizer

## Run the app locally:
The project's backend has been moved to [this repo](https://github.com/RedHatInsights/platform-changelog-go) and rewritten in go.

To run the ui as a container:
```
$ cd ui
$ podman build -t platform-changelog-ui:latest .
$ podman run -it -p 3000:3000 --name platform-changelog platform-changelog-ui:latest
```

To remove a previous container:
```
$ podman rm platform-changelog
```

When accessing the api, you may have to change the proxy address in ```ui/package.json``` from ```localhost``` to your IP.
##

To run the ui with the python project, you'll need to copy `.env.example` to `.env`, which should work as is.
After doing so, you can run the application with `docker-compose`:
```
$ pipenv shell
$ docker-compose up
```
You can now access the application UI on `http://localhost:3000`, and the API
directly on `http://localhost:5000`.

To start a shell session:
```
$ flask shell

# may need to be run within the context of the web container, such as:
$ docker exec -it gumbaroo_api_1 flask shell
```

To reset your local database:
```
$ docker-compose down --volumes

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

### Run seeds to populate service metadata
```
$ flask seeds [--local]

# may need to be run within the context of the web container, such as:
$ docker exec -it gumbaroo_api_1 flask seeds [--local]
```
