import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from "rxjs";
import { LOCAL_STORAGE_NAME } from "../environments/const";
import { catchError } from "rxjs";
import { throwError } from "rxjs";

//@Injectable()
export class AppInterceptor {
    constructor(
        public router: Router
    ) { }
    
    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     request = request.clone({
    //         setHeaders: {
    //           Authorization:
    //             `bearer ` + localStorage.getItem(LOCAL_STORAGE_NAME.ACCESS_TOKEN)
    //         }
    //       });
      
    //       return next.handle(request).pipe(catchError((error, caught) => {
    //         // intercept the respons error and displace it to the console
    //         // this.errorHandling(error);
    //         return throwError(error);
    //       }) as any);
    // }

    errorHandling(result: any) {
        if (result != null) {
            const code = result.status;
            if (code === 401) {
                this.router.navigateByUrl(`login`);
            }
        }

    }

}