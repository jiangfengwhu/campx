import { InjectionToken } from "@angular/core";
import { environment } from "src/environments/environment";

export interface Endpoints {
  api: string;
  res: string;
}

export const END_POINTS = new InjectionToken<Endpoints>("end points", {
  providedIn: "root",
  factory: () =>
    environment.production
      ? {
          api: "https://api.campushelp.site/v1",
          res: "https://res.campushelp.site/imgs/"
        }
      : {
          api: "http://localhost:8080/v1",
          res: "http://localhost:8080/public/imgs/"
        }
});
