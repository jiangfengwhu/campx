import { Injectable } from "@angular/core";
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { HelpService } from "./help.service";
import { Observable, of } from "rxjs";
import { take, mergeMap } from "rxjs/operators";
import { LayoutService } from "../layout.service";

@Injectable({
  providedIn: "root"
})
export class HelpHomeResolverService implements Resolve<any> {
  constructor(private _info: HelpService, private layout: LayoutService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    this.layout.params = route.params;
    return this._info.getLatest("f".repeat(24), 10, route.params).pipe(
      take(1),
      mergeMap(infos => {
        if (infos) {
          return of(infos);
        } else {
          return of([]);
        }
      })
    );
  }
}
