from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import viewsets

from serializers import CommentSerializer, AuthorSerializer, CommentLinkSerializer


class CommentViewSet(viewsets.ModelViewSet):
    """
    The set of REST framework API views for the Comment model
    """
    queryset = Comment.objects.all().order_by('-date_created')
    serializer_class = CommentSerializer


class AuthorViewSet(viewsets.ModelViewSet):
    """
    The set of REST framework API views for the Author model
    """
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class CommentLinkViewSet(viewsets.ModelViewSet):
    """
    The set of REST framework API views for the CommentLink model
    """
    queryset = CommentLink.objects.all()
    serializer_class = CommentLinkSerializer
