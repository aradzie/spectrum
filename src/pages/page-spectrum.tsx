import { SpectrumDiagram } from "../spectrum/SpectrumDiagram.tsx";

export default function Page() {
  return (
    <article>
      <h1>Spectrum Diagram</h1>
      <p>
        Approximating the physically accurate spectrum as closely as possible using the sRGB gamut.
      </p>
      <p>
        For more information see{" "}
        <a href={"https://aty.sdsu.edu/explain/optics/rendering.html"}>Rendering Spectra</a> by
        Andrew T. Young.
      </p>
      <SpectrumDiagram />
    </article>
  );
}
