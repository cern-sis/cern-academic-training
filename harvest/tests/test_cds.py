import json

import mock
import pytest
from scrapy import Selector, signals
from scrapy.crawler import CrawlerProcess
from scrapy.signalmanager import dispatcher
from scrapy.utils.project import get_project_settings

from harvest.pipelines import HarvestPipeline
from harvest.spiders.cds_spider import CDSSpider


def test_cds_translation_record_with_video(shared_datadir):
    content = (shared_datadir / "record.xml").read_text()
    expected_data = {
        "abstract": "This is a description.",
        "corporate_author": "CERN. Geneva",
        "date": "2021-09-29",
        "event_details": "https://indico.cern.ch/event/1049663/",
        "imprint": "2021-09-29 - 1:10:36",
        "language": "eng",
        "lecture_id": "2782493",
        "lecture_note": "2021-09-29T11:00:00",
        "license": "CERN 2021",
        "series": "Academic Training Lecture Regular Programme - 2021-2022",
        "speaker": ["Ellis, Jonathan Richard", "de Jong, Michiel", "Dimou, Maria"],
        "speaker_details": ["CERN"],
        "subject_category": "Academic Training Lecture Regular Programme",
        "thumbnail_picture": "http://mediaarchive.cern.ch/MediaArchive/Video/Public/Conferences/2021/1049663/1049663-thumbnail-161x101-at-10-percent.jpg",
        "title": "REMOTE: Federated Data Architectures",
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
        "series": "CERN Academic Training Lecture - 45",
        "language": "eng",
        "speaker": ["Bonaudi, Franco"],
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
        "speaker": ["De Meester, P"],
        "date": "1973-01-01",
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


def test_cds_translation_record_with_multi_videos(shared_datadir):
    content = (shared_datadir / "records_with_multi_videos.xml").read_text()
    expected_data = {
        "lecture_id": "341905",
        "title": "Quantum chromodynamics",
        "date": "1997-11-24",
        "abstract": "1. Gauge invariance and Feynman rules for QCD. 2. Renormalization, running coupling and operator product expansion. 3. QCD in $e^{+] e^{-}$ collisions: from quarks and gluons to hadrons; R, jets and shape variables. 4. QCD in lepton-hadron collisions: DIS structure functions, sum rules and parton evolution. 5. QCD in hadron-hadron collisions: DY, W and Z production, Jets, heavy quarks.",
        "series": "CERN Academic Training Lecture - 345",
        "speaker": [
            "Mangano, Michelangelo L"
        ],
        "thumbnail_picture": "http://mediaarchive.cern.ch/MediaArchive/Video/Public/Conferences/1997/CERN-VIDEO-C-348-A/CERN-VIDEO-C-348-A-thumbnail-180x135-at-05-percent.jpg",
        "language": "eng",
        "subject_category": "Particle Physics",
        "imprint": "1997-11-24 - Transparencies ; 1 DVD video ; 2 VHS video",
        "license": "CERN 1997",
        "type": [
            "video",
            "multivideo"
        ]
    }
    node = Selector(text=content, type="xml")
    node.remove_namespaces()
    record = CDSSpider(from_date="2022-05-01").parse_item(node, content)
    assert record == expected_data


@pytest.mark.vcr()
def test_pipelines():
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

    assert results == expected_data


@pytest.mark.vcr()
@mock.patch("harvest.pipelines.requests.post")
@mock.patch("harvest.pipelines.requests.put")
def xtest_the_whole_process(
    mock_send_to_backend_post, mock_send_to_backend_put, shared_datadir
):
    content = (shared_datadir / "expected_records.json").read_text()
    expected_records = json.loads(content)
    results = []

    def crawler_results(signal, sender, item, response, spider):
        results.append(item)

    dispatcher.connect(crawler_results, signal=signals.item_scraped)

    process = CrawlerProcess(get_project_settings())
    process.crawl("CDS", from_date="2022-04-01", until_date="2022-05-01")
    process.start()

    assert expected_records == results
