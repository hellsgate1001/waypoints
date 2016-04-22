from factory import DjangoModelFactory

from ..models import Tag


class TagFactory(DjangoModelFactory):
    FACTORY_FOR = Tag
