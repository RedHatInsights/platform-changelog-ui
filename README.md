# gumbaroo
Global Platform Commit History Organizer

### Run the app locally:
First, you'll need to copy `.env.example` to `.env`, which should work as is.
After doing so, you can run the application with `docker-compose`:
```
$ pipenv shell
$ docker-compose up
```

To start a shell session:
```
$ flask shell

# may need to be run within the context of the web container, such as:
$ docker exec -it gumbaroo_web_1 flask shell
```

To reset your local database:
```
$ docker-compose down --volumes

### Define a service
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
$ flask seeds

# may need to be run within the context of the web container, such as:
$ docker exec -it gumbaroo_web_1 flask seeds
```
