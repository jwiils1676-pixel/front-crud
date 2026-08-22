import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import {  usersInterfacePut } from '../interfaces/interface-users';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root',
})
export class ButtonsServiceService {
  constructor() {}

  changetoAddusersOrPutUsers = signal(false)


 
    usersData = signal<usersInterfacePut[]>([]);

    service = inject(ServiceService)
    booleanMsgSecurity = signal(false);

  //PARA COMPONENTE ADD USERS



    lookTableBooleanAddUsers = signal(false)

    lookTableBooleanModUsers = signal(false)

  

  // msgdeleteConfirmation = signal(false);
    msgDeleteConfirmation = signal(false);

  
  lookTable(lookTableBoolean: WritableSignal<boolean>) {
    if (!lookTableBoolean()) {
      lookTableBoolean.set(true);
    } else if (lookTableBoolean()) {
      lookTableBoolean.set(false);
    }
  }



     DeleteValidationToHiddenForm = signal<WritableSignal<boolean>>(signal(true))


  //BOTONES ELIMINAR//
   deleteUsers(dat: boolean, msgDeleteConfirmation: WritableSignal<boolean>) {


    //ESTAS 2 LINEAS SE EJECUTAN LA PRIMERA VEZ QUE LE DAMOS DELETE MSG DELETE CAMBIA A TRUE PARA HABILITAR EL MEN
    //SAGE DE CONFIRMACION DE ELIMINACION
    if (this.usersData().length > 0) {
      msgDeleteConfirmation.set(true)
  


//CUANDO LE DAMOS A BOTON CONFIRMAR ELIMINACION EJECUTAMOS DELETEUSERS Y LE MANDAMOS POR EL PARAMETRO UN TRUE
//PARA QUE LA CONDICION SE CUMPLE Y PROCEDER CON LA ELIMINACION
//UNA VEZ SE ELIMINA VOLBEMOS A PONER MSG DELETE EN FALSE PARA DE3SACTIVAR EL BOTTON DE CONFIRMACION DE ELIMINACION Y CXANCELAR

      if (dat) {
        this.booleanMsgSecurity.set(false);
        msgDeleteConfirmation.set(false);

        this.service.deleteUsers().subscribe({
          next: () => {
            this.usersData.set([]);
          },

          error: () => {
            return 'Error no se pudo borrar';
          }, 
        });
        // }
      }

    }
  }



  cancelar(msgDeleteConfirmation: WritableSignal<boolean>) {
    msgDeleteConfirmation.set(false);
  }
}



