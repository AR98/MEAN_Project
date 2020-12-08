import { Injectable } from '@angular/core';
import {Posts} from './models/Posts.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
private posts:Posts[]=[];
private postsUpdated=new Subject<Posts[]>()
  constructor() { }

  getPosts(){
    return [...this.posts];
  }

  getUpdatedListener(){
    return this.postsUpdated.asObservable();
  }
  addposts(p:Posts){
    this.posts.push(p);
    this.postsUpdated.next([...this.posts]);
  }
}
