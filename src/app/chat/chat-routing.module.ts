import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TxtchatComponent } from "./txtchat/txtchat.component";

const routes: Routes = [{ path: "", component: TxtchatComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule {}
