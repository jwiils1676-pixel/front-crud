import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import { ButtonsServiceService } from '../../../services/buttonsService.service';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-buttons-look-disguise',
  imports: [],
  templateUrl: './buttonsLookDisguise.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsLookDisguiseComponent {
  service = inject(ServiceService);
  buttonsService = inject(ButtonsServiceService);



  usersData = signal(this.buttonsService.usersData);
  lookTableBoolean = input.required<WritableSignal<boolean>>();




  updateSignalMod(boolean : boolean) {

    this.buttonsService.changetoAddusersOrPutUsers.set(boolean);

  }


  
  looktable() {
    this.buttonsService.lookTable(this.lookTableBoolean());
  }
}
