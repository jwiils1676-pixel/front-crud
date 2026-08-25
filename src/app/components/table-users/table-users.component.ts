import { ChangeDetectionStrategy, Component, inject, input, output, Signal, signal } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { } from '../../interfaces/interface-users';
import { ButtonsServiceService } from '../../services/buttonsService.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-table-users',
  imports: [NgClass],
  templateUrl: './table-users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableUsersComponent {

deleteMessage = signal("")

peticionDeleteById(id: number) {

  if(this.dat()().length == 1) {
    this.buttonsService.lookTableBooleanAddUsers.set(false)


  }

  this.deleteMessage.set("Eliminando el usuario id: " + id + ", se paciente")

  this.service.deleteUsersById(id).subscribe({

    next: ()=> {
     
      this.service.getUsers().subscribe((dat)=> this.buttonsService.usersData.set(dat))
   
      this.deleteMessage.set("El usuario ha sido eliminado con exito")

      setTimeout(() => {
        this.deleteMessage.set("")
        
      }, 3000);
    },

   
   
    error: () => {

      this.deleteMessage.set("Ha ocurrido un error y no se ha eliminado el usuario, intenta de nuevo o mas tarde")
   

      setTimeout(() => {
        this.deleteMessage.set("")
        
      }, 3000);
    }
  }

  )


    

      
}

  buttonsService = inject(ButtonsServiceService)
  service = inject(ServiceService);

  dat = signal(this.buttonsService.usersData)

  lookTableBoolean  = input<Signal<boolean>>(signal(false))


}
