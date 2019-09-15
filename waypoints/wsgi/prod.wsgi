import os
import sys

sys.path.append('/var/envs/waypoints/lib/python2.7/site-packages')
sys.path.append('/var/projects/waypoints/waypoints')

os.environ['DJANGO_SETTINGS_MODULE'] = 'waypoints.settings'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

