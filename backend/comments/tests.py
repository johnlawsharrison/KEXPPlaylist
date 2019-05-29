from django.test import TestCase

from comments.models import Comment, Author, Link

# Tests for Models
class CommentModelTest(TestCase):

    def test_string_representation(self):
        comment = Comment(comment_text="Pile is a good band")
        self.assertEqual(str(comment), comment.comment_text)

# author default to KEXP?
class AuthorModelTest(TestCase):

    def test_string_representation(self):
        author = Author(first_name="John", last_name="Harrison")
        expected = "John Harrison"
        self.assertEqual(str(author), expected)


class LinkModelTest(TestCase):

    def test_string_representation(self):
        link = Link(link_url="https://pile.bandcamp.com/album/green-and-gray", play_id=2663652)
        expected = "(https://pile.bandcamp.com/album/green-and-gray, 2663652)"
        self.assertEqual(str(link), expected)
