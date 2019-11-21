import { Component, OnInit } from "@angular/core";
import { ChatService } from "../chat.service";
import { getOrientation } from "src/app/utils/imgori";

@Component({
  selector: "cx-txtchat",
  templateUrl: "./txtchat.component.html",
  styleUrls: ["./txtchat.component.scss"]
})
export class TxtchatComponent implements OnInit {
  imgitems = [];
  constructor(public chat: ChatService) {}
  send(msg: HTMLTextAreaElement) {
    this.chat.send(msg.value);
    msg.value = "";
  }
  keyb(e) {
    if (e.ctrlKey && e.key == "Enter") {
      this.send(e.target);
    }
  }
  ngOnInit() {}
  scr(cb) {
    cb.scrollTop = cb.scrollHeight;
  }
  action(room: boolean) {
    if (this.chat.room && this.chat.room.isMatched) {
      this.chat.leave();
    } else {
      this.chat.join(room);
    }
  }
  addFiles(file: FileList) {
    for (let i = 0; i < file.length; i++) {
      if (file[i].type == "image/gif") {
        const reader = new FileReader();
        reader.onload = () => {
          this.chat.send(<string>reader.result, "img");
        };
        reader.readAsDataURL(file[i]);
        continue;
      }
      getOrientation(file[i], ori => {
        const image = new Image();
        image.src = URL.createObjectURL(file[i]);
        image.onload = () => {
          URL.revokeObjectURL(image.src);
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          let width = image.width;
          let height = image.height;
          let scale = 1.0;
          const maxer = Math.max(width, height);
          if (maxer > 640) {
            scale = 640 / maxer;
            width = scale * width;
            height = scale * height;
          }
          if (4 < ori && ori < 9) {
            canvas.width = height;
            canvas.height = width;
          } else {
            canvas.width = width;
            canvas.height = height;
          }
          // transform context before drawing image
          switch (ori) {
            case 2:
              ctx.transform(-1, 0, 0, 1, width, 0);
              break;
            case 3:
              ctx.transform(-1, 0, 0, -1, width, height);
              break;
            case 4:
              ctx.transform(1, 0, 0, -1, 0, height);
              break;
            case 5:
              ctx.transform(0, 1, 1, 0, 0, 0);
              break;
            case 6:
              ctx.transform(0, 1, -1, 0, height, 0);
              break;
            case 7:
              ctx.transform(0, -1, -1, 0, height, width);
              break;
            case 8:
              ctx.transform(0, -1, 1, 0, 0, width);
              break;
            default:
              break;
          }
          ctx.scale(scale, scale);
          ctx.drawImage(image, 0, 0);
          this.chat.send(canvas.toDataURL("image/jpeg"), "img");
        };
      });
    }
  }
}
