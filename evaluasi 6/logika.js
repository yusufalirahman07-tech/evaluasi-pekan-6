// 1. Hitung Faktorial
function hitungFaktorial(n) {
  if (n < 0) return null;
  if (n === 0 || n === 1) return 1;
  let hasil = 1;
  for (let i = 2; i <= n; i++) {
    hasil *= i;
  }
  return hasil;
}

// 2. Cek Palindrom
function cekPalindrom(teks) {
  if (!teks || teks.trim() === "") return false;
  let bersih = teks.trim().toLowerCase().replace(/\s+/g, "");
  let dibalik = bersih.split("").reverse().join("");
  return bersih === dibalik;
}

// 3. Hitung Vokal
function hitungVokal(teks) {
  let matches = teks.match(/[aiueo]/gi);
  return matches ? matches.length : 0;
}

// 4. Cari Terbesar
function cariTerbesar(daftar) {
  if (!daftar || daftar.length === 0) return null;
  let maxVal = daftar[0];
  let maxIdx = 0;
  for (let i = 1; i < daftar.length; i++) {
    if (daftar[i] > maxVal) {
      maxVal = daftar[i];
      maxIdx = i;
    }
  }
  return { nilai: maxVal, indeks: maxIdx };
}

// 5. Hapus Duplikat
function hapusDuplikat(daftar) {
  let hasil = [];
  for (let item of daftar) {
    if (!hasil.includes(item)) {
      hasil.push(item);
    }
  }
  return hasil;
}

// 6. Cek Bilangan Prima
function cekBilanganPrima(n) {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// Pengujian Logika
console.log("Faktorial (5):", hitungFaktorial(5));
console.log("Palindrom ('Katak'):", cekPalindrom("Katak"));
console.log("Vokal ('Kedai Senja'):", hitungVokal("Kedai Senja"));
console.log("Terbesar ([12, 45, 7, 45, 30]):", cariTerbesar([12, 45, 7, 45, 30]));

let arrayAsli = [1, 2, 2, 3, 1];
console.log("Hapus Duplikat:", hapusDuplikat(arrayAsli));
console.log("Bukti Array Asli Tidak Berubah:", arrayAsli);

console.log("Cek Bilangan Prima (17):", cekBilanganPrima(17));