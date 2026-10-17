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