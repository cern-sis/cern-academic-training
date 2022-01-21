from django.db import models  # noqa: F401


class Lecture(models.Model):
    lecture_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    date = models.DateField()
    corporate_author = models.CharField(max_length=100)
    abstract = models.TextField()
    series = models.CharField(max_length=50)
    speaker = models.CharField(max_length=50)
    speaker_details = models.CharField(max_length=50)
    event_details = models.CharField(max_length=50)
    thumbnail_picture = models.TextField()
    language = models.CharField(max_length=3)
    subject_category = models.CharField(max_length=50)
    lecture_note = models.DateTimeField()
    imprint = models.DurationField()
    license = models.CharField(max_length=30)
