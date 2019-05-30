from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend


from comments.models import Comment, Link, Author
from comments.serializers import CommentSerializer, AuthorSerializer, LinkSerializer


class CommentViewSet(viewsets.ModelViewSet):
    """
    The set of REST framework API views for the Comment model
    """
    queryset = Comment.objects.all().order_by('-date_created')
    serializer_class = CommentSerializer
    # allow for filtering based on certain fields
    filterset_fields = ('play_id',)


class AuthorViewSet(viewsets.ModelViewSet):
    """
    The set of REST framework API views for the Author model
    """
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class LinkViewSet(viewsets.ModelViewSet):
    """
    The set of REST framework API views for the Link model
    """
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
