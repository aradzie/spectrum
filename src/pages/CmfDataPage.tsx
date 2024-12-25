import { Spacer } from "../components/Spacer.js";
import { CIE_xyz_1931_2deg } from "../data/CIE_xyz_1931_2deg.tsx";
import { CIE_xyz_1931_2deg_RGB } from "../data/CIE_xyz_1931_2deg_RGB.tsx";
import { CIE_xyz_1964_10deg } from "../data/CIE_xyz_1964_10deg.tsx";
import { CIE_xyz_1964_10deg_RGB } from "../data/CIE_xyz_1964_10deg_RGB.tsx";

export default function Page() {
  return (
    <>
      <CIE_xyz_1931_2deg_RGB />
      <Spacer />
      <CIE_xyz_1931_2deg />
      <Spacer />
      <CIE_xyz_1964_10deg_RGB />
      <Spacer />
      <CIE_xyz_1964_10deg />
    </>
  );
}
