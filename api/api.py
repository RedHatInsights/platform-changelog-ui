import hmac
import hashlib

from api import app, db
from api.models import *
from flask import jsonify, request


def verify_hmac_hash(data, signature):
    mac = hmac.new(app.config.get("GITHUB_SECRET").encode('utf-8'), data.encode('utf-8'), hashlib.sha256)
    return hmac.compare_digest('sha256=' + mac.hexdigest(), str(signature))


@app.route("/status")
def status():
    return jsonify(status="ok")


@app.route("/github-webhook", methods=["POST"])
def github_webhook():
    signature = request.headers.get("X-Hub-Signature-256")
    data = request.get_data(as_text=True)

    try:
        if not verify_hmac_hash(data, signature):
            return jsonify(msg="Unable to validate webhook")

        if request.headers.get("X-Github-Event") == "ping":
            return jsonify(msg="ok")

        if not request.headers.get("X-Github-Event") == "push":
            return jsonify(msg="Event from this repo is not a push event")

        payload = request.json
        service = Service.query.filter_by(gh_repo=payload["repository"]["url"]).first()
        branch = payload["ref"].split("/")[2]

        if not service:
            return jsonify(msg=f"{payload['repository']['name']} is not a recognized service")

        if branch != service.branch:
            return jsonify(msg=f"{branch} is not a monitored branch")

        # commit list is sorted earliest to latest so we want to reverse it before
        # we insert it into the DB
        payload["commits"].reverse()
        for commit in payload["commits"]:
            commit_body = commit["message"].splitlines()
            title = commit_body[0]
            message = None
            if len(commit_body) >= 1:
                message = ('\n').join(commit_body[1].splitlines()[1:]).strip()
            c = Commit(service_id=service.id,
                              ref=commit["id"],
                              title=title,
                              repo=payload["repository"]["url"],
                              timestamp=payload["head_commit"]["timestamp"],
                              author=commit["author"]["username"],
                              message=message)
            db.session.add(c)
        db.session.commit()
        return jsonify(msg=f"commit date inserted for {payload['repository']['name']}: {payload['after']}")
    except Exception as e:
        return jsonify(msg=f"Webhook failed to process: {e}")


@app.route("/gitlab-webhook", methods=["POST"])
def gitlab_webhook():
    signature = request.headers.get("X-Gitlab-Token")

    try:
        if signature != app.config.get("GITLAB_SECRET"):
            return jsonify(msg="Unable to validate webhook")

        if request.headers.get("X-Gitlab-Event") != "Push Hook":
            return jsonify(msg="Event from this repo is not a push event")

        payload = request.json
        service = Service.query.filter_by(gl_repo=payload["project"]["web_url"]).first()
        branch = payload["ref"].split("/")[2]

        if not service:
            return jsonify(msg=f"{payload['project']['name']} is not a recognized service")

        if branch != service.branch:
            return jsonify(msg=f"{branch} is not a monitored branch")

        for commit in payload["commits"]:
            commit_body = commit["message"].splitlines()
            title = commit_body[0]
            message = None
            if len(commit_body) >= 1:
                message = ('\n').join(commit_body[1].splitlines()[1:]).strip()
            c = Commit(service_id=service.id,
                       ref=commit["id"],
                       title=title,
                       repo=payload["project"]["web_url"],
                       timestamp=payload["commits"][-1]["timestamp"],
                       author=commit["author"]["name"],
                       message=message)
            db.session.add(c)
        db.session.commit()
        return jsonify(msg=f"commit data inserted for {payload['project']['name']}: {payload['after']}")
    except Exception as e:
        return jsonify(msg=f"Webhook failed to process: {e}")


@app.route("/services/")
def get_services():
    services = Service.query.all()
    return jsonify(Service.serialize_list(services))

@app.route("/commits/")
def get_commits():
    commits = Commit.query.all()
    return jsonify(Service.serialize_list(commits))
