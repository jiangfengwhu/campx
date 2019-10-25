import { Component, OnInit, Inject } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { CAMPUS_NAME } from "src/app/utils/capdata";
import { LayoutService } from "src/app/layout.service";
import { Router } from "@angular/router";

@Component({
  selector: "cx-help-sn",
  templateUrl: "./help-sn.component.html",
  styleUrls: ["./help-sn.component.scss"]
})
export class HelpSnComponent implements OnInit {
  campCtrl = new FormControl();
  filtered$: Observable<string[]>;

  constructor(
    @Inject(CAMPUS_NAME) private camps: string[],
    public layout: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
    this.filtered$ = this.campCtrl.valueChanges.pipe(
      startWith(""),
      map(camp => (camp ? this._filterStates(camp) : this.camps.slice()))
    );
  }
  private _filterStates(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.camps.filter(camp => camp.toLowerCase().includes(filterValue));
  }
  setRegion(val: any) {
    const query = { ...this.layout.params };
    query["region"] = val;
    if (val == "") {
      delete query["region"];
    }
    this.router.navigate([query]);
    this.campCtrl.setValue("");
  }
}
