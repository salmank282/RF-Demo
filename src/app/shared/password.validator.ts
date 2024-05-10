import { AbstractControl } from '@angular/forms';

export function passwordValidtor(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPwd = control.get('confirmPwd');
  if (password?.pristine || confirmPwd?.pristine) {
    return null;
  }
  
  return password && confirmPwd && password.value !== confirmPwd.value
    ? {
        misMatch: true,
      }
    : null;
}
