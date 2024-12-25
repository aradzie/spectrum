import "./App.module.css";
import { useState } from "react";
import * as styles from "./App.module.css";
import { Nav } from "./Nav.js";
import { pages } from "./pages/pages.tsx";

export function App() {
  const [pageIndex, setPageIndex] = useState(0);
  const { title, component: Component } = pages[pageIndex];
  return (
    <>
      <Nav pageIndex={pageIndex} onPageIndexChange={setPageIndex} />
      <main className={styles.root}>
        <h1 className={styles.title}>{title}</h1>
        <Component />
      </main>
    </>
  );
}
