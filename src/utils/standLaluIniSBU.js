import * as XLSX from 'xlsx';

export const processStandLaluIniSBU = (workbook, sheetName) => {
  const worksheet = workbook.Sheets[sheetName];
  if (!worksheet) {
    throw new Error(`Sheet ${sheetName} tidak ditemukan`);
  }

  // Baca dengan header di baris ke-9 (index 8)
  const jsonData = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    raw: false,
    defval: ''
  });

  if (jsonData.length < 9) {
    throw new Error('Data tidak mencukupi');
  }

  // Ambil header dari baris ke-9 (index 8)
  const headers = jsonData[8];
  
  // Cari index kolom STAND LALU dan STAND INI
  const standLaluIdx = headers.findIndex(h => 
    h && h.toString().trim().toUpperCase() === 'STAND LALU'
  );
  const standIniIdx = headers.findIndex(h => 
    h && h.toString().trim().toUpperCase() === 'STAND INI'
  );

  if (standLaluIdx === -1 || standIniIdx === -1) {
    throw new Error("Kolom 'STAND LALU' atau 'STAND INI' tidak ditemukan");
  }

  // Ambil data mulai baris ke-10 (index 9)
  const dataRows = jsonData.slice(9);

  // Filter data di mana STAND LALU ≠ STAND INI
  const filteredData = dataRows.filter(row => {
    const standLalu = row[standLaluIdx]?.toString().trim();
    const standIni = row[standIniIdx]?.toString().trim();
    return standLalu && standIni && standLalu !== standIni;
  });

  // Convert ke object dengan header
  const result = filteredData.map(row => {
    const obj = {};
    headers.forEach((header, idx) => {
      obj[header] = row[idx] || '';
    });
    return obj;
  });

  return {
    headers,
    data: result
  };
};

export const exportToExcel = (headers, data, filename) => {
  // Convert object array ke array of arrays
  const rows = data.map(obj => headers.map(h => obj[h] || ''));
  const wsData = [headers, ...rows];
  
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Filtered Data');
  XLSX.writeFile(wb, filename);
};