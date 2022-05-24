# -*- coding: UTF-8 -*-
import json

from bleach import clean
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

# Create your tests here.


class LectureTest(APITestCase):
    maxDiff = None

    def setUp(self):
        self.url = "/api/v1/lectures/"
        self.username = "admin"
        self.password = "123456"
        self.user = User.objects.create_user(self.username, self.password)
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        self.data = {
            "title": "REMOTE: Federated Data Architectures",
            "date": "2021-10-22",
            "corporate_author": "This is an author",
            "abstract": "<h2><div>TEST</div></h2>",
            "series": "(Academic Training Lecture Regular Programme ; 202",
            "speaker": "de Jong, Michiel",
            "speaker_details": "Speakers details",
            "event_details": "Event Details",
            "thumbnail_picture": "http://mediaarchive.cern.ch/MediaArchive/Video/Public/Conferences/2021/1049666/1049666-presenter-cover.png",
            "language": "eng",
            "subject_category": "Academic Training Lecture Regular Programme",
            "lecture_note": "2021-10-22T11:59:35Z",
            "imprint": "01:03:18",
            "license": "2021 CERN",
            "lecture_id": 2800620,
        }

    def test_post_lecture(self):
        response = self.client.post(self.url, self.data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_lectures(self):
        response = self.client.post(self.url, self.data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.get(self.url, format="json")

        expected_data = {
            "id": 2,
            "lecture_id": 2800620,
            "title": "REMOTE: Federated Data Architectures",
            "date": "2021-10-22",
            "corporate_author": "This is an author",
            "abstract": "<div>TEST</div>",
            "series": "(Academic Training Lecture Regular Programme ; 202",
            "speaker": "de Jong, Michiel",
            "speaker_details": "Speakers details",
            "event_details": "Event Details",
            "thumbnail_picture": "http://mediaarchive.cern.ch/MediaArchive/Video/Public/Conferences/2021/1049666/1049666-presenter-cover.png",
            "language": "eng",
            "subject_category": "Academic Training Lecture Regular Programme",
            "lecture_note": "2021-10-22T11:59:35Z",
            "imprint": "01:03:18",
            "license": "2021 CERN",
        }

        self.assertEqual(json.loads(response.content)["results"][0], expected_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_lecture(self):
        response = self.client.post(self.url, self.data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.get(f"{self.url}2800620/", format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_bleach_abstract(self):
        response = self.client.post(self.url, self.data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.get(self.url, format="json")

        data = {
            "id": 9,
            "lecture_id": 2791073,
            "title": "Beam Intercepting Devices at CERN - Types, Challenges, Design, R&D and Operation",
            "date": "2021-11-17",
            "corporate_author": "CERN. Geneva",
            "abstract": '<!--HTML--><p class="p1"><span><span><span><span><span><span><span><span><span><span><span><span><span><span><span style="color:#000000">Beam-intercepting systems are essential devices designed to absorb the energy and power of a particle beam. Generally, they are classified in three categories depending on their use: particle-producing devices, such as targets; systems for beam cleaning and control, such as collimators or scrapers; and those with safety functions, such as beam dumps or beam stoppers.&nbsp;</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></p>\n\n<p class="p1"><span><span><span><span><span><span><span><span><span><span><span><span><span><span><span style="color:#000000">Beam-intercepting devices have to withstand enormous mechanical and thermally-induced stresses. In the case of the LHC beam dump, for example, upgrades of the LHC injectors will deliver a beam which at high energy will have a kinetic energy equivalent to 560 MJ during LHC Run 3, roughly corresponding to the energy required to melt 2.7 tonnes of copper. Released in a period of just 86 μs, this corresponds to a peak power of 6.3 TW or, put differently, 8.6 billion horse power.&nbsp;</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></p>\n\n<p class="p1"><span><span><span><span><span><span><span><span><span><span><span><span><span><span><span style="color:#000000">The lectures will focus on the engineering activities regarding these devices, which consist in conceptual studies, material selection, prototyping and testing, R&amp;D, design, manufacturing, installation and operation follow-up. Examples of recently developed devices will be shown, including fixed targets, collimators and dumps/absorbers to cope with LIU and HiLumi beams. Design work includes Monte Carlo (with code such as FLUKA) and Finite Element Analyses (FEA) to determine the behavior of the systems during beam impact, testing and prototyping activities to validate technical solutions, material characterisation and testing under beam, both single impact and long-term radiation damage.&nbsp;</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></p>\n\n<p class="p1"><span><span><span><span><span><span><span><span><span><span><span><span><span><span><span style="color:#000000">Manufacturing, assembly and installation steps will be shown for some devices, including operation follow-up.&nbsp;</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></p>\n\n<p class="p1"><span><span><span><span><span><span><span><span><span><span><span><span><span><span><span style="color:#000000">The challenges to be expected in the few years with the development and implementation of new machines will be also discussed.</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></p>\n\n<div>\n<p><strong>Short bio of Marco Calviani</strong></p>\n\n<p><span><span><span><span><span><span><span><span><span><span><span><span><span><span><span style="color:#000000">Marco Calviani (<a href="https://www.linkedin.com/in/marco-calviani-33265587/">https://www.linkedin.com/in/marco-calviani-33265587/</a>&nbsp;) is currently head of the Target Collimator Dumps Section at CERN, responsible for the conception, design, assembly, operation and maintenance of all the beam intercepting devices in the CERN’s accelerator complex, for current and future projects. He is also deputy head of the Sources Targets Interactions Group within the Systems Department. Marco is a nuclear and neutron physicist by education. He has led several projects in the last few years, including the design, construction and operation of the third generation n_TOF neutron spallation target as well as of the overall renovation of the antiproton production target area at CERN, which are currently operating and delivering physics.&nbsp;As&nbsp;TCD Section&nbsp;head&nbsp;he has been responsible for the delivery of several critical devices for the LHC Injector Upgrade project, including the new 300 kW SPS internal beam dump, as well as the upgrade of the LHC beam dump block in order to cope with the LHC Run3 total energy of 500 MJ/dump.&nbsp;The Section he is leading&nbsp;will be&nbsp;organizing the prototyping and procurement of more than 50 collimators for Long Shutdown 3 in the framework of the High-Luminosity Project as well as for new HL-LHC external dumps capable of accepting 700 MJ/dump. He is also involved in the conception of future beam intercepting devices for future CERN’s programs, including FCC, Muon Collider and Beam Dump Facility. Marco is serving in the ORNL STS Technical Advisory Committee as well as in several review panels for US, European and Japanese HEP and NP programs. Marco is author/co-authors of more than 100 papers (<a href="https://orcid.org/0000-0002-8213-8358">https://orcid.org/0000-0002-8213-8358</a>&nbsp;).</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></p>\n</div>\n\nAcademic_Training_Nov1: https://cern.zoom.us/j/63224344058?pwd=dGdGM0c1WWY0YWt5NmN6R2dHWllyUT09',
            "series": "Academic Training Lecture Regular Programme - 2021-2022",
            "speaker": "Calviani, Marco",
            "speaker_details": "CERN",
            "event_details": "https://indico.cern.ch/event/980520/",
            "thumbnail_picture": "http://mediaarchive.cern.ch/MediaArchive/Video/Public/Conferences/2021/980520/980520-presenter-legacy.jpg",
            "language": "eng",
            "subject_category": "Academic Training Lecture Regular Programme",
            "lecture_note": "2021-11-17T11:00:00Z",
            "imprint": "2021-11-17 - 1:15:49",
            "license": "CERN 2021",
        }

        cleaned_data = clean(data, strip=True)

        self.assertEqual(json.loads(response.content)["results"][0], cleaned_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
