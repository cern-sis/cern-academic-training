from django_elasticsearch_dsl import Document
from django_elasticsearch_dsl.registries import registry

from .models import Lecture


@registry.register_document
class LectureDocument(Document):
    class Index:
        name = "lectures"

    settings = {"number_of_shards": 1, "number_of_replicas": 0}

    class Django:
        model = Lecture
        fields = [
            "lecture_id",
            "title",
            "date",
            "corporate_author",
            "abstract",
            "series",
            "speaker",
            "speaker_details",
            "event_details",
            "thumbnail_picture",
            "language",
            "subject_category",
            "lecture_note",
            "license",
        ]
