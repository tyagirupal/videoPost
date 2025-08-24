import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder,FormControl } from '@angular/forms';
import { LoginProfileService } from '../login-profile.service';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  // signIn:false;
  signIn:boolean =false;
  signInForm:FormGroup;
  public loginEmitter = new EventEmitter();


  isSignIn: boolean = true;
  
  formData:any=[
    {name:'name', placeholder:'Enter your name', controlName:'name',type:'text',class:'grey'},
    {name:'email', placeholder:'Enter your email', controlName:'email',type:'email' ,class:'white'},
    {name:'country', placeholder:'Enter your country', controlName:'country' ,type:'text',class:'grey'},
    {name:'password', placeholder:'Create your password', controlName:'password' ,type:'password',class:'white'},
    {name:'address', placeholder:'Enter your address', controlName:'address' ,type:'text',class:'grey'},
  ]

  signInData:any=[
    {name:'email', placeholder:'Enter your email', controlName:'email',type:'email' },
    {name:'password', placeholder:'Create your password', controlName:'password' ,type:'password'},
  ]


  constructor(private fb:FormBuilder, private profileService :LoginProfileService, private router :Router ) { }

  ngOnInit(): void {
    this.initialForm();
    this.signInForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  initialForm(){
    let controls ={};
    this.formData.forEach(element => {
      controls[element.controlName ] = new FormControl('', Validators.required);  
    });
    this.form = this.fb.group(controls)
  }

  getControls(controlName : string):FormControl{
    return this.form.get(controlName) as FormControl
  }

  addControl() {
    const newControlName = `customField${this.formData.length + 1}`;
    const newField = {
      name: `Custom Field ${this.formData.length + 1}`,
      placeholder: `Enter ${newControlName}`,
      controlName: newControlName,
      type: 'text'
    };
    this.formData.push(newField);
    this.form.addControl(newControlName, new FormControl('', Validators.required));
  }


  onSubmit(){
    console.log(this.form.value);
    localStorage.setItem('form',JSON.stringify(this.form.value));
    this.navigateToCreateProfile();
    // this.loginEmitter.emit(true);
    this.profileService.loggedIn.emit(true);


  }
  navigateToCreateProfile() {
    this.router.navigate(['/create']);
  }

  loadFormData() {
    const storedData = localStorage.getItem('profileData');
    if (storedData) {
      this.form.patchValue(JSON.parse(storedData)); 
    }
  }

  toggleForm() {
    // this.isSignIn = !this.isSignIn; 
    this.signIn = !this.signIn;
  }

  flipped(){

  }


  

}