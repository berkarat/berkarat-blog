import fs from "node:fs";
import path from "node:path";

const POSTS_DIR = process.argv[2];
const IMG_DIR = process.argv[3]; // public/wp-images

fs.mkdirSync(IMG_DIR, { recursive: true });

const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".md"));
const imgRegex = /https?:\/\/blog\.berkarat\.com\/wp-content\/uploads\/([^\s)"']+\.(?:png|jpe?g|gif|webp|svg))/gi;

// Collect unique image URLs
const urlMap = new Map(); // originalUrl -> localName
for (const f of files) {
  const md = fs.readFileSync(path.join(POSTS_DIR, f), "utf8");
  for (const m of md.matchAll(imgRegex)) {
    const url = m[0];
    if (!urlMap.has(url)) {
      // Flatten path into safe filename
      const rel = m[1].replace(/%[0-9A-Fa-f]{2}/g, "_").replace(/[\/\\]/g, "_");
      urlMap.set(url, rel);
    }
  }
}
console.log("Benzersiz görsel sayısı:", urlMap.size);

let dl = 0, fail = 0;
const failed = [];
for (const [url, name] of urlMap) {
  const dest = path.join(IMG_DIR, name);
  if (fs.existsSync(dest)) { dl++; continue; }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    dl++;
    if (dl % 25 === 0) console.log(`  indirildi ${dl}/${urlMap.size}`);
  } catch (e) {
    fail++;
    failed.push(url + " → " + e.message);
  }
}
console.log(`İndirilen: ${dl}, Hata: ${fail}`);

// Rewrite markdown links to /wp-images/<name>
let rewritten = 0;
for (const f of files) {
  const p = path.join(POSTS_DIR, f);
  let md = fs.readFileSync(p, "utf8");
  let changed = false;
  for (const [url, name] of urlMap) {
    if (md.includes(url)) {
      md = md.split(url).join("/wp-images/" + name);
      changed = true;
    }
  }
  if (changed) { fs.writeFileSync(p, md, "utf8"); rewritten++; }
}
console.log("Linkleri güncellenen dosya:", rewritten);
if (failed.length) fs.writeFileSync("img-failed.txt", failed.join("\n"));
