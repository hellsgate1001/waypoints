from django.conf.urls import url, include

urlpatterns = [
    url(r'^bookmarks/', include('bookmarks.api_urls', namespace='bookmarks')),
    # url(r'^tags/', include('wptags.api_urls', namespace='tags')),
]
