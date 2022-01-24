"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from accounts.views import UserViewSet
from cds.views import LectureDocumentView, LectureViewSet
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"lectures", LectureViewSet)

# router_search = routers.DefaultRouter()
router.register(r"search/lectures", LectureDocumentView, basename="lecturedocument")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include(router.urls)),
    # re_path(r"^search/", include(router_search.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework_auth")),
]
