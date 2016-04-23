from django.conf.urls import url

from .views import UserBookmarkList


urlpatterns = [
    url(r'^$', UserBookmarkList.as_view(), name='user_bookmarks'),
]
