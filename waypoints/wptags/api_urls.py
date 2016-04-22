from django.conf.urls import url

from .views import UserTagList


urlpatterns = [
    url(r'^(?P<username>[\w-]+)/$', UserTagList.as_view(), name='user_tags'),
]
