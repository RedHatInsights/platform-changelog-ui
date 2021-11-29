from app import app
from flask import jsonify


@app.route("/")
def index():
    return jsonify(status="ok")
