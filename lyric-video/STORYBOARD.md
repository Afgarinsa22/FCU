# Storyboard: Motion Lyric (9:16)

- **Format:** 1080×1920, 30 fps, 71,1 detik, tanpa end card (fade ke hitam di akhir)
- **Tempo:** 111 BPM (1 beat ≈ 0,54 s), timing per kata di `timing.json`
- **Mood:** gelap, depresi, menyesal, ingin melupakan

## Bahasa visual

| Elemen | Pilihan |
|---|---|
| Warna | Hitam `#0B0B0B` · Merah tua `#C1121F` · Putih kertas `#E8E3D9` · Abu `#6B6B6B` |
| Font | **Anton** (condensed tebal, untuk hero word) · **DM Serif Display Italic** (emosional) · **Special Elite** (mesin tik, untuk kata pengisi) |
| Tekstur | Grain film + debu/goresan di scene hitam, serat kertas kusut di scene putih |
| Motif berulang | **Titik merah** (luka/diri sendiri, juga titik huruf i) · **Coretan & penghapus** (melupakan) · **Sobekan kertas** |
| Gerak | Bagian Indonesia: hentakan di beat, tapi berat dan "jatuh" (bukan memantul). Bagian Inggris: lambat, melayang, blur, seperti di dalam air |

Hierarki: 1 hero word per baris dibuat sangat besar, kata pengisi kecil memakai font mesin tik.

## Scene per baris

| # | Waktu | Lirik (**hero word**) | Visual | Transisi keluar |
|---|---|---|---|---|
| 1 | 0,2–5,9 | Kuharap kau **MENYESAL** | Hitam. "kuharap kau" diketik huruf per huruf di kiri atas. **MENYESAL** merah raksasa, huruf jatuh satu-satu mengikuti beat. Saat nada ditahan, huruf retak dan terbelah horizontal (slice glitch) pelan-pelan. | Potongan slice turun ke bawah layar |
| 2 | 5,9–11,6 | Kuharap kau **MENYESALINYA** | Grid "MENYESAL" berulang (baris outline putih, satu baris merah solid) scroll ke bawah, seperti pikiran yang berputar. Akhiran "-inya" muncul dalam serif italic putih. | Kertas putih tersobek masuk dari bawah |
| 3 | 11,6–15,4 | Berikan aku **ALASAN** | Kertas putih kusut. Teks hitam mesin tik. **ALASAN** tertutup bar sensor hitam yang bergeser membuka huruf per huruf. Tanda "?" kecil merah. | Zoom ke angka 1 |
| 4 | 15,4–23,2 | **SATU** alasan tuk **MELUPAKAN** | Angka **1** serif merah, tinggi penuh layar. Batang angka 1 menjadi garis vertikal. "melupakan" ditulis, lalu dihapus huruf demi huruf seperti penghapus (tersisa jejak outline pudar). Tempo visual melambat mengikuti nada panjang. | Kertas menghitam dari tepi (seperti terbakar tinta) |
| 5 | 23,2–28,8 | **TUHAN** tolong **HAPUSKAN** | Hitam. "Tuhan" serif kecil di atas, dengan cahaya tipis turun dari atas. **HAPUSKAN** besar dan putih, dicoret garis merah satu per satu di tiap beat, lalu huruf rontok jatuh. | Huruf yang rontok menjadi daftar baris tercoret |
| 6 | 28,8–34,7 | Setiap **NAMA** yang kuucapkan | Kolom label "NAMA: ________" berulang seperti daftar, semua tercoret merah. Kamera pan ke bawah menyusuri daftar. "yang kuucapkan" diketik di samping. | Satu label lepas dan menjadi kartu kertas |
| 7 | 34,7–38,1 | Sampaikan sebuah **PESAN** | Kartu kertas kecil melayang di hitam, teks diketik di atasnya. Stempel merah **PESAN** menghantam di beat (sedikit camera shake). | Stempel melebar menjadi pita merah diagonal |
| 8 | 38,1–49,2 | Sebuah **PERINGATAN** tuk melupakan, yeah | **KLIMAKS.** Pita peringatan merah-hitam bertuliskan "PERINGATAN" menyilang layar di beberapa sudut, berputar pelan, kamera zoom out. "tuk melupakan" diketik di tengah. Saat "yeah" ditahan (45–49): semua elemen bergetar, flash merah di tiap beat, lalu menyusut dan runtuh menjadi **satu titik merah**. | Titik merah tenggelam ke bawah (49–51,5): layar jadi "bawah air", gelembung naik, blur |
| 9 | 51,5–57,0 | Here come **CLOSER**, I can't **BREATHE** | Bawah air: teks bergelombang (distorsi riak). **CLOSER** membesar perlahan mendekati kamera. **BREATHE** hurufnya merenggang dan naik seperti gelembung sambil memudar. | Garis permukaan air muncul |
| 10 | 57,0–62,1 | I'm in **UNDERWATER**, so dive in with me | Layar terbelah garis permukaan air. **UNDERWATER** di atas, pantulannya beriak di bawah. Kamera menyelam menembus garis itu. "dive in with me" kecil di bawah. Titik "i" berwarna merah. | Gelap total, tinggal satu sobekan kertas |
| 11 | 62,1–66,0 | I just wanna say **SORRY** | Minimal dan sepi. Sobekan kertas kecil melayang di kegelapan, **sorry** serif italic merah kecil. Banyak ruang kosong (kesepian). | Kertas hanyut keluar frame |
| 12 | 66,0–71,1 | Are you in a **HURRY** | Kata-kata muncul lalu cepat hilang. **HURRY** melesat dengan motion blur lalu lenyap. Tersisa titik merah redup, lalu fade ke hitam (~70,5). | (selesai) |

## Catatan produksi
- Dibangun dengan **Remotion** (React), semua animasi dikunci ke `timing.json`.
- Tekstur (grain, debu, serat kertas, riak air) dibuat prosedural, tanpa aset luar.
- Font dari paket `@fontsource` (lisensi bebas OFL).
