import { Component, OnInit } from '@angular/core';
import {TodoService} from '../todo.service';
@Component({
  selector: 'app-todos-view',
  templateUrl: './todos-view.component.html',
  styleUrls: ['./todos-view.component.css']
})
export class TodosViewComponent implements OnInit {
divView = false;
todosArray = [];
  constructor(private service: TodoService) { }

  ngOnInit(): void {
this.service.getTodos()
.subscribe(resData => {
  this.todosArray = resData.datas;
});
  }
  getClickedTodo(todos){
    this.service.clickedTodo(todos);
  }
}
