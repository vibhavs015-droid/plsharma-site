/** Render app/icon.svg into PNG favicon + apple-touch icon. */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(new URL("../../site/package.json", import.meta.url));
const sharp = require("sharp");

const APP = path.resolve(import.meta.dirname, "../../site/app");
const svg = fs.readFileSync(path.join(APP, "icon.svg"));

await sharp(svg, { density: 300 }).resize(512, 512).png().toFile(path.join(APP, "icon.png"));
await sharp(svg, { density: 300 }).resize(180, 180).png().toFile(path.join(APP, "apple-icon.png"));
console.log("icon.png + apple-icon.png written");
