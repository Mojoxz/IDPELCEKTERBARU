import * as XLSX from 'xlsx';

export const compareIDPELMultipleSheets = (workbookOkt, workbookSep) => {
  const sheets = ["DMP", "RKT", "GDN", "NGL", "DKP"];
  const results = {};

  sheets.forEach(sheetName => {
    try {
      const wsOkt = workbookOkt.Sheets[sheetName];
      const wsSep = workbookSep.Sheets[sheetName];

      if (!wsOkt || !wsSep) {
        results[sheetName] = {
          error: `Sheet ${sheetName} tidak ditemukan di salah satu file`
        };
        return;
      }

      // Baca data sebagai array
      const dataOkt = XLSX.utils.sheet_to_json(wsOkt, { header: 1, raw: false, defval: '' });
      const dataSep = XLSX.utils.sheet_to_json(wsSep, { header: 1, raw: false, defval: '' });

      // Tentukan baris awal berdasarkan sheet
      const startRow = sheetName === "DMP" ? 8 : 7;

      // Ambil IDPEL dari kolom C (index 2)
      const getIDPELs = (data, start) => {
        const idpels = new Set();
        for (let i = start; i < data.length; i++) {
          const idpel = data[i][2]?.toString().trim();
          if (idpel) {
            idpels.add(idpel);
          }
        }
        return idpels;
      };

      const idpelOkt = getIDPELs(dataOkt, startRow);
      const idpelSep = getIDPELs(dataSep, startRow);

      // IDPEL baru di Oktober (ada di Okt, tidak ada di Sep)
      const idpelBaru = [...idpelOkt].filter(id => !idpelSep.has(id)).sort();

      // IDPEL hilang di Oktober (ada di Sep, tidak ada di Okt)
      const idpelHilang = [...idpelSep].filter(id => !idpelOkt.has(id)).sort();

      results[sheetName] = {
        baru: idpelBaru,
        hilang: idpelHilang
      };
    } catch (error) {
      results[sheetName] = {
        error: error.message
      };
    }
  });

  return results;
};

export const exportComparisonToExcel = (results, filename) => {
  const wb = XLSX.utils.book_new();

  Object.keys(results).forEach(sheetName => {
    const result = results[sheetName];
    
    if (result.error) {
      const ws = XLSX.utils.aoa_to_sheet([['Error', result.error]]);
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
      return;
    }

    const maxLen = Math.max(result.baru.length, result.hilang.length);
    const data = [
      ['IDPEL Baru (Oktober)', 'IDPEL Tidak Digunakan (Hilang di Oktober)']
    ];

    for (let i = 0; i < maxLen; i++) {
      data.push([
        result.baru[i] || '',
        result.hilang[i] || ''
      ]);
    }

    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });

  XLSX.writeFile(wb, filename);
};