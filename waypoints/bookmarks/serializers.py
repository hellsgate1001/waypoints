from rest_framework import serializers

from wptags.serializers import TagSerializer

from .models import Bookmark


class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = [
            'id',
            'url',
            'title',
            'saved',
            'deleted',
            'comment',
            'tags'
        ]
        depth = 1
