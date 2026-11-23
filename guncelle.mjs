// plan.json'u üretir. Kullanım: node guncelle.mjs, sonra git add -A; git commit; git push
// Seri: Gece Telsizi, günde 1 bölüm 20:30; 2B alternatif son olarak 2A ile aynı gün 22:30.
import fs from "node:fs";
const BASLA = "2026-11-25";
const TAG = "#hikaye #korku #gizem #bebektelsizi #reels #yorumlarayaz #seri #gecetelsizi";
const EP = [
  ["1", "Fısıltı", "Polisi arayayım mı, yoksa yarın gece telsizin başında mı bekleyeyim?", "Polisi ara", "Bekle"],
  ["2a", "Polisi ara", "Polise güvenmeli miyim, yoksa kendim mi araştırmalıyım?", "Polise güven", "Kendin araştır"],
  ["2b", "Bekle", "Kutuyu açayım mı, yoksa eşimi mi uyandırayım?", "Kutuyu aç", "Eşini uyandır"],
  ["3", "Sabah", "Duvara ben de vurayım mı, yoksa eşime kaydı mı göstereyim?", "Duvara vur", "Kaydı göster"],
  ["4", "Tıkırtı", "Fotoğrafı eşime göstereyim mi, yoksa komşuya mı götüreyim?", "Eşine göster", "Komşuya götür"],
  ["5", "Hatice Teyze", "Hatice Teyze'ye güvenmeli miyim, yoksa her şeyden şüphe mi etmeliyim?", "Güven", "Şüphe et"],
  ["6", "Aynı İsim", "Eşimin peşinden gideyim mi, yoksa telsizi mi dinleyeyim?", "Eşinin peşinden git", "Telsizi dinle"],
  ["7", "Eşimin Sırrı", "Emlakçının ofisine gideyim mi, yoksa zarfı mı açayım?", "Ofise git", "Zarfı aç"],
  ["8", "Duvarın Arkası", "Kapıyı hemen açayım mı, yoksa önce polise mi haber vereyim?", "Hemen aç", "Polise haber ver"],
  ["9", "Gizli Oda", "Selma'ya ne söylemeliyim: seni çıkaracağım mı, yoksa kızın nerede mi?", "Seni çıkaracağım", "Kızın nerede?"],
];
const tarih = (n) => { const d = new Date(BASLA + "T12:00:00+03:00"); d.setDate(d.getDate() + n); return d.toLocaleDateString("sv-SE", { timeZone: "Europe/Istanbul" }); };
let gun = 0;
const items = EP.map(([id, ad, q, a, b]) => {
  const alt = id === "2b";
  if (!alt && id !== "1") gun++;
  const date = tarih(gun);
  const no = id.toUpperCase();
  const caption = `GECE TELSİZİ • Bölüm ${no}: ${ad}\n\n${q}\n\nA) ${a}\nB) ${b}\n\nKararı yorumlara yaz, çoğunluk ne derse hikâye oradan devam eder.\n\n${TAG}`;
  return { date, time: alt ? "22:30" : "20:30", series: alt ? "gecealt" : "gece", title: `Bölüm ${no}: ${ad}`, caption, file: `bolum${id}.mp4`, meta: true };
});
fs.writeFileSync(new URL("./plan.json", import.meta.url), JSON.stringify({ updated: new Date().toISOString(), account: "gece telsizi", items }, null, 1));
console.log(items.length, "gönderi, son gün", items.at(-1).date);
