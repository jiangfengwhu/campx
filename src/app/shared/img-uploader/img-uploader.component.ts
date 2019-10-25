import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { CdkDragDrop, CdkDragEnter } from "@angular/cdk/drag-drop";
import { getOrientation } from "src/app/utils/imgori";
import * as smartcrop from "smartcrop";

@Component({
  selector: "cx-img-uploader",
  templateUrl: "./img-uploader.component.html",
  styleUrls: ["./img-uploader.component.scss"]
})
export class ImgUploaderComponent implements OnInit {
  @ViewChild("infile", { static: false }) infile: ElementRef;
  @Input() imgItems: any[];
  constructor() {}

  ngOnInit() {}
  handleDrop(e: CdkDragDrop<any>) {
    [this.imgItems[e.container.data], this.imgItems[e.item.data]] = [
      this.imgItems[e.item.data],
      this.imgItems[e.container.data]
    ];
    const delele = e.item.dropContainer.element.nativeElement;
    if (delele.childNodes.length > 2) {
      delele.removeChild(delele.firstChild);
    }
  }
  handleEnter(e: CdkDragEnter<any>) {
    const sender = e.item.dropContainer.element.nativeElement;
    const placeholder = e.container.element.nativeElement;
    if (sender.children.length > 1) {
      sender.firstChild.replaceWith(placeholder.childNodes[1].cloneNode());
    } else {
      sender.insertBefore(
        placeholder.childNodes[1].cloneNode(),
        sender.lastChild
      );
    }
  }
  addFiles(file: FileList) {
    for (let i = 0; i < file.length; i++) {
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
          if (maxer > 1280) {
            scale = 1280 / maxer;
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
          const size = Math.min(width, height);
          smartcrop.crop(canvas, { width: size, height: size }).then(re => {
            const subcanvas = document.createElement("canvas");
            const subctx = subcanvas.getContext("2d");
            subcanvas.width = 300;
            subcanvas.height = 300;
            subctx.drawImage(
              canvas,
              re.topCrop.x,
              re.topCrop.y,
              re.topCrop.width,
              re.topCrop.height,
              0,
              0,
              subcanvas.width,
              subcanvas.height
            );
            this.imgItems.push({
              url: subcanvas.toDataURL("image/jpeg"),
              body: canvas.toDataURL("image/jpeg"),
              deletable: true,
              msg: "等待"
            });
          });
        };
      });
    }
  }
  delete(index: number) {
    this.imgItems.splice(index, 1);
  }
}
