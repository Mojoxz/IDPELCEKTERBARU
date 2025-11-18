import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import StandLaluIniSBBPage from './features/standLaluIniSBB/StandLaluIniSBBPage';
import StandLaluIniSBUPage from './features/standLaluIniSBU/StandLaluIniSBUPage';
import IDPELCekBaruMultiplePage from './features/idpelCekBaruMultiple/IDPELCekBaruMultiplePage';
import IDPELCekBaru1SheetPage from './features/idpelCekBaru1Sheet/IDPELCekBaru1SheetPage';
import IDPELSama1SheetPage from './features/idpelSama1Sheet/IDPELSama1SheetPage';
import IDPELSamaMultiplePage from './features/idpelSamaMultiple/IDPELSamaMultiplePage';
import StandLaluMultiplePage from './features/standLaluMultiple/StandLaluMultiplePage';
import PEMKWHFilterPage from './features/pemkwhfilter/PEMKWHFilterPage';
import PEMKWHSBBPage from './features/pemkwhSBB/PEMKWHSBBPage';
import PEMKWHSBUPage from './features/pemkwhSBU/PEMKWHSBUPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stand-lalu-ini-sbb" element={<StandLaluIniSBBPage />} />
            <Route path="/stand-lalu-ini-sbu" element={<StandLaluIniSBUPage />} />
            <Route path="/idpel-baru-multiple" element={<IDPELCekBaruMultiplePage />} />
            <Route path="/idpel-baru-1sheet" element={<IDPELCekBaru1SheetPage />} />
            <Route path="/idpel-sama-1sheet" element={<IDPELSama1SheetPage />} />
            <Route path="/idpel-sama-multiple" element={<IDPELSamaMultiplePage />} />
            <Route path="/stand-lalu-multiple" element={<StandLaluMultiplePage />} />
            <Route path="/PEMKWHFilterPage" element={<PEMKWHFilterPage />} />
            <Route path="/PEMKWHSBBPage" element={<PEMKWHSBBPage />} />
            <Route path="/PEMKWHSBUPage" element={<PEMKWHSBUPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;