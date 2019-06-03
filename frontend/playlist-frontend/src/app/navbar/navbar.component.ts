import { Component, OnInit, Input } from '@angular/core';
import { AuthorService } from '../author.service';
import { Author } from '../models/play';
import { SidenavService } from '../sidenav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() currentAuthor: Author;

  constructor(
    private sidenav: SidenavService, // lets us open/close the sidenav from the navbar
    private authorService: AuthorService) { }

  ngOnInit() {
    this.currentAuthor = this.authorService.getCurrentAuthor();
  }


  /**
   * Toggles the sidenav open or closed state
   */
  toggleSidenav() {
    this.sidenav.toggle();
  }
}
