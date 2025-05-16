import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ImagesComponent } from './images/images.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { UploadComponent } from './upload/upload.component';
import { UploadDetailsComponent } from './upload-details/upload-details.component';
import { ReviewCatalogueComponent } from './review-catalogue/review-catalogue.component';
import { VideosComponent } from './videos/videos.component';
import { SingleVideoComponent } from './single-video/single-video.component';
import { CommentComponent } from './comment/comment.component';
import { RelatedComponent } from './related/related.component';
// import { AuthGuard } from './service/auth.guard';
import { AuthGuard } from './auth.guard';

// import {authgu}
const routes: Routes = [ 
  // { path: '', redirectTo: '/images', pathMatch: 'full' },  
  // {path:'nav', component:NavbarComponent ,  canActivate: [AuthGuard]},
  // {path:'login', component:LoginComponent},
  // {path:'images', component:ImagesComponent },
  // {path:'create',component:CreateProfileComponent},
  // {path:'upload',component:UploadComponent},
  // {path:'upload-details',component:UploadDetailsComponent},
  // {path:'review-catalogue',component:ReviewCatalogueComponent},
  // {path:'video',component:VideosComponent},
  // {path:'single-Video',component:SingleVideoComponent},
  // {path:'comment',component:CommentComponent},
  // {path:'related',component:RelatedComponent},
  { path: '', redirectTo: '/images', pathMatch: 'full' },  
  { path: 'nav', component: NavbarComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'images', component: ImagesComponent },
  { path: 'create', component: CreateProfileComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
  { path: 'upload-details', component: UploadDetailsComponent, canActivate: [AuthGuard] },
  { path: 'review-catalogue', component: ReviewCatalogueComponent, canActivate: [AuthGuard] },
  { path: 'video', component: VideosComponent, canActivate: [AuthGuard] },
  { path: 'single-Video', component: SingleVideoComponent, canActivate: [AuthGuard] },
  { path: 'comment', component: CommentComponent, canActivate: [AuthGuard] },
  { path: 'related', component: RelatedComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
