import { Injectable } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Observable, fromEvent } from "rxjs";
import {
  map,
  filter,
  distinctUntilChanged,
  shareReplay,
  tap
} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LayoutService {
  screen$: Observable<any>;
  isMobile = this.obs.isMatched("(max-width: 599px)");
  trans$: Observable<any>;
  opened = !this.isMobile;
  params: any;
  constructor(private obs: BreakpointObserver) {
    this.screen$ = this.obs.observe("(max-width: 599px)").pipe(
      map(re => re.matches),
      tap(re => {
        this.isMobile = re;
        this.opened = !this.isMobile;
      })
    );
    this.screen$.subscribe();
    let prevScrollpos = window.pageYOffset;
    this.trans$ = fromEvent(window, "scroll").pipe(
      map(() => {
        let currentScrollPos = window.pageYOffset;
        if (prevScrollpos - currentScrollPos > 20 || currentScrollPos < 40) {
          prevScrollpos = currentScrollPos;
          return false;
        }
        if (currentScrollPos - prevScrollpos > 8 && currentScrollPos > 60) {
          prevScrollpos = currentScrollPos;
          return true;
        }
      }),
      filter(re => re !== undefined),
      distinctUntilChanged(),
      shareReplay(1)
    );
  }
}
