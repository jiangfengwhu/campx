import {
  Directive,
  Input,
  ElementRef,
  ComponentFactoryResolver,
  ViewContainerRef
} from "@angular/core";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Directive({
  selector: "[cxBtnIndicator]"
})
export class BtnIndicatorDirective {
  @Input() set progress(tmp: any) {
    const ele: HTMLElement = this.eleRef.nativeElement;
    if (tmp) {
      ele.style.display = "none";
      this.createPBar();
    } else {
      this.vcf.clear();
      ele.style.display = "inline-block";
    }
  }
  comFactory = this.comresolver.resolveComponentFactory(MatProgressSpinner);

  constructor(
    private eleRef: ElementRef,
    private comresolver: ComponentFactoryResolver,
    private vcf: ViewContainerRef
  ) {}
  createPBar() {
    console.log("create progress");
    this.vcf.clear();
    const compRef = this.vcf.createComponent(this.comFactory);
    compRef.instance.diameter = 36;
    compRef.instance.mode = "indeterminate";
    compRef.instance.color = "accent";
  }
}
