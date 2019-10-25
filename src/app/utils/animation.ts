import {
  trigger,
  transition,
  query,
  style,
  animate,
  animateChild,
  group
} from "@angular/animations";

export const fadeAnimation = trigger("fadeAnimation", [
  transition("* => *", [
    style({ position: "relative" }),
    query(
      ":enter, :leave",
      [
        style({
          position: "absolute",
          width: "100%"
        })
      ],
      { optional: true }
    ),
    query(":enter", [style({ opacity: 0 })], { optional: true }),
    query(
      ":leave",
      [style({ opacity: 1 }), animate("0.3s", style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ":enter",
      [style({ opacity: 0 }), animate("0.3s", style({ opacity: 1 }))],
      { optional: true }
    )
  ])
]);
export const slideInAnimation = trigger("slideInAnimation", [
  transition("* <=> *", [
    style({ position: "relative" }),
    query(
      ":enter, :leave",
      [
        style({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%"
        })
      ],
      { optional: true }
    ),
    query(":enter", [style({ left: "-100%" })], { optional: true }),
    query(":leave", animateChild(), { optional: true }),
    group([
      query(":leave", [animate("300ms ease-out", style({ left: "100%" }))], {
        optional: true
      }),
      query(":enter", [animate("300ms ease-out", style({ left: "0%" }))], {
        optional: true
      })
    ]),
    query(":enter", animateChild(), { optional: true })
  ])
]);
