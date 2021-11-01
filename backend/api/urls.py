from django.urls import path

from . import views

urlpatterns = [
    path("", views.getRoutes),
    path("lectures/", views.getLectures),
    path("lectures/<str:pk>/", views.getLecture),
]
