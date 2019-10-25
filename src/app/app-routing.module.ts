import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const routes: Routes = [
  {
    path: "help",
    loadChildren: () => import("./help/help.module").then(mod => mod.HelpModule)
  },
  {
    path: "video",
    loadChildren: () =>
      import("./video/video.module").then(mod => mod.VideoModule)
  },
  { path: "", redirectTo: "help", pathMatch: "full" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
