import { lazy } from "react";
import { Route, Routes } from "react-router";

const ChromaticityPage = lazy(() => import("./page-chromaticity.tsx"));
const SpectrumPage = lazy(() => import("./page-spectrum.tsx"));
const CmfDataPage = lazy(() => import("./page-cmf-data.tsx"));
const IlluminantDataPage = lazy(() => import("./page-illuminant-data.tsx"));

export function PageRoutes() {
  return (
    <Routes>
      <Route path={"/"} index element={<ChromaticityPage />} />
      <Route path={"/spectrum"} element={<SpectrumPage />} />
      <Route path={"/cmf"} element={<CmfDataPage />} />
      <Route path={"/illuminant"} element={<IlluminantDataPage />} />
    </Routes>
  );
}
