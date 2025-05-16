import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.scss']
})
export class RelatedComponent implements OnInit {

  videoData:any=[
    {img:'https://images.pexels.com/videos/3314849/free-video-3314849.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200',
      dataOne:'Exploring Beauty Nature', dataTwo:'This Video Show You The Beauty Of Nature', dataThree:'Expert B'
     
    },
    {img:'https://images.pexels.com/videos/3135807/free-video-3135807.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200',
       dataOne:'Exploring Beauty Nature', dataTwo:'This Video Show You The Beauty Of Nature', dataThree:'Expert B'
    },
    {img:'https://images.pexels.com/videos/7335475/animal-herbivore-roe-deer-wild-7335475.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200'
      ,   dataOne:'Exploring Beauty Nature', dataTwo:'This Video Show You The Beauty Of Nature', dataThree:'Expert B'
    },
    {img:'https://images.pexels.com/videos/2334654/free-video-2334654.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200',
       dataOne:'Exploring Beauty Nature', dataTwo:'This Video Show You The Beauty Of Nature', dataThree:'Expert B'
    },
    {img:'https://images.pexels.com/videos/3173312/free-video-3173312.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200',
        dataOne:'Exploring Beauty Nature', dataTwo:'This Video Show You The Beauty Of Nature', dataThree:'Expert B'
    },
    {img:'https://images.pexels.com/videos/5365208/forest-landscape-morning-mystical-5365208.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200',
       dataOne:'Exploring Beauty Nature', dataTwo:'This Video Show You The Beauty Of Nature', dataThree:'Expert B'
    },
    {img:'https://images.pexels.com/videos/2883389/free-video-2883389.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200',
       dataOne:'Exploring Beauty Nature', dataTwo:'This Video Show You The Beauty Of Nature', dataThree:'Expert B'
    },
    {img:'https://images.pexels.com/videos/6394054/adventure-beauty-forrest-hike-6394054.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200',
       dataOne:'Exploring Beauty Nature', dataTwo:'This Video Show You The Beauty Of Nature', dataThree:'Expert B'
    },
    {img:'https://images.pexels.com/videos/3314849/free-video-3314849.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200',
        dataOne:'Exploring Beauty Nature', dataTwo:'This Video Show You The Beauty Of Nature', dataThree:'Expert B'
    },
    {img:'https://images.pexels.com/videos/3135807/free-video-3135807.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200',
      dataOne:'Exploring Beauty Nature', dataTwo:'This Video Show You The Beauty Of Nature', dataThree:'Expert B'
    },
    {img:'https://images.pexels.com/videos/7335475/animal-herbivore-roe-deer-wild-7335475.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200',
       dataOne:'Exploring Beauty Nature', dataTwo:'This Video Show You The Beauty Of Nature', dataThree:'Expert B'
    },
    {img:'https://images.pexels.com/videos/2334654/free-video-2334654.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200',
       dataOne:'Exploring Beauty Nature', dataTwo:'This Video Show You The Beauty Of Nature', dataThree:'Expert B'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
