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
  commentForm: FormGroup = this.fb.group({
    commentText: ['', Validators.required]
  });

  constructor(
    private commentService: CommentService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
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
