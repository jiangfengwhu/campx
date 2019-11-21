import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChatRoutingModule } from "./chat-routing.module";
import { TxtchatComponent } from "./txtchat/txtchat.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [TxtchatComponent],
  imports: [CommonModule, SharedModule, ChatRoutingModule]
})
export class ChatModule {}
