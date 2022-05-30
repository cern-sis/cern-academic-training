# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


import requests

# useful for handling different item types with a single interface
from itemadapter import ItemAdapter  # noqa: F401


class HarvestPipeline:
    def __indico(self):
        self.indico_id = self.event_details.split("/")[4]
        r = requests.get(
            "https://indico.cern.ch/export/event/{}.json".format(self.indico_id)
        )
        res_data = r.json()

        sponsor = res_data["results"][0]["organizer"].split(" / \\ - ")[0]
        keywords = res_data["results"][0]["keywords"]

        return sponsor, keywords

    def process_item(self, item, spider):
        sponsor, keywords = self.__indico()
        item["sponsor"] = sponsor
        item["keywords"] = keywords

        return item
