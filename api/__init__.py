from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object("api.config.Config")
db = SQLAlchemy(app)

Migrate(app, db)

from api import api, seeds  # noqa: E402,F401
