import * as XLSX from 'xlsx';

export const findDuplicateIDPELMultiSheet = (workbook) => {
  const targetSheets = ["DMP", "DKP", "NGL", "RKT", "GDN"];
  const results = {};

  targetSheets.forEach(sheetName => {
    if (!workbook.SheetNames.includes(sheetName)) {
      return;
    }

    try {
      const ws = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, defval: '' });

      // Cari kolom IDPEL
      let headers = null;
      let idpelColIdx = null;
      let startRow = 0;

      for (let i = 0; i < Math.min(data.length, 15); i++) {
        for (let j = 0; j < data[i].length; j++) {
          const cellValue = data[i][j]?.toString().trim().toUpperCase();
          if (cellValue === 'IDPEL') {
            idpelColIdx = j;
            headers = data[i];
            startRow = i + 1;
            break;
          }
        }
        if (idpelColIdx !== null) break;
      }

      if (idpelColIdx === null) {
        return;
      }

      // Ambil semua data
      const sheetData = [];
      for (let i = startRow; i < data.length; i++) {
        const row = data[i];
        const idpel = row[idpelColIdx]?.toString().trim();
        if (idpel) {
          const rowObj = {};
          headers.forEach((header, idx) => {
            rowObj[header] = row[idx] || '';
          });
          sheetData.push(rowObj);
        }
      }

      // Cari duplikat
      const idpelCount = {};
      sheetData.forEach(row => {
        const idpel = row['IDPEL'] || row['idpel'];
        idpelCount[idpel] = (idpelCount[idpel] || 0) + 1;
      });

      const duplicates = sheetData.filter(row => {
        const idpel = row['IDPEL'] || row['idpel'];
        return idpelCount[idpel] > 1;
      });

      if (duplicates.length > 0) {
        results[sheetName] = {
          headers,
          data: duplicates
        };
      }
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