import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import {Posts} from '../models/Posts.model';
import {PostsService } from '../posts.service'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
// posts=[{
// title: "first Post",
// content: "This is first post content"
// },{
//   title: "Second Post",
//   content: "This is second post content"
// },{
//   title: "Third Post",
//   content: "This is third post content"
// },
// ]
 posts:Posts[]=[]



  constructor(public postServices: PostsService) { }

  ngOnInit(): void {
    
    console.log("I'm about to call getPosts")
   this.postServices.getPosts()
    
    this.postServices.getUpdatedListener().subscribe((item:Posts[])=>{
this.posts=item;
    })
    // this.posts.forEach(element => {
    //   console.log(element.title);
    // });
  }

  delete(id:string){
    console.log('delete function called')
    this.postServices.deletePost(id);
  }

}
