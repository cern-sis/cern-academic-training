import os

import dj_database_url
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

from .base import *  # noqa: F403,F401

DEBUG = os.environ.get("DEBUG", False)

STATIC_ROOT = BASE_DIR / "static"  # noqa: F405

STATIC_URL = "/backend-static/"

CORS_ORIGIN_ALLOW_ALL = DEBUG

ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "").split(",")

SECRET_KEY = os.environ["SECRET_KEY"]

sentry_sdk.init(
    dsn=os.environ["SENTRY_DSN"],
    environment=os.environ["SENTRY_ENVIRONMENT"],
    integrations=[DjangoIntegration()],
)

DATABASES = {
    # DATABASE_URL env variable
    "default": dj_database_url.config()
}

OPENSEARCH_DSL = {
    "default": {
        "hosts": [os.environ["ELASTICSEARCH_HOST"]],
        "http_auth": (
            os.environ["ELASTICSEARCH_USER"],
            os.environ["ELASTICSEARCH_PASSWORD"],
        ),
        "port": 443,
        "use_ssl": True,
        "verify_certs": False,
        "timeout": 30,
        "http_compress": True,
        "url_prefix": "es",
    },
}

REST_FRAMEWORK["PAGE_SIZE"] = 20  # noqa: F405

OPENSEARCH_INDEX_PREFIX = os.environ["OPENSEARCH_INDEX_PREFIX"]

CSRF_COOKIE_SECURE = True

TESTING = False
