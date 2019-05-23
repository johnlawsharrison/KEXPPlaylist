# KEXPPlaylist

## Backend setup (Django)

Set the following envvars:

```
export PG_HOST=<hostname for your postgresql server; defaults to localhost>
export PG_DB_NAME="KEXPPlaylist" # you may need to create this DB first
export PG_USER=<username with access to the db above>
export PG_PASSWORD=<password for user above>
```
# Building the Angular frontend

```
cd frontend/playlist-frontend
ng build --prod --output-path ../../backend/playlist-backend/static/angular --watch --output-hashing none
```
