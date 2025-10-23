import { FileSpreadsheet, Github, Mail, ChevronRight, Twitter, Linkedin, Instagram } from 'lucide-react';
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
    ],
    resources: [
      { name: 'Blog', path: '/blog' },
      { name: 'Tutorials', path: '/tutorials' },
      { name: 'API Reference', path: '/api' },
      { name: 'Community', path: '/community' },
      { name: 'Status', path: '/status' }
    ]
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg group-hover:shadow-lg transition-all duration-300">
                <FileSpreadsheet className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Excel Tools</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-md">
              Professional Excel processing tools for data analysis and comparison. 
              Built with React and modern web technologies to streamline your workflow.
            </p>
            
            {/* Newsletter Signup */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
              <p className="text-xs mb-3">Get the latest updates and tips delivered to your inbox</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-700 text-white px-3 py-2 rounded-l-md text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-r-md text-sm font-medium hover:shadow-lg transition-all duration-300">
                  Subscribe
                </button>
              </div>
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
                    className="text-sm hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200">
                      {link.name}
                    </span>
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
                    className="text-sm hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <ChevronRight className="h-4 w-4 mr-1 text-blue-400" />
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-sm hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Social Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-white font-semibold mb-3">Connect With Us</h3>
              <div className="flex space-x-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 group"
                    >
                      <Icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                    </a>
                  );
                })}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <a
                href="mailto:support@exceltools.com"
                className="flex items-center space-x-2 text-sm hover:text-blue-400 transition-colors duration-200"
              >
                <Mail className="h-4 w-4" />
                <span>support@exceltools.com</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm hover:text-blue-400 transition-colors duration-200"
              >
                <Github className="h-4 w-4" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
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