# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


import logging

import backoff
import requests

# useful for handling different item types with a single interface
from itemadapter import ItemAdapter  # noqa: F401

LOGGER = logging.getLogger(__name__)


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
            sponsor = data["results"][0]["organizer"].split("/\\-")[0].strip()
        except Exception:
            LOGGER.error(f"Cannot get sponsor for Indico event: {indico_id}")

        keywords = None
        try:
            keywords = data["results"][0]["keywords"]
        except Exception:
            LOGGER.error(f"Cannot get keywords for Indico event: {indico_id}")
        return sponsor, keywords

    def process_item(self, item, spider):
        indico_id = item.get("event_details")
        if indico_id:
            item["sponsor"], item["keywords"] = self.__indico(indico_id)
        return item
