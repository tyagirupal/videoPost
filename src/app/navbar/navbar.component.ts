import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { LoginProfileService } from '../login-profile.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  show=false;
  mobile:boolean=false;
  public loginEmitter = new EventEmitter();

  lap:boolean=false;
  isLoggedIn:boolean=false;
  // isLoggedIn = !!localStorage.getItem('form');

  navData: any[] = [
    { data: 'Login', link: 'login', isLoggedIn:true },
    { data: 'Upload', link: 'upload-details', isLoggedIn:false },
    { data: 'Create Profile', link: 'create', isLoggedIn:true  },
    { data: 'FunnyBone', link: 'bone',isLoggedIn:true   },
    { data: 'Shop', link: 'shop', isLoggedIn:true  },
    { data: 'Cart', link: 'cart',isLoggedIn:true  },
    { data: 'Review Catalogue', link: 'review-catalogue',isLoggedIn:true  },
    { data: 'Log Out', link: 'images',isLoggedIn:false  },
  ];

  constructor(private router :Router, private loginService : LoginProfileService) { 
    if(!localStorage.getItem('form')){

    }else{
      this.navData = this.navData.map((data)=>{
        data.data == 'Login' ? data.isLoggedIn = false : data.isLoggedIn = true;
        return data
      })
    }
   
  }

  ngOnInit(): void {
    // this.hideLi();

    this.loginService.loggedIn.subscribe((data)=>{
      console.log(data);
      if(data){
          this.navData = this.navData.map((item)=>{
          item.data == 'Login' ? item.isLoggedIn = false : item.isLoggedIn = true;
          return item;
        })
      }
        else{
          this.navData = this.navData.map((item)=>{
          item.data == 'Login' ? item.isLoggedIn = true : item.isLoggedIn = false;
          return item;
        })
      }

  })
}

  checkLoginStatus() :boolean{
    console.log("dfghjk");
    
   return  !!localStorage.getItem('form');
  }

  logout() {
    console.log("fdghjk");
    
    localStorage.removeItem('form');
    this.loginEmitter.emit(false);
    this.loginService.loggedIn.emit(false)
    this.router.navigate([`/images`]);
  }

  navigateToCart(route) {
    console.log(route);
    
    this.router.navigate([`/${route}`]);
  }

  // hideLi(){
  //   console.log("dfghjk");

  //   const isLoggedIn = true;
  //           const dashboardLink = document.getElementById('dashboard-link');
  //           const loginLink = document.getElementById('login-link');
  //           if (isLoggedIn) {
  //               dashboardLink.style.display = 'none';
  //               loginLink.style.display = 'block';
  //           } else {
  //               dashboardLink.style.display = 'block';
  //               loginLink.style.display = 'none';
  //           }

  // }

  showNav(){
    this.show =!this.show;
  }

  hideNav(){
    this.show=false;
  }
}
