import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
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

  firstName = new FormControl('', [
    Validators.required,
    Validators.maxLength(255),
  ]);
  lastName = new FormControl('', [
    Validators.required,
    Validators.maxLength(255),
  ]);
  confirmPassword = new FormControl('', [
    Validators.pattern(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
    ),
  ]);
  matcher = new MyErrorStateMatcher();

  passwords: FormGroup;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.passwords = fb.group(
      {
        password: this.password,
        confirmPassword: this.confirmPassword,
      },
      { validators: this.checkPasswords }
    );
    this.form = fb.group({
      userName: this.username,
      passwords: this.passwords,
      firstName: this.firstName,
      lastName: this.lastName,
    });
  }

  ngOnInit(): void {
    console.log(this.form);
  }

  register(formVal: Object) {
    this.authService.register(formVal).subscribe({
      next: (item) => {
        this.sharedService.snack.next([true, 'Successfully registered!']);
        this.router.navigateByUrl('login');
      },
      error: () => {
        this.sharedService.snack.next([
          false,
          'Unable to register user. Please try a different username.',
        ]);
      },
    });
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPassword = group.get('confirmPassword')?.value;
    return pass === confirmPassword ? null : { notSame: true };
  };
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: AbstractControl<any, any> | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control?.invalid && control?.dirty);
    const invalidParent = !!(
      control?.parent?.invalid && control?.parent?.dirty
    );
    return invalidCtrl || invalidParent;
  }
}
