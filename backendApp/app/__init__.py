import logging
import os

from flask import Flask
from flask_cors import CORS
from app import views


def create_app() -> Flask:
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    # Load config
    app.config.from_pyfile(os.path.join(str(app.root_path), "settings.py"))
    # Load views
    app.register_blueprint(views.views)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    app.logger.setLevel(logging.INFO)
    return app
