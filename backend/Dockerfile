FROM python:3.9

WORKDIR /code

ENV PYTHONBUFFERED=0 \
  SSL_CERT_FILE="/etc/ssl/certs/ca-certificates.crt" \
  REQUESTS_CA_BUNDLE="/etc/ssl/certs/ca-certificates.crt" \
  PATH="/root/.poetry/bin:${PATH}" \
  POETRY_VIRTUALENVS_CREATE=false

ENTRYPOINT ["poetry", "run"]

COPY CERN_Root_Certification_Authority_2.pem /usr/local/share/ca-certificates/CERN_Root_Certification_Authority_2.crt

RUN update-ca-certificates \
  && pip config set global.cert "${REQUESTS_CA_BUNDLE}"

RUN apt update && apt install poppler-utils -y

ARG POETRY_VERSION
ENV POETRY_VERSION="${POETRY_VERSION:-1.1.6}"
RUN curl -sSL https://install.python-poetry.org/ \
    | python3 - --version "${POETRY_VERSION}"

ENV PATH="${PATH}:/root/.local/bin"

RUN poetry --version

COPY poetry.lock pyproject.toml ./
RUN pip install --upgrade pip &&  \
  poetry install --no-root

COPY . /code/

ARG VERSION
ENV VERSION="${VERSION}"

RUN poetry install && \
  pip install --upgrade setuptools
