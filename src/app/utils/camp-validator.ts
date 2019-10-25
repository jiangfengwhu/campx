import { AbstractControl, ValidatorFn } from "@angular/forms";

export function forbiddenNameValidator(names: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = control.value != "" && names.indexOf(control.value) < 0;
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
