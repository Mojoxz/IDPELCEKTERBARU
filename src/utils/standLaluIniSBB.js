import * as XLSX from 'xlsx';

export const processStandLaluIniSBB = (workbook, sheetName) => {
  const worksheet = workbook.Sheets[sheetName];
  if (!worksheet) {
    throw new Error(`Sheet ${sheetName} tidak ditemukan`);
  }

  // Baca data tanpa header (raw data)
  const data = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    raw: false,
    defval: ''
  });

  // Pastikan ada minimal 10 kolom (A sampai J)
  if (!data[0] || data[0].length < 10) {
    throw new Error(`Sheet ${sheetName} tidak memiliki kolom I dan J`);
  }

  // Filter baris di mana kolom I (index 8) === kolom J (index 9)
  const filteredData = data.filter(row => {
    return row[8] && row[9] && row[8].toString().trim() === row[9].toString().trim();
  });

  if (filteredData.length === 0) {
    return null;
  }

  return filteredData;
};

export const exportToExcel = (data, sheetName, filename) => {
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, filename);
};