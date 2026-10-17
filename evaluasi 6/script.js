// ==========================================
// BAGIAN 1 & 2: DATA & PEMBERSIHAN DATA
// ==========================================

// 1. Object Kedai
const kedai = {
  nama: "Kedai Senja",
  pemilik: "Rian",
  kota: "Yogyakarta",
  tahunBerdiri: 2022,
  sedangBuka: true,
  nomorWhatsApp: "081234567890",
  website: "",
  jamOperasional: {
    buka: "08.00",
    tutup: "22.00"
  }
};

// 2. Array Menu (Minimal 8 object, 3 kategori, 1 stok 0)
const menu = [
  { nama: "Kopi Susu", kategori: "Minuman", harga: 18000, stok: 15 },
  { nama: "Americano", kategori: "Minuman", harga: 15000, stok: 10 },
  { nama: "Teh Manis", kategori: "Minuman", harga: 5000, stok: 20 },
  { nama: "Roti Bakar", kategori: "Makanan", harga: 20000, stok: 5 },
  { nama: "Nasi Goreng", kategori: "Makanan", harga: 25000, stok: 8 },
  { nama: "Kentang Goreng", kategori: "Cemilan", harga: 12000, stok: 0 },
  { nama: "Pisang Goreng", kategori: "Cemilan", harga: 10000, stok: 12 },
  { nama: "Es Krim", kategori: "Cemilan", harga: 8000, stok: 6 }
];

// 3. Array Transaksi Mentah (Berantakan)
const transaksiMentah = [
  {
    kode: "trx-001",
    pelanggan: "  rina WULANDARI ",
    hari: "jumat",
    uangBayar: "150.000",
    voucher: " diskon10 ",
    pesanan: [
      { menu: " kopi SUSU", jumlah: "2" },
      { menu: "roti BAKAR", jumlah: "1" }
    ]
  },
  {
    kode: "trx-002",
    pelanggan: "BUDI SANTOSO",
    hari: "sabtu",
    uangBayar: "75000",
    voucher: "diskon5",
    pesanan: [
      { menu: "nasi GORENG", jumlah: "2" }
    ]
  },
  {
    kode: "trx-003",
    pelanggan: "  siti AMINAH ",
    hari: "minggu",
    uangBayar: "20.000",
    voucher: "",
    pesanan: [
      { menu: "teh MANIS", jumlah: "1" }
    ] // Uang kurang
  },
  {
    kode: "trx-004",
    pelanggan: "",
    hari: "senin",
    uangBayar: "50000",
    voucher: "",
    pesanan: [] // Ditolak: Nama kosong & pesanan kosong
  },
  {
    kode: "trx-005",
    pelanggan: "joko",
    hari: "selasa",
    uangBayar: "100.000",
    voucher: "diskon20",
    pesanan: [
      { menu: "Menu Ghaib", jumlah: "1" } // Item tidak valid (menu tidak ada)
    ]
  },
  {
    kode: "trx-006",
    pelanggan: "  ANI   SURYANI ",
    hari: "jumat",
    uangBayar: "50.000",
    voucher: "",
    pesanan: [
      { menu: "es KRIM", jumlah: "2" }
    ]
  }
];

// ==========================================
// FUNCTION PEMBERSIH DATA
// ==========================================

// Function Declaration untuk bersihkanNama
function bersihkanNama(teks) {
  if (!teks) return "";
  let trimTeks = teks.trim().toLowerCase();
  let kataArray = trimTeks.split(/\s+/);
  let hasilArray = kataArray.map(kata => kata.charAt(0).toUpperCase() + kata.slice(1));
  return hasilArray.join(" ");
}

// Function Expression untuk ubahKeAngka
const ubahKeAngka = function(teks) {
  if (!teks) return 0;
  let bersih = teks.toString().replace(/\./g, "").trim();
  let angka = Number(bersih);
  return isNaN(angka) ? 0 : angka;
};

// Arrow Function untuk ambilPersenVoucher
const ambilPersenVoucher = (kode) => {
  if (!kode) return 0;
  let bersih = kode.trim().toUpperCase();
  if (bersih.startsWith("DISKON")) {
    let angka = Number(bersih.replace("DISKON", ""));
    return isNaN(angka) ? 0 : angka;
  }
  return 0;
};

// Function Declaration untuk formatRupiah
function formatRupiah(angka) {
  if (isNaN(angka)) return "Rp 0";
  let rev = angka.toString().split('').reverse().join('');
  let ribuan = '';
  for (let i = 0; i < rev.length; i++) {
    ribuan += rev[i];
    if ((i + 1) % 3 === 0 && i < rev.length - 1) {
      ribuan += '.';
    }
  }
  return "Rp " + ribuan.split('').reverse().join('');
}

