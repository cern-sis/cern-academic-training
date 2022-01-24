from scrapy import Selector

from harvest.spiders.cds_spider import CDSSpider


def test_cds_translation(shared_datadir):
    content = (shared_datadir / "record.xml").read_text()
    expected_data = {
        "lecture_id": "2782493",
        "title": "REMOTE: Federated Data Architectures",
        "date": "2021-09-29",
        "corporate_author": "CERN. Geneva",
        "abstract": "This is a description.",
        "series": "Academic Training Lecture Regular Programme - 2021-2022",
        "speaker": "de Jong, Michiel",
        "speaker_details": "",
        "event_details": "https://indico.cern.ch/event/1049663/",
        "thumbnail_picture": "http://mediaarchive.cern.ch/MediaArchive/Video/Public/Conferences/2021/1049663/1049663-thumbnail-161x101-at-10-percent.jpg",
        "language": "eng",
        "subject_category": "Academic Training Lecture Regular Programme",
        "lecture_note": "2021-09-29T11:00:00",
        "imprint": "2021-09-29 - 1:10:36",
        "license": "CERN 2021",
    }
    node = Selector(text=content, type="xml")
    node.remove_namespaces()
    record = CDSSpider().parse_item(node)
    assert record == expected_data
