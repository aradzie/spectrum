import { type Meta } from "../data/meta.ts";
import * as styles from "./Description.module.css";

export function Description({ meta }: { meta: Meta }) {
  return (
    <div className={styles.root}>
      {meta.titles.map(({ title }) => (
        <p className={styles.title} key={title}>
          {title}
        </p>
      ))}
      {meta.descriptions.map(({ description }) => (
        <p className={styles.description} key={description}>
          {description}
        </p>
      ))}
    </div>
  );
}
