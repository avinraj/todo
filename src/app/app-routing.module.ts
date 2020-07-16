import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import {AuthGuard} from './services/authGuard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'todolist', component: TodoListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
