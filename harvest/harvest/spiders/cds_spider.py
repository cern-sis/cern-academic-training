import logging
from datetime import datetime
from time import sleep

from hepcrawl.spiders.common.oaipmh_spider import OAIPMHSpider
from hepcrawl.utils import strict_kwargs
from scrapy.http import Request

LOGGER = logging.getLogger(__name__)


class OAIPMHSpiderOverride(OAIPMHSpider):
    def parse_list(self, response):
        # FIXME: Hack for demo purposes
        sleep(3)
        return super().parse_list(response)

    def start_requests_sets(
        self, url, format, sets=None, from_date=None, until_date=None
    ):
        started_at = datetime.utcnow()

        LOGGER.info(
            "Starting harvesting of {url} with sets={sets} and "
            "metadataPrefix={metadata_prefix},"
            "from={from_date}, "
            "until={until_date}".format(
                url=url,
                sets=sets,
                metadata_prefix=format,
                from_date=from_date,
                until_date=until_date,
            )
        )

        if sets is None:
            LOGGER.warn(
                "Skipping harvest, no sets passed and cowardly refusing to "
                "harvest all."
            )
            return

        for oai_set in sets:
            from_date = from_date or self.resume_from(set_=oai_set)

            LOGGER.info(
                "Starting harvesting of set={oai_set} from "
                "{from_date}".format(
                    oai_set=oai_set,
                    from_date=from_date,
                )
            )

            request = Request("%s" % url, self.parse)
            request.meta["set"] = oai_set
            request.meta["from_date"] = from_date
            yield request

            now = datetime.utcnow()
            self.save_run(started_at=started_at, set_=oai_set)

            LOGGER.info(
                "Harvesting of set %s completed. Next time will resume from %s"
                % (oai_set, until_date or now.strftime("%Y-%m-%d"))
            )

        LOGGER.info(
            "Harvesting completed, harvested %s records.",
            len(self._crawled_records),
        )


class CDSSpider(OAIPMHSpiderOverride):
    """Spider for crawling CERN Document Server OAI-PMH.

    Example:
        Using OAI-PMH service::
            $ scrapy crawl CDS \\
                -a "sets=forSciTalks" -a "from_date=2017-12-13"
    """

    name = "CDS"
    source = "CDS"

    @strict_kwargs
    def __init__(
        self,
        url="https://cds.cern.ch/oai2d",
        format="marcxml",
        sets=None,
        from_date=None,
        until_date=None,
        **kwargs,
    ):
        super(CDSSpider, self).__init__(
            url=url,
            format=format,
            sets=sets,
            from_date=from_date,
            until_date=until_date,
            **kwargs,
        )

    def get_record_identifier(self, record):
        return record.header.identifier

    def parse_record(self, selector):
        """Parse a CDS MARCXML record into a HEP record."""
        selector.remove_namespaces()

        record = self.parse_item(selector)
        LOGGER.info(f"RECORD {record}")
        return record

    def parse_item(self, selector):
        record = {}

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

        record["thumbnail_picture"] = selector.xpath(
            '//datafield[@tag=856][subfield[@code="x"]="jpgthumbnail"]/subfield[@code="u"]/text()'
        ).get()

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

        record["imprint"] = "{} - {}".format(imprint_date, duration)

        license_name = selector.xpath(
            '//datafield[@tag=542]/subfield[@code="d"]/text()'
        ).get()
        license_year = selector.xpath(
            '//datafield[@tag=542]/subfield[@code="g"]/text()'
        ).get()
        record["license"] = "{} {}".format(license_name, license_year)
        return record
