import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface VideoItem {
  img: string;
}

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  videoData: VideoItem[] = [
    { img: 'https://images.pexels.com/videos/3314849/free-video-3314849.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200' },
    { img: 'https://images.pexels.com/videos/3135807/free-video-3135807.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200' },
    { img: 'https://images.pexels.com/videos/7335475/animal-herbivore-roe-deer-wild-7335475.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200' },
    { img: 'https://images.pexels.com/videos/2334654/free-video-2334654.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200' },
    { img: 'https://images.pexels.com/videos/3173312/free-video-3173312.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200' },
    { img: 'https://images.pexels.com/videos/5365208/forest-landscape-morning-mystical-5365208.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200' },
    { img: 'https://images.pexels.com/videos/2883389/free-video-2883389.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200' },
    { img: 'https://images.pexels.com/videos/6394054/adventure-beauty-forrest-hike-6394054.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToSingleVideo() {
    this.router.navigate(['/single-Video']);
  }

  trackByImg = (_: number, v: VideoItem) => v.img;
}
