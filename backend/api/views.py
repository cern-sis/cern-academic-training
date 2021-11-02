from cds.models import Lecture
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import LectureSerializer


@api_view(["GET"])
def getRoutes(request):

    routes = [
        {"GET": "/api/cds"},
        {"GET": "/api/cds/lecture_id"},
        {"POST": "/api/cds/token"},
        {"POST": "/api/cds/token/refresh"},
    ]

    return Response(routes)


class LectureViewSet(viewsets.ModelViewSet):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
