import { Component, OnInit, Input } from '@angular/core';
import { Play } from '../models/play';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../comment.service';
import { AuthorService } from '../author.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent implements OnInit {
  @Input() play: Play;
  commentEditorVisible: boolean;
  cancelable: boolean;
  commentForm: FormGroup;
  commentHtml: string; // the comment text, URLs replaced with <a> tags

  constructor(
    private commentService: CommentService,
    private authorService: AuthorService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const existingComment = this.play.comment ? this.play.comment.comment_text : '';
    this.setCommentHtmlWithAnchorTags(existingComment);
    this.commentForm = this.fb.group({
      commentText: [existingComment, Validators.required]
    });
    this.commentEditorVisible = !this.play.comment;
    this.cancelable = false;
  }


  /**
   * Responds to a user saving an updated or new comment in the UI
   * Creates a new comment or updates a comment depending on whether one
   * already exists for the play
   */
  onCommentSave() {
    const text = this.commentForm.value.commentText;
    // attempt to create anchor tags from  links in the comment text
    this.setCommentHtmlWithAnchorTags(text);
    const links = text.match(environment.linkRegex);
    const currentAuthor = this.authorService.getCurrentAuthor();
    if (this.play.comment) {
      this.commentService.updateComment(this.play.comment.id, text, currentAuthor.id).subscribe(
        newComment => {
          this.play.comment = newComment;
          this.setCommentHtmlWithAnchorTags(newComment.comment_text);
          this.play.comment.author = currentAuthor;
          this.commentEditorVisible = false;
          this.commentForm.reset({commentText: this.play.comment.comment_text});
        }
      );
    } else {
      this.commentService.createNewComment(this.play.playid, text, currentAuthor.id).subscribe(
        updatedComment => {
          this.play.comment = updatedComment;
          this.setCommentHtmlWithAnchorTags(updatedComment.comment_text);
          this.play.comment.author = currentAuthor;
          this.commentEditorVisible = false;
          this.commentForm.reset({commentText: this.play.comment.comment_text});
        }
      );
    }
  }


  /**
   * Handler for closing a comment update in progress and resetting form state
   */
  cancelCommentEdit() {
    if (this.play.comment) {
      this.commentEditorVisible = false;
    }
    const existingComment = this.play.comment ? this.play.comment.comment_text : '';
    this.commentForm.reset({commentText: existingComment});
    this.cancelable = false;
  }


  /**
   * Handler for a user opening the comment editor for an existing comment
   */
  updateComment() {
    this.cancelable = true;
    this.commentEditorVisible = true;
  }

  /**
   * Private helper that sets the comment text inner HTML,
   * Automatically replacing URLs found in the raw comment text with anchor tags
   * @param commentText: the text to parse into comment HTML
   */
  private setCommentHtmlWithAnchorTags(commentText: string) {
    // we turn the list of links into a set so that we don't end up
    // replacing the href values in the anchor tags with nested tags
    const links = new Set(commentText.match(environment.linkRegex));
    if (links) {
      links.forEach(url => {
        // replace all occurences of each link value with an anchor tag for the URL
        const anchorTag = `<a href="${url}" target="_blank">${url}</a>`;
        commentText = commentText.replace(new RegExp(url, 'g'), anchorTag);
      });
    }
    this.commentHtml = commentText;
  }
}
