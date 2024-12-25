import { glob, readFile, writeFile } from "node:fs/promises";

for await (const file of glob("**/*.csv")) {
  const csv = await readFile(file, "utf8");
  const data = ["export default [\n"];
  for (const line of csv.split("\n").map((line) => line.trim())) {
    if (line) {
      const row = [];
      for (const value of line.split(",").map((value) => value.trim())) {
        row.push(value);
      }
      data.push(`  [${row.join(", ")}],\n`);
    }
  }
  data.push("];\n");
  await writeFile(file + ".ts", data.join(""));
}
