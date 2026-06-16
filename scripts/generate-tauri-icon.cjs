const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const svgPath = path.join(root, "assets", "logodock.svg");
const iconPath = path.join(root, "src-tauri", "icons", "icon.ico");

const svg = fs.readFileSync(svgPath, "utf8");
const start = svg.indexOf("base64,") + "base64,".length;
const end = svg.indexOf("\"", start);

if (start < "base64,".length || end < 0) {
  throw new Error("Could not find the embedded PNG in assets/logodock.svg.");
}

const png = Buffer.from(svg.slice(start, end), "base64");
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);

const directory = Buffer.alloc(16);
directory[0] = 0;
directory[1] = 0;
directory[2] = 0;
directory[3] = 0;
directory.writeUInt16LE(1, 4);
directory.writeUInt16LE(32, 6);
directory.writeUInt32LE(png.length, 8);
directory.writeUInt32LE(22, 12);

fs.mkdirSync(path.dirname(iconPath), { recursive: true });
fs.writeFileSync(iconPath, Buffer.concat([header, directory, png]));

console.log(`Wrote ${path.relative(root, iconPath)} from ${path.relative(root, svgPath)}.`);
