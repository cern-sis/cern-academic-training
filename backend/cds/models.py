from django.db import models  # noqa: F401


class Lecture(models.Model):
    lecture_id = models.IntegerField(unique=True)
    title = models.CharField(max_length=250)
    date = models.DateField()
    corporate_author = models.CharField(max_length=250)
    abstract = models.TextField()
    series = models.CharField(max_length=250)
    speaker = models.CharField(max_length=250, blank=True)
    speaker_details = models.CharField(max_length=250, blank=True)
    event_details = models.CharField(max_length=250, blank=True)
    thumbnail_picture = models.TextField()
    language = models.CharField(max_length=3)
    subject_category = models.CharField(max_length=520)
    lecture_note = models.DateTimeField(blank=True)
    imprint = models.CharField(max_length=250)
    license = models.CharField(max_length=250)
