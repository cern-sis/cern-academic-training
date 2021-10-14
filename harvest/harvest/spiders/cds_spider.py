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
        record["id"] = selector.xpath("//controlfield[@tag=001]/text()").get()
        record["language"] = selector.xpath(
            '//datafield[@tag=041]/subfield[@code="a"]/text()'
        ).get()
        record["title"] = selector.xpath(
            '//datafield[@tag=245]/subfield[@code="a"]/text()'
        ).get()
        record["description"] = selector.xpath(
            '//datafield[@tag=520]/subfield[@code="a"]/text()'
        ).get()
        record["author"] = {
            "name": selector.xpath(
                '//datafield[@tag=906]/subfield[@code="p"]/text()'
            ).get(),
            "affiliation": selector.xpath(
                '//datafield[@tag=906]/subfield[@code="u"]/text()'
            ).get(),
        }
        return record
