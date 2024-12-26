import { Chromaticity } from "../chromaticity/Chromaticity.tsx";

export default function Page() {
  return (
    <article>
      <h1>Chromaticity Diagram</h1>
      <p>Rendering the chromaticity diagram from the CIE XYZ data.</p>
      <Chromaticity />
    </article>
  );
}
