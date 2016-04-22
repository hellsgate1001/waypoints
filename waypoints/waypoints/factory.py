from factory import DjangoModelFactory

from django.contrib.auth import get_user_model


class UserFactory(DjangoModelFactory):
    class META:
        django_get_or_create = ('username',)

    FACTORY_FOR = get_user_model()
