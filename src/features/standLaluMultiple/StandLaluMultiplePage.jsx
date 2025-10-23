import { useState } from 'react';
import { Download, FileSpreadsheet, PlayCircle } from 'lucide-react';
import FileUpload from '../../components/ui/FileUpload';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Alert from '../../components/ui/Alert';
import DataTable from '../../components/ui/DataTable';
import { useFileReader } from '../../hooks/useFileReader';
import { processStandLaluMultiple, exportToExcel } from '../../utils/standLaluMultiple';

const StandLaluMultiplePage = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [alert, setAlert] = useState(null);
  const [outputFilename, setOutputFilename] = useState('Hasil_Pengecekan');
  
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
      const processedResults = processStandLaluMultiple(wb);
      
      setResults(processedResults);
      
      const totalSheets = Object.keys(processedResults).length;
      
      if (totalSheets === 0) {
        setAlert({
          type: 'info',
          message: 'Tidak ditemukan data yang memenuhi kriteria SLALWBP = SAHLWBP di sheet yang ditentukan'
        });
      } else {
        const totalRows = Object.values(processedResults).reduce((sum, sheet) => sum + sheet.data.length, 0);
        setAlert({
          type: 'success',
          message: `Proses selesai! Ditemukan ${totalRows} baris di ${totalSheets} sheet`
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
      const filename = `${outputFilename}_${Date.now()}.xlsx`;
      exportToExcel(results, filename);
      setAlert({
        type: 'success',
        message: `File disimpan sebagai '${filename}'`
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Pengecek Data SLALWBP = SAHLWBP
        </h1>
        <p className="text-gray-600">
          Filter data di mana SLALWBP sama dengan SAHLWBP pada multiple sheet (DMP, DKP, NGL, RKT, GDN)
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
          </div>

          <div className="card animate-slide-up">
            <h3 className="text-sm font-medium mb-2">Nama File Hasil</h3>
            <input
              type="text"
              value={outputFilename}
              onChange={(e) => setOutputFilename(e.target.value)}
              className="input-field"
              placeholder="Masukkan nama file (tanpa .xlsx)"
            />
            <p className="text-xs text-gray-500 mt-2">
              File akan disimpan dengan format: [nama]_[timestamp].xlsx
            </p>

            <button
              onClick={handleProcess}
              disabled={!file || loading}
              className="btn btn-primary w-full mt-4 flex items-center justify-center"
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              Proses File
            </button>
          </div>

          {results && Object.keys(results).length > 0 && (
            <div className="card animate-slide-up bg-success-50 border-success-200">
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

          {loading && <LoadingSpinner text="Memproses data..." />}

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
                          {data.length} baris
                        </span>
                      </span>
                    </h3>
                    
                    {data.length > 0 ? (
                      <DataTable
                        columns={headers}
                        data={data}
                        maxHeight="400px"
                      />
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>Tidak ada data yang memenuhi kriteria</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {results && Object.keys(results).length === 0 && (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Tidak Ada Data
              </h3>
              <p className="text-gray-500">
                Tidak ditemukan sheet yang memenuhi kriteria atau data yang sesuai
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StandLaluMultiplePage;