# KEXPPlaylist

## Quick dev/demo mode setup

All commands below are written with the working directory as the root of this repository

### Install dependencies

Create and activate a python3 virtual environment

```
python3 -m venv venv
. venv/bin/activate
```

Install the Django app's dependencies

```
pip install -r requirements.txt
```

Set the following envvars for the postgres connection:

```
export PG_HOST=<hostname for your postgresql server; defaults to localhost>
export PG_DB_NAME="KEXPPlaylist" # you may need to create this DB first
export PG_USER=<username with access to the db above>
export PG_PASSWORD=<password for user above>
```

### Building the Angular frontend

Source code for the frontend application is found in the `frontend` directory
In order for it to be served via the Django app, it must be built to the appropriate static folder like so:

```
cd frontend/playlist-frontend
ng build --prod --output-path ../../backend/playlist_backend/static/angular --watch --output-hashing none
```

the `--watch` flag is optional, and can be excluded if you don't want the angular project
to rebuild every time a change is seen in the source code

### Running the server

(assuming a postgres server is already configured and running)

Run the necessary migrations

```
cd backend
python manage.py migrate
```

start the server

```
python manage.py runserver
```
