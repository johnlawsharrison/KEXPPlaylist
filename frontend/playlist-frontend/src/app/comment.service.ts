import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  /**
   * Creates a new comment associated with a playlist row
   * @param playID: a KEXP playlist API id for the play this comment is associated with
   * @param commentText: input text for the new comment
   * @param authorID: id of the author creating the comment
   */
  createNewComment(playID: number, commentText: string, authorID: number): Observable<any> {
    const url = `${environment.backendHost}/${environment.commentAPIRoot}/comments/`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const now = new Date().toISOString();
    const data = {
      comment_text: commentText,
      play_id: playID,
      author: authorID,
      last_updated: now,
      date_created: now
    };
    return this.http.post<any>(url, data, options).pipe(
      catchError(this.handleError<any>(`createNewComment`))
    );
  }

  /**
   * Gets a single comment associated with the given playID
   * @param playID: a KEXP playlist API id for an individual play
   */
  getCommentByPlayId(playID: number) {
    return this.getCommentsByPlayIds([playID]);
  }

  /**
   * Gets comments by play ids
   * @param playIDs: a list of KEXP playlist API ids for a set of plays
   */
  getCommentsByPlayIds(playIDs: number[]) {
    const url = `${environment.backendHost}/${environment.commentAPIRoot}/comments`;
    const playIDString = playIDs.join(',');
    const options = {
      params: new HttpParams()
      .append('play_id', playIDString)
    };
    return this.http.get<any>(url, options).pipe(
      catchError(this.handleError<any>(`updateComment`))
    );
  }

  /**
   * Updates an existing comment with new text content
   * @param commentID: a comment id
   * @param commentText: input text for the updated comment
   * @param authorID: id of the author updating the comment
   */
  updateComment(commentID: number, commentText: string, authorID: number) {
    const url = `${environment.backendHost}/${environment.commentAPIRoot}/comments/${commentID}/`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const now = new Date().toISOString();
    const data = {
      comment_text: commentText,
      last_updated: now
    };
    return this.http.patch<any>(url, data, options).pipe(
      catchError(this.handleError<any>(`updateComment`))
    );
  }

  /**
   * Deletes a comment with a given id
   * @param commentID: the id of the comment to be deleted
   */
  deleteComment(commentID: number) {
    const url = `${environment.backendHost}/${environment.commentAPIRoot}/comments/${commentID}`;
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError<any>(`updateComment`))
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
