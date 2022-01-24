from django.db import models  # noqa: F401


class Lecture(models.Model):
    lecture_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=250)
    date = models.DateField()
    corporate_author = models.CharField(max_length=250)
    abstract = models.TextField()
    series = models.CharField(max_length=250)
    speaker = models.CharField(max_length=250)
    speaker_details = models.CharField(max_length=20)
    event_details = models.CharField(max_length=250)
    thumbnail_picture = models.TextField()
    language = models.CharField(max_length=3)
    subject_category = models.CharField(max_length=520)
    lecture_note = models.DateTimeField()
    imprint = models.CharField(max_length=250)
    license = models.CharField(max_length=250)
