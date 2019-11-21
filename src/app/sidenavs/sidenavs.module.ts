import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SidenavsRoutingModule } from "./sidenavs-routing.module";
import { HelpSnComponent } from "./help-sn/help-sn.component";
import { VideoSnComponent } from "./video-sn/video-sn.component";
import { SharedModule } from "../shared/shared.module";
import { ChatSnComponent } from './chat-sn/chat-sn.component';

@NgModule({
  declarations: [HelpSnComponent, VideoSnComponent, ChatSnComponent],
  imports: [CommonModule, SharedModule, SidenavsRoutingModule]
})
export class SidenavsModule {}
