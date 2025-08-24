import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { LoginProfileService } from '../login-profile.service';

interface NavItem {
  data: string;
  link: string;
  isLoggedIn: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public loginEmitter = new EventEmitter();
  isLoggedIn = false;

  navData: NavItem[] = [
    { data: 'Login',              link: 'login',             isLoggedIn: true  },
    { data: 'Upload',             link: 'upload-details',    isLoggedIn: false },
    { data: 'Create Profile',     link: 'create',            isLoggedIn: true  },
    { data: 'FunnyBone',          link: 'bone',              isLoggedIn: true  },
    { data: 'Shop',               link: 'shop',              isLoggedIn: true  },
    { data: 'Cart',               link: 'cart',              isLoggedIn: true  },
    { data: 'Review Catalogue',   link: 'review-catalogue',  isLoggedIn: true  },
    { data: 'Log Out',            link: '',                  isLoggedIn: false },
  ];

  constructor(
    private router: Router,
    private loginService: LoginProfileService
  ) {
    this.isLoggedIn = this.checkLoginStatus();
    this.applyVisibility(this.isLoggedIn);
  }

  ngOnInit(): void {
    // React to login status changes broadcasted by your service
    this.loginService.loggedIn.subscribe((flag) => {
      this.isLoggedIn = !!flag;
      this.applyVisibility(this.isLoggedIn);
    });
  }

  private applyVisibility(logged: boolean): void {
    this.navData = this.navData.map((item) => {
      if (item.data === 'Login') {
        item.isLoggedIn = !logged;     // show Login if not logged
      } else if (item.data === 'Log Out') {
        item.isLoggedIn = logged;      // show Log Out if logged
      } else {
        item.isLoggedIn = true;        // other links always visible (or choose your logic)
      }
      return item;
    });
  }

  checkLoginStatus(): boolean {
    return !!localStorage.getItem('form');
  }

  isLoginVisible(): boolean {
    return this.navData.find((n) => n.data === 'Login')?.isLoggedIn ?? true;
  }

  logout(): void {
    localStorage.removeItem('form');
    this.loginEmitter.emit(false);
    this.loginService.loggedIn.emit(false);
    this.router.navigate(['/images']); // your existing behavior
  }

  navigateTo(route: string): void {
    if (!route) return;
    this.router.navigate(['/', route]);
  }

  trackByLabel = (_: number, item: NavItem) => item.data;
}
