import { xyzToRgb } from "../color/color-rgb.ts";
import { type Rgb, type Xyz } from "../color/types.ts";
import dataXyz from "../data/CIE_xyz_1931_2deg.csv.ts";

const dataRgb = (() => {
  const xyz: Xyz = { x: 0, y: 0, z: 0 };
  const rgb: Rgb = { r: 0, g: 0, b: 0 };
  return dataXyz.map(([lambda, x, y, z]) => {
    xyz.x = x;
    xyz.y = y;
    xyz.z = z;
    xyzToRgb(xyz, rgb);
    const { r, g, b } = rgb;
    return [lambda, r, g, b];
  });
})();

export { dataRgb, dataXyz };
