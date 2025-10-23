import * as XLSX from 'xlsx';

export const processStandLaluMultiple = (workbook) => {
  const sheetConfig = {
    "DMP": 7,   // header di baris ke-8 (index 7)
    "DKP": 6,   // header di baris ke-7 (index 6)
    "NGL": 6,
    "RKT": 6,
    "GDN": 6
  };

  const results = {};

  Object.keys(sheetConfig).forEach(sheetName => {
    if (!workbook.SheetNames.includes(sheetName)) {
      return;
    }

    try {
      const ws = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, defval: '' });

      const headerRow = sheetConfig[sheetName];
      
      if (data.length <= headerRow) {
        return;
      }

      const headers = data[headerRow];
      
      // Cari index kolom SLALWBP dan SAHLWBP
      const slalwbpIdx = headers.findIndex(h => 
        h && h.toString().trim().toUpperCase() === 'SLALWBP'
      );
      const sahlwbpIdx = headers.findIndex(h => 
        h && h.toString().trim().toUpperCase() === 'SAHLWBP'
      );

      if (slalwbpIdx === -1 || sahlwbpIdx === -1) {
        console.warn(`Kolom SLALWBP/SAHLWBP tidak ditemukan di sheet ${sheetName}`);
        return;
      }

      // Filter baris di mana SLALWBP === SAHLWBP
      const dataRows = data.slice(headerRow + 1);
      const filtered = dataRows.filter(row => {
        const slalwbp = row[slalwbpIdx]?.toString().trim();
        const sahlwbp = row[sahlwbpIdx]?.toString().trim();
        return slalwbp && sahlwbp && slalwbp === sahlwbp;
      });

      // Convert ke object
      const result = filtered.map(row => {
        const obj = {};
        headers.forEach((header, idx) => {
          obj[header] = row[idx] || '';
        });
        return obj;
      });

      results[sheetName] = {
        headers,
        data: result
      };
    } catch (error) {
      console.error(`Error processing sheet ${sheetName}:`, error);
    }
  });

  return results;
};

export const exportToExcel = (results, filename) => {
  const wb = XLSX.utils.book_new();

  Object.keys(results).forEach(sheetName => {
    const { headers, data } = results[sheetName];
    
    const rows = data.map(obj => headers.map(h => obj[h] || ''));
    const wsData = [headers, ...rows];
    
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });

  XLSX.writeFile(wb, filename);
};