import { ValidatorFn } from '@angular/forms';

export const SPECIAL_CHARS = ['!', '@', '#', '$', '%'];

const anyLetterRE = /[a-z]/i;
const anyNumberRE = /[0-9]/i;
const anySpecialRE = /[!|@|#|$|%]/i;

export const myPasswordValidator: ValidatorFn = (control) => {
  const { value } = control;

  if (anyLetterRE.test(value) && anyNumberRE.test(value) && anySpecialRE.test(value)) {
    return null;
  } else {
    return { myPassword: true };
  }
};
