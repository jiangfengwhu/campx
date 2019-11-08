import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from "@angular/core";
import { END_POINTS, Endpoints } from "src/app/utils/api";
import { ActivatedRoute } from "@angular/router";
import { LayoutService } from "src/app/layout.service";
@Component({
  selector: "cx-video-detail",
  templateUrl: "./video-detail.component.html",
  styleUrls: ["./video-detail.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VideoDetailComponent implements OnInit {
  video: any;
  deft: any;
  constructor(
    @Inject(END_POINTS) public ep: Endpoints,
    public route: ActivatedRoute,
    public layout: LayoutService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      let tmp = [];
      const proc = el => {
        const len = data["video"].videos[el];
        tmp = Array.from({ length: len || 1 }, (v, k) => el + (len - k)).concat(
          tmp
        );
      };
      Object.keys(data["video"].videos)
        .filter(el => {
          if (el.match(/\d+/g) == null) {
            proc(el);
            return false;
          }
          return true;
        })
        .sort((a, b) => <any>a.match(/\d+/g)[0] - <any>b.match(/\d+/g)[0])
        .forEach(el => {
          proc(el);
        });
      data["video"].videos = tmp;
      this.deft = tmp[0];
      this.video = data["video"];
    });
  }
}
