from comments.models import Comment, Author, Link
from rest_framework import serializers


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'comment_text', 'play_id', 'date_created', 'last_updated', 'author']


class CommentWithAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'comment_text', 'play_id', 'date_created', 'last_updated', 'author']
        depth = 1


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'first_name', 'last_name', 'role', 'total_comments', 'is_default_author']


class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = ['id', 'link_url', 'play_id']
