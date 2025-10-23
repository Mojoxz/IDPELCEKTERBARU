import { useState } from 'react';
import { Download, FileSpreadsheet, Search } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Cek Duplikat IDPEL (Multi-sheet)
        </h1>
        <p className="text-gray-600">
          Cek duplikat IDPEL pada beberapa sheet (DMP, DKP, NGL, RKT, GDN). Hasil per sheet disimpan terpisah di 1 file Excel.
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
              onFileSelect={setFile}
              selectedFile={file}
              label="Pilih File Excel"
            />

            <button
              onClick={handleCheck}
              disabled={!file || loading}
              className="btn btn-primary w-full mt-4 flex items-center justify-center"
            >
              <Search className="mr-2 h-4 w-4" />
              Cek Duplikat
            </button>
          </div>

          {results && Object.keys(results).length > 0 && (
            <div className="card animate-slide-up bg-success-50 border-success-200">
              <button
                onClick={handleDownload}
                className="btn btn-success w-full flex items-center justify-center"
              >
                <Download className="mr-2 h-4 w-4" />
                Simpan Hasil
              </button>
              <p className="text-xs text-gray-600 mt-2 text-center">
                Header akan dikenali otomatis dari kolom bernama 'IDPEL'
              </p>
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

          {loading && <LoadingSpinner text="Mencari duplikat di multiple sheet..." />}

          {results && Object.keys(results).length > 0 && (
            <div className="space-y-6 animate-slide-up">
              {Object.keys(results).map((sheetName, idx) => {
                const { headers, data } = results[sheetName];
                
                return (
                  <div key={sheetName} className="card" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
                      <span className="flex items-center">
                        <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mr-3">
                          {sheetName}
                        </span>
                        <span className="text-gray-600 text-sm font-normal">
                          {data.length} duplikat
                        </span>
                      </span>
                    </h3>
                    <DataTable
                      columns={headers}
                      data={data}
                      maxHeight="400px"
                    />
                  </div>
                );
              })}
            </div>
          )}

          {results && Object.keys(results).length === 0 && (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Tidak Ada Duplikat
              </h3>
              <p className="text-gray-500">
                Tidak ditemukan IDPEL duplikat di sheet yang ditentukan
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IDPELSamaMultiplePage;