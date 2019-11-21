import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HelpSnComponent } from "./help-sn/help-sn.component";
import { VideoSnComponent } from "./video-sn/video-sn.component";
import { ChatSnComponent } from "./chat-sn/chat-sn.component";

const routes: Routes = [
  { path: "help", component: HelpSnComponent, outlet: "sidenav" },
  { path: "chat", component: ChatSnComponent, outlet: "sidenav" },
  { path: "", component: VideoSnComponent, outlet: "sidenav" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavsRoutingModule {}
