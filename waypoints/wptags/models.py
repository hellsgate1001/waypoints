from __future__ import unicode_literals

from django.conf import settings
from django.db import models


class Tag(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    name = models.CharField(max_length=255)
    occurrences = models.PositiveIntegerField(default=1)

    def __str__(self):
        return '{tag} ({user})'.format(
            tag=self.name,
            user=self.user.username
        )
