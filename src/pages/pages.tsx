import { lazy } from "react";
import { Route, Routes } from "react-router";

const ChromaticityPage = lazy(() => import("./page-chromaticity.tsx"));
const Chromaticity3DPage = lazy(() => import("./page-chromaticity-3d.tsx"));
const SpectrumPage = lazy(() => import("./page-spectrum.tsx"));
const CmfDataPage = lazy(() => import("./page-cmf-data.tsx"));
const IlluminantDataPage = lazy(() => import("./page-illuminant-data.tsx"));
const AboutPage = lazy(() => import("./page-about.tsx"));

export const paths: Record<string, string> = {
  "/": "Chromaticity Diagram",
  "/chromaticity3d": "Chromaticity Diagram 3D",
  "/spectrum": "Spectrum Diagram",
  "/cmf": "Color Matching Functions",
  "/illuminant": "Illuminant Spectra",
  "/about": "About",
} as const;

export function PageRoutes() {
  return (
    <Routes>
      <Route path={"/"} index element={<ChromaticityPage />} />
      <Route path={"/chromaticity3d"} index element={<Chromaticity3DPage />} />
      <Route path={"/spectrum"} element={<SpectrumPage />} />
      <Route path={"/cmf"} element={<CmfDataPage />} />
      <Route path={"/illuminant"} element={<IlluminantDataPage />} />
      <Route path={"/about"} element={<AboutPage />} />
    </Routes>
  );
}
