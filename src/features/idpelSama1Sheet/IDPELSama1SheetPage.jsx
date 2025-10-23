import { useState } from 'react';
import { Download, FileSpreadsheet, Search } from 'lucide-react';
import FileUpload from '../../components/ui/FileUpload';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Alert from '../../components/ui/Alert';
import { useFileReader } from '../../hooks/useFileReader';
import { findDuplicateIDPEL, exportToExcel } from '../../utils/idpelSama1Sheet';

const IDPELSama1SheetPage = () => {
  const [file, setFile] = useState(null);
  const [duplicates, setDuplicates] = useState(null);
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
      const results = findDuplicateIDPEL(wb);
      
      setDuplicates(results);
      
      if (results.length === 0) {
        setAlert({
          type: 'info',
          message: 'Tidak ada IDPEL yang duplikat'
        });
      } else {
        setAlert({
          type: 'success',
          message: `Ditemukan ${results.length} IDPEL yang duplikat`
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
    if (duplicates && duplicates.length > 0) {
      const filename = `IDPEL_Duplikat_${Date.now()}.xlsx`;
      exportToExcel(duplicates, filename);
      setAlert({
        type: 'success',
        message: 'Hasil duplikat disimpan!'
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Cek IDPEL Duplikat PLN
        </h1>
        <p className="text-gray-600">
          Cari IDPEL yang muncul lebih dari satu kali dalam file Excel
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

          {duplicates && duplicates.length > 0 && (
            <div className="card animate-slide-up bg-success-50 border-success-200">
              <button
                onClick={handleDownload}
                className="btn btn-success w-full flex items-center justify-center"
              >
                <Download className="mr-2 h-4 w-4" />
                Simpan Hasil
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

          {loading && <LoadingSpinner text="Mencari duplikat..." />}

          {duplicates && duplicates.length > 0 && (
            <div className="card animate-slide-up">
              <h3 className="text-lg font-semibold mb-4">
                IDPEL Duplikat ({duplicates.length})
              </h3>
              <div className="table-container" style={{ maxHeight: '600px' }}>
                <table className="table-custom">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>IDPEL</th>
                      <th>Sheet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {duplicates.map((item, idx) => (
                      <tr key={idx}>
                        <td className="text-center">{idx + 1}</td>
                        <td className="font-medium">{item.IDPEL}</td>
                        <td>{item.Sheet}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {duplicates && duplicates.length === 0 && (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Tidak Ada Duplikat
              </h3>
              <p className="text-gray-500">
                Semua IDPEL dalam file ini unik
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IDPELSama1SheetPage;