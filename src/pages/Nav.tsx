import { NavLink } from "react-router";
import * as styles from "./Nav.module.css";
import { paths } from "./pages.tsx";

export function Nav() {
  return (
    <nav className={styles.root}>
      <ul className={styles.menu}>
        {Object.entries(paths).map(([path, title]) => {
          return (
            <li key={path}>
              <NavLink to={path} className={styles.link}>
                {title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
