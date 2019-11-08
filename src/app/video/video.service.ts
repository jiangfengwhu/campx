import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { END_POINTS, Endpoints } from "../utils/api";

@Injectable({
  providedIn: "root"
})
export class VideoService {
  constructor(
    @Inject(END_POINTS) private ep: Endpoints,
    private http: HttpClient
  ) {}
  getVideo(params: any) {
    let query = this.ep.api + `/series?`;
    for (let key in params) {
      query += `${key}=${params[key]}&`;
    }
    return this.http.get(query);
  }
  getone(id: string) {
    return this.http.get(this.ep.api + "/sone/" + id);
  }
}
