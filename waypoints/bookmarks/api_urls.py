from django.conf.urls import url, include

from rest_framework import routers

from .views import BookmarkViewSet, GetTitle


router = routers.DefaultRouter()
router.register(r'bookmarks', BookmarkViewSet)

urlpatterns = [
    url(r'^get-title/$', GetTitle.as_view(), name='get_title'),
    url(r'^', include(router.urls)),
]
