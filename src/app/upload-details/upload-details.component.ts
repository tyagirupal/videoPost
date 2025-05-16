import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.scss']
})
export class UploadDetailsComponent implements OnInit {
  showMainContent: Boolean = true;
  uploaded: boolean = false;
  storedData:any =null;
  storedEntries: [string, unknown][];

  //  @Input() base64Video: string | null = null;

  formGroupData:any=[
    {label:'Enter Title of video' , controlName:'title' , type :'text' ,placeholder :'Enter video title here' },
    {label:'Enter Description of video' , controlName:'description' , type :'text' ,placeholder :'Enter video description here' },
    {label:'Choose Thumbnail for your video' , controlName:'Thumbnail' , type :'text',
      thumbnailOne:[
        {label :'Available thumbnails'}
      ],
      thumbnailSecond:[
        {label :'Create your own thumbnail'}
      ],
     },
    // {label:'Enter Title of video' , controlName:'title' , type :'text' ,placeholder :'Enter video tittle here' },
  ]

  formGroup:FormGroup;

  constructor(private fb:FormBuilder , private router :Router) { }

  ngOnInit(): void {

    this.formGroup = this.fb.group({});

    this.formGroupData.forEach(field => {
      this.formGroup.addControl(field.controlName, new FormControl(''));
    });
  }

  addControl(controlName: string) {
    if (!this.formGroup.contains(controlName)) {
      this.formGroup.addControl(controlName, new FormControl(''));
    } else {
      console.log(`Control '${controlName}' already exists.`);
    }
  }

  submit(){
    console.log(this.formGroup.value);
    
  }
  

  croppedImageSrc: string | ArrayBuffer;

  thumbnails: string[] = []; 
  videoUrl: string | null = null;

  // captureThumbnails(event: any) {
  //   const file = event.target.files[0]; 
  //   if (!file) return;

  //   this.videoUrl = URL.createObjectURL(file); 
  //   this.uploaded = true;

  //   const video = document.createElement('video'); 
  //   video.src = this.videoUrl;
  //   // video.crossOrigin = "anonymous";
  //   // video.muted = true;
  //   // video.play();

  //   video.onloadedmetadata = () => {
  //     const duration = video.duration; 
  //     const interval = duration / 5; 
  //     this.generateFrames(video, interval);
  //   };
  // }

  captureThumbnails(event: any) {
    const file = event.target.files[0]; 
    if (!file) return;
  
    this.videoUrl = URL.createObjectURL(file); 
    this.uploaded = true;
  
    const video = document.createElement('video'); 
    video.src = this.videoUrl;
  
    video.onloadedmetadata = () => {
      const duration = video.duration; 
      const interval = duration / 5; 
      this.generateFrames(video, interval);
    };
  
   
    this.convertToBase64(event);
  }
  

  generateFrames(video: HTMLVideoElement, interval: number) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const totalFrames = 4;

    canvas.width = 200;
    canvas.height = 150;

    let count = 0;

    const captureFrame = (time: number) => {
      video.currentTime = time;
      video.onseeked = () => {
        ctx!.drawImage(video, 0, 0, canvas.width, canvas.height);
        this.thumbnails.push(canvas.toDataURL('image/png'));
        count++;
        if (count < totalFrames) {
          captureFrame(time + interval);
        }
      };
    };

    captureFrame(interval);
  }


upload() {

  this.router.navigate(['/upload-details']); 
}

base64Video: string | null = null; 

// convertToBase64(event: Event) {
//   this.upload()

//   const target = event.target as HTMLInputElement;
//   if (!target.files || target.files.length === 0) {
//     console.log("No file selected");
//     return;
//   }

//   const file = target.files[0];
//   const reader = new FileReader();

//   reader.onload = () => {
//     this.base64Video = reader.result as string; 
//   };

//   reader.onerror = (error) => {
//     console.error("Error reading file:", error);
//   };

//   reader.readAsDataURL(file); 
// }
convertToBase64(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) {
    console.log("No file selected");
    return;
  }

  const file = target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    this.base64Video = reader.result as string;
    console.log(this.base64Video); 
  };

  reader.onerror = (error) => {
    console.error(error);
  };

  reader.readAsDataURL(file);
}

}
