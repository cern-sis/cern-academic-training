FROM python:3.9

WORKDIR /code

ENV PYTHONUNBUFFERED=1

ARG POETRY_VERSION=1.8.4

RUN curl -sSL https://install.python-poetry.org | python3 - --version "${POETRY_VERSION}"
ENV PATH="/root/.local/bin:${PATH}"

COPY pyproject.toml poetry.lock ./
RUN poetry install --no-root --only main

COPY . /code

ENTRYPOINT ["poetry", "run"]
CMD ["python", "-m", "your_module"]
