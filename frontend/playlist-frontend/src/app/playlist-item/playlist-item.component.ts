import { Component, OnInit, Input } from '@angular/core';
import { Play } from '../models/play';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent implements OnInit {
  @Input() play: Play;
  commentEditorVisible: boolean;
  commentForm: FormGroup;

  constructor(
    private commentService: CommentService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const existingComment = this.play.comment ? this.play.comment.comment_text : '';
    this.commentForm = this.fb.group({
      commentText: [existingComment, Validators.required]
    });
    this.commentEditorVisible = !this.play.comment;
  }

  onCommentSave() {
    const text = this.commentForm.value.commentText;
    this.commentService.createNewComment(this.play.playid, text, 1).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  toggleCommentEditor() {
  }
}
