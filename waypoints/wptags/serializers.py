from rest_framework import serializers

from .models import Tag


class TagSerializer(serializers.ModelSerializer):
    size = serializers.SerializerMethodField()

    class Meta:
        model = Tag
        fields = ['id', 'name', 'size']

    def get_size(self, obj):
        return obj.bookmark_set.count()
