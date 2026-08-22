import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { ButtonsServiceService } from '../../services/buttonsService.service';
import { ButtonsLookDisguiseComponent } from '../buttons-components/buttonsLookDisguise/buttonsLookDisguise.component';
@Component({
  selector: 'app-bottons-main',
  imports: [ButtonsLookDisguiseComponent],
  templateUrl: './bottons-main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottonsMainComponent {
  service = inject(ServiceService);
  buttonService = inject(ButtonsServiceService);

  usersData = signal(this.buttonService.usersData);

  //SIGNAL CAMBIAR SECCION
  changeToPutBoolean = input<Signal<boolean>>();



  //SIGNAL DEL ESTADO DE LA VISTA DE LA TABLA
  lookTableBoo = input<WritableSignal<boolean>>(signal(false));


  

  msgDeleteConfirmation = this.buttonService.msgDeleteConfirmation

  updateSignalMod() {
    this.service.updateSignalMod.set(true);
  }

  deleteUsers(boolean: boolean) {
    this.buttonService.deleteUsers(boolean, this.msgDeleteConfirmation);
    this.buttonService.lookTableBooleanAddUsers.set(false)
  }

  cancelar() {
    this.buttonService.cancelar(this.msgDeleteConfirmation);
  }
}
