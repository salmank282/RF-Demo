import { AbstractControl, ValidatorFn } from "@angular/forms";
import { from } from "rxjs";

// export function forbiddenNameValidtor(control: AbstractControl):{[key:string]:any} |null 
// {
//     const forbidden=/admin/.test(control.value);
//     return forbidden?{'forbiddenName':{value:control.value}}:null;
// }

export function forbiddenNameValidtor(forbiddenName: RegExp):ValidatorFn{
   return (control: AbstractControl):{[key:string]:any} |null =>
{
    const forbidden=forbiddenName.test(control.value);
    return forbidden?{'forbiddenName':{value:control.value}}:null;
};
}