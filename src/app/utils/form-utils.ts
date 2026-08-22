import { AbstractControl, FormControl } from '@angular/forms';

export class Errors {
  static errorsMessage(form: FormControl) {
    const claves = Object.keys(form.errors!);

    switch (claves[0]) {
      case 'required':
        return 'Este campo esta vacio';

        case 'maxlength':
          return 'No puedes ingresar mas de 10 caracteres'

      case 'minlength':
        return `Necesitas minimo ${form.errors!['minlength']['requiredLength']} caracteres.`;

      case 'edadMinima':
        return `Necesitas minimo ${form.errors!['edadMinima']['minima']} años.`;

        case 'edadMaxima':
        return `Puedes ingresar maximo ${form.errors!['edadMaxima']['maxima']} años.`;


    }
    return '';

    // return "errors"
  }

 static VerificatedConditions(form: FormControl) {

    if(form.touched && form.errors) {
        return true
    }

    return false

     

  }
}
