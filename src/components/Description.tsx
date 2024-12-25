import { type Meta } from "../data/meta.ts";
import * as styles from "./Description.module.css";

function Description({ meta }: { meta: Meta }) {
  return (
    <>
      {meta.descriptions.map(({ description }) => (
        <p className={styles.description} key={description}>
          {description}
        </p>
      ))}
    </>
  );
}

function Title({ meta }: { meta: Meta }) {
  return (
    <>
      {meta.titles.map(({ title }) => (
        <p className={styles.title} key={title}>
          {title}
        </p>
      ))}
    </>
  );
}

Description.Title = Title;

export { Description };
