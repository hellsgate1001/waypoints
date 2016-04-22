from django.contrib.auth import get_user_model
from django.views.generic import ListView

from .models import Bookmark


class UserBookmarkList(ListView):
    def get_queryset(self):
        user = get_user_model().objects.get(username=self.kwargs.get('username', None))
        return Bookmark.objects.filter(user=user)
        import pdb; pdb.set_trace()
