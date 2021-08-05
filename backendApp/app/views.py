from flask import (
    Blueprint,
    current_app,
    redirect,
    render_template,
    request,
    url_for,
    jsonify,
)
from requests.exceptions import RequestException
from .services import get_jokes, get_categories

views = Blueprint("views", __name__, url_prefix="/")


@views.route("/random", methods=["GET"])
def fetch_jokes():
    try:
        categories_param = request.args.getlist("categories")
        jokes = get_jokes(categories_param)
        return jsonify(jokes=jokes)
    except RequestException:
        current_app.logger.exception("api unreachable")
        return {"error": "api unreachable"}, 404


@views.route("/categories", methods=["GET"])
def fetch_categories():
    try:
        categories = get_categories()
        return jsonify(categories=categories)
    except RequestException:
        current_app.logger.exception("api unreachable")
        return {"error": "api unreachable"}, 404
