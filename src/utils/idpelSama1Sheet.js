import * as XLSX from 'xlsx';

export const findDuplicateIDPEL = (workbook) => {
  const allData = [];

  workbook.SheetNames.forEach(sheetName => {
    const ws = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, defval: '' });

    // Cari kolom IDPEL
    let idpelColIdx = null;
    let startRow = 0;

    for (let i = 0; i < Math.min(data.length, 15); i++) {
      for (let j = 0; j < data[i].length; j++) {
        const cellValue = data[i][j]?.toString().trim().toUpperCase();
        if (cellValue === 'IDPEL') {
          idpelColIdx = j;
          startRow = i + 1;
          break;
        }
      }
      if (idpelColIdx !== null) break;
    }

    if (idpelColIdx !== null) {
      for (let i = startRow; i < data.length; i++) {
        const idpel = data[i][idpelColIdx]?.toString().trim();
        if (idpel) {
          allData.push({
            IDPEL: idpel,
            Sheet: sheetName
          });
        }
      }
    }
  });

  if (allData.length === 0) {
    throw new Error('Tidak ditemukan kolom IDPEL di file ini');
  }

  // Cari duplikat
  const idpelCount = {};
  allData.forEach(item => {
    idpelCount[item.IDPEL] = (idpelCount[item.IDPEL] || 0) + 1;
  });

  const duplicates = allData
    .filter(item => idpelCount[item.IDPEL] > 1)
    .sort((a, b) => a.IDPEL.localeCompare(b.IDPEL));

  return duplicates;
};

export const exportToExcel = (duplicates, filename) => {
  const data = [
    ['IDPEL', 'Sheet'],
    ...duplicates.map(d => [d.IDPEL, d.Sheet])
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Duplikat');
  XLSX.writeFile(wb, filename);
};