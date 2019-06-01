# KEXPPlaylist

# References and resources
I made use of the following documentation and blog post resources when putting this project together. I've labelled each of these with the specific problem area I found them useful for.

   * [Django Rest Framework (for CRUD operations)](https://www.django-rest-framework.org/api-guide/)
   * [django-filter (for filtering comments by play_ids etc.)](https://django-filter.readthedocs.io/en/master/ref/filters.html)
   * [a bug I ran into building multi-value filtering for play-ids](https://stackoverflow.com/questions/8144582/django-how-do-i-use-a-string-as-the-keyword-in-a-q-statement)
   * [getting Angular to build properly to a Django project](https://medium.com/swlh/django-angular-4-a-powerful-web-application-60b6fb39ef34)
   * [a nice tool for help with CSS centering](http://howtocenterincss.com/)
   * [flexbox reference](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#article-header-id-7)
   * [adjusting CSRF behavior from angular](https://stackoverflow.com/a/47591912)

and StackOverflow for the occasional perplexing error message and CSS tricks

### Discussion Topics

Here's a brief reminder-list of design choices that I think merit discussion in person.

- Association of plays to comments (handling on frontend vs. backend)

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
export PG_HOST="<hostname for your postgresql server; defaults to localhost>"
export PG_DB_NAME="playlist" # you may need to create this DB first
export PG_USER=<username with access to the db above>
export PG_PASSWORD=<password for user above>
```

(for dev use only)
Generate a new secret key for Django to use, and set it here:

```
python genkey.py
<outputs a key>
export SECRET_KEY='very secret key'
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
