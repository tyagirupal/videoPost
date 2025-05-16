import { Component, OnInit } from '@angular/core';
import { LoginProfileService } from '../login-profile.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  profile:any=[
    {name:'name', placeholder:'Enter your name', controlName:'name',type:'text',class:'grey'},
    {name:'email', placeholder:'Select your parameters', controlName:'parameters',type:'select' ,
      option:[
        {count:'1' ,value:'one'},
        {count:'2' ,value:'two'},
        {count:'3' ,value:'thre'},
        {count:'4' ,value:'four'},
        {count:'5' ,value:'five'},
        {count:'6' ,value:'six'},
      ]
    },
    {name:'email', placeholder:'Select your services', controlName:'parameters',type:'select' ,class:'white',
      option:[
        {count:'Lite' ,value:'lite'},
        {count:'Standard' ,value:'standard'},
        {count:'Premium' ,value:'premium'},
        {count:'Enterprises' ,value:'enterprises'},
        {count:'Buisness Subsscription' ,value:'buisness'},
        
      ]
    },
    {name:'country', controlName:'file' ,type:'file',class:'grey'},
    // {name:'password', placeholder:'Create your password', controlName:'password' ,type:'password',class:'white'},
    // {name:'address', placeholder:'Enter your address', controlName:'address' ,type:'text',class:'grey'},
  ]

  formData:any=[
    {name:'name', placeholder:'Enter your name', controlName:'name',type:'text',class:'grey'},
    {name:'email', placeholder:'Enter your email', controlName:'email',type:'email' ,class:'white'},
    {name:'country', placeholder:'Enter your country', controlName:'country' ,type:'text',class:'grey'},
    {name:'password', placeholder:'Create your password', controlName:'password' ,type:'password',class:'white'},
    {name:'address', placeholder:'Enter your address', controlName:'address' ,type:'text',class:'grey'},
  ]

  // showLabel = [
  //   { label: 'Name :'},
  //   { label: 'Email :' },
  //   { label: 'Country :' },
  //   { label: 'Address :'  },
  //   { label: 'Parameter :'},
  //   { label: 'Service :' },
  //   { label: 'Mobile :' }
  // ];

  receivedProfileData: any;
  profileData: any;
  storedData:any =null;
  storedEntries: [string, unknown][];

  constructor( private profileService :LoginProfileService) { }

  ngOnInit() {
    this.loadProfileData();
    
    // this.profileService.updateProfileData('data')
  }

  loadProfileData() {
    this.storedData = localStorage.getItem('form');
    if (this.storedData) {
      this.storedData = JSON.parse(this.storedData); 
      this.storedEntries =Object.entries(this.storedData);
      console.log(this.storedEntries);
      
      console.log("Loaded Data:", this.storedData);
      console.log("Loaded Data:", Object.keys(this.storedData));
      console.log("Loaded Data:", Object.keys(this.storedData).forEach(key => {
        console.log(`${key}:`, this.storedData[key]);
      }));
      
    }
  }
}
