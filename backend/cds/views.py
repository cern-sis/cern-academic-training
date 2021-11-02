from rest_framework import viewsets

from .models import Lecture
from .serializers import LectureSerializer


class LectureViewSet(viewsets.ModelViewSet):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
