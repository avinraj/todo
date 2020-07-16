import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  divView = false;
  todoArray2 = [];
  arr = [];
   index2: number;
 numberComplet = 0;
   numberUncomplete: number;
  todoObj: any;
 todoname = 'Todo Name';
 todonameControl = new FormControl('');
    todo = new FormControl('');
  constructor() { }

  ngOnInit(): void {
  }
  addtodoname(name){
    this.todoname = name;
     }
      addtodo(value){
        if (!value) {
          return;
        }else{
          this.todoObj = {
            todoName: value,
            completed: false
          };
          this.todoArray2.push(this.todoObj);
          this.numberUncomplete = this.todoArray2.length;
          this.todo.reset();
          this.viewtodo();
        }
         }
      viewtodo(){
        if (!this.todoArray2.length){
          alert('No list to view');
        }else{this.divView = true; }
    }
    onCheckboxChange(e, value) {
      this.index2 = this.todoArray2.indexOf(value);
      if (e.target.checked) {
         this.todoArray2[this.index2].completed = true;
      }else{
        this.todoArray2[this.index2].completed = false;
      }
      this.arr = this.todoArray2.filter((data) => {
    return data.completed === true;
      });
      this.numberComplet = this.arr.length;
      }
      delete(value){
      const index = this.todoArray2.indexOf(value);
      this.todoArray2.splice(index, 1);
      if (!this.todoArray2.length){
              this.divView = false;
            }
      this.numberUncomplete = this.todoArray2.length;
         }

}
