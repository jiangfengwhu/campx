import { Injectable, Inject } from "@angular/core";
import { END_POINTS, Endpoints } from "../utils/api";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HelpService {
  constructor(
    @Inject(END_POINTS) private ep: Endpoints,
    private http: HttpClient
  ) {}

  addItem(data: FormData) {
    return this.http.post(this.ep.api + "/additem", data);
  }

  getLatest(fi: string, size: number, extra?: any) {
    let query = this.ep.api + `/latest?fi=${fi}&size=${size}`;
    for (let key in extra) {
      if (key == "id") {
        query = this.ep.api + "/one/" + extra[key];
        break;
      }
      query += `&${key}=${extra[key]}`;
    }
    return this.http.get(query);
  }
  mark(data: any) {
    return this.http.put(this.ep.api + "/mark", data);
  }
  wanted(id: string) {
    return this.http.put(this.ep.api + "/want", { id: id });
  }
  checknew(fi: string, extra?: any) {
    let query = this.ep.api + `/anynew?fi=${fi}`;
    for (let key in extra) {
      query += `&${key}=${extra[key]}`;
    }
    return this.http.get(query);
  }
}
