import { Component, OnInit } from '@angular/core';
import { Play } from '../models/play';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  recentPlays: Play[];

  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    const now = new Date();
    const then = new Date(now.getTime() - (60 * 60000));
    this.playlistService.getRecentPlays(then, now).subscribe(
      response => {
        this.recentPlays = response.results;
      }
    );
  }
}
