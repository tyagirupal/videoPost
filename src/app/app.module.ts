import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ImagesComponent } from './images/images.component';
import { FormsModule } from '@angular/forms';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { UploadComponent } from './upload/upload.component';
import { UploadDetailsComponent } from './upload-details/upload-details.component';
import { ReviewCatalogueComponent } from './review-catalogue/review-catalogue.component';
import {MatChipsModule} from '@angular/material/chips';
import { VideosComponent } from './videos/videos.component';
import {MatIconModule} from '@angular/material/icon';
import { SingleVideoComponent } from './single-video/single-video.component';
import { CommentComponent } from './comment/comment.component';
import { RelatedComponent } from './related/related.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ImagesComponent,
    CreateProfileComponent,
    UploadComponent,
    UploadDetailsComponent,
    ReviewCatalogueComponent,
    VideosComponent,
    SingleVideoComponent,
    CommentComponent,
    RelatedComponent
  ],
  imports: [
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonToggleModule,
    MatProgressBarModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
