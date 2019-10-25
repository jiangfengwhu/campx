import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HelpHomeComponent } from "./help-home/help-home.component";
import { HelpHomeResolverService } from "./help-home-resolver.service";
import { HelpPostComponent } from "./help-post/help-post.component";

const routes: Routes = [
  { path: "post", component: HelpPostComponent },
  {
    path: "",
    component: HelpHomeComponent,
    resolve: { infos: HelpHomeResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule {}
