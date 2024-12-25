import { type Rgb, type Xyz } from "./types.ts";

const tmpRgb: Rgb = { r: 0, g: 0, b: 0 };

const toLinear = (channel: number) =>
  channel <= 0.04045 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);

const toGamma = (channel: number) =>
  channel <= 0.0031308 ? 12.92 * channel : 1.055 * Math.pow(channel, 1 / 2.4) - 0.055;

/**
 * Converts a gamma corrected sRGB color to a linear light form.
 */
export function rgbGammaToLinear({ r, g, b }: Readonly<Rgb>, to: Rgb): void {
  to.r = toLinear(r);
  to.g = toLinear(g);
  to.b = toLinear(b);
}

/**
 * Converts a linear-light sRGB color to a gamma corrected form.
 */
export function rgbLinearToGamma({ r, g, b }: Readonly<Rgb>, to: Rgb): void {
  to.r = toGamma(r);
  to.g = toGamma(g);
  to.b = toGamma(b);
}

/**
 * Converts a linear-light sRGB color to a CIE XYZ color using D65
 * (no chromatic adaptation).
 */
export function linearRgbToXyz({ r, g, b }: Readonly<Rgb>, to: Xyz): void {
  to.x = 0.4123907992659595 * r + 0.35758433938387796 * g + 0.1804807884018343 * b;
  to.y = 0.21263900587151036 * r + 0.7151686787677559 * g + 0.07219231536073371 * b;
  to.z = 0.01933081871559185 * r + 0.11919477979462599 * g + 0.9505321522496606 * b;
}

/**
 * Converts a CIE XYZ color to a linear light sRGB color using D65
 * (no chromatic adaptation).
 */
export function xyzToLinearRgb({ x, y, z }: Readonly<Xyz>, to: Rgb): void {
  to.r = 3.2409699419045213 * x + -1.5373831775700935 * y + -0.4986107602930033 * z;
  to.g = -0.9692436362808798 * x + 1.8759675015077206 * y + 0.04155505740717561 * z;
  to.b = 0.05563007969699361 * x + -0.20397695888897657 * y + 1.0569715142428786 * z;
}

export function rgbToXyz(rgb: Readonly<Rgb>, to: Xyz): void {
  rgbGammaToLinear(rgb, tmpRgb);
  linearRgbToXyz(tmpRgb, to);
}

export function xyzToRgb(xyz: Readonly<Xyz>, to: Rgb): void {
  xyzToLinearRgb(xyz, tmpRgb);
  rgbLinearToGamma(tmpRgb, to);
}
