import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { END_POINTS, Endpoints } from "src/app/utils/api";
import { LayoutService } from "src/app/layout.service";
import { KeyValue } from "@angular/common";

@Component({
  selector: "cx-video-home",
  templateUrl: "./video-home.component.html",
  styleUrls: ["./video-home.component.scss"]
})
export class VideoHomeComponent implements OnInit {
  header = "近期";
  groupBy = "region";
  datasets: any;
  constructor(
    private route: ActivatedRoute,
    @Inject(END_POINTS) public ep: Endpoints,
    public layout: LayoutService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(re => {
      if (re.region) {
        this.groupBy = "year";
        this.header = re.region;
      } else {
        this.header = "近期";
        this.groupBy = "region";
      }
    });
    this.route.data.subscribe(data => {
      this.datasets = data["videos"]
        .sort((a, b) => b.last - a.last)
        .reduce((re, el) => {
          (re[el[this.groupBy]] = re[el[this.groupBy]] || []).push(el);
          return re;
        }, {});
    });
  }
  numberedKeyOrder(a: KeyValue<string, any>, b: KeyValue<string, any>): number {
    return a.key < b.key ? 1 : b.key < a.key ? -1 : 0;
  }
}
