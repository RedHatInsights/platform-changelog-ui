import yaml
from api import app, db
from api.models import *
from sqlalchemy.orm.exc import NoResultFound

import string
import random
import pytz
import datetime
import click


def generate_commit_hash():
    ran = ''.join(random.choices(string.ascii_lowercase + string.digits, k=41))
    return str(ran)


def random_timestamp():
    rtime = datetime.datetime.now(pytz.timezone('America/New_York')).replace(hour=random.randint(8, 14), minute=random.randint(0, 59))
    rday = rtime + datetime.timedelta(days=random.randint(0, 5))
    return rday.isoformat('T', 'seconds')


@app.cli.command("seeds")
@click.option('--local', is_flag=True)
def seeds(local):
    path = app.config.get("SERVICE_CONFIG")
    with path.open() as stream:
        try:
            services_from_file = yaml.safe_load(stream)["services"]
            for service_key in services_from_file:
                metadata = services_from_file.get(service_key)
                try:
                    service_object = Service.query.filter_by(name=service_key).one()
                except NoResultFound:
                    service_object = Service()
                for key, value in service_dict(service_key, metadata).items():
                    setattr(service_object, key, value)
                db.session.add(service_object)
                db.session.commit()
                if local:
                    service_object = Service.query.filter_by(name=service_key).one()
                    i = 0
                    while i <= 5:
                        commit_object = Commit()
                        deploy_object = Deploy()
                        for key, value in commit_dict(service_object.gh_repo, service_object.id).items():
                            setattr(commit_object, key, value)
                        for key, value in deploy_dict(service_object, commit_object.ref).items():
                            setattr(deploy_object, key, value)

                        db.session.add(commit_object)
                        db.session.add(deploy_object)
                        i += 1
                    db.session.commit()
        except yaml.YAMLError as exc:
            print(f"Failed to update services: {exc}")


def service_dict(service, metadata):
    return {
        "name": service,
        "display_name": metadata.get("display_name"),
        "gh_repo": metadata.get("gh_repo"),
        "gl_repo": metadata.get("gl_repo"),
        "deploy_file": metadata.get("deploy_file"),
        "namespace": metadata.get("namespace"),
        "branch": metadata.get("branch"),
    }


def commit_dict(repo, service_id):
    ref = generate_commit_hash()
    time = random_timestamp()
    return {
            "service_id": service_id,
            "repo": repo,
            "ref": ref,
            "title": "This is a test Title",
            "timestamp": time,
            "author": "Bob Denver",
            "message": "I made changes. Weee!"
           }


def deploy_dict(service_object, commit_ref):
    image = commit_ref[:7]
    time = random_timestamp()
    return {
            "service_id": service_object.id,
            "ref": commit_ref,
            "namespace": service_object.namespace,
            "cluster": "Test Cluster",
            "image": image,
            "timestamp": time
           }
