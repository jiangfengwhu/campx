import {
  Directive,
  Input,
  OnDestroy,
  ElementRef,
  Inject,
  ChangeDetectorRef
} from "@angular/core";
import * as Hls from "hls.js";
import { END_POINTS, Endpoints } from "../utils/api";
declare var p2pml: any;

@Directive({
  selector: "[cxP2pVideo]",
  exportAs: "p2pHls"
})
export class P2pVideoDirective implements OnDestroy {
  @Input() set src(tmp: string) {
    if (this.isNative) {
      this.videoele.pause();
      this.videoele.src = tmp;
    } else {
      if (this.hls) {
        this.hls.detachMedia();
        this.hls.destroy();
        this.engine.destroy();
        this.initP2P();
        this.hls.loadSource(tmp);
        this.hls.attachMedia(this.videoele);
      } else {
        this.initP2P();
        this.hls.loadSource(tmp);
        this.hls.attachMedia(this.videoele);
      }
    }
  }
  videoele: HTMLVideoElement;
  hls: Hls;
  isNative: boolean;
  numPeers = 1;
  uploaded = 0;
  engine: any;
  constructor(
    private eleref: ElementRef,
    private dec: ChangeDetectorRef,
    @Inject(END_POINTS) private ep: Endpoints
  ) {
    this.videoele = this.eleref.nativeElement;
    if (Hls.isSupported()) {
      this.isNative = false;
    } else {
      this.isNative = true;
    }
  }
  ngOnDestroy() {
    if (this.isNative) {
      this.videoele.pause();
      this.videoele.src = "";
    } else {
      this.hls.detachMedia();
      this.hls.destroy();
      this.engine.destroy();
    }
  }
  initP2P() {
    this.engine = new p2pml.hlsjs.Engine({
      loader: {
        requiredSegmentsPriority: 9,
        trackerAnnounce: [this.ep.ws + "/tr"],
        rtcConfig: {
          iceServers: [
            {
              urls: "stun:94.199.101.152:3478"
            }
          ]
        }
      }
    });
    this.hls = new Hls({
      liveSyncDurationCount: 10,
      maxBufferLength: 300,
      loader: this.engine.createLoaderClass()
    });
    p2pml.hlsjs.initHlsJsPlayer(this.hls);
    this.engine.on(p2pml.core.Events.PeerConnect, peer => {
      ++this.numPeers;
      this.dec.markForCheck();
    });
    this.engine.on(p2pml.core.Events.PeerClose, peer => {
      --this.numPeers;
      this.dec.markForCheck();
    });
    this.engine.on(
      p2pml.core.Events.PieceBytesUploaded,
      (method, bytes, peerId) => {
        this.uploaded += bytes;
        this.dec.markForCheck();
      }
    );
  }
}
