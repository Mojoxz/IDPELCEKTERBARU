import * as XLSX from 'xlsx';

/**
 * Memproses workbook dan sheet yang dipilih untuk menemukan baris di mana kolom L dan M sama.
 * Versi ini lebih aman dan tidak bergantung pada properti '!ref' yang bisa hilang.
 * @param {XLSX.WorkBook} workbook - Objek workbook dari XLSX.
 * @param {string} sheetName - Nama sheet yang akan diproses.
 * @returns {Promise<{headers: string[], data: Object[], sheetName: string}>}
 */
export const processStandLaluIniSBU = (workbook, sheetName) => {
  const worksheet = workbook.Sheets[sheetName];
  if (!worksheet) {
    throw new Error(`Sheet ${sheetName} tidak ditemukan`);
  }

  // --- PERUBAHAN: Pendekatan yang lebih aman ---
  // 1. Baca seluruh worksheet sebagai array of arrays tanpa menentukan range.
  //    `raw: true` untuk mendapatkan nilai asli (angka tetap angka).
  const jsonData = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    raw: true,
    defval: null // Gunakan null untuk sel kosong
  });

  // 2. Periksa apakah ada cukup baris untuk header (baris ke-9, index 8).
  //    Jika tidak, kembalikan hasil kosong untuk menghindari error.
  if (jsonData.length < 9) {
    return {
      headers: [],
      data: [],
      sheetName
    };
  }

  // 3. Ambil header dari baris ke-9 (index 8) dan batasi hingga 16 kolom (A:P).
  //    Ini meniru `usecols="A:P"` dengan cara yang lebih aman.
  const fullHeaders = jsonData[8];
  const headers = fullHeaders.slice(0, 16); // Mengambil kolom A hingga P

  // 4. Pastikan kolom minimal 13 (karena L & M adalah kolom ke-12 dan ke-13).
  if (headers.length < 13) {
    throw new Error(`Sheet ${sheetName} tidak memiliki kolom L dan M (minimal 13 kolom).`);
  }

  // 5. Ambil indeks kolom L dan M berdasarkan posisi.
  const kolomLIdx = 11; // kolom ke-12 (L)
  const kolomMIdx = 12; // kolom ke-13 (M)

  // 6. Ambil data mulai baris ke-10 (index 9) dan batasi setiap baris hingga 16 kolom.
  const dataRows = jsonData.slice(9).map(row => row.slice(0, 16));

  // 7. Filter data di mana kolom L = kolom M.
  const filteredData = dataRows.filter(row => {
    const valL = row[kolomLIdx];
    const valM = row[kolomMIdx];

    // Kecualikan baris jika salah satu nilai kosong (null atau undefined)
    if (valL == null || valM == null) {
      return false;
    }

    // Lakukan perbandingan "longgar" dengan mengonversi ke string dan menghapus spasi.
    return String(valL).trim() === String(valM).trim();
  });

  // 8. Konversi array baris menjadi array objek.
  const result = filteredData.map(row => {
    const obj = {};
    headers.forEach((header, idx) => {
      obj[header] = row[idx] ?? ''; // Gunakan nullish coalescing untuk nilai kosong
    });
    return obj;
  });

  return {
    headers,
    data: result,
    sheetName
  };
};

// Fungsi lainnya tidak berubah
export const exportToExcel = (headers, data, filename, sheetName) => {
  const rows = data.map(obj => headers.map(h => obj[h] ?? ''));
  const wsData = [headers, ...rows];
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName || 'Filtered Data');
  XLSX.writeFile(wb, filename);
};

export const processExcelFile = (file, selectedSheetName) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetNames = workbook.SheetNames;
        if (!selectedSheetName || !sheetNames.includes(selectedSheetName)) {
          throw new Error("Nama sheet tidak valid atau tidak dipilih.");
        }
        const result = processStandLaluIniSBU(workbook, selectedSheetName);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => {
      reject(new Error('Gagal membaca file.'));
    };
    reader.readAsArrayBuffer(file);
  });
};