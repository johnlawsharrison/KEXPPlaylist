import { Component, OnInit } from '@angular/core';
import { Play } from '../models/play';
import { PlaylistService } from '../playlist.service';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  recentPlays: Play[];

  constructor(
    private playlistService: PlaylistService,
    private commentService: CommentService
    ) { }

  ngOnInit() {
    const now = new Date();
    const then = new Date(now.getTime() - (60 * 60000));
    this.playlistService.getRecentPlays(then, now).subscribe(
      playlistResponse => {
        // now fetch all the comments
        console.log(playlistResponse);
        const playIds = [];
        playlistResponse.results.forEach(play => {
          playIds.push(play.playid);
        });
        this.commentService.getCommentsByPlayIds(playIds).subscribe(
          commentResponse => {
            console.log(commentResponse);
            commentResponse.results.forEach(comment => {
              playlistResponse.results.forEach(play => {
                if (play.playid === comment.play_id) {
                  play.comment = comment;
                }
              });
            });
            console.log(playlistResponse.results);
            this.recentPlays = playlistResponse.results;
          }
        );
      }
    );
  }
}
