from django.db import models

class Author(models.Model):
    """
    The author of a comment

    This model is mostly for fun, there may not be a great use case
    for having interns and volunteers deal with user management etc.
    """
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    role = models.CharField(max_length=64)
    total_comments = models.IntegerField(default=0)

    def __str__(self):
        return '{} {}'.format(self.first_name, self.last_name)


class Comment(models.Model):
    """
    A comment annotating a play row in the playlist
    """
    comment_text = models.CharField(max_length=1000)
    play_id = models.CharField(max_length=64)
    date_created = models.DateTimeField('date created')
    last_updated = models.DateTimeField('last updated')
    author = models.ForeignKey(Author)

    def __str__(self):
        return self.comment_text


class CommentLink(models.Model):
    """
    A link used to annotate a comment
    A comment can have multiple links

    Normalizing this out allows us to save previously added links,
    potential use in suggesting links in the future,
    getting rich info to add to artist pages and allows us to associate
    links to artists, labels, etc via the playlist API
    """
    comment = models.ForeignKey(Comment)
    url = models.URLField()

    def __str__(self):
        return self.url