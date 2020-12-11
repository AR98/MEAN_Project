import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Posts} from '../models/Posts.model';
import { PostsService } from '../posts.service';
import {mimeType} from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
mode:string='create';
form:FormGroup
imagePreview:string | ArrayBuffer
isLoading:boolean=false
postId:string=null;
post:Posts={
  id: null,
  title: null,
  content:null,
  image:null
}
  constructor(public postService:PostsService,public route:ActivatedRoute) { }

  ngOnInit(): void {

this.form=new FormGroup({
  'title': new FormControl(null,{
    validators: [Validators.required,Validators.minLength(3)]
  }),
  'content': new FormControl(null,{
    validators: [Validators.required]
  }),
  'image': new FormControl(null,{
    validators:[Validators.required],
    asyncValidators: [mimeType]
  })
})

    this.route.paramMap.subscribe((paraMap: ParamMap )=>{
if(paraMap.has('postId')){
  this.mode='edit';
  this.postId=paraMap.get('postId');
  this.isLoading=true;
  this.post=this.postService.getPost(this.postId)
  this.isLoading=false
  this.form.setValue({
    'title': this.post.title, 'content':  this.post.content, 'image': this.post.image
  })
}else{
  this.mode='create';
  this.postId=null
}
    })
  }


  savePost(){

    if(this.form.invalid)return;
    this.isLoading=true
    let post:Posts={
      id:null,
      title: this.form.value.title,
      content: this.form.value.content,
      image: this.form.value.image
    }
    
    if(this.mode==='create'){
      
      this.postService.addposts(post);
    }else if(this.mode==='edit'){
      this.postService.updatePost(this.postId,this.form.value.title,this.form.value.content,this.form.value.image);
    }
   


this.form.reset();
  }

  onImagePicked(event:Event){
    const file= (event.target as HTMLInputElement).files[0];
    this.form.patchValue({'image': file});
    this.form.get('image').updateValueAndValidity()

     console.log(file);
    // console.log(this.form)

    const reader=  new FileReader();
    reader.onload=()=>{

      this.imagePreview = reader.result;
     

    }
    reader.readAsDataURL(file)
  }
}
