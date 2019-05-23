# KEXPPlaylist

## Backend setup (Django)

Set the following envvars for the postgres connection:

```
export PG_HOST=<hostname for your postgresql server; defaults to localhost>
export PG_DB_NAME="KEXPPlaylist" # you may need to create this DB first
export PG_USER=<username with access to the db above>
export PG_PASSWORD=<password for user above>
```
## Building the Angular frontend

Source code for the frontend application is found in the `frontend` directory
In order for it to be served via the Django app, it needs to be built to the appropriate
static folder like so

the `--watch` flag is optional, and can be excluded if you don't want the angular project
to rebuild every time a change is seen in the source code

```
cd frontend/playlist-frontend
ng build --prod --output-path ../../backend/playlist-backend/static/angular --watch --output-hashing none
```
