import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
isAuthenticated = false;
  constructor() { }
  userLogin(uname: string , psswd: string){
if (uname && psswd){
      this.isAuthenticated = true;
    }
}
  getisAuth(){
return this.isAuthenticated;
  }
}
