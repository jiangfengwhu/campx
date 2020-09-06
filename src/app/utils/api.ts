import { InjectionToken } from "@angular/core";
import { environment } from "src/environments/environment";

export interface Endpoints {
  api: string;
  res: string;
  ws: string;
}

export const END_POINTS = new InjectionToken<Endpoints>("end points", {
  providedIn: "root",
  factory: () =>
    environment.production
      ? {
          api: "https://api.campx.cc/v1",
          res: "https://res.campx.cc",
          ws: "wss://ws.campx.cc"
        }
      : {
          api: "http://localhost:8080/v1",
          res: "http://localhost:8080/public",
          ws: "ws://localhost:8080"
        }
});
