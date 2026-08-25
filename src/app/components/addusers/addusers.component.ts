import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
  
} from '@angular/core';
import { usersInterface, usersInterfacePut } from '../../interfaces/interface-users';
import { FormBuilder, Validators } from '@angular/forms';
import { ageValidator } from '../../Pipes/ValidatorAge.pipe';
import { ServiceService } from '../../services/service.service';
import { Errors } from '../../utils/form-utils';
import { ButtonsServiceService } from '../../services/buttonsService.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BottonsMainComponent } from '../bottons-main/bottons-main.component';
import { TableUsersComponent } from '../table-users/table-users.component';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';

import { CssConsoleComponent } from '../cssConsoleani/cssConsole/cssConsole.component';
@Component({
  selector: 'app-addusers',
  imports: [ReactiveFormsModule, BottonsMainComponent, TableUsersComponent, NgClass, CssConsoleComponent],
  templateUrl: './addusers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddusersComponent {
  errors = Errors;

  constructor() {
    this.getUsers()
  }

  //GUARDARSUSCRIPCION SAVE DATA PARA DESPUES CANCELARLA
  mySub?: Subscription;
  //
  buttonsService = inject(ButtonsServiceService);
  lookTableBoolean = signal(this.buttonsService.lookTableBooleanAddUsers);
  changeToPutBoolean = signal(false);

  msgDeleteConfirmation  = this.buttonsService.msgDeleteConfirmation


  //SIGNALS QUE GUARDAN INFO
  usersData = signal(this.buttonsService.usersData);
  //

  // INYECCIONES DE DEPÉNDENCIAS
  service = inject(ServiceService);
  fb = inject(FormBuilder);
  //

  //BOOLEAN VALIDATORS
  newData = signal(true);
  booleanMsgSecurity = signal(false);

  //

  datos = this.fb.group({
    nombre: ['',[ Validators.required, Validators.minLength(3), Validators.maxLength(10)] ],
    apellido: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(14)]],
    edad: ['', [Validators.required, ageValidator(2)]],
    numero: ['', [Validators.required, Validators.minLength(10)]],
  });

  @ViewChild('delete') deleteElementButton!: ElementRef;

  datt = this.service.saveData;
saveMesage = signal("");

  sendData() {

    this.datos.markAllAsTouched();

    if (this.datos.invalid) {
      return;
    }
    if (!this.datos.invalid) {
      const compatibleDataToSend: usersInterface = {
        nombre: this.datos.value.nombre!,
        apellido: this.datos.value.apellido!,
        edad: Number(this.datos.value.edad!),
        numero: this.datos.value.numero!,
      };
          this.saveMesage.set("Guardando usuario, se paciente")


      this.mySub = this.service.saveData(compatibleDataToSend).subscribe({


        next: ()=> {
                  this.getUsers();
                  this.saveMesage.set("Usuario guardado con exito")

                  setTimeout(()=> {
                    this.saveMesage.set("")
                  },3000)

        },
        error: () => {
                this.saveMesage.set("ocurrio un error y no se pudo guardar")
                
                  setTimeout(()=> {
                    this.saveMesage.set("")
                  },3000)



        }

      });
    }
  }

  ngOnDestroy() {
    this.mySub?.unsubscribe();
  }


  dataWit = signal("Espera un momento mientras pedimos la informacion al servidor, Este proceso puede tardar un momento, se paciente...")
  //PEDIR DATA PARA MOSTRAR, SE ENVIA EN UNA SIGGAL AL COMPONENTE HIJO TABLE-USERS
  getUsers() {
    this.service.getUsers().subscribe((usersDat: usersInterfacePut[]) => {
      this.buttonsService.usersData.set(usersDat);
      this.dataWit.set("")
    });
  }
}
