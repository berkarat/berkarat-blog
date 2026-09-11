import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";
import { parse } from "node-html-parser";
import fs from "node:fs";
import path from "node:path";

const OUT_DIR = process.argv[2];

// Fetch sitemap and collect all post URLs
const smRes = await fetch("https://blog.berkarat.com/post-sitemap.xml");
const sm = await smRes.text();
const urls = [...sm.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
console.log("Toplam URL:", urls.length);

const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced", bulletListMarker: "-" });
td.use(gfm);

function slugFromUrl(u) {
  return u.replace(/\/$/, "").split("/").pop();
}

let ok = 0, fail = 0;
const failed = [];

for (const url of urls) {
  const slug = slugFromUrl(url);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const html = await res.text();
    const root = parse(html);

    const title = (root.querySelector("h1.entry-title") || root.querySelector("title"))
      ?.text.trim().replace(/\s*[-–|]\s*Berk Arat.*$/i, "").trim() || slug;

    const dateMeta = root.querySelector('meta[property="article:published_time"]');
    const modMeta = root.querySelector('meta[property="article:modified_time"]');
    const pub = (dateMeta?.getAttribute("content") || modMeta?.getAttribute("content") || "").slice(0, 10) || "2019-01-01";

    // tags/category from rel links
    const cats = root.querySelectorAll('a[rel="category tag"], .td-post-category').map(a => a.text.trim()).filter(Boolean);
    const category = cats[0] || "Yazılım";

    const content = root.querySelector(".td-post-content");
    if (!content) throw new Error("içerik yok");

    content.querySelectorAll("script, style, .td-a-rec, ins, .code-block, .td-post-sharing, .td-post-source-tags, .td_block_wrap").forEach(n => n.remove());

    let md = td.turndown(content.innerHTML);
    md = md.replace(/\n{3,}/g, "\n\n").trim();

    const desc = md.split("\n").map(l => l.trim())
      .filter(l => l.length > 30 && !/^[[!#|>]/.test(l))
      .find(Boolean)?.replace(/[#>*`]/g, "").slice(0, 150).trim() || title;

    const fm = `---\ntitle: ${JSON.stringify(title)}\npublished: ${pub}\ndescription: ${JSON.stringify(desc)}\ntags: ["İçe Aktarıldı"]\ncategory: ${JSON.stringify(category)}\ndraft: false\n---\n\n`;

    fs.writeFileSync(path.join(OUT_DIR, slug + ".md"), fm + md, "utf8");
    ok++;
    console.log(`✓ ${ok}/${urls.length}: ${title}`);
  } catch (e) {
    fail++;
    failed.push(url + " → " + e.message);
    console.log(`✗ HATA: ${slug} (${e.message})`);
  }
}

console.log(`\nBitti. Başarılı: ${ok}, Hata: ${fail}`);
if (failed.length) { fs.writeFileSync("failed.txt", failed.join("\n")); console.log("Hatalar failed.txt'e yazıldı."); }
