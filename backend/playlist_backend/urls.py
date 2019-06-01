"""playlist_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic.base import TemplateView

from rest_framework import routers

from comments import views as comment_views
from playlist_data.views import PlaylistDataView

router = routers.DefaultRouter()
router.register(r'comments', comment_views.CommentViewSet)
router.register(r'authors', comment_views.AuthorViewSet)
router.register(r'links', comment_views.LinkViewSet)

urlpatterns = [
    url(r'api_v1/', include(router.urls)), # REST API for CRUD operations (authors, links, comments)
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls')), # DRF login/logout for browsable API
    # entrypoint for the Angular app
    url(r'^[Pp]laylist/', TemplateView.as_view(template_name="playlist.html"), name="playlist"),
    url(r'^playlist-data/', PlaylistDataView.as_view())
]
