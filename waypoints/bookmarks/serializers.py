from rest_framework import serializers

from wptags.models import Tag

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

    def create(self, validated_data):
        new_bookmark = super(BookmarkSerializer, self).create(validated_data)
        # Grab the POSTed tags. Add them to the database if need be. If already
        # in the database, add the relationship to the bookmark
        for tag_name in self.context['request'].data['tags'].split(','):
            tag, created = Tag.objects.get_or_create(
                name=tag_name.strip().lower()
            )
            new_bookmark.tags.add(tag)
        return new_bookmark
