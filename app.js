// ------------------------------------
// Deklarasi Array dan Ambil Elemen DOM
// ------------------------------------

let daftarMenu = []; 
let daftarPesanan = [];

// Elemen formnya kita taroh disinni
const formMenu = document.getElementById('formMenu');
const inputNama = document.getElementById('nama');
const inputHarga = document.getElementById('harga');
const inputDeskripsi = document.getElementById('deskripsi');
const inputFoto = document.getElementById('foto');

// Elemen untuk tampilan & kontrol
const menuList = document.getElementById('menuList');
const orderList = document.getElementById('orderList');
const totalHarga = document.getElementById('totalHarga');
const btnKonfirmasi = document.getElementById('btnKonfirmasi'); 


// ------------------------------------
// FUNGSI UTAMA ini UNTUK PERSISTENCE (localStoragenya) 
// ------------------------------------

// Menyimpan array ke Local Storagenya
function simpanData() {
    localStorage.setItem('restoMenu', JSON.stringify(daftarMenu));
    localStorage.setItem('restoPesanan', JSON.stringify(daftarPesanan));
}

// Memuat array nya biar dari Local Storage saat aplikasi dimuat
function muatData() {
    const menuStorage = localStorage.getItem('restoMenu');
    const pesananStorage = localStorage.getItem('restoPesanan');

    if (menuStorage) {
        daftarMenu = JSON.parse(menuStorage);
    }
    if (pesananStorage) {
        daftarPesanan = JSON.parse(pesananStorage);
    }
}


// ------------------------------------------
// Logika Form & Tambah Menu nyaa dibawah ini
// ------------------------------------------

formMenu.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const nama = inputNama.value.trim();
    
    // lalu SOLUSI HARGA: Hapus semua titik (.) dan koma (,) sebelum parsing nyaa yaaa
    const hargaBersih = inputHarga.value.trim().replace(/\./g, '').replace(/,/g, '');
    const harga = parseInt(hargaBersih);
    
    const deskripsi = inputDeskripsi.value.trim();
    const foto = inputFoto.value.trim() || 'https://via.placeholder.com/400x300?text=No+Image';

    // ini buat Validasi
    if (!nama || isNaN(harga) || harga <= 0) {
        alert('Nama dan harga harus diisi dengan angka yang benar!');
        return;
    }

    const makanan = {
        id: Date.now(), 
        nama,
        harga,
        deskripsi,
        foto
    };

    daftarMenu.push(makanan);
    
    simpanData(); // kita Simpan ke Local Storagenya
    renderMenu();

    formMenu.reset();
});

// ------------------------------------
// Render Daftar Menunya ini pak
// ------------------------------------

function renderMenu() {
    menuList.innerHTML = ''; 

    if (daftarMenu.length === 0) {
        menuList.innerHTML = '<p class="col-span-full text-center text-xl p-8 text-gray-500">Belum ada menu yang tersedia. Silakan tambahkan dari formulir di atas!</p>';
        return;
    }

    daftarMenu.forEach(makanan => {
        const itemPesanan = daftarPesanan.find(item => item.id === makanan.id);
        const jumlahPesanan = itemPesanan ? itemPesanan.jumlah : 0;
        
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform hover:scale-[1.02] transition duration-300 relative';
        
        // Tampilkan badge jumlah pesanan jika (kaya semisal belum ada pesanan jadi 0 gitu) > 0
        const badge = jumlahPesanan > 0 
            ? `<span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">Qty: ${jumlahPesanan}</span>` 
            : '';

        card.innerHTML = `
            ${badge}
            <img src="${makanan.foto}" alt="${makanan.nama}" class="h-48 w-full object-cover">
            <div class="p-4 flex-1 flex flex-col">
                <h3 class="font-bold text-xl text-gray-800">${makanan.nama}</h3>
                <p class="text-sm text-gray-500 flex-1 mt-1 mb-3 line-clamp-2">${makanan.deskripsi || 'Tidak ada deskripsi.'}</p>
                <p class="font-extrabold text-green-600 text-xl mt-2">Rp ${makanan.harga.toLocaleString('id-ID')}</p>
            </div>
            <button class="add-to-order-btn bg-green-600 text-white py-3 hover:bg-green-700 font-semibold transition duration-150">
                Tambah ke Pesanan
            </button>
        `;

        const btn = card.querySelector('.add-to-order-btn');
        btn.addEventListener('click', () => {
            tambahPesanan(makanan);
            btn.textContent = 'Ditambahkan! ✅';
            setTimeout(() => {
                btn.textContent = 'Tambah ke Pesanan';
            }, 500);
        });

        menuList.appendChild(card);
    });
}

