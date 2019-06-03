from django.db import models

class AuthorManager(models.Manager):

    def default_author(self):
        try:
            return self.get(is_default_author=True)
        except (Author.MultipleObjectsReturned, Author.DoesNotExist):
            # return None for multiple as well, indicating that since there
            # are somehow multiple defaults, semantically there isn't one
            return None

class CommentManager(models.Manager):

    def authored_by(self, first_name, last_name):
        return self.filter(author__last_name=last_name).filter(author__first_name=first_name)


class Author(models.Model):
    """
    The author of a comment
    """
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    role = models.CharField(max_length=64)
    # TODO: enforce constraint that only one author is default
    is_default_author = models.BooleanField(default=False)
    total_comments = models.IntegerField(default=0)

    objects = AuthorManager()


    def __str__(self):
        return '{} {}'.format(self.first_name, self.last_name)


    def get_author_credit(self):
        return '{} {} ({})'.format(self.first_name, self.last_name, self.role)


class Comment(models.Model):
    """
    A comment annotating a play row in the playlist
    """
    comment_text = models.TextField()
    play_id = models.IntegerField(default=0)
    date_created = models.DateTimeField(auto_now_add=True) # test auto now add
    last_updated = models.DateTimeField(auto_now=True) # test auto now
    author = models.ForeignKey(Author, blank=True, null=True) # test null author populates with default author

    objects = CommentManager()


    def __str__(self):
        return self.comment_text


    def save(self, *args, **kwargs):
        """
        Overrides base model save() method
        """
        # if no author is set, set to default author
        if not self.author:
            self.author = Author.objects.default_author()
        if not self.id:
            # this is a new comment, increment the author's comment count
            # NOTE: this functionality could be simplified later with a computed column
            updated_author = Author.objects.get(id=self.author.id)
            updated_author.total_comments += 1
            updated_author.save()


        super().save(*args, **kwargs)


class Link(models.Model):
    """
    A link used to annotate a play
    Note:
        A play can have multiple links, so this is a separate model
        for the sake of maintaining normalization


    Normalizing this out allows us to save previously added links,
    potential use in suggesting links in the future,
    getting rich info to add to artist pages and allows us to associate
    links to artists, labels, etc via the playlist API
    """
    play_id = models.IntegerField(default=0)
    link_url = models.URLField()


    def __str__(self):
        return '({}, {})'.format(self.link_url, self.play_id)
