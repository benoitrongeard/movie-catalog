import { AbstractControl } from '@angular/forms';

export class PasswordValidators {
  static passwordEqualTest(form: AbstractControl) {
    const password = form.get('password');
    const passwordConfirm = form.get('passwordConfirm');
    return password?.value === passwordConfirm?.value
      ? null
      : { passwordnotequals: true };
  }
}
