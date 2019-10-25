import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError, Observable, timer } from "rxjs";
import { catchError, retryWhen, mergeMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class HttpErrorsHandlerInterceptor implements HttpInterceptor {
  constructor(private _msg: MatSnackBar, private _route: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      retryWhen(
        genericRetryStrategy({
          scalingDuration: 2000,
          retryStatusCodes: [503, 504]
        })
      ),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        switch (error.status) {
          case 0:
          case 502:
            this._msg.open("后端已离线", "关闭");
            break;
          case 401:
            this._msg.open("请先登录", "关闭");
            this._route.navigate(["/user/login"]);
            break;
          case 503:
          case 504:
            this._msg.open("连接超时", "关闭");
            break;
          case 404:
            this._msg.open("不存在的页面", "关闭", {
              duration: 2000
            });
            this._route.navigate(["/"]);
        }
        return throwError(error);
      })
    );
  }
}

const genericRetryStrategy = ({
  maxRetryAttempts = 3,
  scalingDuration = 1000,
  retryStatusCodes = []
}: {
  maxRetryAttempts?: number;
  scalingDuration?: number;
  retryStatusCodes?: number[];
} = {}) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      if (
        retryAttempt <= maxRetryAttempts &&
        retryStatusCodes.find(e => e === error.status)
      ) {
        return timer(retryAttempt * scalingDuration);
      }
      return throwError(error);
    })
  );
};
