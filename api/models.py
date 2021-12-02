from api import db
from sqlalchemy.inspection import inspect
from sqlalchemy.orm.collections import InstrumentedList


class Serializer(object):
    # You can override this method in your model if you need to remove certain
    # attributes in serialized objects, like so:
    #
    # def serialize(self):
    #     obj = Serializer.serialize(self)
    #     del obj["some_field"]
    #     return obj

    def serialize(self, fields_to_strip=[]):
        return {key: getattr(self, key) for key in inspect(self).attrs.keys() if key not in fields_to_strip}

    @staticmethod
    def serialize_list(obj_list):
        return [obj.serialize() for obj in obj_list]


class Service(db.Model, Serializer):
    __tablename__ = 'service'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False, unique=True)
    display_name = db.Column(db.String())
    gh_repo = db.Column(db.String())
    gl_repo = db.Column(db.String())
    deploy_file = db.Column(db.String())
    namespace = db.Column(db.String())
    branch = db.Column(db.String(), default="master")
    commits = db.relationship('Commit', backref='commit_ref')
    deploys = db.relationship('Deploy', backref='deploy_ref')

    def to_json(self):
        return dict(name=self.name,
                    display_name=self.display_name,
                    gh_repo=self.gh_repo,
                    gl_repo=self.gl_repo,
                    deploy_file=self.deploy_file,
                    namespace=self.namespace,
                    branch=self.branch)

    def serialize(self):
        fields_to_strip = ("commits", "deploys", "id")
        obj = Serializer.serialize(self, fields_to_strip)
        return obj


class Commit(db.Model, Serializer):
    __tablename__ = 'commit'

    id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=False)
    repo = db.Column(db.String(), nullable=False)
    ref = db.Column(db.String(), nullable=False)
    title = db.Column(db.String(), nullable=False)
    timestamp = db.Column(db.String(), nullable=False)
    author = db.Column(db.String(), nullable=False)
    message = db.Column(db.String())

    def to_json(self):
        return dict(repo=self.repo,
                    ref=self.commit,
                    title=self.title,
                    timestamp=self.timestamp,
                    author=self.author,
                    message=self.message,
                    branch=self.branch)

    def serialize(self):
        fields_to_strip = ("commit_ref", "service_id", "id")
        obj = Serializer.serialize(self, fields_to_strip)
        obj["service"] = self.commit_ref.display_name
        return obj


class Deploy(db.Model, Serializer):
    __tablename__ = 'deploy'

    id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=False)
    ref = db.Column(db.String(), nullable=False)
    namespace = db.Column(db.String(), nullable=False)
    cluster = db.Column(db.String(), nullable=False)
    image = db.Column(db.String(), nullable=False)
    timestamp = db.Column(db.DateTime(), nullable=False)

    def to_json(self):
        return dict(ref=self.ref,
                    namespace=self.namespace,
                    cluster=self.cluster,
                    image=self.image)

    def serialize(self):
        fields_to_strip = ("deploy_ref", "service_id", "id")
        obj = Serializer.serialize(self, fields_to_strip)
        obj["service"] = self.deploy_ref.display_name
        return obj
