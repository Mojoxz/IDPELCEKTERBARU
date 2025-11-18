import * as XLSX from 'xlsx';

const HEADER_ROW_PANDAS = 8; // Header di baris ke-9 (0-based index)
const USECOLS_END = 15; // Kolom A-P (0-15)

/**
 * Proses file Excel untuk filter kolom N (PEMKWH) > 10000
 * @param {Object} workbook - XLSX workbook object
 * @returns {Object} - Object berisi hasil filter per sheet
 */
export const processPEMKWHSBU = (workbook) => {
  const results = {};
  
  workbook.SheetNames.forEach(sheetName => {
    try {
      const sheet = workbook.Sheets[sheetName];
      
      if (!sheet) {
        console.log(`Sheet '${sheetName}' tidak ditemukan`);
        return;
      }
      
      const range = XLSX.utils.decode_range(sheet['!ref']);
      
      // Baca header dari baris yang ditentukan
      const headers = [];
      for (let col = 0; col <= USECOLS_END; col++) { // Kolom A-P
        const cellAddress = XLSX.utils.encode_cell({ r: HEADER_ROW_PANDAS, c: col });
        const cell = sheet[cellAddress];
        headers.push(cell ? cell.v : `Column_${col}`);
      }
      
      // Pastikan ada minimal 14 kolom (untuk kolom N di index 13)
      if (headers.length < 14) {
        console.log(`Sheet '${sheetName}' kolom kurang dari 14 kolom, dilewati`);
        return;
      }
      
      const colNName = headers[13]; // Kolom N = index 13
      
      // Baca data mulai dari baris setelah header
      const data = [];
      for (let row = HEADER_ROW_PANDAS + 1; row <= range.e.r; row++) {
        const rowData = {};
        for (let col = 0; col <= USECOLS_END; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
          const cell = sheet[cellAddress];
          rowData[headers[col]] = cell ? cell.v : null;
        }
        data.push(rowData);
      }
      
      // Filter kolom N (PEMKWH) > 10000
      const filtered = data.filter(row => {
        const colNValue = parseFloat(row[colNName]);
        return !isNaN(colNValue) && colNValue > 10000;
      });
      
      if (filtered.length === 0) {
        console.log(`Sheet '${sheetName}': tidak ditemukan nilai ${colNName} > 10000`);
        return;
      }
      
      // Sort descending berdasarkan kolom N
      filtered.sort((a, b) => {
        const valA = parseFloat(a[colNName]) || 0;
        const valB = parseFloat(b[colNName]) || 0;
        return valB - valA;
      });
      
      results[sheetName] = {
        headers,
        data: filtered,
        columnNIndex: 13 // Untuk highlighting
      };
      
    } catch (error) {
      console.error(`Error memproses sheet '${sheetName}':`, error);
    }
  });
  
  return results;
};

/**
 * Export hasil ke Excel dengan conditional formatting
 * @param {Object} results - Object hasil filter
 * @param {string} filename - Nama file output
 */
export const exportToExcelWithFormatting = (results, filename) => {
  const wb = XLSX.utils.book_new();
  
  Object.keys(results).forEach(sheetName => {
    const { headers, data } = results[sheetName];
    
    // Konversi data ke format array of arrays
    const wsData = [headers];
    data.forEach(row => {
      const rowArray = headers.map(header => row[header] !== null && row[header] !== undefined ? row[header] : '');
      wsData.push(rowArray);
    });
    
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    
    // Terapkan styling untuk kolom N (highlight kuning)
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let row = 1; row <= range.e.r; row++) { // Mulai dari baris 1 (setelah header)
      for (let col = 0; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        if (!ws[cellAddress]) continue;
        
        // Highlight baris jika kolom N > 10000
        const colNAddress = XLSX.utils.encode_cell({ r: row, c: 13 });
        const colNCell = ws[colNAddress];
        if (colNCell && parseFloat(colNCell.v) > 10000) {
          if (!ws[cellAddress].s) ws[cellAddress].s = {};
          ws[cellAddress].s.fill = {
            fgColor: { rgb: "FFFF00" }
          };
        }
      }
    }
    
    // Batasi nama sheet maksimal 31 karakter
    let outputSheetName = `${sheetName}_filtered`;
    if (outputSheetName.length > 31) {
      outputSheetName = outputSheetName.substring(0, 31);
    }
    
    XLSX.utils.book_append_sheet(wb, ws, outputSheetName);
  });
  
  XLSX.writeFile(wb, filename);
};