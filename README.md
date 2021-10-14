# Installation

## Prerequisite

### pre-commit

Install [pre-commit](https://pre-commit.com/#installation) and afterwards run:

```bash
$ pre-commit install
```

### poetry

Install [poetry](https://python-poetry.org/docs/#installation).

## Backend

```bash
$ cd backend
$ poetry install
```

## UI

```bash
$ cd ui
$ yarn install
```

# Run the project

## Backend

```bash
$ cd backend
$ poetry install
$ python manage.py migrate
$ python manage.py runserver
```

## UI

```bash
$ cd ui
$ yarn install
$ yarn start
```

## Harvest CDS

```bash

$ cd harvest
$ poetry install
$ scrapy crawl CDS -a "sets=forSciTalks" -a "from_date=2021-09-01"
```