// ------------------------------------
// Logika Pesanan pesanannya pak 
// ------------------------------------

function tambahPesanan(makanan) {
    const found = daftarPesanan.find(item => item.id === makanan.id);
    if (found) {
        found.jumlah += 1;
    } else {
        daftarPesanan.push({ ...makanan, jumlah: 1 });
    }
    simpanData(); // Simpan
    renderPesanan();
    renderMenu(); // Render menu untuk update badge Qty
}

function renderPesanan() {
    orderList.innerHTML = '';
    let total = 0;

    if (daftarPesanan.length === 0) {
        orderList.innerHTML = '<li class="text-center py-6 text-lg text-gray-500">Daftar pesanan masih kosong.</li>';
        totalHarga.textContent = `Total: Rp 0`;
        btnKonfirmasi.disabled = true;
        btnKonfirmasi.classList.remove('hover:bg-green-800');
        btnKonfirmasi.classList.add('bg-gray-400');
        return;
    }
    
    // Aktifkan tombol dan style jika ada pesanan
    btnKonfirmasi.disabled = false;
    btnKonfirmasi.classList.add('hover:bg-green-800');
    btnKonfirmasi.classList.remove('bg-gray-400');


    daftarPesanan.forEach(item => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center py-3 group hover:bg-gray-50 transition duration-100 px-2 rounded';
        
        const subtotal = item.harga * item.jumlah;

        li.innerHTML = `
            <div class="flex-1">
                <p class="font-semibold text-gray-800">${item.nama}</p>
                <p class="text-sm text-gray-500">Rp ${item.harga.toLocaleString('id-ID')} × <span class="font-bold text-base text-gray-700">${item.jumlah}</span></p>
            </div>
            <div class="flex items-center gap-3">
                <span class="font-bold text-lg text-green-600 min-w-28 text-right">Rp ${subtotal.toLocaleString('id-ID')}</span>
                <div class="flex gap-1">
                    <button class="bg-yellow-500 text-white w-7 h-7 flex items-center justify-center text-sm rounded-full decrease hover:bg-yellow-600 transition shadow-sm" title="Kurangi Jumlah">-</button>
                    <button class="bg-yellow-500 text-white w-7 h-7 flex items-center justify-center text-sm rounded-full increase hover:bg-yellow-600 transition shadow-sm" title="Tambah Jumlah">+</button>
                    <button class="bg-red-500 text-white px-3 py-1 text-sm rounded-lg delete hover:bg-red-600 transition shadow-sm" title="Hapus Item">Hapus</button>
                </div>
            </div>
        `;

        li.querySelector('.delete').addEventListener('click', () => hapusPesanan(item.id));
        li.querySelector('.increase').addEventListener('click', () => ubahJumlah(item.id, 1));
        li.querySelector('.decrease').addEventListener('click', () => ubahJumlah(item.id, -1));

        total += subtotal;
        orderList.appendChild(li);
    });

    totalHarga.textContent = `Total: Rp ${total.toLocaleString('id-ID')}`;
}

function hapusPesanan(id) {
    daftarPesanan = daftarPesanan.filter(item => item.id !== id);
    simpanData(); // Simpan
    renderPesanan();
    renderMenu(); // Render menu untuk update badge Qty
}

function ubahJumlah(id, delta) {
    const item = daftarPesanan.find(i => i.id === id);
    if (!item) return;

    item.jumlah += delta;

    if (item.jumlah <= 0) {
        hapusPesanan(id);
    } else {
        simpanData(); // Simpan
        renderPesanan();
        renderMenu(); // Render menu untuk update badge Qty
    }
}

// ------------------------------------
// Logika Tombol Selesaikan Pesanan
// ------------------------------------

btnKonfirmasi.addEventListener('click', () => {
    if (daftarPesanan.length === 0) {
        alert('Daftar pesanan kosong. Tidak ada yang perlu diselesaikan!');
        return;
    }
    
    const totalAkhir = totalHarga.textContent;
    const konfirmasi = confirm(`Konfirmasi Pesanan dengan ${totalAkhir}? Pesanan akan dikirim ke dapur.`);
    
    if (konfirmasi) {
        alert(`Pesanan ${totalAkhir} berhasil diselesaikan! Terima kasih telah memesan.`);
        
        // Kosongkan array dan penyimpanan lokal
        daftarPesanan = [];
        simpanData(); 
        
        // Render ulang tampilan
        renderPesanan();
        renderMenu();
    }
});


// ------------------------------------
// Inisialisasi Aplikasi
// ------------------------------------

muatData(); // Muat data dari Local Storage
renderMenu(); // Tampilkan menu
renderPesanan(); // Tampilkan pesanan