import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Author } from './models/play';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  currentAuthor: Author;

  constructor(private http: HttpClient) { }


  /**
   * Sets the current author
   * @param newAuthor: the new author to set to the current author
   */
  setCurrentAuthor(newAuthor: Author) {
    this.currentAuthor = newAuthor;
    // save author to localstorage
    localStorage.setItem('KEXPPlaylistCurrentAuthor', JSON.stringify(this.currentAuthor));
  }

  /**
   * Gets the current author
   */
  getCurrentAuthor() {
    return this.currentAuthor;
  }

  /**
   * Gets all authors from the backend API
   */
  getAllAuthors() {
    const url = `${environment.backendHost}/${environment.commentAPIRoot}/authors/`;
    return this.http.get(url).pipe(
      catchError(this.handleError<any>(`getAllAuthors`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);
      // let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}
