from datetime import datetime, timedelta
from time import sleep

import structlog
from inspire_dojson.utils import strip_empty_values
from scrapy import Spider
from scrapy.http import Request, XmlResponse
from scrapy.selector import Selector
from sickle import Sickle
from sickle.oaiexceptions import NoRecordsMatch

LOGGER = structlog.get_logger()

CDS_LAST_RUN_PATH = "/data/cds_last_run"
DATE_FORMAT = "%Y-%m-%d"


class CDSSpider(Spider):

    name = "CDS"

    def __init__(
        self,
        sets="forSciTalks",
        from_date=None,
        until_date=None,
        url="https://cds.cern.ch/oai2d",
        *args,
        **kwargs
    ):
        self.sets = sets.split(",")

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
        self.url = url
        super().__init__(*args, **kwargs)

    def start_requests(self):
        for _set in self.sets:
            yield Request(self.url, meta={"set": _set}, callback=self.parse)

    def parse(self, response):
        sleep(3)

        sickle = Sickle(self.url)
        params = {
            "metadataPrefix": "marcxml",
            "set": response.meta["set"],
            "from": self.from_date,
            "until": self.until_date,
        }
        try:
            records = sickle.ListRecords(**params)
        except NoRecordsMatch as err:
            LOGGER.warning(err)
            raise StopIteration()

        records = list(records)

        LOGGER.info("Harvested records", count=len(records))

        for record in records:
            xml_response = XmlResponse(self.url, encoding="utf-8", body=record.raw)
            selector = Selector(xml_response, type="xml")
            selector.remove_namespaces()
            try:
                yield self.parse_item(selector, original=record.raw)
            except Exception as err:
                LOGGER.error(err)

    def parse_item(self, selector, original=None):
        record = {}
        """
        {'035__': [{'9': 'CDS', 'a': '318009'}], '100__': [{'a': 'Bonaudi, Franco'}], '245__': {'a': 'Introduction to particle accelerators', '9': 'CDS'}, '260__': {'c': '1969'}, '500__': [{'a': 'CERN, Geneva, 4, 11, 18 Dec 1969, 15, 22, 29 Jan 1970', '9': 'CDS'}], '65017': [{'2': 'INSPIRE', 'a': 'Accelerators', '9': 'CDS'}], 'FFT__': [{'t': 'CDS', 'a': 'http://cds.cern.ch/record/318009/files/AT00000721.pdf', 'n': 'AT00000721.pdf', 'f': '.pdf'}], '980__': [{'a': 'ConferencePaper'}, {'a': 'HEP'}, {'a': 'CORE'}], '693__': [{'a': 'CERN PS', 'e': 'CERN-PS'}]}



        """
        from dojson.contrib.marc21.utils import create_record
        from inspire_dojson.cds import cds2hep_marc

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

        LOGGER.info("Parsed record", lecture=record)

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
