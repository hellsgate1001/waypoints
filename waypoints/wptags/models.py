from __future__ import unicode_literals

from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return '{tag} ({user})'.format(
            tag=self.name,
            user=self.user.username
        )
