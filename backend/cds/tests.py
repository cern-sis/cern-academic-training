import json

from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

# Create your tests here.


class LectureTest(APITestCase):
    def setUp(self):
        self.url = "/api/lectures/"
        self.username = "admin"
        self.password = "123456"
        self.user = User.objects.create_user(self.username, self.password)
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        self.data = {
            "lecture_id": "2788942",
            "title": "REMOTE: Federated Data Architectures",
            "date": "2021-10-22",
            "corporate_author": "This is an author",
            "abstract": "TEST",
            "series": "(Academic Training Lecture Regular Programme ; 202",
            "speaker": "de Jong, Michiel",
            "speaker_details": "Speakers details",
            "event_details": "Event Details",
            "thumbnail_picture": "http://mediaarchive.cern.ch/MediaArchive/Video/Public/Conferences/2021/1049666/1049666-presenter-cover.png",
            "language": "eng",
            "subject_category": "Academic Training Lecture Regular Programme",
            "lecture_note": "2021-10-22T11:59:35Z",
            "imprint": "01:03:18",
            "license": "© 2021 CERN",
        }

    def test_post_lecture(self):
        response = self.client.post(self.url, self.data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_lectures(self):
        response = self.client.post(self.url, self.data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.get(self.url, format="json")
        expected_data = {
            "url": "http://testserver/api/lectures/1/",
            "title": "REMOTE: Federated Data Architectures",
            "date": "2021-10-22",
            "corporate_author": "This is an author",
            "abstract": "TEST",
            "series": "(Academic Training Lecture Regular Programme ; 202",
            "speaker": "de Jong, Michiel",
            "speaker_details": "Speakers details",
            "event_details": "Event Details",
            "thumbnail_picture": "http://mediaarchive.cern.ch/MediaArchive/Video/Public/Conferences/2021/1049666/1049666-presenter-cover.png",
            "language": "eng",
            "subject_category": "Academic Training Lecture Regular Programme",
            "lecture_note": "2021-10-22T11:59:35Z",
            "imprint": "01:03:18",
            "license": "© 2021 CERN",
        }

        self.assertEqual(json.datas(response.content)["results"][0], expected_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_lecture(self):
        response = self.client.post(self.url, self.data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.get(f"{self.url}1/", format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
