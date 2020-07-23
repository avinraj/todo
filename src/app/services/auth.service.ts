import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
isAuthenticated = false;
todo = [];
  constructor(private http: HttpClient, public router: Router) { }
  userLogin(uname: string , psswd: string){
    if (uname && psswd){
 const userLog = {username: uname, password : psswd};
 this.http.post<{message: string, tododata}>('/user/login', userLog)
  .subscribe(resData => {
    if (resData){
      this.isAuthenticated = true;
      for (const i of resData.tododata){
        this.todo.push(i);
        this.router.navigate(['/todolist']);
      }
    }
    else {
      this.isAuthenticated = false;
      return;
    }
  } );
}
}
  getisAuth(){
return this.isAuthenticated;
  }
  gettodoData(){
    return this.todo;
  }
}
