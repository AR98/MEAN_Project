import { Component, OnInit, Input } from '@angular/core';

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
@Input() posts=[]



  constructor() { }

  ngOnInit(): void {
    
    console.log(this.posts.length)
    // this.posts.forEach(element => {
    //   console.log(element.title);
    // });
  }

}
