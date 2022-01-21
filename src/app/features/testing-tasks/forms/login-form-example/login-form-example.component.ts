import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { AuthApiService } from '../../services/auth-api.service';
import { myPasswordValidator, SPECIAL_CHARS } from '../../validators/my-passwd.validator';

const LOGIN_MIN_LENGTH = 2;
const PASSWD_MIN_LENGTH = 6;

@Component({
  selector: 'nts-login-form-example',
  templateUrl: './login-form-example.component.html',
  styleUrls: ['./login-form-example.component.css']
})
export class LoginFormExampleComponent implements OnInit {

  availableRoles = [
    { id: 'user', text: 'User' },
    { id: 'sys_operator', text: 'Operator' },
    { id: 'sys_admin', text: 'Admin' },
  ];

  myForm = this.formBuilder.group({
    login: ['', [Validators.required, Validators.minLength(LOGIN_MIN_LENGTH)]],
    password: ['', [Validators.required, Validators.minLength(PASSWD_MIN_LENGTH), myPasswordValidator]],

    roleId: [this.availableRoles[0].id],
    rememberMe: [false],

  });

  get loginCtrl() {
    return this.myForm.get('login') as FormControl;
  }

  get passwordCtrl() {
    return this.myForm.get('password') as FormControl;
  }

  get loginErrorMessages(): string[] {
    const messages: string[] = [];
    const errors: any = this.loginCtrl.errors || {};
    if (errors.required) {
      messages.push('Login is required');
    }
    if (errors.minlength) {
      messages.push(`Login min. length is ${LOGIN_MIN_LENGTH}`);
    }
    return messages;
  }

  get passwordErrorMessages(): string[] {
    const messages: string[] = [];
    const errors: any = this.passwordCtrl.errors || {};
    if (errors.required) {
      messages.push('Password is required');
    }
    if (errors.minlength) {
      messages.push(`Password min. length is ${PASSWD_MIN_LENGTH}`);
    }
    if (errors.myPassword) {
      messages.push(`Password must contain at least one letter, one digit and one special char: ${SPECIAL_CHARS.join(', ')}`);
    }
    return messages;
  }

  private submittedFormValues$ = new Subject<any>();

  isLoading = false;
  isLoggedIn$ = this.submittedFormValues$.pipe(
    tap(() => this.isLoading = true),
    switchMap((formValues) => this.authService.authenticate(formValues)),
    tap(() => this.isLoading = false)
  );

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthApiService
  ) { }

  submitHandler(event: any) {
    event.preventDefault();
    const { value } = this.myForm;
    console.log('login form values', value);
    if (this.myForm.valid) {
      this.submittedFormValues$.next(value);
    }
  }

  ngOnInit(): void {
  }

}
