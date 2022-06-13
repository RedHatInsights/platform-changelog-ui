# gumbaroo
Global Platform Commit History Organizer

## Run the app locally:
The project's backend has been moved to [this repo](https://github.com/RedHatInsights/platform-changelog-go) and rewritten in go.

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


You can now access the application UI on `http://localhost:3000`. 


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