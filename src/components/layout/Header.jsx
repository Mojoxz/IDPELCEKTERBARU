import { Link, useLocation } from 'react-router-dom';
import { FileSpreadsheet, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [standLaluDropdownOpen, setStandLaluDropdownOpen] = useState(false);
  const [idpelBaruDropdownOpen, setIdpelBaruDropdownOpen] = useState(false);
  const [idpelSamaDropdownOpen, setIdpelSamaDropdownOpen] = useState(false);
  const location = useLocation();
  
  const standLaluRef = useRef(null);
  const idpelBaruRef = useRef(null);
  const idpelSamaRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (standLaluRef.current && !standLaluRef.current.contains(event.target)) {
        setStandLaluDropdownOpen(false);
      }
      if (idpelBaruRef.current && !idpelBaruRef.current.contains(event.target)) {
        setIdpelBaruDropdownOpen(false);
      }
      if (idpelSamaRef.current && !idpelSamaRef.current.contains(event.target)) {
        setIdpelSamaDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg group-hover:shadow-md transition-all duration-300">
              <FileSpreadsheet className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Excel Tools</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/')
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            
            {/* Stand Lalu Dropdown */}
            <div className="relative" ref={standLaluRef}>
              <button
                onClick={() => {
                  setStandLaluDropdownOpen(!standLaluDropdownOpen);
                  setIdpelBaruDropdownOpen(false);
                  setIdpelSamaDropdownOpen(false);
                }}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive('/stand-lalu-ini-sbb') || isActive('/stand-lalu-ini-sbu') || isActive('/stand-lalu-multiple')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Stand Lalu
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${standLaluDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {standLaluDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden animate-fade-in">
                  <div className="py-1">
                    <Link
                      to="/stand-lalu-ini-sbb"
                      onClick={() => setStandLaluDropdownOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        isActive('/stand-lalu-ini-sbb')
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Stand Lalu Ini (SBB)
                    </Link>
                    <Link
                      to="/stand-lalu-ini-sbu"
                      onClick={() => setStandLaluDropdownOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        isActive('/stand-lalu-ini-sbu')
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Stand Lalu Ini (SBU)
                    </Link>
                    <Link
                      to="/stand-lalu-multiple"
                      onClick={() => setStandLaluDropdownOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        isActive('/stand-lalu-multiple')
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Stand Lalu (Multiple)
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* IDPEL Baru Dropdown */}
            <div className="relative" ref={idpelBaruRef}>
              <button
                onClick={() => {
                  setIdpelBaruDropdownOpen(!idpelBaruDropdownOpen);
                  setStandLaluDropdownOpen(false);
                  setIdpelSamaDropdownOpen(false);
                }}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive('/idpel-baru-multiple') || isActive('/idpel-baru-1sheet')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                IDPEL Baru
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${idpelBaruDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {idpelBaruDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden animate-fade-in">
                  <div className="py-1">
                    <Link
                      to="/idpel-baru-multiple"
                      onClick={() => setIdpelBaruDropdownOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        isActive('/idpel-baru-multiple')
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      IDPEL Baru (Multiple)
                    </Link>
                    <Link
                      to="/idpel-baru-1sheet"
                      onClick={() => setIdpelBaruDropdownOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        isActive('/idpel-baru-1sheet')
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      IDPEL Baru (1 Sheet)
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* IDPEL Sama Dropdown */}
            <div className="relative" ref={idpelSamaRef}>
              <button
                onClick={() => {
                  setIdpelSamaDropdownOpen(!idpelSamaDropdownOpen);
                  setStandLaluDropdownOpen(false);
                  setIdpelBaruDropdownOpen(false);
                }}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive('/idpel-sama-1sheet') || isActive('/idpel-sama-multiple')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                IDPEL Sama
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${idpelSamaDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {idpelSamaDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden animate-fade-in">
                  <div className="py-1">
                    <Link
                      to="/idpel-sama-1sheet"
                      onClick={() => setIdpelSamaDropdownOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        isActive('/idpel-sama-1sheet')
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      IDPEL Sama (1 Sheet)
                    </Link>
                    <Link
                      to="/idpel-sama-multiple"
                      onClick={() => setIdpelSamaDropdownOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        isActive('/idpel-sama-multiple')
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      IDPEL Sama (Multiple)
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-100 animate-fade-in">
            <div className="flex flex-col space-y-1">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              
              {/* Mobile Stand Lalu Section */}
              <div className="px-4 py-2 text-sm font-medium text-gray-900">Stand Lalu</div>
              <div className="pl-4 space-y-1">
                <Link
                  to="/stand-lalu-ini-sbb"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                    isActive('/stand-lalu-ini-sbb')
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Stand Lalu Ini (SBB)
                </Link>
                <Link
                  to="/stand-lalu-ini-sbu"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                    isActive('/stand-lalu-ini-sbu')
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Stand Lalu Ini (SBU)
                </Link>
                <Link
                  to="/stand-lalu-multiple"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                    isActive('/stand-lalu-multiple')
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Stand Lalu (Multiple)
                </Link>
              </div>
              
              {/* Mobile IDPEL Baru Section */}
              <div className="px-4 py-2 text-sm font-medium text-gray-900">IDPEL Baru</div>
              <div className="pl-4 space-y-1">
                <Link
                  to="/idpel-baru-multiple"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                    isActive('/idpel-baru-multiple')
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  IDPEL Baru (Multiple)
                </Link>
                <Link
                  to="/idpel-baru-1sheet"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                    isActive('/idpel-baru-1sheet')
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  IDPEL Baru (1 Sheet)
                </Link>
              </div>
              
              {/* Mobile IDPEL Sama Section */}
              <div className="px-4 py-2 text-sm font-medium text-gray-900">IDPEL Sama</div>
              <div className="pl-4 space-y-1">
                <Link
                  to="/idpel-sama-1sheet"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                    isActive('/idpel-sama-1sheet')
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  IDPEL Sama (1 Sheet)
                </Link>
                <Link
                  to="/idpel-sama-multiple"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                    isActive('/idpel-sama-multiple')
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  IDPEL Sama (Multiple)
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;