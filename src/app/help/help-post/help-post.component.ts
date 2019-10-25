import { Component, OnInit, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CAMPUS_NAME } from "src/app/utils/capdata";
import { HelpService } from "../help.service";
import { Router } from "@angular/router";
import { startWith, map } from "rxjs/operators";
import { forbiddenNameValidator } from "src/app/utils/camp-validator";
import { b64toBlob } from "src/app/utils/b64to-blob";

@Component({
  selector: "cx-help-post",
  templateUrl: "./help-post.component.html",
  styleUrls: ["./help-post.component.scss"]
})
export class HelpPostComponent implements OnInit {
  imgItems = [];
  isSubmitting = false;
  hide = true;
  filtered$: Observable<string[]>;
  postForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    @Inject(CAMPUS_NAME) private camps: string[],
    private _info: HelpService,
    private router: Router
  ) {
    this.createForm();
    this.filtered$ = this.postForm.get("camp").valueChanges.pipe(
      startWith(""),
      map(camp => (camp ? this._filterStates(camp) : this.camps.slice()))
    );
  }
  private _filterStates(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.camps.filter(camp => camp.toLowerCase().includes(filterValue));
  }
  ngOnInit() {}

  createForm() {
    this.postForm = this.fb.group({
      info: ["", Validators.required],
      password: ["", Validators.required],
      contact_info: ["", Validators.required],
      camp: ["", [Validators.required, forbiddenNameValidator(this.camps)]]
    });
  }

  submit() {
    this.isSubmitting = true;
    const form = new FormData();
    this.imgItems.forEach(el => {
      el.msg = "上传中";
      el.deletable = false;
      form.append("imgs_up", b64toBlob(el.body));
      form.append("thbs", b64toBlob(el.url));
    });
    for (let i in this.postForm.value) {
      form.append(i, this.postForm.value[i]);
    }
    this._info.addItem(form).subscribe(re => {
      this.isSubmitting = false;
      if (re["status"]) {
        this.router.navigate(["/help"]);
      }
    });
  }
}
