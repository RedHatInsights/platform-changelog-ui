import hmac
import hashlib

from api import app, db, models
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
        service = models.Service.query.filter_by(gh_repo=payload["repository"]["url"]).first()
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
            c = models.Commit(service_id=service.id,
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
