from app import db


class Service(db.Model):
    __tablename__ = 'service'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    display_name = db.Column(db.String())
    gh_repo = db.Column(db.String())
    gl_repo = db.Column(db.String())
    deploy_file = db.Column(db.String())
    namespace = db.Column(db.String())
    branch = db.Column(db.String(), default="master")
    commits = db.relationship('Commits', backref='commit_ref')
    deploys = db.relationship('Deploys', backref='deploy_ref')

    def to_json(self):
        return dict(name=self.name,
                    display_name=self.display_name,
                    gh_repo=self.gh_repo,
                    gl_repo=self.gl_repo,
                    deploy_file=self.deploy_file,
                    namespace=self.namespace,
                    branch=self.branch)


class Commit(db.Model):
    __tablename__ = 'commit'

    id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=False)
    repo = db.Column(db.String(), nullable=False)
    ref = db.Column(db.String(), nullable=False)
    title = db.Column(db.String(), nullable=False)
    timestamp = db.Column(db.String(), nullable=False)
    author = db.Column(db.String(), nullable=False)
    message = db.Column(db.String())
    branch = db.Column(db.String(), nullable=False)

    def to_json(self):
        return dict(repo=self.repo,
                    ref=self.commit,
                    title=self.title,
                    timestamp=self.timestamp,
                    author=self.author,
                    message=self.message,
                    branch=self.branch)


class Deploy(db.Model):
    __tablename__ = 'deploy'

    id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=False)
    ref = db.Column(db.String(), nullable=False)
    namespace = db.Column(db.String(), nullable=False)
    cluster = db.Column(db.String(), nullable=False)
    image = db.Column(db.String(), nullable=False)

    def to_json(self):
        return dict(ref=self.ref,
                    namespace=self.namespace,
                    cluster=self.cluster,
                    image=self.image)
