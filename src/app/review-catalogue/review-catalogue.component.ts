import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-catalogue',
  templateUrl: './review-catalogue.component.html',
  styleUrls: ['./review-catalogue.component.scss']
})
export class ReviewCatalogueComponent implements OnInit {

  filterData:any=[
    {heading:'Select Parameter',
      checkdata:[
        {label:'4' },
        {label:'6' },
        {label:'1' },
        {label:'2' },
        {label:'3' },
        {label:'5' },
      ]
    },
    {heading:'Select Country',
      checkdata:[
        {label:'uk' },
        {label:'usa' },
        {label:'germany' },
        {label:'france' },
        {label:'canada' },
      ]
    },
    {heading:'Select Expert',
      checkdata:[
        {label:'Expert_A' },
        {label:'Expert_B' },
        {label:'Expert_C' },
        {label:'Expert_D' },
        {label:'Expert_E' },
      ]
    },
  ]
  filterNav:any=[
    {head:'Parameter'},
    {head:'Country'},
    {head:'Expert'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
