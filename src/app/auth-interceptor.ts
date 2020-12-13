import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthIntercepter implements HttpInterceptor{

    constructor(private authService:AuthService){}

    intercept(req: HttpRequest<any>,next: HttpHandler){
        const authToken=this.authService.getToken()
        console.log(authToken)
        const authRequest=req.clone({
            headers:  req.headers.set("authorization", 'Bearer '+ authToken)
        })
        return next.handle(authRequest)
    }
}