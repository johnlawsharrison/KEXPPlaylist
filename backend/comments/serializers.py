from comments.models import Comment, Author, CommentLink
from rest_framework import serializers

class CommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = ['url', 'comment_text', 'play', 'date_created', 'last_updated', 'author']


class AuthorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Author
        fields = ['url', 'first_name', 'last_name', 'role', 'total_comments']


class CommentLinkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CommentLink
        fields = ['url', 'link_url', 'comment']
