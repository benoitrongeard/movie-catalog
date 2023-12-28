import { AbstractControl } from '@angular/forms';

export class PasswordValidators {
  static passwordEqualTest(form: AbstractControl) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password?.value === confirmPassword?.value
      ? null
      : { areNotEqual: true };
  }
}
