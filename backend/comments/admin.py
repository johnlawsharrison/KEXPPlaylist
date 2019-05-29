from django.contrib import admin

from .models import Author, Comment, Link


admin.site.register(Author)
admin.site.register(Comment)
admin.site.register(Link)
