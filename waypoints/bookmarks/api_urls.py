from django.conf.urls import url, include

from rest_framework import routers

from .views import BookmarkViewSet, AddBookmark, UserBookmarkList


router = routers.DefaultRouter()
router.register(r'bookmarks', BookmarkViewSet)

urlpatterns = [
    url(r'^v1/$', UserBookmarkList.as_view(), name='user_bookmarks'),
    url(r'^v1/add/$', AddBookmark.as_view(), name='add'),
    url(r'^', include(router.urls)),
]
