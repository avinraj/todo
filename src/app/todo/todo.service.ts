import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
clickedTodoArr = [];
  constructor(private http: HttpClient, private router: Router) { }

  todoAdd(newTodo){
    const body = {id: newTodo.todosid, todo: newTodo.todo, completed: newTodo.completed};
    return this.http.post<{tododata}>('/todos/todoitem', body);
  }
  todoUpdate(value, Status){
    const id = value.id;
    const updationObj = {id: value.id, todo: value.todo, completed: value.completed, status: Status};
    return this.http.put<{tododata}>('/todolist/' + id, updationObj);
  }
  todoDelete(id){
   return this.http.delete<{tododata}>('/todolist/' + id);
  }
  todosAdd(file: File, name: string){
const formdata = new FormData();
formdata.append('todotitle', name);
formdata.append('image', file);
this.http.post('/todos', formdata)
.subscribe(resData => {
  console.log(resData);
  this.router.navigate(['/todosView']);
});
  }
  getTodos(){
   return this.http.get<{datas}>('/todos');
  }
  clickedTodo(data){
this.clickedTodoArr = data;
this.router.navigate(['todolist']);
  }
  selectedTodo(){
    return this.clickedTodoArr;
  }
}
