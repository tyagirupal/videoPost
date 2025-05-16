import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class LoginProfileService {

  storedData:any;
  commentUrl='http://localhost:3000/users';

  private profileData = new BehaviorSubject<any>(null);  
  currentProfileData = this.profileData.asObservable();

  loggedIn = new EventEmitter();

 

  constructor(private http :HttpClient) { }
  
  updateProfileData(data: any) {
    this.profileData.next(data);  // Update stored data
  }

  getComment(){
    return this.http.get(this.commentUrl);
  }

  postData(data:any){
    return this.http.post(this.commentUrl,data)
  }


 
}
