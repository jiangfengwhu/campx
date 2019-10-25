import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";

import { tap } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
  constructor(private messenger: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && req.method !== "GET") {
          if (event.body["msg"]) {
            this.messenger.open(event.body["msg"], "关闭", {
              duration: event.body["status"] ? 2000 : -1
            });
          }
        }
      })
    );
  }
}
