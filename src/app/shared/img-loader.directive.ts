import {
  Directive,
  Input,
  ElementRef,
  ComponentFactoryResolver,
  ViewContainerRef
} from "@angular/core";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Directive({
  selector: "[cxImgLoader]"
})
export class ImgLoaderDirective {
  img: HTMLImageElement;
  container: HTMLElement;
  @Input() set src(tp: string) {
    this.img.style.display = "none";
    this.img.src = tp;
    this.createPBar();
  }
  comFactory = this.comresolver.resolveComponentFactory(MatProgressSpinner);

  constructor(
    private eleRef: ElementRef,
    private comresolver: ComponentFactoryResolver,
    private vcf: ViewContainerRef
  ) {
    this.container = <HTMLElement>(
      document.getElementsByClassName("mat-dialog-container")[0]
    );
    const shadow = this.container.style.boxShadow;
    const bkg = this.container.style.background;
    this.img = this.eleRef.nativeElement;
    this.img.onload = () => {
      this.vcf.clear();
      this.container.style.boxShadow = shadow;
      this.container.style.background = bkg;
      this.img.style.display = "block";
    };
  }
  createPBar() {
    this.container.style.boxShadow = "none";
    this.vcf.clear();
    const compRef = this.vcf.createComponent(this.comFactory);
    compRef.instance.diameter = 36;
    compRef.instance.mode = "indeterminate";
    compRef.instance.color = "warn";
    const ele = <HTMLElement>compRef.instance._elementRef.nativeElement;
    ele.style.position = "fixed";
    ele.style.left = "calc(50vw - 18px)";
  }
}
