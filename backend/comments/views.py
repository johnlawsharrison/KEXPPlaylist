from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import viewsets
from django_filters import rest_framework as filters

from comments.models import Comment, Link, Author
from comments.serializers import CommentSerializer, AuthorSerializer, LinkSerializer


class InPlayIDsFilter(filters.Filter):
    """
    Defines a filter that will filter comments with a play_id in a list of play_ids
    ie /api_v1/comments?play_id=[123932,343235,343433]
    will find all Comments with those associated play ids
    """
    def filter(self, querystring, value):
        if value:
            # we need to use `**` to unpack the dictionary in the filter
            # see: https://bit.ly/2VVtsIw
            return querystring.filter(**{'play_id__in': value.split(',')})
        return querystring


class CommentPlayFilter(filters.FilterSet):
    """
    Defines a set of filters for the comments models
    """
    # Using MultipleChoiceFilter results in a somewhat clunky syntax with chained queryparams:
    # /api_v1/comments?play_id=<something>&play_id=<something_else>...
    play_id = InPlayIDsFilter()

    class Meta:
        model = Comment
        fields = ['play_id']


class CommentViewSet(viewsets.ModelViewSet):
    """
    The set of REST framework API views for the Comment model
    """
    queryset = Comment.objects.all().order_by('-date_created')
    serializer_class = CommentSerializer
    # allow for filtering based on certain fields
    filterset_class = CommentPlayFilter


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
