import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { VideoService } from "./video.service";
import { Observable, of } from "rxjs";
import { take, mergeMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class VideoDetailResolverService implements Resolve<any> {
  constructor(private vds: VideoService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    return this.vds.getone(route.paramMap.get("id")).pipe(
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
