from django.views.generic import CreateView, ListView

from braces.views import CsrfExemptMixin
from rest_framework import viewsets

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

    def get_queryset(self):
        return self.queryset[0:10]

    def create(self, request, *args, **kwargs):
        # Tags need to be processed as objects. To allow this, convert the
        # posted tag strings to Tag objects
        tags = []
        # import pdb;pdb.set_trace()
        for t in request.data['tags'].split(','):
            tag, created = Tag.objects.get_or_create(name=t.strip().lower())
            tags.append(
                {'id': tag.pk, 'name': tag.name}
            )
        request.data['tags'] = tags
        return super(BookmarkViewSet, self).create(request, *args, **kwargs)


class AddBookmark(CsrfExemptMixin, JSONResponseMixin, CreateView):
    model = Bookmark

    def post(self, request, *args, **kwargs):
        import pdb;pdb.set_trace()


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
