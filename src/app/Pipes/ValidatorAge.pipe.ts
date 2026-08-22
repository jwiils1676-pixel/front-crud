import { AbstractControl } from "@angular/forms"

 export const ageValidator = (edadRe: number)=>{


  return (value: AbstractControl) => {

          const edad = Number(value.value)

    if(edad < 18) {

      console.log("EJECUCION CONTORL")
      return {edadMinima:  {minima: 18, actual: value.value}}

      
    }else if(edad > 120){

      return  {edadMaxima:  {maxima: 120, actual: value.value}}



    }

    return null
  }
  }


