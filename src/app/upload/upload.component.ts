import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  isLoad:boolean =false;

  constructor(private router :Router) { }

  ngOnInit(): void {
    // this.upload(event);
  }
  upload() {

    this.router.navigate(['/upload-details']); 
  }

  base64Video: string | null = null; 

  convertToBase64(event: Event) {
    this.upload()

    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) {
      console.log("No file selected");
      return;
    }

    const file = target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.base64Video = reader.result as string; 
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    reader.readAsDataURL(file); 
  }
  // convertToBase64(event: Event) {
  //   this.upload();
  //   // const target = event.target as HTMLInputElement;
  //   // if (!target.files || target.files.length === 0) {
  //   //   console.log("No file selected");
  //   //   return;
  //   // }
  
  //   // const file = target.files[0];
  //   const reader = new FileReader();
  
  //   reader.onload = () => {
  //     const base64String = reader.result as string;
  
  //     // Store in Local Storage
  //     // localStorage.setItem('uploadedVideo', base64String);
  //    indexedDB.open('base64String',3);
  //     // indexedDB.e('base64String',3);
      
  //     console.log("Base64 video stored in Local Storage");
  //   };
  
  //   reader.onerror = (error) => {
  //     console.error("Error reading file:", error);
  //   };
  
  //   // reader.readAsDataURL(file);
  // }


 


  

}
