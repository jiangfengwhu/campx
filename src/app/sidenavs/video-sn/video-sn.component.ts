import { Component, OnInit } from "@angular/core";
import { LayoutService } from "src/app/layout.service";

@Component({
  selector: "cx-video-sn",
  templateUrl: "./video-sn.component.html",
  styleUrls: ["./video-sn.component.scss"]
})
export class VideoSnComponent implements OnInit {
  navs = [
    {
      header: "追剧",
      cat: [
        { name: "日剧", path: ["/video", { region: "日剧" }] },
        { name: "美剧", path: ["/video", { region: "美剧" }] },
        { name: "英剧", path: ["/video", { region: "英剧" }] },
        { name: "韩剧", path: ["/video", { region: "韩剧" }] },
        { name: "电影", path: ["/video", { region: "电影" }] }
      ]
    },
    {
      header: "国外搬运",
      cat: [
        { name: "YouTube", path: ["/video", { region: "youtube" }] },
        { name: "Instagram", path: ["/video", { region: "ins" }] }
      ]
    },
    {
      header: "公开课",
      cat: [
        { name: "自然科学", path: ["/video", { region: "自然" }] },
        { name: "计算机", path: ["/video", { region: "计算机" }] },
        { name: "人工智能", path: ["/video", { region: "AI" }] },
        { name: "人文科学", path: ["/video", { region: "人文" }] },
        { name: "经济", path: ["/video", { region: "经济" }] }
      ]
    }
  ];
  constructor(public layout: LayoutService) {}

  ngOnInit() {}
}
