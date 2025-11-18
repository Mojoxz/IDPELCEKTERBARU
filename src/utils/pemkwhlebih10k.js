import * as XLSX from 'xlsx';

/**
 * Konfigurasi sheet dan baris header (0-based index)
 */
const SHEET_HEADERS = {
  "DMP": 7,
  "DKP": 6,
  "NGL": 6,
  "RKT": 6,
  "GDN": 6
};

/**
 * Proses file Excel untuk filter PEMKWH > 10000
 * @param {Object} workbook - XLSX workbook object
 * @returns {Object} - Object berisi hasil filter per sheet
 */
export const processPEMKWH = (workbook) => {
  const results = {};
  
  Object.keys(SHEET_HEADERS).forEach(sheetName => {
    try {
      const sheet = workbook.Sheets[sheetName];
      
      if (!sheet) {
        console.log(`Sheet '${sheetName}' tidak ditemukan`);
        return;
      }
      
      const headerRow = SHEET_HEADERS[sheetName];
      
      // Konversi sheet ke JSON dengan header di baris yang ditentukan
      const range = XLSX.utils.decode_range(sheet['!ref']);
      const data = [];
      
      // Baca header dari baris yang ditentukan
      const headers = [];
      for (let col = 0; col <= 16; col++) { // Kolom A-Q (0-16)
        const cellAddress = XLSX.utils.encode_cell({ r: headerRow, c: col });
        const cell = sheet[cellAddress];
        headers.push(cell ? cell.v : `Column_${col}`);
      }
      
      // Baca data mulai dari baris setelah header
      for (let row = headerRow + 1; row <= range.e.r; row++) {
        const rowData = {};
        for (let col = 0; col <= 16; col++) { // Kolom A-Q
          const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
          const cell = sheet[cellAddress];
          rowData[headers[col]] = cell ? cell.v : null;
        }
        data.push(rowData);
      }
      
      // Cari kolom PEMKWH
      const pemkwhColumn = headers.find(h => 
        h && h.toString().toUpperCase().includes('PEMKWH')
      );
      
      if (!pemkwhColumn) {
        console.log(`Sheet '${sheetName}' tidak punya kolom PEMKWH`);
        return;
      }
      
      // Filter data PEMKWH > 10000
      const filtered = data.filter(row => {
        const pemkwhValue = parseFloat(row[pemkwhColumn]);
        return !isNaN(pemkwhValue) && pemkwhValue > 10000;
      });
      
      if (filtered.length > 0) {
        // Tambahkan kolom SHEET
        filtered.forEach(row => {
          row.SHEET = sheetName;
        });
        
        results[sheetName] = {
          headers: [...headers, 'SHEET'],
          data: filtered
        };
      }
      
    } catch (error) {
      console.error(`Error membaca sheet ${sheetName}:`, error);
    }
  });
  
  return results;
};

/**
 * Export hasil ke Excel
 * @param {Object} results - Object hasil filter
 * @param {string} filename - Nama file output
 */
export const exportToExcel = (results, filename) => {
  const wb = XLSX.utils.book_new();
  
  Object.keys(results).forEach(sheetName => {
    const { headers, data } = results[sheetName];
    
    // Konversi data ke format array of arrays
    const wsData = [headers];
    data.forEach(row => {
      const rowArray = headers.map(header => row[header] || '');
      wsData.push(rowArray);
    });
    
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    
    // Batasi nama sheet maksimal 31 karakter
    let outputSheetName = `${sheetName}_filtered`;
    if (outputSheetName.length > 31) {
      outputSheetName = outputSheetName.substring(0, 31);
    }
    
    XLSX.utils.book_append_sheet(wb, ws, outputSheetName);
  });
  
  XLSX.writeFile(wb, filename);
};