from app import db


class Services(db.Model):
    __tablename__ = 'services'

    id = db.Column(db.Integer, primary_key=True)
    service = db.Column(db.String(), nullable=False)
    display_name = db.Column(db.String())
    gh_repo = db.Column(db.String())
    gl_repo = db.Column(db.String())
    deploy_file = db.Column(db.String(), nullable=False)
    namespace = db.Column(db.String())
    branch = db.Column(db.String(), default="master")
    commits = db.relationship('Commits', backref='commit_ref')
    deploys = db.relationship('Deploys', backref='deploy_ref')

    def __init__(self,
                 service,
                 display_name,
                 gh_repo,
                 gl_repo,
                 deploy_file,
                 namespace,
                 branch):
        self.service = service
        self.display_name = display_name
        self.gh_repo = gh_repo
        self.gl_repo = gl_repo
        self.deploy_file = deploy_file
        self.namespace = namespace
        self.branch = branch

    def to_json(self):
        return dict(service=self.service,
                    display_name=self.display_name,
                    gh_repo=self.gh_repo,
                    gl_repo=self.gl_repo,
                    deploy_file=self.deploy_file,
                    namespace=self.namespace,
                    branch=self.branch)


class Commits(db.Model):
    __tablename__ = 'commits'

    id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'))
    repo = db.Column(db.String(), nullable=False)
    commit = db.Column(db.String(), nullable=False)
    title = db.Column(db.String(), nullable=False)
    timestamp = db.Column(db.String(), nullable=False)
    author = db.Column(db.String(), nullable=False)
    message = db.Column(db.String())
    branch = db.Column(db.String(), nullable=False)

    def __init__(self,
                 repo,
                 commit,
                 title,
                 timestamp,
                 author,
                 message,
                 branch):
        self.repo = repo
        self.commit = commit
        self.title = title
        self.timestamp = timestamp
        self.author = author
        self.message = message
        self.branch = branch

    def to_json(self):
        return dict(repo=self.repo,
                    commit=self.commit,
                    title=self.title,
                    timestamp=self.timestamp,
                    author=self.author,
                    message=self.message,
                    branch=self.branch)


class Deploys(db.Model):
    __tablename__ = 'deploys'

    id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'))
    ref = db.Column(db.String(), nullable=False)
    namespace = db.Column(db.String(), nullable=False)
    cluster = db.Column(db.String(), nullable=False)
    image = db.Column(db.String(), nullable=False)

    def __init__(self,
                 ref,
                 namespace,
                 cluster,
                 image):
        self.ref = ref
        self.namespace = namespace
        self.cluster = cluster
        self.image = image

    def to_json(self):
        return dict(ref=self.ref,
                    namespace=self.namespace,
                    cluster=self.cluster,
                    image=self.image)
