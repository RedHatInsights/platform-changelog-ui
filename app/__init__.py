from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object("app.config.Config")
db = SQLAlchemy(app)

Migrate(app, db)


from app import models  # noqa: E402,F401


from app import gumbaroo  # noqa: E402,F401
