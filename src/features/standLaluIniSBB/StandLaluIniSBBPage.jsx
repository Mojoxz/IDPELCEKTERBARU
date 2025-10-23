import { useState } from 'react';
import { Download, FileSpreadsheet, CheckCircle, AlertCircle, Info, Upload, ChevronRight, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50">
      {/* Simplified Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center mb-6">
            <div className="bg-blue-50 p-3 rounded-xl mr-4">
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Cek Data Sama Kolom I dan J
              </h1>
              <p className="text-gray-600 text-lg">
                Cek baris di mana kolom I dan J memiliki nilai yang sama
              </p>
            </div>
          </div>
          
          {/* Simple Info Bar */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center">
              <Info className="h-5 w-5 text-gray-400 mr-3" />
              <p className="text-gray-600 text-sm">
                Upload file Excel, pilih sheet, dan kami akan menemukan semua baris dengan nilai sama di kolom I dan J. 
                Hasil menampilkan semua kolom dari A sampai Q.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* File Upload Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="bg-gray-100 p-2 rounded-lg mr-3">
                  <Upload className="h-5 w-5 text-gray-600" />
                </div>
                Upload File
              </h2>
              <FileUpload
                onFileSelect={handleFileSelect}
                selectedFile={file}
                label="Pilih File Excel"
              />
            </div>

            {/* Sheet Selection Card */}
            {sheetNames.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 animate-slide-up">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileSpreadsheet className="h-5 w-5 text-gray-600 mr-2" />
                  Pilih Sheet
                </h3>
                <select
                  value={selectedSheet}
                  onChange={(e) => setSelectedSheet(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">-- Pilih Sheet --</option>
                  {sheetNames.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>

                <button
                  onClick={handleProcess}
                  disabled={!selectedSheet || loading}
                  className="w-full mt-4 bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <LoadingSpinner text="Memproses..." />
                  ) : (
                    <>
                      Periksa Sheet
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Download Card */}
            {processedData && (
              <div className="bg-green-50 rounded-xl p-6 border border-green-200 animate-slide-up">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Hasil Ditemukan</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {processedData.length} baris dengan nilai sama di kolom I dan J
                </p>
                <button
                  onClick={handleDownload}
                  className="w-full bg-green-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Simpan Hasil ke Excel
                </button>
              </div>
            )}

            {/* Tips Card */}
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <div className="flex items-center mb-3">
                <Info className="h-5 w-5 text-amber-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Tips</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Pastikan file Excel memiliki format yang benar
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Kolom I dan J harus memiliki nilai yang dapat dibandingkan
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Hasil akan menampilkan semua kolom dari A sampai Q
                </li>
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {alert && (
              <div className="mb-6 animate-fade-in">
                <Alert
                  type={alert.type}
                  title={alert.title}
                  message={alert.message}
                  onClose={() => setAlert(null)}
                />
              </div>
            )}

            {loading && (
              <div className="bg-white rounded-xl shadow-sm p-12 flex flex-col items-center justify-center">
                <LoadingSpinner text="Memproses file..." />
              </div>
            )}

            {processedData && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-slide-up">
                <div className="bg-gray-50 border-b border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Hasil Pemeriksaan
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {processedData.length} baris dengan nilai sama di kolom I dan J
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'].map(col => (
                            <th key={col} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Kolom {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {processedData.slice(0, 100).map((row, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 transition-colors">
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                {cell || '-'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {processedData.length > 100 && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">
                        Menampilkan 100 dari {processedData.length} baris. 
                        Unduh file Excel untuk melihat semua hasil.
                      </p>
                    </div>
                  )}
                </div>A
              </div>
            )}

            {!file && !loading && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="bg-gray-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <FileSpreadsheet className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Belum Ada File
                </h3>
                <p className="text-gray-600 mb-6">
                  Upload file Excel untuk memulai pemeriksaan data
                </p>
                <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm text-gray-600">
                    <strong>Format yang didukung:</strong> .xlsx, .xls
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandLaluIniSBBPage;