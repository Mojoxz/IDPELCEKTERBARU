import { Link, useLocation } from 'react-router-dom';
import { FileSpreadsheet, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/stand-lalu-ini-sbb', label: 'Stand Lalu Ini (SBB)' },
    { path: '/stand-lalu-ini-sbu', label: 'Stand Lalu Ini (SBU)' },
    { path: '/idpel-baru-multiple', label: 'IDPEL Baru (Multiple)' },
    { path: '/idpel-baru-1sheet', label: 'IDPEL Baru (1 Sheet)' },
    { path: '/idpel-sama-1sheet', label: 'IDPEL Sama (1 Sheet)' },
    { path: '/idpel-sama-multiple', label: 'IDPEL Sama (Multiple)' },
    { path: '/stand-lalu-multiple', label: 'Stand Lalu (Multiple)' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-primary-500 p-2 rounded-lg group-hover:bg-primary-600 transition-colors">
              <FileSpreadsheet className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Excel Tools</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-200 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;