# KEXPPlaylist
[![Build Status](https://travis-ci.com/johnlawsharrison/KEXPPlaylist.svg?branch=master)](https://travis-ci.com/johnlawsharrison/KEXPPlaylist)
[![GitHub tag](https://img.shields.io/github/tag/johnlawsharrison/KEXPPlaylist.svg)](https://github.com/johnlawsharrison/KEXPPlaylist/tags/)


# References and resources
I made use of the following documentation and blog post resources when putting this project together. I've labelled each of these with the specific problem area I found them useful for.

   * [A blog post on designing Django models for maintainability](https://blog.kevinastone.com/django-model-behaviors)
   * [Django Rest Framework (for CRUD operations)](https://www.django-rest-framework.org/api-guide/)
   * [Angular material docs](https://material.angular.io)
   * [django-filter (for filtering comments by play_ids etc.)](https://django-filter.readthedocs.io/en/master/ref/filters.html)
   * [a bug I ran into building multi-value filtering for play-ids](https://stackoverflow.com/questions/8144582/django-how-do-i-use-a-string-as-the-keyword-in-a-q-statement)
   * [getting Angular to build properly to a Django project](https://medium.com/swlh/django-angular-4-a-powerful-web-application-60b6fb39ef34)
   * [a nice tool for help with CSS centering gotchas](http://howtocenterincss.com/)
   * [flexbox css reference](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#article-header-id-7)
   * [adjusting CSRF behavior from angular](https://stackoverflow.com/a/47591912)
   * [a regex that works well for getting link URLs from comments](https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url)
   * [regex testing](https://regexr.com/)

and StackOverflow for the occasional perplexing error message and CSS tricks

### Discussion Topics

Here's a brief reminder-list of design choices that I think merit discussion in person.

- Association of plays to comments (handling on frontend vs. backend)
	- Original approach [PR #16](https://github.com/johnlawsharrison/KEXPPlaylist/pull/16)
	- Better approach [PR #17](https://github.com/johnlawsharrison/KEXPPlaylist/pull/17)

## Quick dev/demo mode setup

All commands below are written assuming the root of this repository as the working directory

### Install dependencies

Create and activate a python3 virtual environment

```
python3 -m venv venv
. venv/bin/activate
```

Install the Django app's dependencies

```
pip install -r backend/requirements.txt
```

Set the following envvars for the postgres connection:

```
export PG_HOST="<hostname for your postgresql server; defaults to localhost>"
export PG_DB_NAME="playlist" # create this DB first; defaults to "postgres" if you just want to use that
export PG_USER=<username with access to the db above> # defaults to "postgres"
export PG_PASSWORD=<password for user above> # defaults to no password
```

(for dev use only)
Generate a new secret key for Django to use, and set it here:

```
python genkey.py
<outputs a key>
export SECRET_KEY='very secret key'
```

### Building the Angular frontend

Source code for the frontend application is found in the `frontend` directory.

In order for it to be served via the Django app, it must be built to the appropriate static folder like so:

```
cd frontend/playlist-frontend

# install angular dependencies
npm install

ng build --prod --output-path ../../backend/playlist_backend/static/angular --watch --output-hashing none
```

the `--watch` flag is optional, and can be excluded if you don't want the angular project
to rebuild every time a change is seen in the source code

### Running the server

(assuming a `postgres` server is already configured and running)

Run the necessary migrations

```
cd backend
python manage.py migrate
```

Populate some default comment authors

```
python ./backend/manage.py loaddata authors.json
```

start the server

```
python manage.py runserver
```

## With Docker Compose (untested)

I've created a very rudimentary docker-compose setup for this project

Follow these steps to get it running locally:

Build the angular app to Django's static folder (same as above)

```
cd frontend/playlist-frontend
ng build --prod --output-path ../../backend/playlist_backend/static/angular --watch --output-hashing none
```

Run docker-compose to create the Django and postgres containers

```
docker-compose up -d
```

then run the migrations in the container using `docker exec`

```
docker exec -it playlist_django bash

# from inside the container

python backend/manage.py migrate
# load the default author fixtures
python backend/manage.py loaddata authors.json
exit
```
Assuming all goes well, you should be able to navigate to [http://localhost:8000/playlist](http://localhost:8000/playlist) and use the application!

This setup isn't suitable for production without a wide variety of tweaks and security checks.
