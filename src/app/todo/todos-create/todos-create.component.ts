import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {mimeType} from './mime.type.validator';
import {Validators} from '@angular/forms';
import {TodoService} from '../todo.service';
@Component({
  selector: 'app-todos-create',
  templateUrl: './todos-create.component.html',
  styleUrls: ['./todos-create.component.css']
})
export class TodosCreateComponent implements OnInit {
  imagePreview: string;
form = this.fb.group({
title: new FormControl(null, {validators: [Validators.required]}),
image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
});
  constructor(private fb: FormBuilder, private service: TodoService) { }

  ngOnInit(): void {
  }
  OnImgPicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  onSubmit(){
if (this.form.invalid){return; }
this.service.todosAdd(this.form.value.image, this.form.value.title);
this.form.reset();
  }

}
