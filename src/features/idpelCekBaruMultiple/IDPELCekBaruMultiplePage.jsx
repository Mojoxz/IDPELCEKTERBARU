import { useState } from 'react';
import { Download, FileSpreadsheet, GitCompare } from 'lucide-react';
import FileUpload from '../../components/ui/FileUpload';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Alert from '../../components/ui/Alert';
import { useFileReader } from '../../hooks/useFileReader';
import { compareIDPELMultipleSheets, exportComparisonToExcel } from '../../utils/idpelCekBaruMultiple';

const IDPELCekBaruMultiplePage = () => {
  const [fileOkt, setFileOkt] = useState(null);
  const [fileSep, setFileSep] = useState(null);
  const [results, setResults] = useState(null);
  const [alert, setAlert] = useState(null);
  
  const { loading, readExcelFile } = useFileReader();

  const handleCompare = async () => {
    if (!fileOkt || !fileSep) {
      setAlert({
        type: 'warning',
        message: 'Harap pilih kedua file terlebih dahulu'
      });
      return;
    }

    try {
      const wbOkt = await readExcelFile(fileOkt);
      const wbSep = await readExcelFile(fileSep);
      
      const comparisonResults = compareIDPELMultipleSheets(wbOkt, wbSep);
      setResults(comparisonResults);
      
      setAlert({
        type: 'success',
        message: 'Perbandingan selesai! Anda dapat menyimpan hasilnya.'
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
      const filename = `Perbandingan_IDPEL_${Date.now()}.xlsx`;
      exportComparisonToExcel(results, filename);
      setAlert({
        type: 'success',
        message: 'Hasil perbandingan berhasil disimpan!'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Perbandingan IDPEL September vs Oktober
        </h1>
        <p className="text-gray-600">
          Bandingkan IDPEL dari multiple sheet (DMP, RKT, GDN, NGL, DKP) antara dua bulan
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* File Oktober */}
        <div className="card animate-slide-up">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <FileSpreadsheet className="mr-2 h-5 w-5 text-primary-500" />
            File Oktober
          </h2>
          <FileUpload
            onFileSelect={setFileOkt}
            selectedFile={fileOkt}
            label="Upload File Oktober"
          />
        </div>

        {/* File September */}
        <div className="card animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <FileSpreadsheet className="mr-2 h-5 w-5 text-primary-500" />
            File September
          </h2>
          <FileUpload
            onFileSelect={setFileSep}
            selectedFile={fileSep}
            label="Upload File September"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleCompare}
          disabled={!fileOkt || !fileSep || loading}
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
        <div className="space-y-6 animate-slide-up">
          {Object.keys(results).map(sheetName => {
            const result = results[sheetName];
            
            if (result.error) {
              return (
                <div key={sheetName} className="card border-red-200">
                  <h3 className="text-lg font-semibold mb-2 text-red-700">
                    {sheetName}
                  </h3>
                  <p className="text-sm text-red-600">{result.error}</p>
                </div>
              );
            }

            const totalChanges = result.baru.length + result.hilang.length;

            return (
              <div key={sheetName} className="card">
                <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
                  <span>{sheetName}</span>
                  <span className="text-sm font-normal text-gray-500">
                    {totalChanges} perubahan
                  </span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* IDPEL Baru */}
                  <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                    <h4 className="font-medium text-green-800 mb-3">
                      IDPEL Baru di Oktober ({result.baru.length})
                    </h4>
                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {result.baru.length > 0 ? (
                        result.baru.map((idpel, idx) => (
                          <div key={idx} className="text-sm text-green-700 bg-white px-3 py-1 rounded">
                            {idpel}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-green-600">Tidak ada IDPEL baru</p>
                      )}
                    </div>
                  </div>

                  {/* IDPEL Hilang */}
                  <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <h4 className="font-medium text-red-800 mb-3">
                      IDPEL Tidak Digunakan ({result.hilang.length})
                    </h4>
                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {result.hilang.length > 0 ? (
                        result.hilang.map((idpel, idx) => (
                          <div key={idx} className="text-sm text-red-700 bg-white px-3 py-1 rounded">
                            {idpel}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-red-600">Tidak ada IDPEL yang hilang</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default IDPELCekBaruMultiplePage;