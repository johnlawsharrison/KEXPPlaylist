/**
 * The playlist service handles the responsibility of interacting
 * with the KEXP playlist API
 *
 * While deciding whether this should be handled on the frontend (here)
 * or the backend (Django side) I considered the following:
 * - since legacy-api.kexp.org is public, from the context of this app
 *   the playlist API can be viewed like a 3rd party API
 * - the requests we need to make are relatively simple
 *  (GETs to various endpoints, with minimal filtering)
 * - if the backend server were to handle making these requests, it would most likely
 *  just pass along its response to the frontend, in which case it feels like a glorified router
 * - breaking down the different data sources the frontend makes use of increases readability
 *   and separates concerns (handling comment CRUD transactions in Django,
 *   and playlist API consumption separately)
 * - there's an argument to be made that we could: make a single request to the backend
 *  (something like fetchAllRecentPlaysWithComments) that would make the playlist API request,
 *  find all of the comments associated with those plays, and then return the whole set of
 *  plays and comments here
 * - since the Angular app is served from the Django app on the same host,
 *  requests made to the Django API from here will add negligible performance overhead
 * - Ultimately, either approach makes sense.
 *   I like this because it makes the data needs of the frontend readable,
 * - If we wanted to completely decouple the frontend from the backend (served on a different host),
 *   support maintainability and make it easier to swap out frontends
 *   or consume the same comment/play relationship from another frontend use case
 *   those would be really solid justifications for doing it all on the backend
 * - I'm definitely "on the fence" about this, so wanted to document it as a topic
 *   to discuss in the interview, because it's a reasonable design decision to debate
 *
 * The biggest reason I like this method is that it keeps the Django app very focused;
 * the comments Django app becomes a simple service for managing comments
 * and the underlying database transactions that persist them
 *
 * But let's chat about it!
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PlaylistService {

  constructor(private http: HttpClient) { }

  getRecentPlays(beginTime: Date, endTime: Date): Observable<any> {
    const url = `${environment.playlistAPIHost}/play/`;
    const options = {
      headers: new HttpHeaders({
        // 'Authorization': 'my-auth-token'
      }),
      params: new HttpParams()
      .append('begin_time', beginTime.toISOString())
      .append('end_time', endTime.toISOString())
    };
    return this.http.get<any>(url, options).pipe(
      catchError(this.handleError<any>(`getRecentPlays`))
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
