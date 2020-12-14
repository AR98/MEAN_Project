import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{AuthData} from './auth-data.models'
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated:boolean=false
private token:string
private userId:string
private tokenTime:any
private authStatusListerner= new Subject<boolean>()
  constructor(private http:HttpClient,private router: Router) { }

  createUser(email:string, password:string){
    const authData:AuthData={email: email,password:password}
    console.log(authData)
    this.http.post('http://localhost:8080/app/user/signUp',authData).subscribe(res=>{
      console.log(res);
      this.router.navigate(['/'])
    })
  }

 loginUser(email:string, password: string){
  const authData:AuthData={email: email,password:password}
  this.http.post<{token:string, expiresIn: number,userId: string}>('http://localhost:8080/app/user/login',authData).subscribe(res=>{
   // console.log(res);
    this.token=res.token
    if(this.token){
      const expiresInDuration= res.expiresIn
      this.userId=res.userId
    this.setAuthTimer(expiresInDuration)
      console.log(expiresInDuration)
      this.isAuthenticated=true
      this.authStatusListerner.next(true)
      const now=new Date()
      const expirationData= new Date(now.getTime()+ expiresInDuration*1000)
      console.log(expirationData)
      this.saveAuthData(this.token,expirationData,this.userId)
      this.router.navigate(['/'])
    }
   
  })

 }

 setAuthTimer(duration: number){
   console.log(duration)
  this.tokenTime= setTimeout(() => {
    this.logout()
  }, duration*1000);
 }

 autoAuthUser(){

  const authInformation=this.getAuthData();
  const now= new Date()
  const expiresIn= authInformation.expirationDate.getTime() - now.getTime()

  if(expiresIn>0){
    this.token=authInformation.token
    this.isAuthenticated=true;
    this.userId=authInformation.userId
    this.setAuthTimer(expiresIn/1000)
    this.authStatusListerner.next(true)
  }

 }

 getToken(){
   return this.token
 }

 getauthStatusListener(){
   return this.authStatusListerner.asObservable()
 }
 getIsAuth(){
  return this.isAuthenticated
}

logout(){
   this.token=null;
   this.authStatusListerner.next(false)
   this.isAuthenticated=false
   this.userId=null
   this.clearAuthData();
   clearTimeout(this.tokenTime)
   this.router.navigate(['/'])
  
}
 saveAuthData(token:string, expirationData: Date, userId:string){
localStorage.setItem("token", token)
localStorage.setItem("expiration", expirationData.toISOString())
localStorage.setItem("userId", userId)

 }
 clearAuthData(){
   localStorage.removeItem("token")
   localStorage.removeItem("expiration")
   localStorage.removeItem("userId")
 }

 getAuthData(){
   const token= localStorage.getItem("token")
   const  expirationDate= localStorage.getItem("expiration")
   const userId=localStorage.getItem("userId")

   if(!token || !expirationDate)return;

   return {
     token: token,
     expirationDate: new Date(expirationDate),
     userId: userId
   }
 }

 getuserId(){
   return this.userId
 }

}
