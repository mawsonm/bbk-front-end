import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';
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

  constructor(
    private router: Router,
    private _snackbar: MatSnackBar,
    private sharedService: SharedService
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
        } else {
          this.isLogin = false;
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
  }
}
