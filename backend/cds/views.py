from django_elasticsearch_dsl_drf.filter_backends import (
    DefaultOrderingFilterBackend,
    FilteringFilterBackend,
    OrderingFilterBackend,
    SearchFilterBackend,
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
        SearchFilterBackend,
    ]

    simple_query_string_options = {
        "default_operator": "and",
    }

    search_fields = {
        "title": {
            "boost": 4,
        },
        "abstract": {"boost": 2},
        "type": {"boost": 5},
        "keywords": {"boost": 5},
    }

    filter_fields = {
        "lecture_id": None,
        "type": None,
        "keywords": None,
    }

    ordering_fields = {
        "lecture_id": None,
    }

    ordering = (
        "_score",
        "-date",
    )