// Pengujian Function dengan minimal 3 kasus
console.log("--- Uji Function Pembersih ---");
console.log(`"  rina   WULANDARI " → "${bersihkanNama("  rina   WULANDARI ")}"`);
console.log(`"" → "${bersihkanNama("")}"`);
console.log(`"Andi Saputra" → "${bersihkanNama("Andi Saputra")}"`);

console.log(`"150.000" → ${ubahKeAngka("150.000")}`);
console.log(`"75000" → ${ubahKeAngka("75000")}`);
console.log(`"abc" → ${ubahKeAngka("abc")}`);

console.log(`" diskon10 " → ${ambilPersenVoucher(" diskon10 ")}`);
console.log(`"PROMO5" → ${ambilPersenVoucher("PROMO5")}`);
console.log(`"" → ${ambilPersenVoucher("")}`);

console.log(`1250000 → "${formatRupiah(1250000)}"`);
console.log(`500 → "${formatRupiah(500)}"`);
console.log(`0 → "${formatRupiah(0)}"`);

// ==========================================
// PEMBUATAN DATA BERSIH
// ==========================================
const transaksiBersih = [];

for (let t of transaksiMentah) {
  let pesananBersih = [];
  for (let p of t.pesanan) {
    pesananBersih.push({
      menu: bersihkanNama(p.menu),
      jumlah: Number(p.jumlah) || 0
    });
  }

  transaksiBersih.push({
    kode: t.kode.toUpperCase(),
    pelanggan: bersihkanNama(t.pelanggan),
    hari: t.hari.trim().toLowerCase(),
    uangBayar: ubahKeAngka(t.uangBayar),
    persenVoucher: ambilPersenVoucher(t.voucher),
    pesanan: pesananBersih
  });
}

console.log("--- Transaksi Bersih ---");
console.log(transaksiBersih);

