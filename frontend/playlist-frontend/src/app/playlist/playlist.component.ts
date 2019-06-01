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
    this.playlistService.getRecentPlaysFromBackend().subscribe(
      response => {
        this.recentPlays = response.results;
      }
    );
  }
}
