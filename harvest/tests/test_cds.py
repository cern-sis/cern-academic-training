import mock
import pytest
from scrapy import Selector

from harvest.pipelines import HarvestPipeline
from harvest.spiders.cds_spider import CDSSpider


def test_cds_translation_record_with_video(shared_datadir):
    content = (shared_datadir / "record.xml").read_text()
    expected_data = {
        "lecture_id": "2782493",
        "title": "REMOTE: Federated Data Architectures",
        "date": "2021-09-29",
        "corporate_author": "CERN. Geneva",
        "abstract": "This is a description.",
        "series": "Academic Training Lecture Regular Programme - 2021-2022",
        "speaker": "de Jong, Michiel",
        "event_details": "https://indico.cern.ch/event/1049663/",
        "thumbnail_picture": "http://mediaarchive.cern.ch/MediaArchive/Video/Public/Conferences/2021/1049663/1049663-thumbnail-161x101-at-10-percent.jpg",
        "language": "eng",
        "subject_category": "Academic Training Lecture Regular Programme",
        "lecture_note": "2021-09-29T11:00:00",
        "imprint": "2021-09-29 - 1:10:36",
        "license": "CERN 2021",
        "type": ["video"],
    }
    node = Selector(text=content, type="xml")
    node.remove_namespaces()
    record = CDSSpider(from_date="2022-05-01").parse_item(node, content)
    assert record == expected_data


def test_cds_translation_record_with_files(shared_datadir):
    content = (shared_datadir / "record_with_files.xml").read_text()
    expected_data = {
        "lecture_id": "318009",
        "title": "Introduction to particle accelerators",
        "date": "1969-1970",
        "series": "CERN Academic Training Lecture - 45",
        "language": "eng",
        "subject_category": "Accelerators and Storage Rings",
        "license": "CERN 1969",
        "type": ["file"],
        "files": ["http://cds.cern.ch/record/318009/files/AT00000721.pdf"],
    }
    node = Selector(text=content, type="xml")
    node.remove_namespaces()
    record = CDSSpider(from_date="2022-05-01").parse_item(node, content)
    assert record == expected_data


def test_cds_translation_record_without_files_and_videos(shared_datadir):
    content = (shared_datadir / "record_without_files_and_video.xml").read_text()
    expected_data = {
        "lecture_id": "318608",
        "title": "Non-destructive material testing",
        "date": "1973",
        "series": "CERN Academic Training Lecture - 67",
        "language": "eng",
        "subject_category": "Other Fields of Engineering",
        "imprint": "1973 - 44 p",
        "license": "CERN 1973",
    }
    node = Selector(text=content, type="xml")
    node.remove_namespaces()
    record = CDSSpider(from_date="2022-05-01").parse_item(node, content)
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
