import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './services/authGuard';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: '', loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)},
  { path: '',
  redirectTo: '',
  pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
