from __future__ import unicode_literals

from django.conf import settings
from django.db import models
from django.forms.models import model_to_dict

from wptags.models import Tag


class Bookmark(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    url = models.URLField(max_length=255)
    title = models.CharField(max_length=255)
    saved = models.DateTimeField(auto_now_add=True)
    deleted = models.BooleanField(default=False)
    comment = models.TextField(blank=True)
    tags = models.ManyToManyField('wptags.Tag')

    def __str__(self):
        return self.title

    def to_dict(self):
        bookmark_dict = model_to_dict(self)
        # Get the tag names along with the already present tag IDs
        bookmark_dict['tags'] = [
            Tag.objects.values('pk', 'name').get(pk=tag_id) for tag_id in bookmark_dict['tags']
        ]
        return bookmark_dict
