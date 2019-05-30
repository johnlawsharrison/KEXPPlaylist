import { Component, OnInit } from '@angular/core';
import { PlayRow } from '../models/play';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.sass']
})
export class PlaylistComponent implements OnInit {
  recentPlays: PlayRow[];

  constructor() { }

  ngOnInit() {
  }

}
