import mock
import pytest
from scrapy import Selector

from harvest.pipelines import HarvestPipeline
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
    record = CDSSpider(from_date="2022-05-01").parse_item(node)
    assert record == expected_data


@pytest.mark.vcr()
@mock.patch("harvest.pipelines.requests.post")
def test_pipelines(mock_send_to_backend):
    pipeline = HarvestPipeline()
    item = {
        "lecture_id": "2782493",
        "title": "REMOTE: Federated Data Architectures",
        "date": "2021-09-29",
        "corporate_author": "CERN. Geneva",
        "abstract": "This is a description.",
        "series": "Academic Training Lecture Regular Programme - 2021-2022",
        "speaker": "de Jong, Michiel",
        "speaker_details": "",
        "event_details": "https://indico.cern.ch/event/1052073",
        "thumbnail_picture": "http://mediaarchive.cern.ch/MediaArchive/Video/Public/Conferences/2021/1049663/1049663-thumbnail-161x101-at-10-percent.jpg",
        "language": "eng",
        "subject_category": "Academic Training Lecture Regular Programme",
        "lecture_note": "2021-09-29T11:00:00",
        "imprint": "2021-09-29 - 1:10:36",
        "license": "CERN 2021",
    }
    expected_data = {
        "lecture_id": 2782493,
        "title": "REMOTE: Federated Data Architectures",
        "date": "2021-09-29",
        "corporate_author": "CERN. Geneva",
        "abstract": "This is a description.",
        "series": "Academic Training Lecture Regular Programme - 2021-2022",
        "speaker": "de Jong, Michiel",
        "speaker_details": "",
        "event_details": "https://indico.cern.ch/event/1052073",
        "thumbnail_picture": "http://mediaarchive.cern.ch/MediaArchive/Video/Public/Conferences/2021/1049663/1049663-thumbnail-161x101-at-10-percent.jpg",
        "language": "eng",
        "subject_category": "Academic Training Lecture Regular Programme",
        "lecture_note": "2021-09-29T11:00:00",
        "imprint": "2021-09-29 - 1:10:36",
        "license": "CERN 2021",
        "sponsor": "Maria Dimou",
        "keywords": ["Internet", "Vint Cerf", "Tim Berners-Lee"],
    }

    results = pipeline.process_item(item, "CDS")
    mock_send_to_backend.assert_called_with(
        "http://localhost:8000/api/v1/lectures/",
        json=expected_data,
        headers={"Authorization": "Token CHANGE_ME"},
    )
    assert results == expected_data
