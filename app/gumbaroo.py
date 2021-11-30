from app import app
from flask import jsonify


@app.route("/status")
def status():
    return jsonify(status="ok")
