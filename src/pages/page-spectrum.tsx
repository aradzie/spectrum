import { Spectrum } from "../spectrum/Spectrum.tsx";

export default function Page() {
  return (
    <article>
      <h1>Spectrum Diagram</h1>
      <p>
        Approximating the physically accurate spectrum as closely as possible using the sRGB gamut.
      </p>
      <Spectrum />
    </article>
  );
}
