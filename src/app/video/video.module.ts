import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { VideoRoutingModule } from "./video-routing.module";
import { VideoHomeComponent } from "./video-home/video-home.component";
import { SharedModule } from "../shared/shared.module";
import { VideoDetailComponent } from "./video-detail/video-detail.component";

@NgModule({
  declarations: [VideoHomeComponent, VideoDetailComponent],
  imports: [CommonModule, SharedModule, VideoRoutingModule]
})
export class VideoModule {}
