import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  TemplateRef,
  ChangeDetectorRef,
  Inject
} from "@angular/core";
import * as PullToRefresh from "pulltorefreshjs";
import * as clip from "copy-text-to-clipboard";
import { FormControl, Validators } from "@angular/forms";
import { tap, distinctUntilChanged, switchMap, mergeMap } from "rxjs/operators";
import { interval, of, Subscription, Subject } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HelpService } from "../help.service";
import { END_POINTS, Endpoints } from "src/app/utils/api";
import { Overlay } from "@angular/cdk/overlay";
import { LayoutService } from "src/app/layout.service";

@Component({
  selector: "cx-help-home",
  templateUrl: "./help-home.component.html",
  styleUrls: ["./help-home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpHomeComponent implements OnInit {
  isSubmitting = false;
  infos = [];
  isLoading = false;
  isRefreshing = false;
  newSub: Subscription;
  passCtrl: FormControl;
  anynew$ = new Subject<any>();
  ptr: any;
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    public _info: HelpService,
    private changedec: ChangeDetectorRef,
    @Inject(END_POINTS) public ep: Endpoints,
    private _overlay: Overlay,
    public layout: LayoutService
  ) {}
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.loadData(data["infos"]);
    });
    this.ptr = PullToRefresh.init({
      mainElement: ".pcontainer",
      instructionsPullToRefresh: "下拉刷新页面",
      instructionsReleaseToRefresh: "松手刷新",
      instructionsRefreshing: "正在刷新",
      onRefresh: () => {
        return this.iniLoad(this.route.snapshot.params).toPromise();
      }
    });
  }
  iniLoad(pars) {
    return this._info.getLatest("f".repeat(24), 10, pars).pipe(
      mergeMap(infos => {
        if (infos) {
          return of(infos);
        } else {
          return of([]);
        }
      }),
      tap((re: any) => {
        this.isRefreshing = false;
        this.anynew$.next(false);
        this.loadData(re);
      })
    );
  }
  refresh() {
    window.scrollTo(0, 0);
    this.isRefreshing = true;
    this.iniLoad(this.route.snapshot.params).subscribe();
  }
  loadData(data: any) {
    this.infos = data;
    this.changedec.markForCheck();
    if (!this.route.snapshot.params["id"]) {
      window.addEventListener("scroll", this.listenScr);
      if (!this.newSub || this.newSub.closed) {
        this.newSub = interval(1000 * 60 * 5)
          .pipe(
            switchMap(() =>
              this._info.checknew(
                this.infos[0] ? this.infos[0].id : "0".repeat(24),
                this.route.snapshot.params
              )
            ),
            distinctUntilChanged(),
            tap(re => {
              this.anynew$.next(re);
              if (re) {
                this.newSub.unsubscribe();
              }
            })
          )
          .subscribe();
      }
    }
    this.preloadImg(data);
  }
  preloadImg(data: any) {
    let imgs = [].concat.apply([], data.map(ele => ele.imgs));
    imgs.forEach(ele => {
      new Image().src = this.ep.res + ele;
    });
  }
  ngOnDestroy() {
    window.removeEventListener("scroll", this.listenScr);
    this.ptr.destroy();
    if (this.newSub) {
      this.newSub.unsubscribe();
    }
  }
  listenScr = () => {
    const doc = document.documentElement;
    const scrollTop = Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    if (doc.scrollHeight <= scrollTop + doc.offsetHeight + 100) {
      this.isLoading = true;
      this.changedec.markForCheck();
      this._info
        .getLatest(
          this.infos.length > 0
            ? this.infos[this.infos.length - 1].id
            : "f".repeat(24),
          10,
          this.route.snapshot.params
        )
        .subscribe((re: any[]) => {
          this.isLoading = false;
          if (re) {
            re.forEach(tp => {
              this.infos.push(tp);
            });
            this.preloadImg(re);
            window.addEventListener("scroll", this.listenScr);
          } else {
            window.removeEventListener("scroll", this.listenScr);
          }
          this.changedec.markForCheck();
        });
      window.removeEventListener("scroll", this.listenScr);
    }
  };
  getPublisher(index: number) {
    this.snackbar.open(
      clip(this.infos[index].contact_info)
        ? "已复制联系人信息到粘贴板"
        : "获取失败",
      "关闭",
      {
        duration: 2000
      }
    );
    this._info.wanted(this.infos[index].id).subscribe(re => {
      if (re["status"]) {
        this.infos[index].wanted++;
        this.changedec.markForCheck();
      }
    });
  }
  share(index: number) {
    this.snackbar.open(
      clip(
        this.infos[index].info +
          "\n详情点击: " +
          location.href +
          ";id=" +
          this.infos[index].id
      )
        ? "已复制详情到粘贴板"
        : "分享失败",
      "关闭",
      {
        duration: 2000
      }
    );
  }
  openMark(index: number, tpl: TemplateRef<any>) {
    this.passCtrl = new FormControl("", [Validators.required]);
    this.dialog.open(tpl, {
      data: index,
      scrollStrategy: this._overlay.scrollStrategies.noop()
    });
  }
  mark(index: number) {
    this.isSubmitting = true;
    this._info
      .mark({
        id: this.infos[index].id,
        password: this.passCtrl.value
      })
      .subscribe(re => {
        this.isSubmitting = false;
        if (re["status"]) {
          this.infos.splice(index, 1);
          this.changedec.markForCheck();
        }
        this.dialog.closeAll();
      });
  }
  openDetail(tpl: TemplateRef<any>, index: number, ref: any) {
    this.dialog.open(tpl, {
      data: {
        index: index,
        ref: ref
      },
      maxWidth: "100vw",
      panelClass: "diaborder",
      scrollStrategy: this._overlay.scrollStrategies.noop()
    });
  }
  pre(data: any, img: HTMLImageElement) {
    if (data.index !== 0) {
      img.style.setProperty("animation", "slideout 0.3s");
      data.index--;
    }
  }
  next(data: any, img: HTMLImageElement) {
    if (data.index !== data.ref.length - 1) {
      img.style.setProperty("animation", "slidein 0.3s");
      data.index++;
    }
  }
}
