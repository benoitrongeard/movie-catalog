import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidators } from 'src/app/validators/password';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private _auth: Auth) {
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

  onSubmit() {
    console.log('submit');
  }
}
