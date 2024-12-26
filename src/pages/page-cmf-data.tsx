import { Spacer } from "../components/Spacer.tsx";
import { CIE_xyz_1931_2deg } from "../data/CIE_xyz_1931_2deg.tsx";
import { CIE_xyz_1931_2deg_RGB } from "../data/CIE_xyz_1931_2deg_RGB.tsx";
import { CIE_xyz_1964_10deg } from "../data/CIE_xyz_1964_10deg.tsx";
import { CIE_xyz_1964_10deg_RGB } from "../data/CIE_xyz_1964_10deg_RGB.tsx";
import { Cmf3D } from "../data/Cmf3D.tsx";

export default function Page() {
  return (
    <article>
      <h1>CIE Color Matching Functions</h1>
      <p>The following datasets were used to display the charts:</p>
      <ul>
        <li>
          <a
            href={
              "https://cie.co.at/datatable/cie-1931-colour-matching-functions-2-degree-observer"
            }
          >
            CIE 1931 colour-matching functions, 2 degree observer
          </a>
        </li>
        <li>
          <a
            href={
              "https://cie.co.at/datatable/cie-1964-colour-matching-functions-10-degree-observer"
            }
          >
            CIE 1964 colour-matching functions, 10 degree observer
          </a>
        </li>
      </ul>
      <Cmf3D />
      <Spacer />
      <CIE_xyz_1931_2deg_RGB />
      <Spacer />
      <CIE_xyz_1931_2deg />
      <Spacer />
      <CIE_xyz_1964_10deg_RGB />
      <Spacer />
      <CIE_xyz_1964_10deg />
    </article>
  );
}
