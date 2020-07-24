import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
isAuthenticated = false;
  constructor(private http: HttpClient, public router: Router) { }
  userLogin(uname: string , psswd: string){
    if (uname && psswd){
 const userLog = {username: uname, password : psswd};
 this.http.post<{message: string}>('/user/login', userLog)
  .subscribe(resData => {
    if (resData){
      this.isAuthenticated = true;
      this.router.navigate(['/todolist']);
    }
    else {
      this.isAuthenticated = false;
      return;
    }
  } );
}
}
todoadd(newTodo){
  const body = {todo: newTodo.todo, completed: newTodo.completed};
  return this.http.post<{tododata}>('/todo/todoadd', body);
}
todoupdate(value, Status){
 const updationObj = {id: value.id, todo: value.todo, completed: value.completed, status: Status};
 return this.http.put<{tododata}>('/todo/todoupdate/', updationObj);
}
tododelete(id){
 return this.http.delete<{tododata}>('/todo/tododelete/' + id);
}

  getisAuth(){
return this.isAuthenticated;
  }
}
