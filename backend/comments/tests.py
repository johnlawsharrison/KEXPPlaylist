from datetime import datetime
from django.test import TestCase

from comments.models import Comment, Author, Link

# Tests for Models
class CommentModelTest(TestCase):

    def test_string_representation(self):
        comment = Comment(comment_text="Pile is a good band")
        self.assertEqual(str(comment), comment.comment_text)


    def test_default_author_when_saved_null(self):
        # we need to set up a default author first
        # this create and the one below are good candidates for pre-test setup
        # since we will likely use them for a few tests
        default_author = Author.objects.create(
            first_name="KEXP",
            last_name="Playlist",
            role="default",
            is_default_author=True
        )
        # create a non-default author
        author = Author.objects.create(first_name="John", last_name="Harrison", role="KEXP Volunteer")
        comment = Comment.objects.create(
            comment_text="Testing a comment created with an author as null sets to default",
            play_id=0,
            author=None
        )
        # assert we got an author
        self.assertIsInstance(comment.author, Author)
        # assert it's the default author we made
        self.assertEqual(comment.author, default_author)


    def test_new_comment_auto_timestamp(self):
        default_author = Author.objects.create(
            first_name="KEXP",
            last_name="Playlist",
            role="default",
            is_default_author=True
        )
        comment = Comment.objects.create(
            comment_text="Testing a comment without dates explicitly set gets a now timestamp",
            play_id=0,
            author=None # use the default author
        )
        # we won't try to assert the exact time,
        # since its unlikely we can create the timestamp that is set
        self.assertIsInstance(comment.date_created, datetime)
        self.assertIsInstance(comment.last_updated, datetime)


    def test_comment_authored_by(self):
        default_author = Author.objects.create(
            first_name="KEXP",
            last_name="Playlist",
            role="default",
            is_default_author=True
        )
        # create a non-default author
        john = Author.objects.create(first_name="John", last_name="Harrison", role="KEXP Volunteer")
        comment_by_default = Comment.objects.create(
            comment_text="Created by default author",
            play_id=0,
            author=None # use the default author
        )
        comment_by_john = Comment.objects.create(
            comment_text="Created by john",
            play_id=1,
            author=john
        )
        another_comment_by_john = Comment.objects.create(
            comment_text="Also created by john",
            play_id=2,
            author=john
        )
        created_by_default = Comment.objects.authored_by("KEXP", "Playlist")
        created_by_john = Comment.objects.authored_by("John", "Harrison")
        # these assertions leave a bit to be desired, we should probably compare
        # lists explicitly with expected values rather than checking for membership and length
        self.assertIn(comment_by_default, created_by_default)
        self.assertIn(comment_by_john, created_by_john)
        self.assertNotIn(comment_by_default, created_by_john)
        self.assertNotIn(comment_by_john, created_by_default)
        self.assertTrue(len(created_by_default) == 1)
        self.assertTrue(len(created_by_john) == 2)


    def test_increment_author_comment_count(self):
        default_author = Author.objects.create(
            first_name="KEXP",
            last_name="Playlist",
            role="default",
            is_default_author=True
        )
        comment_by_john = Comment.objects.create(
            comment_text="Created by default author",
            play_id=1,
            author=None
        )
        updated_author = Author.objects.get(id=default_author.id)
        self.assertTrue(updated_author.total_comments == 1)
        another_comment_by_john = Comment.objects.create(
            comment_text="Also created by default author",
            play_id=2,
            author=None
        )
        updated_author = Author.objects.get(id=default_author.id)
        self.assertTrue(updated_author.total_comments == 2)


class AuthorModelTest(TestCase):

    def test_string_representation(self):
        author = Author(first_name="John", last_name="Harrison")
        expected = "John Harrison"
        self.assertEqual(str(author), expected)


    def test_get_author_credit(self):
        author = Author(first_name="John", last_name="Harrison", role="KEXP Volunteer")
        expected = "John Harrison (KEXP Volunteer)"
        self.assertEqual(author.get_author_credit(), expected)


    def test_get_default_author(self):
        # create a default author
        default_author = Author.objects.create(
            first_name="KEXP",
            last_name="Playlist",
            role="default",
            is_default_author=True
        )
        # create a non-default author
        author = Author.objects.create(first_name="John", last_name="Harrison", role="KEXP Volunteer")
        found_default_author = Author.objects.default_author()
        self.assertEqual(default_author, found_default_author)


    def test_get_default_author_without_default(self):
        # create a non-default author
        author = Author.objects.create(first_name="John", last_name="Harrison", role="KEXP Volunteer")
        found_author = Author.objects.default_author()
        self.assertIsNone(found_author)


    def test_get_default_author_multiple_defaults(self):
        # create multiple defaults
        default_author = Author.objects.create(
            first_name="KEXP",
            last_name="Playlist",
            role="default",
            is_default_author=True
        )
        other_default_author = Author.objects.create(
            first_name="KEXP",
            last_name="Default",
            role="default",
            is_default_author=True
        )
        found_author = Author.objects.default_author()
        self.assertIsNone(found_author)


class LinkModelTest(TestCase):

    def test_string_representation(self):
        link = Link(link_url="https://pile.bandcamp.com/album/green-and-gray", play_id=2663652)
        expected = "(https://pile.bandcamp.com/album/green-and-gray, 2663652)"
        self.assertEqual(str(link), expected)
