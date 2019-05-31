import { Component, OnInit, Input } from '@angular/core';
import { Play } from '../models/play';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent implements OnInit {
  @Input() play: Play;
  commentText = new FormControl('');

  constructor() { }

  ngOnInit() {
  }

}
