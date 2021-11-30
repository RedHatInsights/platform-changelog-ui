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
$ docker exec -it gumbaroo_web_1 flask shell
```

To reset your local database:
```
$ docker-compose down --volumes
```
