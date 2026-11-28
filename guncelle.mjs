// bolumler.json'dan plan.json'u üretir. Kullanım: node guncelle.mjs, sonra git add (profil.png hariç); commit; push
// Seri: Yarından Arayan. Günde en fazla 1 bölüm: reel 20:30, tanıtım hikayesi 20:35.
// Her bölüm: no, ad, tarih, a, b, caption, planlandi (Meta'da doğrulandıysa true), link, sonuc (oylama özeti).
// Videolar: videolar/yarindan-bolum<no>.mp4 ve videolar/yarindan-hikaye<no>.mp4
import fs from "node:fs";
const bolumler = JSON.parse(fs.readFileSync(new URL("./bolumler.json", import.meta.url), "utf8"));
const gunler = bolumler.map((x) => x.tarih);
if (new Set(gunler).size !== gunler.length) throw new Error("Aynı güne iki bölüm konmuş.");
const items = bolumler.flatMap((x) => [
  { date: x.tarih, time: "20:30", series: "bolum", title: `Bölüm ${x.no}: ${x.ad}`, caption: x.caption, file: `yarindan-bolum${x.no}.mp4`, sonuc: x.sonuc, meta: x.planlandi },
  { date: x.tarih, time: "20:35", series: "hikaye", title: `Hikaye • Bölüm ${x.no}: ${x.ad}`, note: "Videodan 5 dakika sonra paylaşılan 15 saniyelik tanıtım hikayesi.", file: `yarindan-hikaye${x.no}.mp4`, meta: x.planlandi },
]);
items.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
fs.writeFileSync(new URL("./plan.json", import.meta.url), JSON.stringify({ updated: new Date().toISOString(), account: "yorumlar.yonetiyor", items }, null, 1));
console.log(bolumler.length, "bölüm,", items.length, "kayıt");
