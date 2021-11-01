from cds.models import Lecture
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import LectureSerializer


@api_view(["GET"])
def getRoutes(request):

    routes = [
        {"GET": "/api/cds"},
        {"GET": "/api/cds/lecture_id"},
    ]

    return Response(routes)


@api_view(["GET"])
def getLectures(request):
    lectures = Lecture.objects.all()
    serializer = LectureSerializer(lectures, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getLecture(request, pk):
    lecture = Lecture.objects.get(lecture_id=pk)
    serializer = LectureSerializer(lecture, many=False)
    return Response(serializer.data)
