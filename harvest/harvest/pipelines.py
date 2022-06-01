# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

import os
import re

import backoff
import requests
import structlog

# useful for handling different item types with a single interface
# from itemadapter import ItemAdapter  # noqa: F401

LOGGER = structlog.get_logger()


class HarvestPipeline:
    @backoff.on_exception(
        backoff.expo, requests.exceptions.RequestException, max_tries=5
    )
    def __indico(self, indico_id):
        response = requests.get(f"https://indico.cern.ch/export/event/{indico_id}.json")

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
                requests.post(
                    "{}/api/v1/lectures/".format(host),
                    json=record,
                    headers={"Authorization": "Token {}".format(token)},
                )
                LOGGER.info("Send successfully", lecture_id=lecture_id, lecture=record)
            except Exception as e:
                LOGGER.exception(
                    "Failed", lecture_id=lecture_id, lecture=record, exception=e
                )

    def process_item(self, item, spider):
        try:
            indico_id = item.get("event_details", "").split("/")[-1]
            if indico_id:
                item["sponsor"], item["keywords"] = self.__indico(indico_id)
        except Exception as e:
            LOGGER.exception("Cannot get indico", exception=e)

        try:
            self.__send_to_backend(item)
        except Exception as e:
            LOGGER.exception("Failed to send.", exception=e)
        return item
