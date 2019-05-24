from django.contrib import admin

from .models import Author, Comment, CommentLink

admin.site.register(Author)
admin.site.register(Comment)
admin.site.register(CommentLink)
