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
  validationMessages = {
    email: [
      {
        type: 'required',
        message: 'We need your email address to verify your identity.',
      },
      {
        type: 'pattern',
        message:
          'Seems the email format is not valid. Make sure it includes both @ and a suffix.',
      },
    ],
    password: [
      {
        type: 'required',
        message: 'Please, protect your account with a password.',
      },
      {
        type: 'minlength',
        message: 'Your password must be at least 5 characters long.',
      },
    ],
    confirmPassword: [
      { type: 'required', message: 'Password confirmation is required.' },
    ],
    matchingPasswords: [{ type: 'areNotEqual', message: 'Password mismatch.' }],
  };

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
        confirmPassword: new FormControl<string>('', [
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

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  register() {
    console.log('Registering user...');
  }
}
