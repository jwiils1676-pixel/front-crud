import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
@Component({
  selector: 'app-css-console',
  imports: [],
  templateUrl: './cssConsole.component.html',
  styleUrl: './cssConsole.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CssConsoleComponent { 

service = inject(ServiceService)


  animation = this.service.animation

  constructor() {


    setTimeout(() => {

      this.animation.set(false)


      
    }, 4000);
  }
}
