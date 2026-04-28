import { Routes } from '@angular/router';
import { AppComponent } from './app.component';


export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: AppComponent },
   
];
