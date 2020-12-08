import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Posts} from '../models/Posts.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {


  constructor(public postService:PostsService) { }

  ngOnInit(): void {
  }


  savePost(form:NgForm){

    if(form.invalid)return;
   let post:Posts={
     title: form.value.title,
     content: form.value.content
   }
this.postService.addposts(post);

form.resetForm();
  }
}
