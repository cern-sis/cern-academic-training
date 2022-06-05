from datetime import datetime, timedelta
from time import sleep

import structlog
from dojson.contrib.marc21.utils import create_record
from inspire_dojson.cds import cds2hep_marc
from inspire_dojson.utils import strip_empty_values
from inspire_utils.date import fill_missing_date_parts
from scrapy import Spider
from scrapy.http import Request

LOGGER = structlog.get_logger()

CDS_LAST_RUN_PATH = "/data/cds_last_run"
DATE_FORMAT = "%Y-%m-%d"
SIZE = 100
CDS_URL = "https://cds.cern.ch/search?ln=en&cc=Academic+Training+Lectures&action_search=Search&op1=a&m1=a&p1=&f1=&c=Academic+Training+Lectures&c=&sf=&so=d&rm=&rg={size}&sc=0&of=xm&p={query}&f={field}"
SEARCH_FIELD = "260__c"

ALL_YEARS = [
    {"year": "2022", "field": "260__c"},
    {"year": "2021", "field": "260__c"},
    {"year": "2020", "field": "260__c"},
    {"year": "2019", "field": "260__c"},
    {"year": "2018", "field": "260__c"},
    {"year": "2017", "field": "260__c"},
    {"year": "2016", "field": "260__c"},
    {"year": "2015", "field": "260__c"},
    {"year": "2014", "field": "260__c"},
    {"year": "2013", "field": "260__c"},
    {"year": "2012", "field": "260__c"},
    {"year": "2011", "field": "260__c"},
    {"year": "2010", "field": "260__c"},
    {"year": "2009", "field": "260__c"},
    {"year": "2008", "field": "260__c"},
    {"year": "cern20070901", "field": "962__n"},
    {"year": "cern20060901", "field": "962__n"},
    {"year": "cern20050901", "field": "962__n"},
    {"year": "cern20040901", "field": "962__n"},
    {"year": "cern20030901", "field": "962__n"},
    {"year": "cern20020901", "field": "962__n"},
    {"year": "cern20010901", "field": "962__n"},
    {"year": "cern20000901", "field": "962__n"},
    {"year": "cern990901", "field": "962__n"},
    {"year": "cern980901", "field": "962__n"},
    {"year": "cern970901", "field": "962__n"},
    {"year": "cern960901", "field": "962__n"},
    {"year": "cern950901", "field": "962__n"},
    {"year": "cern940901", "field": "962__n"},
    {"year": "cern930901", "field": "962__n"},
    {"year": "cern920901", "field": "962__n"},
    {"year": "cern910901", "field": "962__n"},
    {"year": "cern900901", "field": "962__n"},
    {"year": "cern890901", "field": "962__n"},
    {"year": "cern880901", "field": "962__n"},
    {"year": "cern870901", "field": "962__n"},
    {"year": "cern860901", "field": "962__n"},
    {"year": "cern850901", "field": "962__n"},
    {"year": "cern840901", "field": "962__n"},
    {"year": "cern830901", "field": "962__n"},
    {"year": "cern820901", "field": "962__n"},
    {"year": "cern810901", "field": "962__n"},
    {"year": "cern800901", "field": "962__n"},
    {"year": "cern790901", "field": "962__n"},
    {"year": "cern780901", "field": "962__n"},
    {"year": "cern770901", "field": "962__n"},
    {"year": "cern760901", "field": "962__n"},
    {"year": "cern750901", "field": "962__n"},
    {"year": "cern740901", "field": "962__n"},
    {"year": "cern730901", "field": "962__n"},
    {"year": "cern720901", "field": "962__n"},
    {"year": "cern710901", "field": "962__n"},
    {"year": "cern700901", "field": "962__n"},
    {"year": "cern690901", "field": "962__n"},
    {"year": "cern680901", "field": "962__n"},
]


