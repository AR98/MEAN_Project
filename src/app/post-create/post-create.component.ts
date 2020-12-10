import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Posts} from '../models/Posts.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
mode:string='create';
postId:string=null;
post:Posts={
  id: null,
  title: null,
  content:null
}
  constructor(public postService:PostsService,public route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((paraMap: ParamMap )=>{
if(paraMap.has('postId')){
  this.mode='edit';
  this.postId=paraMap.get('postId');
  this.post=this.postService.getPost(this.postId);
}else{
  this.mode='create';
  this.postId=null
}
    })
  }


  savePost(form:NgForm){

    if(form.invalid)return;
    let post:Posts={
      id:null,
      title: form.value.title,
      content: form.value.content
    }
    
    if(this.mode==='create'){
      
      this.postService.addposts(post);
    }else if(this.mode==='edit'){
      this.postService.updatePost(this.postId,form.value.title,form.value.content);
    }
   


form.resetForm();
  }
}
