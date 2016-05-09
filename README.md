# Waypoints
Store and organise web links

## Installation
The API is a Django app so ensure you have created and activated a virtualenv before cloning the project from <git@github.com:hellsgate1001/waypoints.git>.

### API backend and dependencies
Start in the root directory of the project (where this README.md file lives) and

```
cd waypoints
python manage migrate
cd ../frontend
npm install
```
This will install all python dependencies and create the SQLite database for the project. It then install all Node dependencies for the AngularJS based frontend of the site.
