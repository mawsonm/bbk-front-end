import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';
import { AuthService } from './services/auth.service';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Bri Bris Kitchen';
  faHouse = faHouse;
  faUser = faUser;
  faPlus = faPlus;
  faSearch = faMagnifyingGlass;

  isLogin: boolean = false;
  isSearch: boolean = false;

  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private _snackbar: MatSnackBar,
    private sharedService: SharedService,
    private authService: AuthService
  ) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        console.log(event);
        if (event.url == '/login' || event.url == '/register') {
          this.isLogin = true;
          this.isSearch = false;
        } else if (event.url == '/search') {
          this.isSearch = true;
          this.isLogin = false;
        } else {
          this.isLogin = false;
          this.isSearch = false;
        }
      });
    this.sharedService.snack.subscribe((msg) => {
      let config: any = {
        panelClass: msg[0] ? ['snackbar-success'] : ['snackbar-failure'],
      };
      if (msg[0]) {
        config.duration = 2500;
      }
      _snackbar.open(msg[1], 'Close', config);
    });
    this.authService.token$.subscribe((token) => {
      if (token) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
  }
}
