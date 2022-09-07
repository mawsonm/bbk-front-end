import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';

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

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        console.log(event);
        if (event.url == '/login') {
          this.isLogin = true;
        }
      });
  }
}
