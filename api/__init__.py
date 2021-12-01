from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from api.config import Config

app = Flask(__name__)
app.config.from_object(Config())
app.config["SQLALCHEMY_DATABASE_URI"] = app.config.get("DATABASE_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = app.config.get("DB_TRACK_MODIFICATIONS")
db = SQLAlchemy(app)

Migrate(app, db)

from api import api, seeds  # noqa: E402,F401
