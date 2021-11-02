from cds.models import Lecture
from rest_framework import serializers


class LectureSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Lecture
        fields = "__all__"
