import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { VideoRoutingModule } from "./video-routing.module";
import { VideoHomeComponent } from "./video-home/video-home.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [VideoHomeComponent],
  imports: [CommonModule, SharedModule, VideoRoutingModule]
})
export class VideoModule {}
