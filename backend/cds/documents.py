from django.conf import settings
from django_opensearch_dsl import Document, KeywordField, TextField
from django_opensearch_dsl.registries import registry
from opensearch_dsl import analyzer

from .models import Lecture


@registry.register_document
class LectureDocument(Document):

    names_analyzer = analyzer(
        "name_analyzer",
        tokenizer="letter",
    )

    class Index:
        name = f"{settings.OPENSEARCH_INDEX_PREFIX}-lectures"

    settings = {"number_of_shards": 1, "number_of_replicas": 0}

    files = TextField(multi=True)
    type = KeywordField(multi=True)
    keywords = KeywordField(multi=True)
    series = TextField()
    sponsor = TextField(analyzer=names_analyzer)
    speaker = TextField(analyzer=names_analyzer)
    subject_category = TextField()
    class Django:
        model = Lecture
        fields = [
            "lecture_id",
            "title",
            "date",
            "corporate_author",
            "abstract",
            "speaker_details",
            "event_details",
            "thumbnail_picture",
            "language",
            "lecture_note",
            "imprint",
            "license",
        ]
