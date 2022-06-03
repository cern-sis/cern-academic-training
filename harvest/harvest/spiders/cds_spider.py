from datetime import datetime, timedelta
from time import sleep

import structlog
from dojson.contrib.marc21.utils import create_record
from inspire_dojson.cds import cds2hep_marc
from inspire_dojson.utils import strip_empty_values
from scrapy import Spider
from scrapy.http import Request

LOGGER = structlog.get_logger()

CDS_LAST_RUN_PATH = "/data/cds_last_run"
DATE_FORMAT = "%Y-%m-%d"
SIZE = 100
CDS_URL = "https://cds.cern.ch/search?ln=en&cc=Academic+Training+Lectures&p={query}&action_search=Search&op1=a&m1=a&p1=&f1=&c=Academic+Training+Lectures&c=&sf=&so=d&rm=&rg={size}&sc=0&of=xm"


class CDSSpider(Spider):

    name = "CDS"

    def __init__(self, from_date=None, until_date=None, *args, **kwargs):

        if not from_date:
            try:
                with open(CDS_LAST_RUN_PATH) as f:
                    last_run_date = f.read()
                    self.from_date = (
                        datetime.strptime(last_run_date) + timedelta(days=1)
                    ).strftime(DATE_FORMAT)
            except Exception:
                LOGGER.error("Cannot read the file using date now")
                self.from_date = datetime.utcnow().strftime(DATE_FORMAT)
        else:
            self.from_date = from_date
        self.until_date = until_date

        self.query = []
        if self.from_date:
            self.query.append(self.from_date)
        if self.until_date:
            self.query.append(self.until_date)

        super().__init__(*args, **kwargs)

    def start_requests(self):
        query = "->".join(self.query)
        url = CDS_URL.format(query=query, size=SIZE)
        yield Request(url, callback=self.parse)

    def parse(self, response):
        sleep(3)

        response.selector.remove_namespaces()
        records = response.selector.xpath("//record")

        LOGGER.info("Harvested records", count=len(records))
        for selector in records:
            try:
                yield self.parse_item(selector, original=selector.get())
            except Exception as err:
                LOGGER.error(err)

    def parse_item(self, selector, original=None):
        record = {}

        record["type"] = []

        record["lecture_id"] = selector.xpath("//controlfield[@tag=001]/text()").get()

        record["title"] = selector.xpath(
            '//datafield[@tag=245]/subfield[@code="a"]/text()'
        ).get()

        record["date"] = selector.xpath(
            '//datafield[@tag=269]/subfield[@code="c"]/text()'
        ).get()

        record["corporate_author"] = selector.xpath(
            '//datafield[@tag=110]/subfield[@code="a"]/text()'
        ).get()

        record["abstract"] = selector.xpath(
            '//datafield[@tag=520]/subfield[@code="a"]/text()'
        ).get()

        series_name = selector.xpath(
            '//datafield[@tag=490]/subfield[@code="a"]/text()'
        ).get()

        series_year = selector.xpath(
            '//datafield[@tag=490]/subfield[@code="v"]/text()'
        ).get()

        if series_name and series_year:
            record["series"] = "{} - {}".format(series_name, series_year)

        record["speaker"] = selector.xpath(
            '//datafield[@tag=700]/subfield[@code="a"]/text()'
        ).get()

        record["speaker_details"] = (
            selector.xpath('//datafield[@tag=700]/subfield[@code="u"]/text()').get()
            or ""
        )

        record["event_details"] = selector.xpath(
            '//datafield[@tag=856][subfield[@code="y"]="Event details"]/subfield[@code="u"]/text()'
        ).get()

        cover_image = selector.xpath(
            '//datafield[@tag=856][subfield[@code="x"]="jpgthumbnail"]/subfield[@code="u"]/text()'
        ).get()

        if not cover_image:
            cover_image = selector.xpath(
                '//datafield[@tag=856][subfield[@code="x"]="pngthumbnail"]/subfield[@code="u"]/text()'
            ).get()

        record["thumbnail_picture"] = cover_image

        record["language"] = selector.xpath(
            '//datafield[@tag=041]/subfield[@code="a"]/text()'
        ).get()

        record["subject_category"] = selector.xpath(
            '//datafield[@tag=650]/subfield[@code="a"]/text()'
        ).get()

        record["lecture_note"] = selector.xpath(
            '//datafield[@tag=518]/subfield[@code="d"]/text()'
        ).get()

        duration = selector.xpath(
            '//datafield[@tag=300]/subfield[@code="a"]/text()'
        ).get()

        imprint_date = selector.xpath(
            '//datafield[@tag=269]/subfield[@code="c"]/text()'
        ).get()

        if imprint_date and duration:
            record["imprint"] = "{} - {}".format(imprint_date, duration)

        license_name = selector.xpath(
            '//datafield[@tag=542]/subfield[@code="d"]/text()'
        ).get()
        license_year = selector.xpath(
            '//datafield[@tag=542]/subfield[@code="g"]/text()'
        ).get()

        if license_name and license_year:
            record["license"] = "{} {}".format(license_name, license_year)

        LOGGER.debug("Parsed record", lecture_id=record["lecture_id"], lecture=record)

        data = cds2hep_marc.do(create_record(original))

        record["files"] = [_file["a"] for _file in data.get("FFT__", [])]

        record = strip_empty_values(record)
        record["type"] = []
        if "files" in record:
            record["type"].append("file")

        if "thumbnail_picture" in record:
            record["type"].append("video")

        if not record["type"]:
            record.pop("type", None)
        return record
