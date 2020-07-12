import logging
import json
from datetime import datetime, timedelta, timezone

import requests

from django.shortcuts import render
from django.views.generic import View
from django.http import JsonResponse

from comments.models import Comment, Link, Author
from comments.serializers import CommentWithAuthorSerializer, LinkSerializer, AuthorSerializer

logger = logging.getLogger(__name__)

# Create your views here.
class PlaylistDataView(View):

    def get(self, *args, **kwargs):
        """
        Fetches playlist data from the last 60 minutes, along with comments
        and links from the backend database
        """
        # make a request to the playlist API to fetch the last 60 minutes of plays
        now = datetime.now(timezone.utc)
        then = now - timedelta(hours=1)
        params = {
            'begin_time': then.isoformat()[:-6] + 'Z',
            'end_time': now.isoformat()[:-6] + 'Z'
        }
        resp = requests.get('https://legacy-api.kexp.org/v1/play', params=params)
        recent_plays = resp.json()
        # associate all comments and links models to a play
        # we have a sorted list of plays (by time)
        for play in recent_plays['results']:
            try:
                comment_for_play = Comment.objects.get(play_id=play['playid'])
            except Comment.DoesNotExist:
                comment_for_play = None
            links_for_play = Link.objects.filter(play_id=play['playid'])
            if comment_for_play:
                play['comment'] = CommentWithAuthorSerializer(comment_for_play).data
            if links_for_play:
                play['links'] = LinkSerializer(links_for_play, many=True).data

        response = JsonResponse({"results": recent_plays['results']})
        # return the full data as JSON
        return response
