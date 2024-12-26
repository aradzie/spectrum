import { NavLink } from "react-router";

export function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Chromaticity Diagram</NavLink>
        </li>
        <li>
          <NavLink to="/spectrum">Spectrum Diagram</NavLink>
        </li>
        <li>
          <NavLink to="/cmf">Color Matching Functions</NavLink>
        </li>
        <li>
          <NavLink to="/illuminant">Illuminant Spectra</NavLink>
        </li>
      </ul>
    </nav>
  );
}
