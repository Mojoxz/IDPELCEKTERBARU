import { Link } from 'react-router-dom';
import { FileSpreadsheet, GitCompare, Copy, Search, CheckCircle, Zap, Star, Users, Clock, Download, ArrowRight, Play, ChevronLeft, ChevronRight, Sparkles, TrendingUp, Shield, Rocket, Filter, FileText, BarChart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [animatedStats, setAnimatedStats] = useState({
    filesProcessed: 0,
    usersCount: 0,
    timeSaved: 0
  });
  
  const slideInterval = useRef(null);
  
  const tools = [
    {
      id: 1,
      title: 'Stand Lalu Ini (SBB)',
      description: 'Cek baris di mana kolom I dan J memiliki nilai yang sama',
      icon: CheckCircle,
      path: '/stand-lalu-ini-sbb',
      color: 'from-blue-400 to-blue-600',
      category: 'comparison',
      featured: true
    },
    {
      id: 2,
      title: 'Stand Lalu Ini (SBU)',
      description: 'Filter data yang STAND LALU ≠ STAND INI',
      icon: GitCompare,
      path: '/stand-lalu-ini-sbu',
      color: 'from-green-400 to-green-600',
      category: 'filter',
      featured: false
    },
    {
      id: 3,
      title: 'IDPEL Baru (Multiple)',
      description: 'Bandingkan IDPEL dari multiple sheet antara dua bulan',
      icon: GitCompare,
      path: '/idpel-baru-multiple',
      color: 'from-purple-400 to-purple-600',
      category: 'comparison',
      featured: false
    },
    {
      id: 4,
      title: 'IDPEL Baru (1 Sheet)',
      description: 'Bandingkan semua IDPEL dari semua sheet dalam satu file',
      icon: FileSpreadsheet,
      path: '/idpel-baru-1sheet',
      color: 'from-indigo-400 to-indigo-600',
      category: 'comparison',
      featured: false
    },
    {
      id: 5,
      title: 'IDPEL Sama (1 Sheet)',
      description: 'Cari IDPEL yang muncul lebih dari satu kali',
      icon: Copy,
      path: '/idpel-sama-1sheet',
      color: 'from-pink-400 to-pink-600',
      category: 'duplicate',
      featured: false
    },
    {
      id: 6,
      title: 'IDPEL Sama (Multiple)',
      description: 'Cek duplikat IDPEL pada beberapa sheet (DMP, DKP, NGL, RKT, GDN)',
      icon: Search,
      path: '/idpel-sama-multiple',
      color: 'from-orange-400 to-orange-600',
      category: 'duplicate',
      featured: false
    },
    {
      id: 7,
      title: 'Stand Lalu (Multiple)',
      description: 'Filter data di mana SLALWBP = SAHLWBP pada multiple sheet',
      icon: Zap,
      path: '/stand-lalu-multiple',
      color: 'from-teal-400 to-teal-600',
      category: 'filter',
      featured: false
    },
    // Menu Cepat - PEMKWH Tools
    {
      id: 8,
      title: 'PEMKWH Filter',
      description: 'Filter data PEMKWH Untuk sheet SBS',
      icon: Filter,
      path: '/pemkwh-filter',
      color: 'from-red-400 to-red-600',
      category: 'pemkwh',
      featured: true
    },
    {
      id: 9,
      title: 'PEMKWH SBB',
      description: 'Cek data PEMKWH Untuk Sheet SBB',
      icon: FileText,
      path: '/pemkwh-sbb',
      color: 'from-yellow-400 to-yellow-600',
      category: 'pemkwh',
      featured: false
    },
    {
      id: 10,
      title: 'PEMKWH SBU',
      description: 'Filter data PEMKWH untuk Sheet SBU',
      icon: BarChart,
      path: '/pemkwh-sbu',
      color: 'from-cyan-400 to-cyan-600',
      category: 'pemkwh',
      featured: false
    }
  ];

  const carouselItems = [
    {
      title: 'Transform Your Data Analysis',
      subtitle: 'Powerful Excel processing tools',
      description: 'Analyze, compare, and process your Excel data with professional-grade tools designed for efficiency and accuracy.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      mobileImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
      cta: 'Start Free Trial',
      path: '/stand-lalu-ini-sbb',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Compare Data Like Never Before',
      subtitle: 'Find differences instantly',
      description: 'Our advanced comparison algorithms help you identify discrepancies and patterns in your data with just a few clicks.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      mobileImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
      cta: 'Explore Features',
      path: '/idpel-baru-multiple',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      title: 'Automate Your Workflow',
      subtitle: 'Reduce manual work by 90%',
      description: 'Let our tools handle repetitive tasks so you can focus on analyzing insights and making decisions.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      mobileImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
      cta: 'Learn More',
      path: '/idpel-sama-1sheet',
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  const testimonials = [
    {
      name: 'Ahmad Pratama',
      position: 'Data Analyst',
      company: 'PT. Data Indonesia',
      content: 'Excel Tools telah menghemat waktu saya hingga 80% dalam pemrosesan data bulanan. Sangat direkomendasikan!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80'
    },
    {
      name: 'Siti Nurhaliza',
      position: 'Finance Manager',
      company: 'CV. Finansial Maju',
      content: 'Antarmuka yang intuitif dan hasil yang akurat membuat pekerjaan saya jauh lebih mudah.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80'
    },
    {
      name: 'Budi Santoso',
      position: 'Operation Manager',
      company: 'PT. Logistik Jaya',
      content: 'Saya tidak lagi perlu membandingkan data secara manual. Alat ini luar biasa!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'
    }
  ];

  const features = [
    {
      icon: Rocket,
      title: 'Lightning Fast',
      description: 'Process thousands of rows in seconds',
      color: 'text-blue-600'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data never leaves your browser',
      color: 'text-green-600'
    },
    {
      icon: TrendingUp,
      title: 'Boost Productivity',
      description: 'Save hours on repetitive tasks',
      color: 'text-purple-600'
    },
    {
      icon: Sparkles,
      title: 'Smart Algorithms',
      description: 'Advanced data matching logic',
      color: 'text-orange-600'
    }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [carouselItems.length]);

  // Animate stats counter
  useEffect(() => {
    const targetStats = {
      filesProcessed: 12450,
      usersCount: 3850,
      timeSaved: 8760
    };
    
    const duration = 2000;
    const steps = 60;
    const increment = {
      filesProcessed: targetStats.filesProcessed / steps,
      usersCount: targetStats.usersCount / steps,
      timeSaved: targetStats.timeSaved / steps
    };
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setAnimatedStats({
        filesProcessed: Math.floor(increment.filesProcessed * currentStep),
        usersCount: Math.floor(increment.usersCount * currentStep),
        timeSaved: Math.floor(increment.timeSaved * currentStep)
      });
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const filteredTools = activeTab === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === activeTab);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Carousel */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Perubahan di sini - dari rounded-2xl menjadi rounded-full */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse w-40 h-40 md:w-48 md:h-48"></div>
                </div>
                <div className="relative p-6 md:p-8">
                  <img 
                    src="DISHUB SURABAYA.svg" 
                    alt="Dishub Surabaya Logo" 
                    className="h-24 w-24 md:h-32 md:w-32"
                  />
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
              DISHUB IDPEL CHECKER
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Proses excel Anda dengan alat profesional untuk analisis data yang cepat dan akurat.
              dan Nikmati kemudahan dalam memeriksa data IDPEL serta Stand Lalu Ini langsung dari browser Anda.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-white">
            <div className="carousel-container relative h-[600px] md:h-[500px]">
              {carouselItems.map((item, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ${
                    index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                  }`}
                >
                  <div className={`h-full bg-gradient-to-br ${item.gradient} p-1 rounded-2xl md:rounded-3xl`}>
                    <div className="h-full bg-white rounded-2xl md:rounded-3xl overflow-hidden">
                      {/* Mobile Layout - Vertical */}
                      <div className="md:hidden flex flex-col h-full">
                        {/* Image Section for Mobile */}
                        <div className="relative h-64 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100">
                            <img
                              src={item.mobileImage}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                          </div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <span className="text-xs font-semibold text-white uppercase tracking-wide bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full inline-block mb-2">
                              {item.subtitle}
                            </span>
                            <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                              {item.title}
                            </h2>
                          </div>
                        </div>
                        
                        {/* Content Section for Mobile */}
                        <div className="flex-1 flex flex-col justify-between p-6">
                          <div>
                            <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                              {item.description}
                            </p>
                          </div>
                          <div className="flex flex-col space-y-3">
                            <Link
                              to={item.path}
                              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
                            >
                              {item.cta}
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <button className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 transition-all duration-300">
                              <Play className="mr-2 h-5 w-5" />
                              Watch Demo
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout - Grid */}
                      <div className="hidden md:grid md:grid-cols-2 h-full">
                        <div className="flex flex-col justify-center p-8 lg:p-12">
                          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                            {item.subtitle}
                          </span>
                          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                            {item.title}
                          </h2>
                          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            {item.description}
                          </p>
                          <div className="flex items-center space-x-4">
                            <Link
                              to={item.path}
                              className="inline-flex items-center px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                              {item.cta}
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <button className="inline-flex items-center px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 transition-all duration-300">
                              <Play className="mr-2 h-5 w-5" />
                              Watch Demo
                            </button>
                          </div>
                        </div>
                        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-12">
                          <div className="relative w-full max-w-md">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl blur-2xl opacity-20"></div>
                            <img
                              src={item.image}
                              alt={item.title}
                              className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            {/* Carousel Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400 w-2'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 md:py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center group">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 md:p-4 rounded-full group-hover:scale-110 transition-transform">
                  <FileSpreadsheet className="h-8 w-8 md:h-10 md:w-10 text-blue-600" />
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {animatedStats.filesProcessed.toLocaleString()}+
              </h3>
              <p className="text-gray-600 font-medium text-sm md:text-base">Files Processed</p>
            </div>
            <div className="text-center group">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 md:p-4 rounded-full group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 md:h-10 md:w-10 text-green-600" />
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {animatedStats.usersCount.toLocaleString()}+
              </h3>
              <p className="text-gray-600 font-medium text-sm md:text-base">Active Users</p>
            </div>
            <div className="text-center group">
              <div className="flex justify-center mb-4">
                <div className="bg-purple-100 p-3 md:p-4 rounded-full group-hover:scale-110 transition-transform">
                  <Clock className="h-8 w-8 md:h-10 md:w-10 text-purple-600" />
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {animatedStats.timeSaved.toLocaleString()}+ Hours
              </h3>
              <p className="text-gray-600 font-medium text-sm md:text-base">Time Saved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Professionals Choose Excel Tools
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with our cutting-edge features
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="text-center group hover:scale-105 transition-all duration-300"
                >
                  <div className="flex justify-center mb-4 md:mb-6">
                    <div className="bg-gray-100 p-3 md:p-4 rounded-2xl group-hover:shadow-lg transition-shadow">
                      <Icon className={`h-10 w-10 md:h-12 md:w-12 ${feature.color}`} />
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tools Section with Tabs */}
      <div className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Tools for Every Need
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive suite of Excel processing tools
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-8 md:mb-12 overflow-x-auto pb-2">
            <div className="bg-white rounded-full shadow-md p-1 inline-flex flex-nowrap min-w-max">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm md:text-base whitespace-nowrap ${
                  activeTab === 'all'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Tools
              </button>
              <button
                onClick={() => setActiveTab('comparison')}
                className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm md:text-base whitespace-nowrap ${
                  activeTab === 'comparison'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Comparison
              </button>
              <button
                onClick={() => setActiveTab('filter')}
                className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm md:text-base whitespace-nowrap ${
                  activeTab === 'filter'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Filter
              </button>
              <button
                onClick={() => setActiveTab('duplicate')}
                className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm md:text-base whitespace-nowrap ${
                  activeTab === 'duplicate'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Duplicate Check
              </button>
              <button
                onClick={() => setActiveTab('pemkwh')}
                className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm md:text-base whitespace-nowrap ${
                  activeTab === 'pemkwh'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                OverPemkwh
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredTools.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className={`group relative bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                    tool.featured ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  {tool.featured && (
                    <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-2 py-1 md:px-3 md:py-1 rounded-full font-semibold shadow-lg">
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-start space-x-3 md:space-x-4">
                    <div className={`bg-gradient-to-r ${tool.color} p-2 md:p-3 rounded-lg md:rounded-xl group-hover:scale-110 transition-transform shadow-lg flex-shrink-0`}>
                      <Icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 mb-2 text-base md:text-lg group-hover:text-blue-600 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 md:mt-4 flex items-center text-blue-600 font-medium text-sm md:text-base group-hover:text-blue-700">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Data Professionals
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              See what our users have to say
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed text-sm md:text-base">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3 md:mr-4 object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.name}</h4>
                    <p className="text-xs md:text-sm text-gray-600 truncate">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Promotion Section */}
      <div className="py-12 md:py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              Ready to Transform Your Data Workflow?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed max-w-3xl mx-auto">
              Join thousands of professionals who have revolutionized their Excel data processing. 
              Start your journey towards more efficient analysis today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link
                to="/stand-lalu-ini-sbb"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Start Using for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300">
                <Play className="mr-2 h-5 w-5" />
                Watch Quick Tour
              </button>
            </div>
            <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-base text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-2 text-green-500" />
                No registration required
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-500" />
                Process files locally
              </div>
              <div className="flex items-center">
                <Download className="h-4 w-4 md:h-5 md:w-5 mr-2 text-purple-500" />
                Export to Excel
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-12 md:py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
            Have questions? We're here to help.
          </h3>
          <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
            Our support team is available 24/7 to assist you.
          </p>
          <button className="px-6 py-2 md:px-6 md:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;