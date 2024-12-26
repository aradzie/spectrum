import { Spacer } from "../components/Spacer.tsx";
import { CIE_std_illum_D50 } from "../data/CIE_std_illum_D50.tsx";
import { CIE_std_illum_D65 } from "../data/CIE_std_illum_D65.tsx";

export default function Page() {
  return (
    <>
      <CIE_std_illum_D50 />
      <Spacer />
      <CIE_std_illum_D65 />
    </>
  );
}
