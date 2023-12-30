import { Component } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderClass } from 'src/app/utils/loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent extends LoaderClass {
  loginForm: FormGroup;
  error!: string;

  constructor(
    private _auth: Auth,
    private _router: Router
  ) {
    super();
    this.loginForm = new FormGroup({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [Validators.required]),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  /**
   * Login the user with the email and password
   */
  async onSubmit() {
    try {
      this.loading = true;
      const { email, password } = this.loginForm.value;
      await signInWithEmailAndPassword(this._auth, email, password);
      this._router.navigate(['/']);
    } catch (httpError) {
      this.error = (httpError as FirebaseError).code;
    } finally {
      this.loading = false;
    }
  }
}
