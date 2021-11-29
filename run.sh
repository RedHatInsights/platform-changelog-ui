#!/bin/sh

if [ "x$FLASK_ENV" = "xdevelopment" ]
then
  flask run --host=0.0.0.0 --reload
else
  gunicorn -w 4 -b 0.0.0.0:5000 app:app
fi
