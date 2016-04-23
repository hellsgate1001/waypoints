from BeautifulSoup import BeautifulSoup

from django.contrib.auth import get_user_model
from django.core.management import BaseCommand, CommandError
from django.utils import timezone

from bookmarks.models import Bookmark
from wptags.models import Tag


class Command(BaseCommand):
    '''
    Parse an HTML export from delicious.com, loading the resultant bookmarks
    and tags into a database
    '''
    help = 'Import bookmarks and tags from the HTML export from delicious.com'

    def add_arguments(self, parser):
        '''
        Parse command line arguments
        '''
        super(Command, self).add_arguments(parser)

    @classmethod
    def handle(self, *args, **options):
        '''
        The layout of the export puts links into <dt> tags and any related
        comments into a <dd> tag immediately following.
        If a link has no comments then the <dd> tag is not present.
        Ignore all other tags
        '''

        user = get_user_model().objects.get(pk=1)
        # Load the export html into a beautiful soup object
        soup = BeautifulSoup(open('delicious.html'))

        print 'Parsing export with %s rows' % len(soup.dl.contents)
        for i in range(len(soup.dl.contents)):
            if soup.dl.contents[i].name == 'dt':
                print(
                    '{row}: Creating new bookmark for {url}'.format(
                        row=i, url=soup.dl.contents[i].a['href']
                    )
                )
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
                print(
                    '    {row}: Bookmark title: {title}'.format(
                        row=i,
                        title=soup.dl.contents[i].a.text.encode('utf-8')
                    )
                )

                try:
                    # Check for any comments for this bookmark
                    if soup.dl.contents[(i + 1)].name == 'dd':
                        print(
                            '    {row}: Got comments: {comments}'.format(
                                row=i,
                                comments=soup.dl.contents[(i + 1)].string
                            )
                        )
                        bookmark.comment = soup.dl.contents[(i + 1)].string
                except IndexError:
                    # We've reached the end of the export file
                    pass
                bookmark.save()
                # Add the tags
                for tag in soup.dl.contents[i].a['tags'].split(','):
                    print(
                        '        {row}: Found tag {tag}'.format(
                            row=i, tag=tag
                        )
                    )
                    if tag != '':
                        try:
                            the_tag = Tag.objects.get(name=tag.strip(' '))
                        except Tag.DoesNotExist as e:
                            the_tag = Tag(name=tag.strip(' '))
                            the_tag.save()
                        bookmark.tags.add(the_tag)

