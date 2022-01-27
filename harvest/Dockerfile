
FROM python:3.9

WORKDIR /code

ENV PYTHONBUFFERED=0 \
    PATH="/root/.poetry/bin:${PATH}" \
    POETRY_VIRTUALENVS_CREATE=false


ARG POETRY_VERSION
ENV POETRY_VERSION="${POETRY_VERSION:-1.1.6}"
RUN curl -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py \
  | python - --version "${POETRY_VERSION}" \
 && poetry --version

ENV PATH="/home/test/.local/bin:${PATH}"

COPY poetry.lock pyproject.toml ./

RUN poetry install --no-root

COPY . /code

ARG VERSION
ENV VERSION="${VERSION}"

RUN poetry install
