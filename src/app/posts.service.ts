import { Injectable } from '@angular/core';
import {Posts} from './models/Posts.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
private posts:Posts[]=[];
private postsUpdated=new Subject<Posts[]>()
  constructor( private http:HttpClient, private route:Router) { }

  getPosts(){
    console.log("I'm in getPost Method")
    this.http.get<{message:string,post:any}>('http://localhost:8080/app/posts')
    .pipe(map((data)=>{
return data.post.map(p=>{
  return {
    title: p.title,
   content: p.content,
   id:p._id,
   image: p.image
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
 const postData=new FormData();
 postData.append("title" , p.title);
 postData.append("content", p.content);
 postData.append("image", p.image)
    this.http.post<{message:string,post:Posts}>('http://localhost:8080/app/posts',postData).subscribe(res=>{
      console.log(res.message);

      const p2=res.post
      this.posts.push(p2);
      this.postsUpdated.next([...this.posts]);
      this.route.navigate(["/"])
    })
  
   }

   deletePost(id:string){
     this.http.delete('http://localhost:8080/app/posts/'+id).subscribe(res=>{
       const afterDelete= this.posts.filter(item=> item.id!==id)
       this.posts=afterDelete;
       this.postsUpdated.next([...this.posts])
       this.route.navigate(["/"])
     })
    }

    getPost(pId:String){
      return {...this.posts.find(p=>p.id===pId)}
    }

    updatePost(id:string,title:string,content: string,image:string){
  let  postData: Posts | FormData

      if(typeof(image)==="object"){
        postData=new FormData()
        postData.append("title" , title);
 postData.append("content", content);
 postData.append("image", image)
      }else{
postData={
  id: id,
  title: title,
  content:content,
  image: image
}
      }
    
      console.log('updated post called')
      console.log(image);
      this.http.put("http://localhost:8080/app/posts/"+id, postData).subscribe(res=>{
        console.log(res)
        this.route.navigate(["/"])
    })
    }
}
