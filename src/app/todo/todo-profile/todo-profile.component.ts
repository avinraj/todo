import { Component, OnInit } from '@angular/core';
import {TodoService} from '../todo.service';
@Component({
  selector: 'app-todo-profile',
  templateUrl: './todo-profile.component.html',
  styleUrls: ['./todo-profile.component.css']
})
export class TodoProfileComponent implements OnInit {

  constructor(private service:TodoService) { }

  ngOnInit(): void {
 }

}
