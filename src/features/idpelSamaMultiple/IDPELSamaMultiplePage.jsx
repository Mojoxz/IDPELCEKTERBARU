import { useState } from 'react';
import { Download, FileSpreadsheet, Search, CheckCircle, AlertCircle, Info, Upload, ChevronRight, Sparkles } from 'lucide-react';
import FileUpload from '../../components/ui/FileUpload';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Alert from '../../components/ui/Alert';
import DataTable from '../../components/ui/DataTable';
import { useFileReader } from '../../hooks/useFileReader';
import { findDuplicateIDPELMultiSheet, exportToExcel } from '../../utils/idpelSamaMultiple';

const IDPELSamaMultiplePage = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [alert, setAlert] = useState(null);
  
  const { loading, readExcelFile } = useFileReader();

  const handleCheck = async () => {
    if (!file) {
      setAlert({
        type: 'warning',
        message: 'Harap pilih file terlebih dahulu'
      });
      return;
    }

    try {
      const wb = await readExcelFile(file);
      const duplicateResults = findDuplicateIDPELMultiSheet(wb);
      
      setResults(duplicateResults);
      
      const totalSheets = Object.keys(duplicateResults).length;
      
      if (totalSheets === 0) {
        setAlert({
          type: 'info',
          message: 'Tidak ditemukan IDPEL duplikat di sheet yang ditentukan (DMP, DKP, NGL, RKT, GDN)'
        });
      } else {
        setAlert({
          type: 'success',
          message: `Ditemukan duplikat di ${totalSheets} sheet`
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
      const filename = `IDPEL_Duplikat_MultiSheet_${Date.now()}.xlsx`;
      exportToExcel(results, filename);
      setAlert({
        type: 'success',
        message: 'Hasil duplikat multi-sheet disimpan!'
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
              <Search className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Cek IDPEL Duplikat Multi-Sheet (SBS)
              </h1>
              <p className="text-gray-600 text-lg">
                Cek duplikat IDPEL pada SBS dengan deteksi setiap UP
              </p>
            </div>
          </div>
          
          {/* Simple Info Bar */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center">
              <Info className="h-5 w-5 text-gray-400 mr-3" />
              <p className="text-gray-600 text-sm">
                Upload file Excel dan kami akan menemukan semua IDPEL duplikat di sheet yang ditentukan
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
                onClick={handleCheck}
                disabled={!file || loading}
                className="w-full mt-4 bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <LoadingSpinner text="Memproses..." />
                ) : (
                  <>
                    Cek Duplikat
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
                <p className="text-gray-600 mb-4">
                  {Object.keys(results).length} sheet dengan IDPEL duplikat
                </p>
                <button
                  onClick={handleDownload}
                  className="w-full bg-green-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Simpan Hasil ke Excel
                </button>
                <p className="text-xs text-gray-600 mt-2 text-center">
                  Header akan dikenali otomatis dari kolom bernama 'IDPEL'
                </p>
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
                  Pastikan file Excel memiliki sheet: DMP, DKP, NGL, RKT, GDN
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Setiap sheet harus memiliki kolom 'IDPEL'
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Hasil akan dikelompokkan per sheet
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  File hasil akan berisi semua sheet dengan duplikat
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
                <LoadingSpinner text="Mencari duplikat di multiple sheet..." />
              </div>
            )}

            {results && Object.keys(results).length > 0 && (
              <div className="space-y-6 animate-slide-up">
                {Object.keys(results).map((sheetName, idx) => {
                  const { headers, data } = results[sheetName];
                  
                  return (
                    <div key={sheetName} className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <div className="bg-gray-50 border-b border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-between">
                          <span className="flex items-center">
                            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mr-3">
                              {sheetName}
                            </div>
                            <span className="text-gray-600 text-sm font-normal">
                              {data.length} duplikat
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
                                      {row[header] || '-'}
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

            {results && Object.keys(results).length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Tidak Ada Duplikat
                </h3>
                <p className="text-gray-600 mb-6">
                  Tidak ditemukan IDPEL duplikat di sheet yang ditentukan
                </p>
                <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm text-gray-600">
                    Sheet yang diperiksa: DMP, DKP, NGL, RKT, GDN
                  </p>
                </div>
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
                  Upload file Excel untuk memulai pemeriksaan duplikat IDPEL
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

export default IDPELSamaMultiplePage;