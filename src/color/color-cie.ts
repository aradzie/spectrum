import { type Rgb, type Xyz } from "./types.ts";

export function xyzToCieRgb({ x, y, z }: Readonly<Xyz>, to: Rgb): void {
  to.r = 2.36461385 * x + -0.89654057 * y + -0.46807328 * z;
  to.g = -0.51516621 * x + 1.4264081 * y + 0.0887581 * z;
  to.b = 0.0052037 * x + -0.01440816 * y + 1.00920446 * z;
}

export function cieRgbToXyz({ r, g, b }: Readonly<Rgb>, to: Xyz): void {
  to.x = 0.49 * r + 0.31 * g + 0.2 * b;
  to.y = 0.17697 * r + 0.8124 * g + 0.01063 * b;
  to.z = 0 * r + 0.01 * g + 0.99 * b;
}
