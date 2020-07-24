import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { AuthService} from '../../services/auth.service';
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
  todoArray2: Todos[] = [];
  arr = [];
   index2: number;
 numberComplet = 0;
   numberUncomplete: number;
  todoObj: any;
 todoname = 'Todo Name';
 todonameControl = new FormControl('');
    todo = new FormControl('');
  constructor(private service: AuthService) { }

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
          this.service.todoadd(this.todoObj)
          .subscribe(resData => {
            const todo: Todos = {id: resData.tododata.id, todo: resData.tododata.todo, completed: resData.tododata.completed};
            this.todoArray2.push(todo);
            this.numberUncomplete = this.todoArray2.length;
            this.viewtodo();
            this.todo.reset();
           });
         }
         }
      viewtodo(){
        if (!this.todoArray2.length){
          alert('No list to view');
        }else{this.divView = true; }
    }
    onCheckboxChange(e, value) {
      this.index2 = this.todoArray2.indexOf(value);
      if (e.checked) {
       const status = true;
       this.service.todoupdate(value, status)
       .subscribe((resData) => {
        const leng = this.todoArray2.length;
        this.todoArray2.splice(0, leng);
        this.todoArray2 = resData.tododata;
        this.arr = this.todoArray2.filter((data) => {
          return data.completed === true;
            });
        this.numberComplet = this.arr.length;
        this.viewtodo();
       });
      }else{
        const status = false;
        this.service.todoupdate(value , status)
        .subscribe((resData) => {
          const leng = this.todoArray2.length;
          this.todoArray2.splice(0, leng);
          this.todoArray2 = resData.tododata;
          this.arr = this.todoArray2.filter((data) => {
            return data.completed === true;
              });
          this.numberComplet = this.arr.length;
          this.viewtodo();
        });
      }
      }
      delete(id){
        this.service.tododelete(id)
        .subscribe(resData => {
          const leng = this.todoArray2.length;
          this.todoArray2.splice(0, leng);
          this.todoArray2 = resData.tododata;
          this.numberUncomplete = this.todoArray2.length;
          console.log(this.todoArray2);
         });
        }
}

