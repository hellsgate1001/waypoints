from django.http import JsonResponse
from django.views.generic import ListView

from waypoints.mixins import JSONResponseMixin

from .models import Bookmark


class UserBookmarkList(JSONResponseMixin, ListView):
    response_class = JsonResponse
    content_type = 'application/json'

    def get_data(self, context):
        return context.get('object_list', [])

    def get_queryset(self):
        return [
            bookmark.to_dict()
            for bookmark in Bookmark.objects.all()
        ]

    def render_to_response(self, context, **response_kwargs):
        return self.render_to_json_response(context, **response_kwargs)
