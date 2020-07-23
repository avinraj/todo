import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
authStatus = false;
loginForm = new FormGroup({
  username: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required),
});
  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.authService.userLogin(this.loginForm.value.username, this.loginForm.value.password);
    this.authStatus = this.authService.getisAuth();
    if (!this.authStatus){
      return;
    }
  }
}
