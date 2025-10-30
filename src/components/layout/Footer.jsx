import { FileSpreadsheet, Github, Mail, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    product: [
      { name: 'Stand Lalu Ini (SBB)', path: '/stand-lalu-ini-sbb' },
      { name: 'Stand Lalu Ini (SBU)', path: '/stand-lalu-ini-sbu' },
      { name: 'IDPEL Baru', path: '/idpel-baru-multiple' },
      { name: 'IDPEL Sama', path: '/idpel-sama-multiple' },
      { name: 'Stand Lalu (Multiple)', path: '/stand-lalu-multiple' }
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Documentation', path: '/docs' },
      { name: 'Support', path: '/support' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center space-x-3 group">
                <div className="group-hover:shadow-lg transition-all duration-300">
                  <img 
                    src="/DISHUB SURABAYA.svg" 
                    alt="DISHUB SURABAYA Logo" 
                    className="h-16 w-auto" // Memperbesar logo dari h-6 menjadi h-10
                  />
                </div>
              <span className="text-xl font-bold text-white">IDPEL CHECKER</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Tools Untuk membantu anda mengecek Data IDPEL dan juga yang diperlukan.
            </p>
            
            {/* Contact Info */}
            <div className="flex flex-col space-y-2">
              <a
                href="mailto:firmandhani.23029@mhs.unesa.ac.id"
                className="flex items-center space-x-2 text-sm hover:text-blue-400 transition-colors duration-200"
              >
                <Mail className="h-4 w-4" />
                <span>firmandhani.23029@mhs.unesa.ac.id</span>
              </a>
              <a
                href="https://github.com/Mojoxz/IDPELCEKTERBARU"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm hover:text-blue-400 transition-colors duration-200"
              >
                <Github className="h-4 w-4" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <ChevronRight className="h-4 w-4 mr-1 text-blue-400" />
              Product
            </h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-sm hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <ChevronRight className="h-4 w-4 mr-1 text-blue-400" />
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-sm hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <Github className="h-5 w-5 text-gray-400 hover:text-white transition-colors duration-200" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <svg className="h-5 w-5 text-gray-400 hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <svg className="h-5 w-5 text-gray-400 hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Excel Tools. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-xs text-gray-500">Made with</span>
            <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-gray-500">by the Excel Tools Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;