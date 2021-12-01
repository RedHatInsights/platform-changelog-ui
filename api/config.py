import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    GITHUB_SECRET = os.getenv("GITHUB_SECRET", "")
    GITLAB_SECRET = os.getenv("GITLAB_SECRET", "")
