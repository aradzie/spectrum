import "./App.css";
import { CIE_std_illum_D50 } from "./data/CIE_std_illum_D50.tsx";
import { CIE_std_illum_D65 } from "./data/CIE_std_illum_D65.tsx";
import { CIE_xyz_1931_2deg } from "./data/CIE_xyz_1931_2deg.tsx";
import { CIE_xyz_1964_10deg } from "./data/CIE_xyz_1964_10deg.tsx";

function App() {
  return (
    <>
      <CIE_xyz_1931_2deg />
      <CIE_xyz_1964_10deg />
      <CIE_std_illum_D50 />
      <CIE_std_illum_D65 />
    </>
  );
}

export { App };
