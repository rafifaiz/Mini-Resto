# 🍽️ Mini Resto App

Aplikasi sederhana manajemen menu dan pesanan restoran berbasis *Utility-First* menggunakan **Tailwind CSS** dan **Vanilla JavaScript**.

Aplikasi ini bersifat *client-side* murni dan dilengkapi fitur **Persistence** (`localStorage`) sehingga data menu dan pesanan tidak hilang saat halaman di-refresh.

## ✨ Fitur Utama

* **Manajemen Menu (CRUD Sederhana):** Pengguna dapat menambahkan menu makanan baru (Nama, Harga, Deskripsi, Foto).
* **Daftar Pesanan:** Menambahkan, menghapus, serta menambah/mengurangi jumlah item pesanan.
* **Perhitungan Total Otomatis:** Menghitung total harga pesanan secara *real-time*.
* **Data Persistence:** Data menu dan pesanan disimpan secara lokal menggunakan `localStorage`, memastikan data tetap ada meskipun *browser* ditutup.
* **Desain Responsif:** Tampilan yang rapi dan adaptif untuk berbagai ukuran layar berkat Tailwind CSS.
* **Solusi Input Harga:** Menerima input harga dengan atau tanpa pemisah ribuan (titik/koma) dengan benar.

## 🛠️ Teknologi yang Digunakan

| Teknologi | Keterangan |
| :--- | :--- |
| **HTML5** | Struktur dasar halaman web. |
| **Tailwind CSS** | Framework CSS *Utility-First* untuk desain cepat dan modern (digunakan via CDN). |
| **Vanilla JavaScript (ES6+)** | Logika inti aplikasi, manipulasi DOM, dan manajemen data. |
| **localStorage** | Untuk fitur *persistence* (menyimpan data di *browser*). |

## 🚀 Cara Menjalankan Proyek

Proyek ini tidak memerlukan *setup* server kompleks (Node.js/NPM) karena menggunakan Tailwind CSS via CDN.

1.  **Kloning Repositori:**
    ```bash
    git clone [https://repository.stiesia.ac.id/](https://repository.stiesia.ac.id/)
    cd mini-resto
    ```

2.  **Buka di Browser:**
    * Buka *file* `index.html` langsung dari *browser* Anda. **ATAU**,
    * **Direkomendasikan:** Gunakan *extension* **Live Server** di VS Code untuk *auto-reload* saat pengembangan.

3.  **Deploy (Opsional):**
    Proyek ini siap di-*deploy* menggunakan **GitHub Pages** karena tidak memiliki *back-end*.

## 💡 Pengembangan dan Struktur Kode

### **`index.html`**
Berisi struktur utama aplikasi dan memuat Tailwind CSS via CDN, serta menghubungkan ke `app.js`.

### **`app.js`**
Berisi semua logika aplikasi, termasuk:
-   Fungsi `muatData()` dan `simpanData()` untuk `localStorage`.
-   *Submit handler* untuk form menu (dengan validasi harga).
-   Fungsi `renderMenu()` dan `renderPesanan()` untuk *update* UI.
-   Logika keranjang (`tambahPesanan`, `ubahJumlah`, `hapusPesanan`).
-   Logika tombol "Selesaikan Pesanan" (simulasi *checkout*).

---
*Dibuat oleh: [MIster_l]*
