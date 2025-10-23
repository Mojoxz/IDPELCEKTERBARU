import { Link } from 'react-router-dom';
import { FileSpreadsheet, GitCompare, Copy, Search, CheckCircle, Zap } from 'lucide-react';

const HomePage = () => {
  const tools = [
    {
      id: 1,
      title: 'Stand Lalu Ini (SBB)',
      description: 'Cek baris di mana kolom I dan J memiliki nilai yang sama',
      icon: CheckCircle,
      path: '/stand-lalu-ini-sbb',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Stand Lalu Ini (SBU)',
      description: 'Filter data yang STAND LALU ≠ STAND INI',
      icon: GitCompare,
      path: '/stand-lalu-ini-sbu',
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'IDPEL Baru (Multiple)',
      description: 'Bandingkan IDPEL dari multiple sheet antara dua bulan',
      icon: GitCompare,
      path: '/idpel-baru-multiple',
      color: 'bg-purple-500'
    },
    {
      id: 4,
      title: 'IDPEL Baru (1 Sheet)',
      description: 'Bandingkan semua IDPEL dari semua sheet dalam satu file',
      icon: FileSpreadsheet,
      path: '/idpel-baru-1sheet',
      color: 'bg-indigo-500'
    },
    {
      id: 5,
      title: 'IDPEL Sama (1 Sheet)',
      description: 'Cari IDPEL yang muncul lebih dari satu kali',
      icon: Copy,
      path: '/idpel-sama-1sheet',
      color: 'bg-pink-500'
    },
    {
      id: 6,
      title: 'IDPEL Sama (Multiple)',
      description: 'Cek duplikat IDPEL pada beberapa sheet (DMP, DKP, NGL, RKT, GDN)',
      icon: Search,
      path: '/idpel-sama-multiple',
      color: 'bg-orange-500'
    },
    {
      id: 7,
      title: 'Stand Lalu (Multiple)',
      description: 'Filter data di mana SLALWBP = SAHLWBP pada multiple sheet',
      icon: Zap,
      path: '/stand-lalu-multiple',
      color: 'bg-teal-500'
    }
  ];

  const features = [
    {
      title: 'Fast Processing',
      description: 'Process large Excel files quickly and efficiently',
      icon: '⚡'
    },
    {
      title: 'Multiple Tools',
      description: 'Various tools for different data analysis needs',
      icon: '🛠️'
    },
    {
      title: 'Easy to Use',
      description: 'User-friendly interface with simple workflows',
      icon: '✨'
    },
    {
      title: 'Export Results',
      description: 'Download processed data in Excel format',
      icon: '📥'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-500 p-4 rounded-2xl shadow-lg">
              <FileSpreadsheet className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Excel Tools Suite
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional web-based tools for Excel data processing, comparison, and analysis
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="card text-center hover:shadow-lg transition-shadow animate-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Tools Grid */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Available Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up group"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`${tool.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 card bg-gradient-to-r from-primary-500 to-purple-600 text-white text-center animate-slide-up">
          <h2 className="text-2xl font-bold mb-4">
            Ready to process your Excel files?
          </h2>
          <p className="mb-6 text-primary-50">
            Choose a tool above to get started with your data analysis
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/stand-lalu-ini-sbb" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Get Started
            </Link>
            <a href="#" className="btn bg-primary-700 text-white hover:bg-primary-800">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;