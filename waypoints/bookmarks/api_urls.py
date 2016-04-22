from django.conf.urls import url

from .views import UserBookmarkList


urlpatterns = [
    url(r'^(?P<username>[\w-]+)/$', UserBookmarkList.as_view(), name='user_bookmarks'),
]
