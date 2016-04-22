from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.generic import ListView

from waypoints.mixins import JSONResponseMixin

from .models import Tag


class UserTagList(JSONResponseMixin, ListView):
    response_class = JsonResponse
    content_type = 'application/json'

    def dispatch(self, request, *args, **kwargs):
        self.user = get_user_model().objects.get(
            username=kwargs.get('username', None)
        )
        return super(UserTagList, self).dispatch(request, *args, **kwargs)

    def get_data(self, context):
        return context.get('object_list', [])

    def get_queryset(self):
        user_tags = (
            Tag
            .objects
            .values('pk', 'name')
            .filter(bookmark__user=self.user)
            .distinct()
        )
        return [tag for tag in user_tags]

    def render_to_response(self, context, **response_kwargs):
        return self.render_to_json_response(context, **response_kwargs)
