import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HelpSnComponent } from "./help-sn/help-sn.component";
import { VideoSnComponent } from "./video-sn/video-sn.component";

const routes: Routes = [
  { path: "video", component: VideoSnComponent, outlet: "sidenav" },
  { path: "", component: HelpSnComponent, outlet: "sidenav" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavsRoutingModule {}
