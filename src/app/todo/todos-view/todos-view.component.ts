import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos-view',
  templateUrl: './todos-view.component.html',
  styleUrls: ['./todos-view.component.css']
})
export class TodosViewComponent implements OnInit {
divView = false;
  constructor() { }

  ngOnInit(): void {
  }
  newTodo(){
    console.log('Button clicked');
    this.divView = true;
  }

}
