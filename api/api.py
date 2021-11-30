from api import app
from flask import jsonify
import hmac
import hashlib

from app import app, db, models
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

    if verify_hmac_hash(data, signature):
        if request.headers.get("X-Github-Event") == "ping":
            return jsonify(msg="ok")
        if request.headers.get("X-Github-Event") == "pull_request":
            payload = request.json
            pr = payload["pull_request"]
            if pr["merged"] and pr["state"] == "closed":
                repo_url = pr["head"]["repo"]["html_url"]
                repo_name = pr["head"]["repo"]["name"]
                commit = pr["merge_commit_sha"]
                service = models.Service.query.filter_by(gh_repo=repo_url).first()
                if service:
                    c = models.Commit(service_id=service.id,
                                      ref=commit,
                                      title=pr["title"],
                                      repo=repo_url,
                                      timestamp=pr["merged_at"],
                                      author=pr["user"]["login"],
                                      message=pr.get("body"))
                    db.session.add(c)
                    db.session.commit()
                    
                    return jsonify(msg=f"commit data inserted for {repo_name}: {commit}") 
                else:
                    return jsonify(msg=f"{repo_name} is not a recognized service")
            else:
                return jsonify(msg=f"PR {payload['number']} is not merged")
        else:
            return jsonify(msg=f"Event from {repo_name} is not a pull_request")
    else:
        return jsonify(msg="Unable to validate webhook")
