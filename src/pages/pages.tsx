import { type ExoticComponent, lazy, type ReactNode } from "react";

const ChromaticityPage = lazy(() => import("./ChromaticityPage.tsx"));
const SpectrumPage = lazy(() => import("./SpectrumPage.tsx"));
const CmfDataPage = lazy(() => import("./CmfDataPage.tsx"));
const IlluminantDataPage = lazy(() => import("./IlluminantDataPage.tsx"));

export type Page = { title: ReactNode; component: ExoticComponent };

export const pages: ReadonlyArray<Readonly<Page>> = [
  { title: "Chromaticity Diagram", component: ChromaticityPage },
  { title: "Spectrum Diagram", component: SpectrumPage },
  { title: "Color Matching Functions Data", component: CmfDataPage },
  { title: "Illuminant Spectrum Data", component: IlluminantDataPage },
];
