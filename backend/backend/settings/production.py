from .base import *

import os

import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

DEBUG = os.environ.get('DEBUG', False)

CORS_ORIGIN_ALLOW_ALL = DEBUG

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '').split(',')

SECRET_KEY = os.environ['SECRET_KEY']

sentry_sdk.init(
    dsn=os.environ["SENTRY_DSN"],
    environment='cat-production',
    integrations=[DjangoIntegration()],
)

DATABASES = {
    # DATABASE_URL env variable
    "default": dj_database_url.config()
}


ELASTICSEARCH_DSL = {
    "default": {
        "hosts": os.environ['ELASTICSEARCH_HOST'],
        "http_auth": (
            os.environ['ELASTICSEARCH_USER'],
            os.environ['ELASTICSEARCH_PASSWORD']
        ),
        "port": 443,
        "use_ssl": True,
        "verify_certs": False,
        "timeout": 30,
        "http_compress": True,
        "url_prefix": "es"
    },
}

ELASTICSEARCH_INDEX_PREFIX = 'cat-production'
