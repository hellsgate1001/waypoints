import os
import sys

sys.path.append('/var/envs/waypoints/lib/python2.7/site-packages')
sys.path.append('/todelete/remote/briansdojo/waypoints/waypoints')

os.environ['DJANGO_SETTINGS_MODULE'] = 'waypoints.settings'

#os.environ['GRAPHS_CONFIGURATION'] = 'Production'
#os.environ['GRAPHS_SECRET_KEY'] = '8ay(bk!y*2-_-hbawbl*e0nytxm**!dx^v6+&fal)w3ieja812'
#os.environ['TT_DB_PASS'] = 'y1no0O650CGEpNZvIrEh'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

