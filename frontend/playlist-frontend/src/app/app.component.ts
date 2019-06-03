import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSidenav } from '@angular/material';
import { AuthorService } from './author.service';
import { Author } from './models/play';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'playlist-frontend';
  @ViewChild('sidenav') public sidenav: MatSidenav;
  currentAuthor: Author;
  allAuthors: Author[];

  constructor(
    private sidenavService: SidenavService,
    private authorService: AuthorService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
    const authorLocal = JSON.parse(localStorage.getItem('KEXPPlaylistCurrentAuthor'));
    if (authorLocal) {
      this.authorService.setCurrentAuthor(authorLocal);
      this.currentAuthor = authorLocal;
    }
    this.authorService.getAllAuthors().subscribe(
      authorsResponse => {
        this.allAuthors = authorsResponse.results.sort((a1, a2) => {
          return a1.last_name.localeCompare(a2.last_name);
        });
        // set default author if we don't have one yet
        if (!this.currentAuthor) {
          const defaultAuthor = authorsResponse.results.find(a => a.role === 'default');
          this.authorService.setCurrentAuthor(defaultAuthor);
          this.currentAuthor = defaultAuthor;
        }
      }
    );
  }

  switchAuthor(newAuthor: Author) {
    this.authorService.setCurrentAuthor(newAuthor);
    this.currentAuthor = newAuthor;
    this.sidenav.close();
  }

  closeSidenav() {
    this.sidenav.close();
  }
}
