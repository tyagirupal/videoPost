import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-video',
  templateUrl: './single-video.component.html',
  styleUrls: ['./single-video.component.scss']
})
export class SingleVideoComponent implements OnInit {
 
  likeData=[
    {like:'186k Views'},
    {like:'11 Comments'},
    {like:'6.8k like'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
