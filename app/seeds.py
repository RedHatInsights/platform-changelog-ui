import yaml
from app import app, db
from app.models import *
from pathlib import Path
from sqlalchemy.orm.exc import NoResultFound

@app.cli.command("seeds")
def seeds():
    path = Path(__file__).parent / "../services.yml"
    with path.open() as stream:
        try:
            services = yaml.safe_load(stream)["services"]
            for service in services:
                metadata = services.get(service)
                try:
                    s = Service.query.filter_by(name=service).one()
                    s.display_name = metadata.get("display_name")
                    s.gh_repo = metadata.get("gh_repo")
                    s.gl_repo = metadata.get("gl_repo")
                    s.deploy_file = metadata.get("deploy_file")
                    s.namespace = metadata.get("namespace")
                    s.branch = metadata.get("branch")
                except NoResultFound:
                    s = Service(
                        name=service,
                        display_name=metadata.get("display_name"),
                        gh_repo=metadata.get("gh_repo"),
                        gl_repo=metadata.get("gl_repo"),
                        deploy_file=metadata.get("deploy_file"),
                        namespace=metadata.get("namespace"),
                        branch=metadata.get("branch"),
                    )
                db.session.add(s)
                db.session.commit()
        except yaml.YAMLError as exc:
            print(f"Failed to update services: {exc}")
