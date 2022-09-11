import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared.service';
import { TokenInterceptor } from '../services/token.interceptor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
  ]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
    Validators.pattern(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
    ),
  ]);

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService.login(this.username.value, this.password.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.authService.token = res?.token;
        this.sharedService.snack.next([true, 'Successfully logged in!']);
        this.router.navigateByUrl('');
      },
      error: () => {
        this.sharedService.snack.next([
          false,
          'Unable to login with provided info. Please try again.',
        ]);
      },
    });
  }
}
