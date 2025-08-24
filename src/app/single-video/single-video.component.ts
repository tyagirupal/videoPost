import { Component, OnInit } from '@angular/core';

interface MetaItem {
  like: string; // keeping your original key for compatibility
}

@Component({
  selector: 'app-single-video',
  templateUrl: './single-video.component.html',
  styleUrls: ['./single-video.component.scss']
})
export class SingleVideoComponent implements OnInit {
  poster = ''; // set to a poster image URL if you have one

  likeData: MetaItem[] = [
    { like: '186k Views' },
    { like: '11 Comments' },
    { like: '6.8k Likes' },
  ];

  constructor() {}

  ngOnInit(): void {}

  trackByText = (_: number, item: MetaItem) => item.like;
}
