import { Injectable, Inject } from "@angular/core";
import { END_POINTS, Endpoints } from "../utils/api";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  id = null;
  roomid: any;
  gender = false;
  room: any;
  constructor(
    @Inject(END_POINTS) private ep: Endpoints,
    private snackbar: MatSnackBar
  ) {}
  leave() {
    this.room.info = "您已断开连接";
    this.room.isMatched = false;
    this.room.conn.close(3888);
    this.roomid = null;
  }

  send(msg: string, header = "text") {
    const mgs = {
      header: header,
      body: msg,
      mid: this.room.msgs.length
    };
    this.room.msgs.push({ ...mgs, from: this.id, status: false });
    this.room.conn.send(JSON.stringify(mgs));
  }
  notify(cont: string) {
    if (location.href.indexOf("chat") == -1) {
      this.snackbar.open(cont, "知道了", {
        duration: 2000
      });
    }
  }
  join(gender: boolean) {
    this.gender = gender;
    this.room = {
      conn: new WebSocket(this.ep.ws + "/v1/anochat?gender=" + gender),
      msgs: [],
      isMatching: true,
      isMatched: false
    };
    this.addListener(this.room);
  }
  addListener(room: {
    conn: WebSocket;
    msgs: any[];
    info?: any;
    isMatching: boolean;
    isMatched: boolean;
  }) {
    room.conn.onclose = evt => {
      switch (evt.code) {
        case 3888:
          break;
        default:
          setTimeout(() => {
            room.conn = new WebSocket(
              this.roomid
                ? `${this.ep.ws}/v1/anochat?gender=${this.gender}&room=${this.roomid}`
                : `${this.ep.ws}/v1/anochat?gender=${this.gender}`
            );
            this.addListener(room);
          }, 1000);
      }
    };
    room.conn.onopen = () => {
      room.info = "正在匹配，请稍等...";
    };
    room.conn.onmessage = evt => {
      const msg = JSON.parse(evt.data);
      switch (msg.header) {
        case "conn":
          this.id = !msg.from;
          room.isMatched = true;
          room.isMatching = false;
          let nmsg = "你匹配到了一位" + (msg.gender ? "小姐姐" : "小哥哥");
          if (msg.room == this.roomid) {
            nmsg = "你的" + (msg.gender ? "小姐姐" : "小哥哥") + "又回来了";
          } else {
            room.msgs = [];
          }
          room.info = nmsg;
          this.notify(nmsg);
          this.roomid = msg.room;
          break;
        case "close":
          room.info = "对方掉线，可以等待重连或者离开";
          this.notify("对方掉线");
          break;
        case "leave":
          room.info = "对方已离开, 请重新匹配";
          this.room.isMatched = false;
          this.room.conn.close(3888);
          this.roomid = null;
          this.notify("对方已离开");
          break;
        case "done":
          room.msgs[msg.mid].status = true;
          break;
        default:
          room.msgs.push(msg);
          this.notify("收到一条新消息");
      }
    };
  }
}