// Mesin Kasir
const kasir = {
  menu: menu,
  saldoKas: 0,
  riwayat: [],
  pecahan: [50000, 20000, 10000, 5000, 2000, 1000],

  // 1. Cari Menu
  cariMenu(nama) {
    for (let m of this.menu) {
      if (m.nama.toLowerCase() === nama.toLowerCase()) {
        return m;
      }
    }
    return null;
  },

  // 2. Hitung Subtotal & Validasi Item
  hitungSubtotal(pesanan) {
    let subtotal = 0;
    let itemValid = [];
    let itemTidakValid = [];

    for (let item of pesanan) {
      let menuObj = this.cariMenu(item.menu);
      if (!menuObj) {
        itemTidakValid.push({ menu: item.menu, alasan: "Menu tidak ditemukan" });
        continue;
      }
      if (item.jumlah <= 0) {
        itemTidakValid.push({ menu: item.menu, alasan: "Jumlah tidak valid atau nol" });
        continue;
      }
      if (menuObj.stok < item.jumlah) {
        itemTidakValid.push({ menu: item.menu, alasan: "Stok tidak cukup" });
        continue;
      }

      let hargaItem = menuObj.harga * item.jumlah;
      subtotal += hargaItem;
      itemValid.push({ menu: menuObj.nama, jumlah: item.jumlah, harga: menuObj.harga });
    }

    return { subtotal, itemValid, itemTidakValid };
  },

  // 3. Hitung Promo Hari
  hitungPromoHari(hari) {
    switch (hari) {
      case "jumat":
        return 3000;
      case "sabtu":
      case "minggu":
        return 5000;
      default:
        return 0;
    }
  },

  // 4. Hitung Diskon
  hitungDiskon(subtotal, persenVoucher) {
    let persenSubtotal = 0;
    if (subtotal >= 100000) {
      persenSubtotal = 15;
    } else if (subtotal >= 50000) {
      persenSubtotal = 10;
    } else if (subtotal >= 25000) {
      persenSubtotal = 5;
    } else {
      persenSubtotal = 0;
    }

    let persenFinal = Math.max(persenSubtotal, persenVoucher);
    let diskon = (subtotal * persenFinal) / 100;
    return Math.round(diskon);
  },

  // 5. Hitung Pajak
  hitungPajak(nilai, tarif = 0.11) {
    return Math.round(nilai * tarif);
  },

  // 6. Hitung Kembalian Pecahan
  hitungKembalianPecahan(kembalian) {
    if (kembalian < 0) return null;
    let hasilPecahan = {};
    let sisa = kembalian;

    for (let lembar of this.pecahan) {
      if (sisa >= lembar) {
        let jumlahLembar = Math.floor(sisa / lembar);
        hasilPecahan[lembar] = jumlahLembar;
        sisa %= lembar;
      }
    }
    hasilPecahan.sisa = sisa;
    return hasilPecahan;
  },

  // 7. Proses Transaksi
  prosesTransaksi(trx) {
    if (!trx.pelanggan || trx.pelanggan.trim() === "") {
      let res = { kode: trx.kode, pelanggan: trx.pelanggan, status: "DITOLAK", alasan: "Nama pelanggan kosong" };
      this.riwayat.push(res);
      return res;
    }
    if (!trx.pesanan || trx.pesanan.length === 0) {
      let res = { kode: trx.kode, pelanggan: trx.pelanggan, status: "DITOLAK", alasan: "Pesanan kosong" };
      this.riwayat.push(res);
      return res;
    }

    let hasilSub = this.hitungSubtotal(trx.pesanan);
    if (hasilSub.itemValid.length === 0) {
      let res = { kode: trx.kode, pelanggan: trx.pelanggan, status: "DITOLAK", alasan: "Tidak ada item valid" };
      this.riwayat.push(res);
      return res;
    }

    let subtotal = hasilSub.subtotal;
    let promoHari = this.hitungPromoHari(trx.hari);
    let diskon = this.hitungDiskon(subtotal, trx.persenVoucher);
    let setelahDiskon = subtotal - diskon - promoHari;
    if (setelahDiskon < 0) setelahDiskon = 0;

    let pajak = this.hitungPajak(setelahDiskon);
    let total = setelahDiskon + pajak;
    let kembalian = trx.uangBayar - total;
    let status = trx.uangBayar >= total ? "LUNAS" : "KURANG";
    let pecahanKembalian = null;

    if (status === "LUNAS") {
      for (let item of hasilSub.itemValid) {
        let mObj = this.cariMenu(item.menu);
        if (mObj) mObj.stok -= item.jumlah;
      }
      this.saldoKas += total;
      pecahanKembalian = this.hitungKembalianPecahan(kembalian);
    }

    let hasilAkhir = {
      kode: trx.kode,
      pelanggan: trx.pelanggan,
      status,
      subtotal,
      promoHari,
      diskon,
      pajak,
      total,
      uangBayar: trx.uangBayar,
      kembalian,
      pecahanKembalian,
      itemValid: hasilSub.itemValid,
      itemTidakValid: hasilSub.itemTidakValid
    };

    this.riwayat.push(hasilAkhir);
    return hasilAkhir;
  },

  // 8. Cetak Struk
  cetakStruk(hasil) {
    console.log("=================================");
    console.log(`KODE TRANSAKSI: ${hasil.kode}`);
    console.log(`Pelanggan: ${hasil.pelanggan}`);
    console.log(`Status: ${hasil.status}`);
    if (hasil.status === "DITOLAK") {
      console.log(`Alasan: ${hasil.alasan}`);
    } else {
      console.log("--- Item Valid ---");
      hasil.itemValid.forEach((item, idx) => {
        console.log(`${idx + 1}. ${item.menu} x${item.jumlah} - ${formatRupiah(item.harga * item.jumlah)}`);
      });
      if (hasil.itemTidakValid.length > 0) {
        console.log("--- Item Tidak Valid ---");
        hasil.itemTidakValid.forEach(inv => {
          console.log(`- ${inv.menu}: ${inv.alasan}`);
        });
      }
      console.log(`Subtotal: ${formatRupiah(hasil.subtotal)}`);
      console.log(`Promo Hari: ${formatRupiah(hasil.promoHari)}`);
      console.log(`Diskon: ${formatRupiah(hasil.diskon)}`);
      console.log(`Pajak (11%): ${formatRupiah(hasil.pajak)}`);
      console.log(`Total: ${formatRupiah(hasil.total)}`);
      console.log(`Uang Bayar: ${formatRupiah(hasil.uangBayar)}`);
      console.log(`Kembalian: ${formatRupiah(hasil.kembalian)}`);
      if (hasil.pecahanKembalian) {
        console.log("Pecahan Kembalian:", hasil.pecahanKembalian);
      }
    }
    console.log("=================================\n");
  }
};

// Menjalankan Semua Transaksi
const TARGET_KAS = 1000000;
for (let t of transaksiBersih) {
  let hasilTrx = kasir.prosesTransaksi(t);
  kasir.cetakStruk(hasilTrx);
  if (kasir.saldoKas >= TARGET_KAS) {
    console.log("Target kas tercapai");
    break;
  }
}
