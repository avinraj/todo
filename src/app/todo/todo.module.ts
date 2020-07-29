import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {NavbarModule} from '../navbar/navbar.module';
import {MatGridListModule} from '@angular/material/grid-list';
import { TodoProfileComponent } from './todo-profile/todo-profile.component';
import { TodoAboutComponent } from './todo-about/todo-about.component';
import {TodoRoutingModule} from './todo-routing.module';
import { TodosViewComponent } from './todos-view/todos-view.component';
@NgModule({
  declarations: [TodoListComponent, TodoProfileComponent, TodoAboutComponent, TodosViewComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    NavbarModule,
    MatGridListModule
  ],
  exports: [TodoListComponent]
})
export class TodoModule { }
