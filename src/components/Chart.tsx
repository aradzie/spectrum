import { type ReactNode } from "react";
import * as styles from "./Chart.module.css";

export function Chart({ children }: { children: ReactNode }) {
  return <div className={styles.root}>{children}</div>;
}
