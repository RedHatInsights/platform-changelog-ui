from app import db


class Commits(db.Model):
    __tablename__ = 'commits'

    id = db.Column(db.Integer, primary_key=True)
    service = db.Column(db.String, db.ForeignKey('Services.service'))
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

class Services(db.Model):
    __tablename__ = 'services'


    id = db.Column(db.Integer, primary_key=True)
    service = db.Column(db.String(50))
    display_name = db.Column(db.String(40))
    gh_repo = db.Column(db.String(128))
    gl_repo = db.Column(db.String(128))
    deploy_file = db.Column(db.String(128))
    namespace = db.Column(db.String(50))
    branch_name = db.Column(db.String(30))

    def __init__(self, service,
                 display_name,
                 gh_repo,
                 gl_repo,
                 deploy_file,
                 namespace,
                 branch_name):
        self.service = service
        self.display_name = display_name
        self.gh_repo = gh_repo
        self.gl_repo = gl_repo
        self.deploy_file = deploy_file
        self.namespace = namespace
        self.branch_name = branch_name

    def to_json(self):
        return dict(service=self.service,
                    display_name=self.display_name,
                    gh_repo=self.gh_repo,
                    gl_repo=self.gl_repo,
                    deploy_file=self.deploy_file,
                    namespace=self.namespace,
                    branch=self.branch_name)

class Deploys(db.Model):
    __tablename__ = 'deploys'

    id = db.Column(db.Integer, primary_key=True)
    service = db.Column(db.String, db.ForeignKey('Services.service'))
    ref = db.Column(db.String(40))
    namespace = db.Column(db.String(128))
    cluster = db.Column(db.String(128))
    image = db.Column(db.String(50))

    def __init__(self, service,
                 ref,
                 namespace,
                 cluster,
                 image):
        self.service = service
        self.ref = ref
        self.namespace = namespace
        self.cluster = cluster
        self.image = image


    def to_json(self):
        return dict(service=self.service,
                    ref=self.ref,
                    namespace=self.namespace,
                    cluster=self.cluster,
                    image=self.image)
