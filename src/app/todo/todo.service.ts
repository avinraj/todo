import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  todoAdd(newTodo){
    const body = {todo: newTodo.todo, completed: newTodo.completed};
    return this.http.post<{tododata}>('/todolist', body);
  }
  todoUpdate(value, Status){
    const id = value.id;
   const updationObj = {id: value.id, todo: value.todo, completed: value.completed, status: Status};
   return this.http.put<{tododata}>('/todolist/' +id, updationObj);
  }
  todoDelete(id){
   return this.http.delete<{tododata}>('/todolist/' + id);
  }
}
