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
  todoDataObj: any;
  arr = [];
 numberComplet = 0;
   numberUncomplete: number;
  todoObj: any;
 todoname ;
 todonameControl = new FormControl('');
    todo = new FormControl('');
  constructor(private service: TodoService) { }

  ngOnInit(): void {
    this.todoDataObj = this.service.selectedTodo();
    this.todoname = this.todoDataObj.todotitle;
    this.todoArray = this.todoDataObj.todoitem;
    console.log(this.todoArray);
    this.arr = this.todoArray.filter((data) => {
      return data.completed === true;
        });
    this.numberComplet = this.arr.length;
    this.numberUncomplete = this.todoArray.length;
    this.viewtodo();
  }
  addname(){
    this.editname = true;
  }
  addtodoname(name){
    const tododata = {id: this.todoDataObj._id, todosname: name};
    this.service.todoNameAdd(tododata)
    .subscribe(resData => {
      this.todoname = resData.todosname;
      this.editname = false;
    });
     }
      addtodo(value){
        if (!value) {
          return;
        }else{
          this.todoObj = {
            todosid: this.todoDataObj._id,
            todo: value,
            completed: false
          };
          this.service.todoAdd(this.todoObj)
          .subscribe(resData => {
            const tododata = {todoid: resData.tododata.id, todo: resData.tododata.todo, completed: resData.tododata.completed};
            this.todoArray.push(tododata);
            console.log(this.todoArray);
            this.divView = true;
            this.numberUncomplete = this.todoArray.length;
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
      const tododata = {todosid: this.todoDataObj._id , id: value.todoid};
      let status: boolean;
      console.log(value);
      if (e.checked) { status = true; }
       else{  status = false; }
      this.service.todoUpdate(tododata, status)
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
      delete(todoid){
        const tododata = {todosid: this.todoDataObj._id , id: todoid };
        this.service.todoDelete(tododata)
        .subscribe(resData => {
          const leng = this.todoArray.length;
          this.todoArray.splice(0, leng);
          this.todoArray = resData.tododata;
          this.numberUncomplete = this.todoArray.length;
          console.log(this.todoArray);
         });
        }
}

