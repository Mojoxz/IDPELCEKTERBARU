import { useState } from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';
import FileUpload from '../../components/ui/FileUpload';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Alert from '../../components/ui/Alert';
import DataTable from '../../components/ui/DataTable';
import { useFileReader } from '../../hooks/useFileReader';
import { processStandLaluIniSBB, exportToExcel } from '../../utils/standLaluIniSBB';

const StandLaluIniSBBPage = () => {
  const [file, setFile] = useState(null);
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [processedData, setProcessedData] = useState(null);
  const [alert, setAlert] = useState(null);
  const [workbook, setWorkbook] = useState(null);
  
  const { loading, readExcelFile } = useFileReader();

  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);
    setSheetNames([]);
    setSelectedSheet('');
    setProcessedData(null);
    setAlert(null);

    if (selectedFile) {
      try {
        const wb = await readExcelFile(selectedFile);
        setWorkbook(wb);
        setSheetNames(wb.SheetNames);
        setAlert({
          type: 'success',
          message: `File berhasil dimuat! Ditemukan ${wb.SheetNames.length} sheet.`
        });
      } catch (error) {
        setAlert({
          type: 'error',
          title: 'Error',
          message: error.message
        });
      }
    }
  };

  const handleProcess = () => {
    if (!selectedSheet) {
      setAlert({
        type: 'warning',
        message: 'Silakan pilih sheet terlebih dahulu'
      });
      return;
    }

    try {
      const result = processStandLaluIniSBB(workbook, selectedSheet);
      
      if (!result) {
        setAlert({
          type: 'info',
          message: `Tidak ditemukan data yang sama antara kolom I dan J di sheet ${selectedSheet}`
        });
        setProcessedData(null);
        return;
      }

      setProcessedData(result);
      setAlert({
        type: 'success',
        message: `Ditemukan ${result.length} baris yang memiliki nilai sama di kolom I dan J`
      });
    } catch (error) {
      setAlert({
        type: 'error',
        title: 'Error',
        message: error.message
      });
    }
  };

  const handleDownload = () => {
    if (processedData) {
      const filename = `Hasil_${selectedSheet}_${Date.now()}.xlsx`;
      exportToExcel(processedData, selectedSheet, filename);
      setAlert({
        type: 'success',
        message: 'File berhasil diunduh!'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Cek Data Sama Kolom I dan J (1 Sheet)
        </h1>
        <p className="text-gray-600">
          Cek baris di mana kolom I dan J memiliki nilai yang sama. Menampilkan semua kolom dari A sampai Q.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card animate-slide-up">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <FileSpreadsheet className="mr-2 h-5 w-5 text-primary-500" />
              Upload File
            </h2>
            <FileUpload
              onFileSelect={handleFileSelect}
              selectedFile={file}
              label="Pilih File Excel"
            />
          </div>

          {sheetNames.length > 0 && (
            <div className="card animate-slide-up">
              <h3 className="text-sm font-medium mb-2">Pilih Sheet</h3>
              <select
                value={selectedSheet}
                onChange={(e) => setSelectedSheet(e.target.value)}
                className="input-field"
              >
                <option value="">-- Pilih Sheet --</option>
                {sheetNames.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>

              <button
                onClick={handleProcess}
                disabled={!selectedSheet || loading}
                className="btn btn-primary w-full mt-4"
              >
                Periksa Sheet
              </button>
            </div>
          )}

          {processedData && (
            <div className="card animate-slide-up bg-primary-50 border-primary-200">
              <button
                onClick={handleDownload}
                className="btn btn-success w-full flex items-center justify-center"
              >
                <Download className="mr-2 h-4 w-4" />
                Simpan Hasil ke Excel
              </button>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          {alert && (
            <div className="mb-4 animate-fade-in">
              <Alert
                type={alert.type}
                title={alert.title}
                message={alert.message}
                onClose={() => setAlert(null)}
              />
            </div>
          )}

          {loading && <LoadingSpinner text="Memproses file..." />}

          {processedData && (
            <div className="card animate-slide-up">
              <h3 className="text-lg font-semibold mb-4">
                Hasil ({processedData.length} baris)
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <tbody>
                    {processedData.map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        {row.map((cell, cellIdx) => (
                          <td key={cellIdx} className="px-3 py-2 whitespace-nowrap">
                            {cell || '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StandLaluIniSBBPage;
