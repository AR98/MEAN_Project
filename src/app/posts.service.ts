import { Injectable } from '@angular/core';
import {Posts} from './models/Posts.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
private posts:Posts[]=[];
private postsUpdated=new Subject<Posts[]>()
  constructor( private http:HttpClient) { }

  getPosts(){
    console.log("I'm in getPost Method")
    this.http.get<{message:string,post:any}>('http://localhost:8080/app/posts')
    .pipe(map((data)=>{
return data.post.map(p=>{
  return {
    title: p.title,
   content: p.content,
   id:p._id
  } 
})
      }))
    .subscribe((transformeddata)=>{
       this.posts=transformeddata;
      //console.log(data.post)
       this.postsUpdated.next([...this.posts]);
    })
  }

  getUpdatedListener(){
    console.log("I'm in getUpdateListener")
    return this.postsUpdated.asObservable();
  }
  addposts(p:Posts){

    this.http.post<{message:string}>('http://localhost:8080/app/posts',p).subscribe(res=>{
      console.log(res.message);

      this.posts.push(p);
      this.postsUpdated.next([...this.posts]);
    })
  
   }

   deletePost(id:string){
     this.http.delete('http://localhost:8080/app/posts/'+id).subscribe(res=>{
       const afterDelete= this.posts.filter(item=> item.id!=id)
       this.posts=afterDelete;
       this.postsUpdated.next([...this.posts])
     })
   }
}
