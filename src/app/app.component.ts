import { Component, OnInit } from '@angular/core';
import { ɵELEMENT_PROBE_PROVIDERS__POST_R3__ } from '@angular/platform-browser';
import { AuthService } from './auth.service';
import {Posts} from './models/Posts.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService){}
  title = 'mean-app';
enteredPost:Posts[]=[]
  addPost(post){
    this.enteredPost.push(post);
    console.log(post)
    console.log(this.enteredPost.length)
  }

  ngOnInit(){
    this.authService.autoAuthUser();

  }
}
