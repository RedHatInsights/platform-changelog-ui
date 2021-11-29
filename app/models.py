from app import db


class Commits(db.Model):
    __tablename__ = 'commits'

    id = db.Column(db.Integer, primary_key=True)
    repo = db.Column(db.String(128))
    commit = db.Column(db.String(41))
    title = db.Column(db.String(128))
    timestamp = db.Column(db.String(20))
    author = db.Column(db.String(50))
    message = db.Column(db.String(), nullable=True)
    branch_name = db.Column(db.String(30))

    def __init__(self, repo,
                 commit,
                 title,
                 timestamp,
                 author,
                 message,
                 branch_name):
        self.repo = repo
        self.commit = commit
        self.title = title
        self.timestamp = timestamp
        self.author = author
        self.message = message
        self.branch_name = branch_name

    def to_json(self):
        return dict(repo=self.repo,
                    commit=self.commit,
                    title=self.title,
                    timestamp=self.timestamp,
                    author=self.author,
                    message=self.message,
                    branch=self.branch_name)
