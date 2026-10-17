const TARIF_PAJAK = 0.11;
const harga = { kopi: 20000, teh: 7500, roti: 15000 };
let keranjang = ["kopi", "teh", "roti", "teh"];
let jumlahMember = 5; // FIX 1: Ubah dari string ke angka agar tidak concatenation

const pelanggan = {
  nama: "rina",
  saldo: 100000,

  bayar(jumlah) {
    this.saldo -= jumlah; // FIX 2: Tambahkan 'this.' agar mengakses properti object
    return this.saldo;
  },
};

let subtotal = 0;
for (let i = 0; i < keranjang.length; i++) { // FIX 3: Ganti '<=' menjadi '<' agar tidak undefined
  subtotal += harga[keranjang[i]];
}

let persen;
if (subtotal >= 50000) { // FIX 4: Urutan logika if-else dibalik dari besar ke kecil
  persen = 10;
} else if (subtotal >= 25000) {
  persen = 5;
} else {
  persen = 0;
}
let diskon = (subtotal * persen) / 100;

let hari = "jumat";
let promo;
switch (hari) {
  case "jumat":
    promo = 3000;
    break; // FIX 5: Tambahkan break agar tidak jatuh ke case sabtu/minggu
  case "sabtu":
  case "minggu":
    promo = 5000;
    break;
  default:
    promo = 0;
}

let pajak = (subtotal - diskon - promo) * TARIF_PAJAK; // FIX 6: Tambahkan tanda kurung pada (subtotal - diskon - promo)

let total = subtotal - diskon - promo + pajak;

let uangBayarTeks = "100.000";
let uangBayar = parseInt(uangBayarTeks.replace(/\./g, "")); // FIX 7: Hapus titik ribuan sebelum parsing
let kembalian = uangBayar - total;

let status;
if (uangBayar === total || uangBayar > total) { // FIX 8: Ganti operator assignment '=' menjadi comparison '==='
  status = "Lunas";
} else {
  status = "Kurang";
}

let namaRapi =
  pelanggan.nama.slice(0, 1).toUpperCase() + pelanggan.nama.slice(1); // FIX 9: Slice mulai dari indeks 1, bukan 0

keranjang.splice(1, 1); // FIX 10: Ganti slice(1, 1) menjadi splice(1, 1) untuk menghapus elemen array
keranjang.unshift("air");

let jumlahMemberBaru = jumlahMember + 1;

let rataRata = Number((total / 4).toFixed(2)); // FIX 11: Bungkus Number() agar menjadi angka
let rataRataTotal = rataRata + 10;

function formatRupiah(angka) {
  return "Rp " + angka; // FIX 12: Tambahkan keyword 'return'
}

console.log(subtotal, diskon, promo, pajak, total);
console.log(uangBayar, kembalian, status);
console.log(namaRapi);
console.log(keranjang);
console.log(jumlahMemberBaru);
console.log(rataRataTotal);
console.log(formatRupiah(kembalian));
console.log(pelanggan.bayar(30000));

for (let kunci in harga) { // FIX 13: Ganti 'of' menjadi 'in' untuk iterasi object keys
  console.log(kunci + ": " + harga[kunci]);
}