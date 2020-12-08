import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
enteredTitle:string='';
enteredContent:string='';

@Output() enteredPost=new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }


  savePost(){
   let post={
     title: this.enteredTitle,
     content: this.enteredContent
   }

this.enteredPost.emit(post);

  }
}
