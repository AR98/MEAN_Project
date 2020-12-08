import { Component } from '@angular/core';
import { ɵELEMENT_PROBE_PROVIDERS__POST_R3__ } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-app';
enteredPost=[]
  addPost(post){
    this.enteredPost.push(post);
    console.log(post)
    console.log(this.enteredPost.length)
  }
}
