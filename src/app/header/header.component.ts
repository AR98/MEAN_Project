import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
private authListenerSubs: Subscription
userIsUthenticated:boolean=false
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
this.userIsUthenticated=this.authService.getIsAuth()
    this.authListenerSubs= this.authService.getauthStatusListener().subscribe(res=>{
      this.userIsUthenticated=res
    })

  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe()
  }

  onLogout(){
    this.authService.logout()
  }

}
