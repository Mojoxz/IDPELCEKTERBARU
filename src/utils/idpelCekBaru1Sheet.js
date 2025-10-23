import * as XLSX from 'xlsx';

export const readAllIDPELs = (workbook) => {
  const allIDPELs = new Set();
  
  workbook.SheetNames.forEach(sheetName => {
    const ws = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, defval: '' });

    // Cari baris yang berisi "IDPEL" di kolom C (index 2)
    for (let i = 0; i < Math.min(data.length, 15); i++) {
      const cellValue = data[i][2]?.toString().trim().toUpperCase();
      if (cellValue === 'IDPEL') {
        // Ambil semua IDPEL mulai baris berikutnya
        for (let j = i + 1; j < data.length; j++) {
          const idpel = data[j][2]?.toString().trim();
          if (idpel) {
            allIDPELs.add(idpel);
          }
        }
        break;
      }
    }
  });

  return allIDPELs;
};

export const compareIDPEL1Sheet = (workbookSep, workbookOkt) => {
  const idpelSep = readAllIDPELs(workbookSep);
  const idpelOkt = readAllIDPELs(workbookOkt);

  if (idpelSep.size === 0 || idpelOkt.size === 0) {
    throw new Error('Tidak ditemukan data IDPEL pada salah satu file');
  }

  // IDPEL baru di Oktober
  const baruOktober = [...idpelOkt].filter(id => !idpelSep.has(id)).sort();
  
  // IDPEL tidak digunakan di Oktober
  const tidakDigunakan = [...idpelSep].filter(id => !idpelOkt.has(id)).sort();

  return {
    baru: baruOktober,
    tidakDigunakan: tidakDigunakan
  };
};

export const exportToExcel = (results, filename) => {
  const wb = XLSX.utils.book_new();

  // Sheet IDPEL Baru
  const wsBaru = XLSX.utils.aoa_to_sheet([
    ['IDPEL Baru di Oktober'],
    ...results.baru.map(id => [id])
  ]);
  XLSX.utils.book_append_sheet(wb, wsBaru, 'IDPEL Baru');

  // Sheet IDPEL Tidak Digunakan
  const wsTidak = XLSX.utils.aoa_to_sheet([
    ['IDPEL Tidak Digunakan di Oktober'],
    ...results.tidakDigunakan.map(id => [id])
  ]);
  XLSX.utils.book_append_sheet(wb, wsTidak, 'IDPEL Tidak Digunakan');

  XLSX.writeFile(wb, filename);
};