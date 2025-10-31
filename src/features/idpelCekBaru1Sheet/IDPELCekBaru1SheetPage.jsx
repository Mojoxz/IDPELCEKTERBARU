import { useState } from 'react';
import { Download, FileSpreadsheet, GitCompare, CheckCircle, AlertCircle, Info, Upload, ChevronRight, Sparkles } from 'lucide-react';
import FileUpload from '../../components/ui/FileUpload';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Alert from '../../components/ui/Alert';
import { useFileReader } from '../../hooks/useFileReader';
import { compareIDPEL1Sheet, exportToExcel } from '../../utils/idpelCekBaru1Sheet';

const IDPELCekBaru1SheetPage = () => {
  const [fileSep, setFileSep] = useState(null);
  const [fileOkt, setFileOkt] = useState(null);
  const [results, setResults] = useState(null);
  const [alert, setAlert] = useState(null);
  
  const { loading, readExcelFile } = useFileReader();

  const handleCompare = async () => {
    if (!fileSep || !fileOkt) {
      setAlert({
        type: 'warning',
        message: 'Harap pilih kedua file terlebih dahulu'
      });
      return;
    }

    try {
      const wbSep = await readExcelFile(fileSep);
      const wbOkt = await readExcelFile(fileOkt);
      
      const comparisonResults = compareIDPEL1Sheet(wbSep, wbOkt);
      setResults(comparisonResults);
      
      setAlert({
        type: 'success',
        message: 'Perbandingan selesai!'
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
    if (results) {
      const filename = `Perbandingan_IDPEL_1Sheet_${Date.now()}.xlsx`;
      exportToExcel(results, filename);
      setAlert({
        type: 'success',
        message: 'Hasil berhasil disimpan!'
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
              <GitCompare className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Perbandingan IDPEL Bulan September vs Oktober
              </h1>
              <p className="text-gray-600 text-lg">
                Bandingkan semua IDPEL dari semua sheet dalam satu file
              </p>
            </div>
          </div>
          
          {/* Simple Info Bar */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center">
              <Info className="h-5 w-5 text-gray-400 mr-3" />
              <p className="text-gray-600 text-sm">
                Upload dua file Excel untuk membandingkan IDPEL antara bulan September dan Oktober
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* File Upload Cards */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="bg-gray-100 p-2 rounded-lg mr-3">
                  <Upload className="h-5 w-5 text-gray-600" />
                </div>
                Upload File
              </h2>
              
              {/* File September */}
              <div className="mb-4">
                <h3 className="text-md font-medium text-gray-700 mb-2 flex items-center">
                  <FileSpreadsheet className="mr-2 h-4 w-4 text-blue-500" />
                  File September
                </h3>
                <FileUpload
                  onFileSelect={setFileSep}
                  selectedFile={fileSep}
                  label="Upload File September"
                />
              </div>

              {/* File Oktober */}
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-2 flex items-center">
                  <FileSpreadsheet className="mr-2 h-4 w-4 text-green-500" />
                  File Oktober
                </h3>
                <FileUpload
                  onFileSelect={setFileOkt}
                  selectedFile={fileOkt}
                  label="Upload File Oktober"
                />
              </div>

              <button
                onClick={handleCompare}
                disabled={!fileSep || !fileOkt || loading}
                className="w-full mt-4 bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <LoadingSpinner text="Memproses..." />
                ) : (
                  <>
                    Bandingkan Data
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </div>

            {/* Download Card */}
            {results && (
              <div className="bg-green-50 rounded-xl p-6 border border-green-200 animate-slide-up">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Hasil Ditemukan</h3>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">IDPEL Baru:</span>
                    <span className="font-medium">{results.baru.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">IDPEL Tidak Digunakan:</span>
                    <span className="font-medium">{results.tidakDigunakan.length}</span>
                  </div>
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
                <h3 className="font-semibold text-gray-900">Tips</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Pastikan kedua file Excel memiliki format yang benar
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  File pertama adalah data bulan September
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  File kedua adalah data bulan Oktober
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  Hasil akan menampilkan IDPEL baru dan yang tidak digunakan
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
                <LoadingSpinner text="Membandingkan data..." />
              </div>
            )}

            {results && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
                {/* IDPEL Baru */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-green-200">
                  <div className="bg-green-50 border-b border-green-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-between">
                      <span className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-lg mr-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        IDPEL Baru di Oktober
                      </span>
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {results.baru.length}
                      </span>
                    </h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="max-h-96 overflow-y-auto">
                      {results.baru.length > 0 ? (
                        <div className="space-y-2">
                          {results.baru.map((idpel, idx) => (
                            <div
                              key={idx}
                              className="px-4 py-2 bg-green-100 text-green-800 rounded border border-green-200 text-sm font-medium"
                            >
                              {idpel}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <div className="bg-gray-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-gray-400" />
                          </div>
                          <p className="text-gray-500">Tidak ada IDPEL baru</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* IDPEL Tidak Digunakan */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-red-200">
                  <div className="bg-red-50 border-b border-red-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-between">
                      <span className="flex items-center">
                        <div className="bg-red-100 p-2 rounded-lg mr-3">
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        </div>
                        IDPEL Tidak Digunakan
                      </span>
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {results.tidakDigunakan.length}
                      </span>
                    </h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="max-h-96 overflow-y-auto">
                      {results.tidakDigunakan.length > 0 ? (
                        <div className="space-y-2">
                          {results.tidakDigunakan.map((idpel, idx) => (
                            <div
                              key={idx}
                              className="px-4 py-2 bg-red-100 text-red-800 rounded border border-red-200 text-sm font-medium"
                            >
                              {idpel}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <div className="bg-gray-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-gray-400" />
                          </div>
                          <p className="text-gray-500">Tidak ada IDPEL yang hilang</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!fileSep && !fileOkt && !loading && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="bg-gray-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <FileSpreadsheet className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Belum Ada File
                </h3>
                <p className="text-gray-600 mb-6">
                  Upload dua file Excel untuk memulai perbandingan data
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

export default IDPELCekBaru1SheetPage;