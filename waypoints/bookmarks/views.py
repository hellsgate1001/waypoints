from django.views.generic import CreateView, ListView

from rest_framework import viewsets

from waypoints.mixins import JSONResponseMixin

from .models import Bookmark
from .serializers import BookmarkSerializer


class BookmarkViewSet(viewsets.ModelViewSet):
    '''
    API endpoint that allows bookmarks to be viewed or edited
    '''
    queryset = Bookmark.objects.all().order_by('-saved')
    serializer_class = BookmarkSerializer


class AddBookmark(JSONResponseMixin, CreateView):
    model = Bookmark


class UserBookmarkList(JSONResponseMixin, ListView):
    def get_data(self, context):
        return context.get('object_list', [])

    def get_queryset(self):
        return [
            bookmark.to_dict()
            for bookmark in Bookmark.objects.all()
        ]

    def render_to_response(self, context, **response_kwargs):
        return self.render_to_json_response(context, **response_kwargs)
