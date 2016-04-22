from __future__ import unicode_literals

from django.db import models
from django.forms.models import model_to_dict


class Tag(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return '{tag} ({user})'.format(
            tag=self.name
        )

    def to_dict(self):
        return model_to_dict(self)
