import hmac
import hashlib
import pytz
import datetime

from dateutil.parser import parse
from api import app, db
from api.models import *
from flask import jsonify, request


def verify_hmac_hash(data, signature):
    mac = hmac.new(app.config.get("GITHUB_SECRET").encode('utf-8'), data.encode('utf-8'), hashlib.sha256)
    return hmac.compare_digest('sha256=' + mac.hexdigest(), str(signature))


def fix_timestamp(time_string):
    time = datetime.datetime.strptime(time_string, "%Y-%m-%dT%H:%M:%S%z")
    return time.astimezone(pytz.utc)


def groom_webhook(payload, host):

    commits = []
    if host == "github":
        service = Service.query.filter_by(gh_repo=payload["repository"]["url"]).first()
        repo_name = payload["repository"]["name"]
        payload["commits"].reverse()
        repo_url = payload["repository"]["url"]
        timestamp = payload["head_commit"]["timestamp"],
    else:
        service = Service.query.filter_by(gl_repo=payload["project"]["web_url"]).first()
        repo_name = payload["project"]["name"]
        repo_url = payload["project"]["web_url"]
        timestamp = payload["commits"][-1]["timestamp"],

    timestamp = fix_timestamp(timestamp[0])

    branch = payload["ref"].split("/")[2]

    if not service:
        return jsonify(msg=f"{repo_name} is not a recognized service")

    if branch != service.branch:
        return jsonify(msg=f"{branch} is not a monitored branch")

    # commit list is sorted earliest to latest so we want to reverse it before
    # we insert it into the DB
    for commit in payload["commits"]:
        commit_body = commit["message"].splitlines()
        title = commit_body[0]
        message = None
        if len(commit_body) >= 1:
            message = ('\n').join(commit_body[1].splitlines()[1:]).strip()
        if host == "github":
            author = commit["author"]["username"]
        else:
            author = commit["author"]["name"]
        c = Commit(service_id=service.id,
                          ref=commit["id"],
                          title=title,
                          repo=repo_url,
                          timestamp=timestamp,
                          author=author,
                          message=message)
        commits.append(c)

    return commits


@app.route("/status")
def status():
    return jsonify(status="ok")


@app.route("/github-webhook", methods=["POST"])
def github_webhook():
    signature = request.headers.get("X-Hub-Signature-256")
    data = request.get_data(as_text=True)

    try:
        if not app.config.get("TESTING"):
            if not verify_hmac_hash(data, signature):
                return jsonify(msg="Unable to validate webhook")

        if request.headers.get("X-Github-Event") == "ping":
            return jsonify(msg="ok")

        if not request.headers.get("X-Github-Event") == "push":
            return jsonify(msg="Event from this repo is not a push event")

        payload = request.json
        commits = groom_webhook(payload, "github")

        for commit in commits:
            db.session.add(commit)

        db.session.commit()
        return jsonify(msg=f"commit data inserted for {payload['repository']['name']}: {payload['after']}")
    except Exception as e:
        return jsonify(msg=f"Webhook failed to process: {e}")


@app.route("/gitlab-webhook", methods=["POST"])
def gitlab_webhook():
    signature = request.headers.get("X-Gitlab-Token")

    try:
        if not app.config.get("TESTING"):
            if signature != app.config.get("GITLAB_SECRET"):
                return jsonify(msg="Unable to validate webhook")

        if request.headers.get("X-Gitlab-Event") != "Push Hook":
            return jsonify(msg="Event from this repo is not a push event")

        payload = request.json
        commits = groom_webhook(payload, "gitlab")

        for commit in commits:
            db.session.add(commit)

        db.session.commit()
        return jsonify(msg=f"commit data inserted for {payload['project']['name']}: {payload['after']}")
    except Exception as e:
        return jsonify(msg=f"Webhook failed to process: {e}")


@app.route("/services/")
def get_services():
    services = Service.query.order_by(Service.name).all()
    return jsonify(Service.serialize_list(services))


@app.route("/commits/")
def get_commits():
    commits = Commit.query.order_by(Commit.timestamp.desc()).all()
    return jsonify(Commit.serialize_list(commits))


@app.route("/deploys/")
def get_deploys():
    deploys = Deploy.query.all()
    return jsonify(Deploy.serialize_list(deploys))


@app.route("/services/<service_id>/timeline/")
def service_timeline(service_id):
    service = Service.query.get(service_id)
    commits = service.commits
    deploys = service.deploys
    service_events = Commit.serialize_list(commits) + Deploy.serialize_list(deploys)
    service_events.sort(key=lambda x: x["timestamp"], reverse=True)
    payload = [{
        "event_type": ("deploy" if event.get("cluster") else "commit"),
        "timestamp": event.get("timestamp"),
        "event_details": event
    } for event in service_events]
    return jsonify(payload)
