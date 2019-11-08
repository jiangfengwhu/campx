import { Component, OnInit } from "@angular/core";
import { fadeAnimation, slideInAnimation } from "./utils/animation";
import { LayoutService } from "./layout.service";
import {
  Router,
  RouterEvent,
  NavigationStart,
  NavigationError,
  NavigationCancel,
  NavigationEnd
} from "@angular/router";
import { SwUpdate } from "@angular/service-worker";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "cx-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [fadeAnimation, slideInAnimation]
})
export class AppComponent implements OnInit {
  isRouting = false;
  loc: any;
  navs = [
    {
      name: "校园帮",
      link: { outlets: { primary: "help", sidenav: ["help"] } }
    },
    {
      name: "放映屋",
      link: { outlets: { primary: "video", sidenav: null } }
    }
  ];
  constructor(
    public layout: LayoutService,
    private router: Router,
    private update: SwUpdate,
    private snack: MatSnackBar
  ) {}
  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      switch (event.constructor) {
        case NavigationStart:
          this.isRouting = true;
          break;
        case NavigationError:
        case NavigationCancel:
        case NavigationEnd:
          this.loc = this.navs.find(el => {
            if (
              event["urlAfterRedirects"]
                .split("/")[1]
                .includes(el.link.outlets.primary)
            ) {
              return el;
            }
          });
          this.isRouting = false;
          break;
      }
    });
    this.update.available.subscribe(evt => {
      this.snack.open("发现新版本, 请刷新获取", "关闭");
    });
  }
  search(inp: HTMLInputElement) {
    inp.blur();
    const query = { ...this.layout.params };
    query["search"] = inp.value;
    if (inp.value == "") {
      delete query["search"];
    }
    this.router.navigate([query]);
  }
}
