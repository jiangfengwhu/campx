import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HelpRoutingModule } from "./help-routing.module";
import { HelpHomeComponent } from "./help-home/help-home.component";
import { HelpPostComponent } from "./help-post/help-post.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [HelpHomeComponent, HelpPostComponent],
  imports: [CommonModule, SharedModule, HelpRoutingModule]
})
export class HelpModule {}
