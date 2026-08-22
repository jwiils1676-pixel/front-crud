import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Errors } from '../../utils/form-utils';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsLookDisguiseComponent } from '../buttons-components/buttonsLookDisguise/buttonsLookDisguise.component';
import { ButtonsServiceService } from '../../services/buttonsService.service';
import { TableUsersComponent } from '../table-users/table-users.component';
import { ServiceService } from '../../services/service.service';
import { NgClass } from '@angular/common';
import {
  error,
  putError,
  putNext,
  usersDataMapping,
  usersInterfacePut,
} from '../../interfaces/interface-users';

@Component({
  selector: 'app-put-data',
  imports: [ReactiveFormsModule, ButtonsLookDisguiseComponent, TableUsersComponent, NgClass],
  templateUrl: './putData.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PutDataComponent {
  buttonsService = inject(ButtonsServiceService);

  fb = inject(FormBuilder);
  serviceMain = inject(ServiceService);
  errors = Errors;

  usersData = signal(this.buttonsService.usersData);

  lookTableBooleanModUsers = this.buttonsService.lookTableBooleanModUsers;

  datos = this.fb.group({
    id: [],
    nombre: [''],
    apellido: [''],
    edad: [],
    numero: [''],
  });

  errorData = signal<error>({ nombre: 'vacio' });

  errorId = signal({});
  timer = signal(false);
  setTime = null;

  idIncorrect = signal(false);
  usersDataMapping = this.serviceMain.usersDataMapping;

  condition = signal(false);
  sendData() {
    if (this.setTime) {
      clearTimeout(this.setTime);
    }

    const datosPut: usersInterfacePut[] = [
      {
        id: this.datos.value.id == null ? 0 : this.datos.value.id,
        apellido: this.datos.value.apellido || null,
        nombre: this.datos.value.nombre || null,
        edad: this.datos.value.edad! == null ? 0 : this.datos.value.edad,
        numero: this.datos.value.numero || null,
      },
    ];

    this.usersDataMapping.set({ nombre: 'Cargando...' });


    this.serviceMain.putData(datosPut, datosPut[0].id!).subscribe({
      next: (data: putNext) => {
        this.condition.set(true);

        this.usersDataMapping.set({ nombre: 'Datos guardados correctamente' });

        const setTime = setTimeout(() => {
          this.usersDataMapping.set({});
          this.condition.set(false);

          this.timer.set(true);
        }, 1000);

        this.datos.reset();

        this.serviceMain.getUsers().subscribe({
          next: (data) => this.buttonsService.usersData.set(data),

          error: (data) => {
            getError: 'error al pedir usuarios';
          },
        });
      },

      error: (data: putError) => {
        if (data.error.Error !== 'Error: no se pudo encontrar el usuario con el id: 0') {
          this.condition.set(true);
        } else {
          this.condition.set(false);
        }

        this.errorData.set({
          Error: data.error.Error,
          nombre: data.error.nombre,
          apellido: data.error.apellido,
          edad: data.error.edad,
          id: data.error.id,
          numero: data.error.numero,
        });

        this.usersDataMapping.set(this.errorData());
      },
    });
  }
}
