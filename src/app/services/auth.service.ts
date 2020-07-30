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
 this.http.post<{message: string}>('/user', userLog)
  .subscribe(resData => {
    if (resData){
      this.isAuthenticated = true;
      console.log(this.isAuthenticated);
      this.router.navigate(['/todosView']);
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
}
