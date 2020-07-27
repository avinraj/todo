import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoAboutComponent } from './todo-about/todo-about.component';
import { TodoProfileComponent } from './todo-profile/todo-profile.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AuthGuard } from '../services/authGuard';


const routes: Routes = [
  {path: 'todolist' , component: TodoListComponent,canActivate: [AuthGuard]},
 {path: 'todoProfile', component: TodoProfileComponent},
    {path: 'todoAbout', component: TodoAboutComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
