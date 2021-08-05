from datetime import date, timedelta

import requests
from flask import current_app
from requests.exceptions import RequestException

JOKES_PER_REQ = 10


def build_url(categories_param):
    urls = []
    categories = []
    for i in range(10):
        categories.append(categories_param[i % len(categories_param)])

    for category in categories[:10]:
        urls.append(f"{current_app.config['CHUNK_API']}/random?category={category}")
    return urls


def get_categories():
    response = requests.get(f"{current_app.config['CHUNK_API']}/categories")
    if response.status_code != 200:
        current_app.logger.exception(
            "chunk api returned status code %s", response.status_code
        )
        raise RequestException()
    return response.json()


def get_jokes(categories_param):
    if len(categories_param) > 0:
        urls = build_url(categories_param)
        response = list(requests.get(url) for url in urls)
    else:
        response = list(
            requests.get(f"{current_app.config['CHUNK_API']}/random") for x in range(10)
        )

    if len(response) > 0 and response[0].status_code != 200:
        current_app.logger.exception(
            "chunk api returned status code %s", response[0].status_code
        )
        raise RequestException()

    return list(map(lambda x: x.json(), response))
