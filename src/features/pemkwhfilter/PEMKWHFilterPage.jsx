import { useState } from 'react';
import { Download, FileSpreadsheet, Filter, CheckCircle, AlertCircle, Info, Upload, ChevronRight, Zap } from 'lucide-react';
import FileUpload from '../../components/ui/FileUpload';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Alert from '../../components/ui/Alert';
import { useFileReader } from '../../hooks/useFileReader';
import { processPEMKWH, exportToExcel } from '../../utils/pemkwhlebih10k';

const PEMKWHFilterPage = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [alert, setAlert] = useState(null);
  
  const { loading, readExcelFile } = useFileReader();

  const handleProcess = async () => {
    if (!file) {
      setAlert({
        type: 'warning',
        message: 'Harap pilih file terlebih dahulu'
      });
      return;
    }

    try {
      const wb = await readExcelFile(file);
      const processedResults = processPEMKWH(wb);
      
      const totalSheets = Object.keys(processedResults).length;
      
      if (totalSheets === 0) {
        setAlert({
          type: 'info',
          message: 'Tidak ada data PEMKWH > 10000 ditemukan'
        });
        setResults(null);
      } else {
        const totalRows = Object.values(processedResults).reduce(
          (sum, sheet) => sum + sheet.data.length, 
          0
        );
        setResults(processedResults);
        setAlert({
          type: 'success',
          message: `Ditemukan ${totalRows} baris di ${totalSheets} sheet`
        });
      }
    } catch (error) {
      setAlert({
        type: 'error',
        title: 'Error',
        message: error.message
      });
    }
  };

  const handleDownload = () => {
    if (results && Object.keys(results).length > 0) {
      const filename = `PEMKWH_Filtered_${Date.now()}.xlsx`;
      exportToExcel(results, filename);
      setAlert({
        type: 'success',
        message: 'Hasil berhasil disimpan!'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center mb-6">
            <div className="bg-blue-50 p-3 rounded-xl mr-4">
              <Filter className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Filter PEMKWH {">"} 10000
              </h1>
              <p className="text-gray-600 text-lg">
                Filter data PEMKWH yang nilainya lebih dari 10000 dari kolom A–Q
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center">
              <Info className="h-5 w-5 text-gray-400 mr-3" />
              <p className="text-gray-600 text-sm">
                Upload file Excel dan sistem akan memfilter data dari sheet: DMP, DKP, NGL, RKT, GDN
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
                onFileSelect={setFile}
                selectedFile={file}
                label="Pilih File Excel"
              />

              <button
                onClick={handleProcess}
                disabled={!file || loading}
                className="w-full mt-4 bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <LoadingSpinner text="Memproses..." />
                ) : (
                  <>
                    Proses File
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </div>

            {/* Download Card */}
            {results && Object.keys(results).length > 0 && (
              <div className="bg-green-50 rounded-xl p-6 border border-green-200 animate-slide-up">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Hasil Ditemukan</h3>
                </div>
                <div className="space-y-2 mb-4">
                  {Object.keys(results).map(sheetName => (
                    <div key={sheetName} className="flex justify-between text-sm">
                      <span className="text-gray-600">{sheetName}:</span>
                      <span className="font-medium">{results[sheetName].data.length} baris</span>
                    </div>
                  ))}
                </div>
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
                <h3 className="font-semibold text-gray-900">Konfigurasi Sheet</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  DMP: Header di baris 8
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  DKP, NGL, RKT, GDN: Header di baris 7
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Hanya kolom A sampai Q yang diproses
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Filter: PEMKWH {">"} 10000
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

            {results && Object.keys(results).length > 0 && (
              <div className="space-y-6">
                {Object.keys(results).map((sheetName, idx) => {
                  const { headers, data } = results[sheetName];
                  
                  return (
                    <div key={sheetName} className="bg-white rounded-xl shadow-sm overflow-hidden animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <div className="bg-gray-50 border-b border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-between">
                          <span className="flex items-center">
                            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mr-3">
                              {sheetName}
                            </div>
                            <span className="text-gray-600 text-sm font-normal">
                              {data.length} baris
                            </span>
                          </span>
                        </h3>
                      </div>
                      
                      <div className="p-6">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                {headers.map((header, idx) => (
                                  <th key={idx} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {data.slice(0, 100).map((row, rowIdx) => (
                                <tr key={rowIdx} className="hover:bg-gray-50 transition-colors">
                                  {headers.map((header, colIdx) => (
                                    <td key={colIdx} className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                      {row[header] !== null && row[header] !== undefined ? row[header] : '-'}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        
                        {data.length > 100 && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-700">
                              Menampilkan 100 dari {data.length} baris. 
                              Unduh file Excel untuk melihat semua hasil.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
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
                  Upload file Excel untuk memulai pemrosesan data
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

export default PEMKWHFilterPage;