from factory import DjangoModelFactory

from ..models import Bookmark


class BookmarkFactory(DjangoModelFactory):
    FACTORY_FOR = Bookmark
