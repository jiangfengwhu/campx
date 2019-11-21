import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutModule } from "@angular/cdk/layout";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatRippleModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {
  MatProgressSpinnerModule,
  MatProgressSpinner
} from "@angular/material/progress-spinner";
import { BtnIndicatorDirective } from "./btn-indicator.directive";
import { ImgLoaderDirective } from "./img-loader.directive";
import { ReactiveFormsModule } from "@angular/forms";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ImgUploaderComponent } from "./img-uploader/img-uploader.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { SanitizePipe } from "./sanitize.pipe";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import { P2pVideoDirective } from "./p2p-video.directive";
import { BytesPipe } from "./bytes.pipe";
import { CdatePipe } from "./cdate.pipe";
import { MatRadioModule } from "@angular/material/radio";

@NgModule({
  declarations: [
    BtnIndicatorDirective,
    ImgLoaderDirective,
    ImgUploaderComponent,
    SanitizePipe,
    P2pVideoDirective,
    BytesPipe,
    CdatePipe
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule
  ],
  entryComponents: [MatProgressSpinner],
  exports: [
    LayoutModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    ImgLoaderDirective,
    BtnIndicatorDirective,
    DragDropModule,
    ImgUploaderComponent,
    MatAutocompleteModule,
    ScrollingModule,
    MatSelectModule,
    MatListModule,
    MatExpansionModule,
    SanitizePipe,
    P2pVideoDirective,
    BytesPipe,
    CdatePipe,
    MatRadioModule
  ]
})
export class SharedModule {}
