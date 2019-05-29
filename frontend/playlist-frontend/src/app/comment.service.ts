import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor() { }


  /**
   * Creates a new comment associated with a playlist row
   * @param playID: a KEXP playlist API id for the play this comment is associated with
   * @param commentText: input text for the new comment
   * @param authorID: id of the author creating the comment
   */
  createNewComment(playID: number, commentText: string, authorID: number) {
  }

  /**
   * Gets a comment associated with the given playID
   * @param playID: a KEXP playlist API id for an individual play
   */
  getCommentByPlayId(playID: number) {
  }

  /**
   * Updates an existing comment with new text
   * @param commentID: a comment id
   * @param commentText: input text for the updated comment
   * @param authorID: id of the author updating the comment
   */
  updateComment(commentID: number, commentText: string, authorID: number) {
  }


  /**
   * Deletes a comment
   * @param commentID: the id of the comment to be deleted
   */
  deleteComment(commentID: number) {
  }
}
