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
import { LoaderClass } from 'src/app/utils/loader';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent extends LoaderClass {
  registerForm: FormGroup;

  constructor(
    private _auth: Auth,
    private _toastr: CustomToastrService
  ) {
    super();
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
      this.loading = true;
      const { email, password } = this.registerForm.value;
      const user: UserCredential = await createUserWithEmailAndPassword(
        this._auth,
        email,
        password
      );
      console.log('User registered!');
      console.log(user);
      this.loading = false;
    } catch (httpError) {
      this.loading = false;
      const errorMsg = (httpError as FirebaseError).code;
      this._toastr.error('register.error', `firebase.errors.${errorMsg}`);
    }
  }
}
