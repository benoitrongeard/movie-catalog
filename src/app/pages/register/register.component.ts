import { Component } from '@angular/core';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidators } from 'src/app/validators/password';
import { FirebaseError } from '@angular/fire/app';
import { CustomToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private _auth: Auth,
    private _toastr: CustomToastrService
  ) {
    this.registerForm = new FormGroup(
      {
        email: new FormControl<string>('', [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl<string>('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        passwordConfirm: new FormControl<string>('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      { validators: PasswordValidators.passwordEqualTest }
    );
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get passwordConfirm() {
    return this.registerForm.get('passwordConfirm');
  }

  register() {
    console.log('Registering user...');
  }

  async onSubmit() {
    try {
      const { email, password } = this.registerForm.value;
      const user: UserCredential = await createUserWithEmailAndPassword(
        this._auth,
        email,
        password
      );
      console.log('User registered!');
      console.log(user);
    } catch (httpError) {
      const errorMsg = (httpError as FirebaseError).code;
      this._toastr.error('register.error', `firebase.errors.${errorMsg}`);
    }
  }
}
