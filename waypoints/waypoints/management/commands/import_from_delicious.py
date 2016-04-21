from BeautifulSoup import BeautifulSoup

from django.contrib.auth import get_user_model
from django.core.management import BaseCommand, CommandError
from django.utils import timezone

from bookmarks.models import Bookmark
from wptags.models import Tag


class Command(BaseCommand):
    help = 'Import bookmarks and tags from the HTML export from delicious.com'

    def handle(self, *args, **options):
        user = get_user_model().objects.get(pk=1)
        # Load the export html into a beautiful soup object
        soup = BeautifulSoup(open('delicious.html'))

        '''
        The layout of the export puts links into <dt> tags and any related
        comments into a <dd> tag immediately following.
        If a link has no comments then the <dd> tag is not present.
        Ignore all other tags
        '''

        for i in range(len(soup.dl.contents)):
            if soup.dl.contents[i].name == 'dt':
                bookmark = Bookmark(
                    user=user,
                    url=soup.dl.contents[i].a['href'],
                    title=soup.dl.contents[i].a.string,
                    saved=timezone.make_aware(
                        timezone.datetime.fromtimestamp(
                            float(soup.dl.contents[i].a['add_date'])
                        ),
                        timezone.get_current_timezone()
                    )
                )
                if soup.dl.contents[(i + 1)].name == 'dd':
                    bookmark.comment = soup.dl.contents[(i + 1)].string
                bookmark.save()
                # Add the tags
                for tag in soup.dl.contents[i].a['tags'].split(','):
                    if tag != '':
                        try:
                            the_tag = Tag.objects.get(name=tag)
                        except Tag.DoesNotExist as e:
                            the_tag = Tag(name=tag)
                            the_tag.save()
                        bookmark.tags.add(the_tag)

