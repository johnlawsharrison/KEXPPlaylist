import { Component, OnInit, Input } from '@angular/core';
import { Play } from '../models/play';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../comment.service';
import { AuthorService } from '../author.service';

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

  constructor(
    private commentService: CommentService,
    private authorService: AuthorService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const existingComment = this.play.comment ? this.play.comment.comment_text : '';
    this.commentForm = this.fb.group({
      commentText: [existingComment, Validators.required]
    });
    this.commentEditorVisible = !this.play.comment;
    this.cancelable = false;
  }

  onCommentSave() {
    const text = this.commentForm.value.commentText;
    const currentAuthor = this.authorService.getCurrentAuthor();
    if (this.play.comment) {
      this.commentService.updateComment(this.play.comment.id, text, currentAuthor.id).subscribe(
        newComment => {
          this.play.comment = newComment;
          this.play.comment.author = currentAuthor;
          this.commentEditorVisible = false;
          this.commentForm.reset({commentText: this.play.comment.comment_text});
        }
      );
    } else {
      this.commentService.createNewComment(this.play.playid, text, currentAuthor.id).subscribe(
        updatedComment => {
          this.play.comment = updatedComment;
          this.play.comment.author = currentAuthor;
          this.commentEditorVisible = false;
          this.commentForm.reset({commentText: this.play.comment.comment_text});
        }
      );
    }
  }

  cancelCommentEdit() {
    if (this.play.comment) {
      this.commentEditorVisible = false;
    }
    const existingComment = this.play.comment ? this.play.comment.comment_text : '';
    this.commentForm.reset({commentText: existingComment});
    this.cancelable = false;
  }

  updateComment() {
    this.cancelable = true;
    this.commentEditorVisible = true;
  }
}