class CDSSpider(Spider):

    name = "CDS"

    def __init__(
        self, from_date=None, until_date=None, migrate_all=False, *args, **kwargs
    ):

        self.migrate_all = migrate_all
        self.all_years_gen = None
        self.until_date = until_date

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

        self.query = []
        if self.from_date:
            self.query.append(self.from_date)
        if self.until_date:
            self.query.append(self.until_date)

        super().__init__(*args, **kwargs)

    @property
    def __gen_all_years(self):
        return (year for year in ALL_YEARS)

    def __build_cds_url(self, query, field=SEARCH_FIELD, size=SIZE):
        return CDS_URL.format(query=query, size=size, field=field)

    def start_requests(self):
        if self.migrate_all:
            self.all_years_gen = self.__gen_all_years
            item = next(self.all_years_gen)
            url = self.__build_cds_url(item["year"], item["field"])
        else:
            query = "->".join(self.query)
            url = self.__build_cds_url(query)

        LOGGER.debug("Harvesting url", url=url)
        yield Request(url, callback=self.parse)

    def parse(self, response):
        sleep(3)

        response.selector.remove_namespaces()
        records = response.selector.xpath("//record")

        LOGGER.info("Harvested records", count=len(records))

        for record in records:
            try:
                sleep(3)
                yield self.parse_item(record, original=record.get())
            except Exception as err:
                LOGGER.error(err)

        try:
            if self.migrate_all and (item := next(self.all_years_gen)):
                LOGGER.debug("Harvesting next page", year=item["year"])
                url = self.__build_cds_url(item["year"], item["field"])
                LOGGER.debug("Harvesting url", url=url)
                yield Request(url, callback=self.parse)
        except StopIteration:
            LOGGER.debug("Harvesting all is finished.")

    def parse_item(self, selector, original=None):
        record = {}

        record["type"] = []

        record["lecture_id"] = selector.xpath(".//controlfield[@tag=001]/text()").get()

        record["title"] = selector.xpath(
            './/datafield[@tag=245]/subfield[@code="a"]/text()'
        ).get()

        try:
            date = selector.xpath(
                './/datafield[@tag=269]/subfield[@code="c"]/text()'
            ).get()
            record["date"] = fill_missing_date_parts(date)
        except Exception:
            LOGGER.error("Cannot parse date", date=date)
            record["date"] = ""

        record["corporate_author"] = selector.xpath(
            './/datafield[@tag=110]/subfield[@code="a"]/text()'
        ).get()

        record["abstract"] = selector.xpath(
            './/datafield[@tag=520]/subfield[@code="a"]/text()'
        ).get()

        series_name = selector.xpath(
            './/datafield[@tag=490]/subfield[@code="a"]/text()'
        ).get()

        series_year = selector.xpath(
            './/datafield[@tag=490]/subfield[@code="v"]/text()'
        ).get()

        if series_name and series_year:
            record["series"] = "{} - {}".format(series_name, series_year)

        record["speaker"] = selector.xpath(
            './/datafield[@tag=700]/subfield[@code="a"]/text()'
        ).get()

        record["speaker_details"] = (
            selector.xpath('//datafield[@tag=700]/subfield[@code="u"]/text()').get()
            or ""
        )

        record["event_details"] = selector.xpath(
            './/datafield[@tag=856][subfield[@code="y"]="Event details"]/subfield[@code="u"]/text()'
        ).get()

        cover_image = selector.xpath(
            './/datafield[@tag=856][subfield[@code="x"]="jpgthumbnail"]/subfield[@code="u"]/text()'
        ).get()

        if not cover_image:
            cover_image = selector.xpath(
                './/datafield[@tag=856][subfield[@code="x"]="pngthumbnail"]/subfield[@code="u"]/text()'
            ).get()

        record["thumbnail_picture"] = cover_image

        record["language"] = selector.xpath(
            './/datafield[@tag=041]/subfield[@code="a"]/text()'
        ).get()

        record["subject_category"] = selector.xpath(
            './/datafield[@tag=650]/subfield[@code="a"]/text()'
        ).get()

        lecture_note = selector.xpath(
            './/datafield[@tag=518]/subfield[@code="d"]/text()'
        ).get()

        if lecture_note and "T" in lecture_note:
            record["lecture_note"] = lecture_note
        else:
            record["lecture_note"] = ""

        duration = selector.xpath(
            './/datafield[@tag=300]/subfield[@code="a"]/text()'
        ).get()

        imprint_date = selector.xpath(
            './/datafield[@tag=269]/subfield[@code="c"]/text()'
        ).get()

        if imprint_date and duration:
            record["imprint"] = "{} - {}".format(imprint_date, duration)

        license_name = selector.xpath(
            '//datafield[@tag=542]/subfield[@code="d"]/text()'
        ).get()
        license_year = selector.xpath(
            './/datafield[@tag=542]/subfield[@code="g"]/text()'
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
