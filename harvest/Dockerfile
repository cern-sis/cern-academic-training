
FROM python:3.9

WORKDIR /code

ENV PYTHONBUFFERED=0 \
    PATH="/root/.poetry/bin:${PATH}" \
    POETRY_VIRTUALENVS_CREATE=false

ENTRYPOINT ["poetry", "run"]

ARG POETRY_VERSION
ENV POETRY_VERSION="${POETRY_VERSION:-1.1.6}"
RUN curl -sSL https://install.python-poetry.org/ \
  | python3 - --version "${POETRY_VERSION}"

ENV PATH="/home/test/.local/bin:${PATH}"
ENV PATH="/root/.local/bin:${PATH}"

COPY poetry.lock pyproject.toml ./

RUN poetry install --no-root

COPY . /code

ARG VERSION
ENV VERSION="${VERSION}"

RUN poetry install
