import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  divView = false;
  todoArray = [];
    todo = new FormControl('');
  constructor() { }

  ngOnInit(): void {
  }
  addtodo(value){
    if (!value) {
      return;
    }else{
      this.todoArray.push(value);
      this.todo.reset();
    }
     }
  viewtodo(){
    if (!this.todoArray.length){
      alert('No list to view');
    }else{this.divView = true; }
}
  delete(value){
  const index = this.todoArray.indexOf(value);
  this.todoArray.splice(index, 1);
  if (!this.todoArray.length){
          this.divView = false;
        }
     }

}
