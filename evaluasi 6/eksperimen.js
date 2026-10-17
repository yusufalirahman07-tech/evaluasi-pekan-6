// ==========================================
// 7.1 TEBAK
// ==========================================
console.log("  Hai Kawan  ".trim().length); // Tebak: 9, Hasil: 9
console.log("Kopi Susu".toUpperCase().slice(0, 4)); // Tebak: KOPI, Hasil: KOPI
console.log("a,b,c".split(",").length); // Tebak: 3, Hasil: 3
console.log("banana".replace("a", "o")); // Tebak: bonana, Hasil: bonana
console.log("banana".replaceAll("a", "o")); // Tebak: bonono, Hasil: bonono
console.log(parseInt("42px")); // Tebak: 42, Hasil: 42
console.log(Number("42px")); // Tebak: NaN, Hasil: NaN
console.log(parseInt("3.99")); // Tebak: 3, Hasil: 3
console.log(typeof (3.14159).toFixed(2)); // Tebak: string, Hasil: string
console.log((0.1 + 0.2).toFixed(2)); // Tebak: 0.30, Hasil: 0.30
console.log("10" + 5 * 2); // Tebak: 1010, Hasil: 1010
console.log(!0 && !""); // Tebak: true, Hasil: true

// ==========================================
// 7.2 EKSPERIMEN
// ==========================================
// 1. Function declaration hoisting
console.log(contohFunctDec()); // Berjalan normal
function contohFunctDec() { return "Berhasil"; }

// const contohFunctExp = function() { return "Error"; }; // Uncaught TypeError jika dipanggil sebelum deklarasi

// 2. Slice vs Splice
let arr = [1, 2, 3];
arr.slice(0, 1); // Tidak berubah
arr.splice(0, 1); // Berubah menjadi [2, 3]

// 3. For...in vs For...of pada array
let sampleArr = ["a", "b"];
for (let i in sampleArr) { console.log(typeof i); } // "string" (indeks)
for (let v of sampleArr) { console.log(v); } // "a", "b" (nilai)

// 4. toFixed menghasilkan string
console.log(typeof (5).toFixed(1)); // "string"

// 5. Cek Nilai Falsy
[false, 0, "", null, undefined, NaN].forEach(val => {
  if (val) console.log("Masuk", val);
});
["0", [], {}].forEach(val => {
  if (val) console.log("Masuk Truthy", val);
});