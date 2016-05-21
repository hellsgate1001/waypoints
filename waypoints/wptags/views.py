from django.http import JsonResponse
from django.views.generic import ListView

from rest_framework import viewsets

from waypoints.mixins import JSONResponseMixin

from .models import Tag
from .serializers import TagSerializer


class TagsViewSet(viewsets.ModelViewSet):
    '''
    API endpoint that allows tags to be viewed or edited
    '''
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class UserTagList(JSONResponseMixin, ListView):
    response_class = JsonResponse
    content_type = 'application/json'

    def dispatch(self, request, *args, **kwargs):
        return super(UserTagList, self).dispatch(request, *args, **kwargs)

    def get_data(self, context):
        return context.get('object_list', [])

    def get_queryset(self):
        tags = (
            Tag
            .objects
            .values('pk', 'name')
            .distinct()
        )
        return [tag for tag in tags]

    def render_to_response(self, context, **response_kwargs):
        return self.render_to_json_response(context, **response_kwargs)
