import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import  {MatDialog} from '@angular/material/dialog';
import { Injectable } from "@angular/core";
import { ErrorComponent } from "./error/error.component";


@Injectable()
export class ErrorIntercepter implements HttpInterceptor{

constructor(private dialog:MatDialog){}
    intercept(req: HttpRequest<any>,next: HttpHandler){
      
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse)=>{
                console.log('error-intercepter called')
                let errorMessage="Unknown error occured"
                if(error.error.message){
                    errorMessage=error.error.message;
                    
                }
                console.log(error);
               this.dialog.open(ErrorComponent, {data:  {message:  errorMessage}})
                return  throwError(error)
            })
        )
    }
}