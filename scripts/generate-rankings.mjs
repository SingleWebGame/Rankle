import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const families = [
  ["Population", "city", "people"], ["Geography", "mountain", "meters"], ["Sports", "athlete", "points"],
  ["Technology", "device", "units"], ["Cars", "model", "km/h"], ["Luxury", "collectible", "USD"],
  ["Finance", "company", "billions USD"], ["Movies", "film", "millions USD"], ["Music", "track", "streams"],
  ["Animals", "species", "kilograms"], ["Businesses", "brand", "value"], ["Space", "object", "kilometers"],
  ["Science", "discovery", "units"], ["History", "empire", "years"]
];
const rankings = [];
for (const [category, entity, unit] of families) {
  for (let set = 1; set <= 150; set += 1) {
    const items = Array.from({ length: 5 }, (_, item) => ({
      label: `${entity[0].toUpperCase()}${entity.slice(1)} ${((set - 1) * 5) + item + 1}`,
      value: ((set * 7919 + item * 104729) % 1000000) + 1
    }));
    rankings.push({
      id: `${category.toLowerCase()}-sample-${String(set).padStart(3, "0")}`,
      category,
      title: `${category} sample ranking ${String(set).padStart(3, "0")}`,
      items,
      sample: true,
      unit
    });
  }
}
await mkdir(path.join(root, "data"), { recursive: true });
await writeFile(path.join(root, "data", "rankings.json"), `${JSON.stringify(rankings, null, 2)}\n`);
console.log(`Generated ${rankings.length} local sample rankings.`);
