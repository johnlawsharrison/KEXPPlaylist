import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PlaylistService {

  constructor(private http: HttpClient) { }

  /**
   * Gets recent plays by querying the backend
   * which assembles playlist rows and existing comments/links all at once
   * defaults to plays from the last 60 minutes
   */
  getRecentPlaysFromBackend(): Observable<any> {
    const url = `${environment.backendHost}/playlist-data`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>(`getRecentPlaysFromBackend`))
    );
  }

  /**
   * Gets playlist API info for a show given a show id
   * @param showId: primary key id of the show
   */
  getShowInfo(showId: number): Observable<any> {
    const url = `${environment.playlistAPIHost}/show/${showId}/`;
    return this.http.get(url).pipe(
      catchError(this.handleError<any>(`getShowInfo`))
    );
  }


  /**
   * Generic error handler for this service, just logs to console for now
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);
      // let the app keep running by returning an empty result
      return of(result as T);
    };
  }

}
