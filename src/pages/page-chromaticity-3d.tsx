import { Chromaticity3D } from "../chromaticity/Chromaticity3D.tsx";

export default function Page() {
  return (
    <article>
      <h1>Chromaticity Diagram 3D</h1>
      <p>Rendering the chromaticity diagram in three dimensions.</p>
      <Chromaticity3D />
    </article>
  );
}
