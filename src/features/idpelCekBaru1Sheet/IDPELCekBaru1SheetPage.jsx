import { useState } from 'react';
import { Download, FileSpreadsheet, GitCompare } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Perbandingan IDPEL Bulan September vs Oktober
        </h1>
        <p className="text-gray-600">
          Bandingkan semua IDPEL dari semua sheet dalam satu file
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* File September */}
        <div className="card animate-slide-up">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <FileSpreadsheet className="mr-2 h-5 w-5 text-blue-500" />
            File September
          </h2>
          <FileUpload
            onFileSelect={setFileSep}
            selectedFile={fileSep}
            label="Upload File September"
          />
        </div>

        {/* File Oktober */}
        <div className="card animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <FileSpreadsheet className="mr-2 h-5 w-5 text-green-500" />
            File Oktober
          </h2>
          <FileUpload
            onFileSelect={setFileOkt}
            selectedFile={fileOkt}
            label="Upload File Oktober"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleCompare}
          disabled={!fileSep || !fileOkt || loading}
          className="btn btn-primary flex items-center"
        >
          <GitCompare className="mr-2 h-4 w-4" />
          Bandingkan Data
        </button>

        {results && (
          <button
            onClick={handleDownload}
            className="btn btn-success flex items-center"
          >
            <Download className="mr-2 h-4 w-4" />
            Simpan Hasil
          </button>
        )}
      </div>

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

      {loading && <LoadingSpinner text="Membandingkan data..." />}

      {/* Results */}
      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
          {/* IDPEL Baru */}
          <div className="card border-green-200 bg-green-50">
            <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center justify-between">
              <span>📘 IDPEL Baru di Oktober</span>
              <span className="text-sm font-normal bg-green-600 text-white px-3 py-1 rounded-full">
                {results.baru.length}
              </span>
            </h3>
            <div className="bg-white rounded-lg p-4 max-h-96 overflow-y-auto">
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
                <p className="text-gray-500 text-center py-8">Tidak ada IDPEL baru</p>
              )}
            </div>
          </div>

          {/* IDPEL Tidak Digunakan */}
          <div className="card border-red-200 bg-red-50">
            <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center justify-between">
              <span>📙 IDPEL Tidak Digunakan</span>
              <span className="text-sm font-normal bg-red-600 text-white px-3 py-1 rounded-full">
                {results.tidakDigunakan.length}
              </span>
            </h3>
            <div className="bg-white rounded-lg p-4 max-h-96 overflow-y-auto">
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
                <p className="text-gray-500 text-center py-8">Tidak ada IDPEL yang hilang</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IDPELCekBaru1SheetPage;