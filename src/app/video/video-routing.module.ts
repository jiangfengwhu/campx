import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VideoHomeComponent } from "./video-home/video-home.component";
import { VideoHomeResolverService } from "./video-home-resolver.service";
import { VideoDetailComponent } from "./video-detail/video-detail.component";
import { VideoDetailResolverService } from "./video-detail-resolver.service";

const routes: Routes = [
  {
    path: ":id",
    component: VideoDetailComponent,
    resolve: { video: VideoDetailResolverService }
  },
  {
    path: "",
    component: VideoHomeComponent,
    resolve: { videos: VideoHomeResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule {}
