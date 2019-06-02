import { Component, OnInit, Inject } from '@angular/core';
import { Play, Author } from '../models/play';
import { PlaylistService } from '../playlist.service';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material';
import { AuthorDialogComponent } from '../author-dialog/author-dialog.component';
import { CommentService } from '../comment.service';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-playlist',
  animations: [
    trigger('playlistLoaded', [
      state('loaded', style({
        opacity: 1
      })),
      state('waiting', style({
        opacity: 0
      })),
      transition('waiting => loaded', [
        animate('1s')
      ])
    ])
  ],
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  recentPlays: Play[];
  currentShow: any;
  currentAuthor: Author;

  constructor(
    private playlistService: PlaylistService,
    private authorService: AuthorService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    const authorLocal = JSON.parse(localStorage.getItem('KEXPPlaylistCurrentAuthor'));
    if (authorLocal) {
      this.authorService.setCurrentAuthor(authorLocal);
    } else {
      // open author dialog
      this.authorService.getAllAuthors().subscribe(
        authorsResponse => {
          this.dialog.open(AuthorDialogComponent, {
            data: {
              authors: authorsResponse.results
            }
          });
        }
      );
    }
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
