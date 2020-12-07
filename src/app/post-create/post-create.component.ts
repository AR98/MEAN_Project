import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
content:string='Not entered yet'
enteredValue='No content entered yet!'
  constructor() { }

  ngOnInit(): void {
  }


  savePost(){
   
this.content=this.enteredValue
  }
}
