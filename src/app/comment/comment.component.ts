import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,FormControl} from '@angular/forms';
import { LoginProfileService } from '../login-profile.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  inputValue:string;
  disables:boolean;

  circle=[
    {data:'R'},
    {data:'U'},
    {data:'P'},
    {data:'A'},
    {data:'L'},
  ]

data;
 formGroup:FormGroup;
  isCommentBoxActive =false;

  constructor(private fb:FormBuilder, private service :LoginProfileService) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      Comment : new FormControl('')
    })
    this.getData();
  }

  activeCommentBox(){
    this.isCommentBoxActive =true;
  }

  cancel(){
    this.isCommentBoxActive =false;
  }

  getData (){
    this.service.getComment().subscribe((result)=>{
     this.data = result;
    })
  }

  pushData(data:any){
    console.log(this.formGroup.value);
    const params = this.formGroup.value;
    if (!this.formGroup.get('comment')?.value) {
      this.disables = true;
    } else {
      this.disables = false;
    }
    const dataObj={
       name:"R",
       userName:"random",
       ...params
    }
      console.log(dataObj);
      
    
    this.service.postData(dataObj).subscribe((res)=>{
      console.log(res);
      this.getData();
    })
  }





}
