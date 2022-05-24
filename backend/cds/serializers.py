from bleach import clean
from django_elasticsearch_dsl_drf.serializers import DocumentSerializer
from rest_framework import serializers

from .documents import LectureDocument
from .models import Lecture


class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = "__all__"

    def validate_abstract(self, value):
        return clean(value, strip=True)


class LectureDocumentSerializer(DocumentSerializer):
    class Meta:
        document = LectureDocument
        fields = (
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
            "imprint",
            "license",
        )
