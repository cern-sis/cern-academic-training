from django.db import models  # noqa: F401


class Lecture(models.Model):
    lecture_ID = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=100)
    date = models.DateField()
    corporateAuthor = models.CharField(max_length=100)
    abstract = models.TextField()
    series = models.CharField(max_length=50)
    speaker = models.CharField(max_length=50)
    speakerDetails = models.CharField(max_length=50)
    eventDetails = models.CharField(max_length=50)
    thumbnailPicture = models.TextField()
    language = models.CharField(max_length=3)
    subjectCategory = models.CharField(max_length=50)
    lectureNote = models.DateTimeField()
    imprint = models.DurationField()
    license = models.CharField(max_length=30)
