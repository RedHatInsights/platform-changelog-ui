import pytest
import json

from api import app, db, api, seeds


@pytest.fixture
def client():

    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            runner = app.test_cli_runner()
            runner.invoke(args=["seeds"])
        yield client


def test_status(client):
    result = client.get("/status")
    assert result.status_code == 200


def test_github_webhook(client):
    headers = {"X-Hub-Signature-256": "sha256=1f43188147b97f9cffa525c3150c1d8d2c43bf824b46a6d54e36f5a8752db0fe",
               "X-Github-Event": "push"
               }
    with open("tests/github_webhook.json") as f:
        data = json.loads(f.read())
    result = client.post("/github-webhook", json=data, headers=headers)
    assert result.status_code == 200
    assert result.json == {"msg": "commit data inserted for Gumbaroo_Tester: 61246c54c75d8a25a5926dd0131bc30457a36898"}


def test_gitlab_webhook(client):
    headers = {"X-Gitlab-Token": app.config.get("GITLAB_TOKEN"),
               "X-Gitlab-Event": "Push Hook"
               }
    with open("tests/gitlab_webhook.json") as f:
        data = json.loads(f.read())
    result = client.post("/gitlab-webhook", json=data, headers=headers)
    assert result.status_code == 200
    assert result.json == {"msg": "commit data inserted for Gumbaroo Gitlab: db1ff61f8dae54087d9e4814fdf9b56f96bc9dad"}
