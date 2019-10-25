import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpErrorsHandlerInterceptor } from "./error-handler.interceptor";
import { CacheInterceptor } from "./cache.interceptor";
import { NotificationInterceptor } from "./notification.interceptor";

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorsHandlerInterceptor,
    multi: true
  },
  { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true }
];
