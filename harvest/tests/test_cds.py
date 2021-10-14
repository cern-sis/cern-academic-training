from scrapy import Selector

from harvest.spiders.cds_spider import CDSSpider


def test_cds_translation(shared_datadir):
    content = (shared_datadir / "record.xml").read_text()
    expected_data = {
        "abstract": "This is a description.",
        "corporate_author": "CERN. Geneva",
        "date": "2021-09-29",
        "duration": "1:10:36",
        "event_url": "https://indico.cern.ch/event/1049663/",
        "id": "2782493",
        "imprint": "2021-09-29",
        "language": "eng",
        "lecture_note": "2021-09-29T11:00:00",
        "license": "CERN",
        "license_year": "2021",
        "series_name": "Academic Training Lecture Regular Programme",
        "series_year": "2021-2022",
        "speaker_affiliation": None,
        "speaker_name": "de Jong, Michiel",
        "subject_category": "Academic Training Lecture Regular Programme",
        "title": "REMOTE: Federated Data Architectures",
    }
    node = Selector(text=content, type="xml")
    node.remove_namespaces()
    record = CDSSpider().parse_item(node)
    assert record == expected_data
