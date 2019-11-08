import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { VideoService } from "./video.service";
import { LayoutService } from "../layout.service";
import { Observable, of } from "rxjs";
import { take, mergeMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class VideoHomeResolverService implements Resolve<any> {
  constructor(private vds: VideoService, private layout: LayoutService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    this.layout.params = route.params;
    return this.vds.getVideo(route.params).pipe(
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
