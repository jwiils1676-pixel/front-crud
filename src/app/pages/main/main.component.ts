import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AddusersComponent } from "../../components/addusers/addusers.component";
import { PutDataComponent } from "../../components/putData/putData.component";
import { ButtonsServiceService } from '../../services/buttonsService.service';

@Component({
  selector: 'app-main',
  imports: [AddusersComponent, PutDataComponent],
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent { 

buttonsService = inject(ButtonsServiceService)

changetoAddusersOrPutUsers = signal(this.buttonsService.changetoAddusersOrPutUsers)


     

}
