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
