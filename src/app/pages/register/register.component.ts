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
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent extends LoaderClass {
  registerForm: FormGroup;

  constructor(
    private _auth: Auth,
    private _toastr: CustomToastrService,
    private _router: Router,
    private _languageService: LanguageService
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

  /**
   * Register an user with email and password
   */
  async onSubmit() {
    try {
      this.loading = true;
      const { email, password } = this.registerForm.value;
      const user: UserCredential = await createUserWithEmailAndPassword(
        this._auth,
        email,
        password
      );
      const welcomeMessage = await firstValueFrom(
        this._languageService.getTrad('register.welcome', {
          name: user.user?.displayName ?? user.user?.email,
        })
      );
      this.loading = false;
      this._toastr.success('register.success', welcomeMessage);
      this._router.navigate(['/']);
    } catch (httpError) {
      this.loading = false;
      const errorMsg = (httpError as FirebaseError).code;
      this._toastr.error('register.error', `firebase.errors.${errorMsg}`);
    }
  }
}
