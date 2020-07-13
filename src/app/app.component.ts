import { Component } from '@angular/core';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientSide';
  divView:boolean=false
  todoArray=[]
    todo=new FormControl('')
  
  addtodo(value){
    if(value==''){
      return
    }else{
      this.todoArray.push(value)
      this.todo.reset()
    }
    
  }
  viewtodo(){
    if(this.todoArray.length==0){
      alert("No list to view")
    }else{this.divView=true}
}
  delete(value){
   for(let i=0;i<=this.todoArray.length;i++){
        if(value==this.todoArray[i]){
          this.todoArray.splice(i,1)
        }
        if(this.todoArray.length==0){
          this.divView=false
        }
          }
    
    }
}
