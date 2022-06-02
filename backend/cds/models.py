from bleach import clean
from django.contrib.postgres.fields import ArrayField
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
    thumbnail_picture = models.TextField(blank=True)
    language = models.CharField(max_length=3)
    subject_category = models.CharField(max_length=250)
    lecture_note = models.DateTimeField(blank=True)
    imprint = models.CharField(max_length=250)
    license = models.CharField(max_length=250)
    sponsor = models.CharField(max_length=250, blank=True)
    keywords = ArrayField(models.CharField(max_length=250), blank=True, default=list)

    def save(self, *args, **kwargs):
        self.abstract = clean(
            self.abstract,
            strip=True,
            tags=["p", "div", "strong", "span", "ul", "li"],
            attributes={"a": ["href"]},
            strip_comments=True,
        )
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.lecture_id} - {self.title} ({self.id})"
