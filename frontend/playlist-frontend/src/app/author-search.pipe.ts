import { Pipe, PipeTransform } from '@angular/core';
import { Author } from './models/play';

/**
 * AuthorSearchPipe implements an Angular pipe for searching/filtering
 * a list of authors based on their first and last names
 */
@Pipe({
  name: 'authorSearch'
})
export class AuthorSearchPipe implements PipeTransform {

  transform(authors: Author[], searchTerm: string): any[] {
    if (!authors) {
      return [];
    }
    if (!searchTerm) {
      return authors;
    }

    searchTerm = searchTerm.toLowerCase();

    return authors.filter( author => {
      return (author.first_name.toLowerCase().includes(searchTerm) || author.last_name.toLowerCase().includes(searchTerm));
    });
  }

}
