import { useState } from 'react';
import * as XLSX from 'xlsx';

export const useFileReader = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const readExcelFile = async (file, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array', ...options });
      setLoading(false);
      return workbook;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const getSheetNames = (workbook) => {
    return workbook.SheetNames;
  };

  const getSheetData = (workbook, sheetName, options = {}) => {
    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) return null;

    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      raw: false,
      defval: '',
      ...options
    });

    return jsonData;
  };

  const getSheetDataWithHeader = (workbook, sheetName, headerRow = 0) => {
    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) return null;

    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      raw: false,
      defval: ''
    });

    if (jsonData.length <= headerRow) return { headers: [], data: [] };

    const headers = jsonData[headerRow];
    const data = jsonData.slice(headerRow + 1).map(row => {
      const obj = {};
      headers.forEach((header, idx) => {
        obj[header] = row[idx] || '';
      });
      return obj;
    });

    return { headers, data };
  };

  return {
    loading,
    error,
    readExcelFile,
    getSheetNames,
    getSheetData,
    getSheetDataWithHeader
  };
};