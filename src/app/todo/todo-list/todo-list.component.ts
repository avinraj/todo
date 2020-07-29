import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { TodoService} from '../todo.service';
import {Todos} from '../../modal/todo';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  divView = false;
  editname = false;
  checked = true;
  todoArray: Todos[] = [];
  arr = [];
 numberComplet = 0;
   numberUncomplete: number;
  todoObj: any;
 todoname = 'Todo Name';
 todonameControl = new FormControl('');
    todo = new FormControl('');
  constructor(private service: TodoService) { }

  ngOnInit(): void {
  }
  addname(){
    this.editname = true;
  }
  addtodoname(name){
    this.todoname = name;
    this.editname = false;
     }
      addtodo(value){
        if (!value) {
          return;
        }else{
          this.todoObj = {
            id: '',
            todo: value,
            completed: false
          };
          this.service.todoAdd(this.todoObj)
          .subscribe(resData => {
            const todo: Todos = {id: resData.tododata.id, todo: resData.tododata.todo, completed: resData.tododata.completed};
            this.todoArray.push(todo);
            this.numberUncomplete = this.todoArray.length;
            this.viewtodo();
            this.todo.reset();
           });
         }
         }
      viewtodo(){
        if (!this.todoArray.length){
          alert('No list to view');
        }else{this.divView = true; }
    }
    onCheckboxChange(e, value) {
      if (e.checked) {
       const status = true;
       this.service.todoUpdate(value, status)
       .subscribe((resData) => {
        const leng = this.todoArray.length;
        this.todoArray.splice(0, leng);
        this.todoArray = resData.tododata;
        this.arr = this.todoArray.filter((data) => {
          return data.completed === true;
            });
        this.numberComplet = this.arr.length;
        this.viewtodo();
       });
      }else{
        const status = false;
        this.service.todoUpdate(value , status)
        .subscribe((resData) => {
          const leng = this.todoArray.length;
          this.todoArray.splice(0, leng);
          this.todoArray = resData.tododata;
          this.arr = this.todoArray.filter((data) => {
            return data.completed === true;
              });
          this.numberComplet = this.arr.length;
          this.viewtodo();
        });
      }
      }
      delete(id){
        this.service.todoDelete(id)
        .subscribe(resData => {
          const leng = this.todoArray.length;
          this.todoArray.splice(0, leng);
          this.todoArray = resData.tododata;
          this.numberUncomplete = this.todoArray.length;
          console.log(this.todoArray);
         });
        }
}

