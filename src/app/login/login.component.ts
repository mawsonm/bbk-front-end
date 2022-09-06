import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, Validators } from '@angular/forms';

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
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$'
    ),
  ]);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
