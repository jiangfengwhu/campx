import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cdate"
})
export class CdatePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const tmp = new Date(value);
    let re =
      tmp.getFullYear() +
      "-" +
      (tmp.getMonth() + 1) +
      "-" +
      tmp.getDate() +
      ", ";
    switch (tmp.getDay()) {
      case 0:
        re += "周日";
        break;
      case 1:
        re += "周一";
        break;
      case 2:
        re += "周二";
        break;
      case 3:
        re += "周三";
        break;
      case 4:
        re += "周四";
        break;
      case 5:
        re += "周五";
        break;
      case 6:
        re += "周六";
    }
    return re;
  }
}
