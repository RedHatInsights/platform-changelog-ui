import yaml
from api import app, db
from api.models import *
from pathlib import Path
from sqlalchemy.orm.exc import NoResultFound


@app.cli.command("seeds")
def seeds():
    path = Path(__file__).parent / "../services.yml"
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
