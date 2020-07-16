import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
isAuthenticated = false;
  constructor() { }
  userLogin(uname: string , psswd: string){
    console.log(uname);
    console.log(psswd);
    if (uname && psswd){
      this.isAuthenticated = true;
    }
}
  getisAuth(){
return this.isAuthenticated;
  }
}
