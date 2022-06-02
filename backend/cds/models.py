from bleach import clean
from django.contrib.postgres.fields import ArrayField
from django.db import models  # noqa: F401


class Lecture(models.Model):
    lecture_id = models.IntegerField(unique=True, db_index=True)
    title = models.CharField(max_length=250)
    date = models.DateField()
    corporate_author = models.CharField(max_length=250, blank=True, default="")
    abstract = models.TextField(blank=True, default="")
    series = models.CharField(max_length=250, blank=True, default="")
    speaker = models.CharField(max_length=250, blank=True, default="")
    speaker_details = models.CharField(max_length=250, blank=True, default="")
    event_details = models.CharField(max_length=250, blank=True, default="")
    thumbnail_picture = models.TextField(blank=True, default="")
    language = models.CharField(max_length=3, blank=True, default="")
    subject_category = models.CharField(max_length=250, blank=True, default="")
    lecture_note = models.DateTimeField()
    imprint = models.CharField(max_length=250, blank=True, default="")
    license = models.CharField(max_length=250, blank=True, default="")
    sponsor = models.CharField(max_length=250, blank=True, default="")
    keywords = ArrayField(models.CharField(max_length=250), blank=True, default=list)
    files = ArrayField(models.CharField(max_length=250), blank=True, default=list)
    type = ArrayField(models.CharField(max_length=250), blank=True, default=list)

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
