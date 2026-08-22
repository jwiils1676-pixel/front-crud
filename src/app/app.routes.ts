import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [

    {
        path:'crud',
        component: MainComponent
    },
    {
        path: '**',
        redirectTo: 'crud'
    }
];
