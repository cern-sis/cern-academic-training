from django_elasticsearch_dsl_drf.filter_backends import (
    DefaultOrderingFilterBackend,
    FilteringFilterBackend,
    OrderingFilterBackend,
    SimpleQueryStringSearchFilterBackend
)
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .documents import LectureDocument
from .models import Lecture
from .pagination import DefaultPagination
from .serializers import LectureDocumentSerializer, LectureSerializer


class LectureViewSet(viewsets.ModelViewSet):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    lookup_field = "lecture_id"
    pagination_class = DefaultPagination


class LectureDocumentView(DocumentViewSet):
    document = LectureDocument
    serializer_class = LectureDocumentSerializer
    lookup_field = "lecture_id"
    permission_classes = (IsAuthenticatedOrReadOnly,)
    pagination_class = DefaultPagination

    filter_backends = [
        FilteringFilterBackend,
        OrderingFilterBackend,
        DefaultOrderingFilterBackend,
        SimpleQueryStringSearchFilterBackend,
    ]

    simple_query_string_options = {
        "default_operator": "and",
    }

    filter_fields = {
        "lecture_id": None,
        "types": None,
        "keywords": None,
        "series": None,
        "sponsor": None,
        "speaker": None,
        "subject_category": None,
    }

    ordering_fields = {
        "lecture_id": None,
        "title": None,
        "date": None,
        "score": None,
        "series": None,
        "subject_category": None
    }

    simple_query_string_search_fields = {
        "title": {"boost": 5},
        "abstract": {"boost": 1},
        "types": {"boost": 5},
        "keywords": {"boost": 6},
        "sponsor": {"boost": 10},
        "speaker": {"boost": 10},
        "series": {"boost": 10},
        "subject_category": {"boost": 10},
    }

    ordering = (
        "_score",
        "-date",
    )
