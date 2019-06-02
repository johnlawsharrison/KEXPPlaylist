import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AuthorService } from '../author.service';
import { Author } from '../models/play';

@Component({
  selector: 'app-author-dialog',
  templateUrl: './author-dialog.component.html',
  styleUrls: ['./author-dialog.component.scss']
})
export class AuthorDialogComponent implements OnInit {
  authors: Author[];

  constructor(
    public dialogRef: MatDialogRef<AuthorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authorService: AuthorService
  ) {
    this.authors = this.data.authors.sort((author1, author2) => {
      return author1.last_name.localeCompare(author2.last_name);
    });
  }

  ngOnInit() {
  }

  selectAuthor(selectedAuthor: Author) {
    this.authorService.setCurrentAuthor(selectedAuthor);
    this.dialogRef.close();
  }

  skipAuthor() {
    const defaultAuthor = this.authors.find(author => author.role === 'admin');
    this.authorService.setCurrentAuthor(defaultAuthor);
  }

}
