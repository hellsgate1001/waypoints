from django.views.generic import CreateView, ListView, View

from braces.views import CsrfExemptMixin
from rest_framework import viewsets

import urllib2
from BeautifulSoup import BeautifulSoup as bs

from waypoints.mixins import JSONResponseMixin
from wptags.models import Tag

from .models import Bookmark
from .serializers import BookmarkSerializer


class BookmarkViewSet(viewsets.ModelViewSet):
    '''
    API endpoint that allows bookmarks to be viewed or edited
    '''
    queryset = Bookmark.objects.all().order_by('-saved')
    serializer_class = BookmarkSerializer
    paginate_by = 5

    def create(self, request, *args, **kwargs):
        return super(BookmarkViewSet, self).create(request, *args, **kwargs)


class GetTitle(JSONResponseMixin, View):
    def get(self, request, *args, **kwargs):
        html = bs(urllib2.urlopen(request.GET['url']))
        response = {
            'title': html.title.string
        }

        return self.render_to_json_response(response)
