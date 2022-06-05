# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

import os
import re

import backoff
import requests
import structlog
from inspire_dojson.utils import strip_empty_values

# useful for handling different item types with a single interface
# from itemadapter import ItemAdapter  # noqa: F401

LOGGER = structlog.get_logger()


class HarvestPipeline:
    @backoff.on_exception(
        backoff.expo, requests.exceptions.RequestException, max_tries=5
    )
    def __indico(self, indico_id):
        response = requests.get(f"https://indico.cern.ch/export/event/{indico_id}.json")

        if response.status_code == 404:
            raise ValueError(f"indico id {indico_id} doesn't exit")

        response.raise_for_status()
        data = response.json()

        sponsor = None
        try:
            sponsor = re.split(r"[\/|-]", data["results"][0]["organizer"])[0].strip()
        except Exception:
            LOGGER.error(f"Cannot get sponsor for Indico event: {indico_id}")

        keywords = None
        try:
            keywords = data["results"][0]["keywords"]
        except Exception:
            LOGGER.error(f"Cannot get keywords for Indico event: {indico_id}")
        return sponsor, keywords

    @backoff.on_exception(
        backoff.expo, requests.exceptions.RequestException, max_tries=5
    )
    def __send_to_backend(self, record):
        token = os.getenv("AUTH_TOKEN", "CHANGE_ME")
        host = os.getenv("CAT_BACKEND", "http://localhost:8000")
        lecture_id = record.get("lecture_id")
        if lecture_id:
            try:
                record["lecture_id"] = int(lecture_id)
                response = requests.post(
                    "{}/api/v1/lectures/".format(host),
                    json=record,
                    headers={"Authorization": "Token {}".format(token)},
                )
                response.raise_for_status()
            except Exception:
                LOGGER.error(
                    "Failed to send record.",
                    lecture_id=lecture_id,
                    status_code=response.status_code,
                    message=response.json(),
                )
            else:
                LOGGER.info("Send successfully", lecture_id=lecture_id)

    def process_item(self, item, spider):
        item = strip_empty_values(item)
        try:
            indico_id = item.get("event_details", "").rstrip("/").split("/")[-1]
            if indico_id:
                item["sponsor"], item["keywords"] = self.__indico(indico_id)
        except Exception as e:
            LOGGER.exception("Cannot get indico", exception=e)

        self.__send_to_backend(item)
        return item
