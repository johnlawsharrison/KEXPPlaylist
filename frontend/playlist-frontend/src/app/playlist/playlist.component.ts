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
  currentShow: any;

  constructor(
    private playlistService: PlaylistService
  ) { }

  ngOnInit() {
    this.playlistService.getRecentPlaysFromBackend().subscribe(
      response => {
        this.recentPlays = response.results;
        // for current show, just take the first play
        // (if we wanted to display show/host changes along the timeline
        // we could do that on the backend just like the recentplays pattern,
        // but that's pretty far out of scope for now)
        const currentShowId = response.results[0].showid;
        this.playlistService.getShowInfo(currentShowId).subscribe(
          show => {
            this.currentShow = show;
          }
        );
      }
    );
  }
}
