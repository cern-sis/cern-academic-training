from rest_framework import serializers

from .models import Lecture


class LectureSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Lecture
        fields = "__all__"
