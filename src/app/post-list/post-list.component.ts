import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscriber, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
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
totalLength=0
pagePerSize=2
pageSizeOp=[1, 2, 3, 4, 5]
currentPage=1
isUserAuthenticated:boolean=false
authStatusSub: Subscription
  constructor(public postServices: PostsService, private authService: AuthService) { }
isLoading:boolean=false
  ngOnInit(): void {
    this.isLoading=true;
    console.log("I'm about to call getPosts")
   this.postServices.getPosts(this.pagePerSize,this.currentPage)
    
    this.postServices.getUpdatedListener().subscribe((item: {posts:Posts[],postCount:number})=>{
this.posts=item.posts;
this.isLoading=false
this.totalLength=item.postCount

    })

    this.isUserAuthenticated=this.authService. getIsAuth()

    this.authStatusSub= this.authService.getauthStatusListener().subscribe(res=>{
      this.isUserAuthenticated=res
    })
    // this.posts.forEach(element => {
    //   console.log(element.title);
    // });
  }

  delete(id:string){
    console.log('delete function called')
    this.isLoading=true
    this.postServices.deletePost(id).subscribe(()=>{
      this.postServices.getPosts(this.pagePerSize,this.currentPage)
    });
  }

  onPage(event: PageEvent){
    this.currentPage=event.pageIndex+1;
    this.pagePerSize=event.pageSize
    this.postServices.getPosts(this.pagePerSize,this.currentPage)
    console.log(event)
  }

}
