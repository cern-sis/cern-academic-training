from django.conf import settings
from django_opensearch_dsl import Document
from django_opensearch_dsl.registries import registry

from .models import Lecture


@registry.register_document
class LectureDocument(Document):
    class Index:
        name = f"{settings.OPENSEARCH_INDEX_PREFIX}-lectures"

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
