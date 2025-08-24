import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginProfileService } from '../login-profile.service';

interface CommentItem {
  id?: string | number;
  name: string;
  userName: string;
  comment: string;
  createdAt?: string | Date;
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  form!: FormGroup;
  isCommentBoxActive = false;
  comments: CommentItem[] = [];

  constructor(
    private fb: FormBuilder,
    private service: LoginProfileService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      // NOTE: use lowercase 'comment' to match TS access and validation
      comment: ['', [Validators.required, Validators.maxLength(500)]]
    });
    this.loadComments();
  }

  private loadComments(): void {
    this.service.getComment().subscribe((result: any[]) => {
      // Normalize API -> CommentItem and reverse once here (not in template)
      const mapped = (result || []).map((r: any, i: number) => ({
        id: r.id ?? i,
        name: r.name ?? 'R',
        userName: r.userName ?? 'random',
        comment: r.Comment ?? r.comment ?? '',
        createdAt: r.createdAt ?? new Date()
      })) as CommentItem[];

      this.comments = mapped.slice().reverse();
    });
  }

  cancel(): void {
    this.isCommentBoxActive = false;
    this.form.reset();
  }

  submit(): void {
    if (this.form.invalid) return;

    const params = {
      name: 'R',
      userName: 'random',
      comment: this.form.value.comment,
      createdAt: new Date().toISOString()
    };

    // If your backend expects 'Comment' (capital C), send both keys:
    const payload = { ...params, Comment: params.comment };

    this.service.postData(payload).subscribe(() => {
      this.loadComments();
      this.form.reset();
      this.isCommentBoxActive = false;
    });
  }

  trackById = (_: number, item: CommentItem) => item.id ?? item.comment;
}
