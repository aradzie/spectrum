import "./App.module.css";
import { HashRouter } from "react-router";
import * as styles from "./App.module.css";
import { Nav } from "./pages/Nav.tsx";
import { PageRoutes } from "./pages/pages.tsx";

export function App() {
  return (
    <HashRouter>
      <main className={styles.root}>
        <PageRoutes />
      </main>
      <Nav />
    </HashRouter>
  );
}
