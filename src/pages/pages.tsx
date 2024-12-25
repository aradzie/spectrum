import { type ExoticComponent, lazy, type ReactNode } from "react";

const ChromaticityPage = lazy(() => import("./page-chromaticity.tsx"));
const SpectrumPage = lazy(() => import("./page-spectrums.tsx"));
const CmfDataPage = lazy(() => import("./page-cmf-data.tsx"));
const IlluminantDataPage = lazy(() => import("./page-illuminant-data.tsx"));

export type Page = { title: ReactNode; component: ExoticComponent };

export const pages: ReadonlyArray<Readonly<Page>> = [
  { title: "Chromaticity Diagram", component: ChromaticityPage },
  { title: "Spectrum Diagram", component: SpectrumPage },
  { title: "Color Matching Functions Data", component: CmfDataPage },
  { title: "Illuminant Spectrum Data", component: IlluminantDataPage },
];
