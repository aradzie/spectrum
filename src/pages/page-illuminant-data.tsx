import { Spacer } from "../components/Spacer.tsx";
import { CIE_std_illum_D50 } from "../data/CIE_std_illum_D50.tsx";
import { CIE_std_illum_D65 } from "../data/CIE_std_illum_D65.tsx";

export default function Page() {
  return (
    <article>
      <h1>CIE Standard Illuminants</h1>
      <p>The following datasets were used to display the charts:</p>
      <ul>
        <li>
          <a href={"https://cie.co.at/datatable/cie-standard-illuminant-d50"}>
            CIE standard illuminant D50
          </a>
        </li>
        <li>
          <a href={"https://cie.co.at/datatable/cie-standard-illuminant-d65"}>
            CIE standard illuminant D65
          </a>
        </li>
      </ul>
      <CIE_std_illum_D50 />
      <Spacer />
      <CIE_std_illum_D65 />
    </article>
  );
}
