from scrapy import Selector

from harvest.spiders.cds_spider import CDSSpider


def test_cds_translation(shared_datadir):
    content = (shared_datadir / "record.xml").read_text()
    expected_data = {
        "id": "2782493",
        "language": "eng",
        "title": "REMOTE: Federated Data Architectures",
        "description": "This is a description.",
        "author": {"name": "de Jong, Michiel", "affiliation": None},
    }
    node = Selector(text=content, type="xml")
    node.remove_namespaces()
    record = CDSSpider().parse_item(node)
    assert record == expected_data
