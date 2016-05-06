from django.conf.urls import url, include

from rest_framework import routers

from .views import TagsViewSet, UserTagList


router = routers.DefaultRouter()
router.register(r'tags', TagsViewSet)

urlpatterns = [
    url(r'^v1$', UserTagList.as_view(), name='user_tags'),
    url(r'^', include(router.urls)),
]
