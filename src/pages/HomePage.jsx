import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    departure: '',
    returnLocation: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: ''
  });

  const handleInputChange = (field, value) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Build query string with search parameters
    const queryParams = new URLSearchParams();

    if (searchParams.departure && searchParams.departure.trim()) {
      queryParams.append('city', searchParams.departure.trim());
    }
    if (searchParams.pickupDate) {
      queryParams.append('pickupDate', searchParams.pickupDate);
    }
    if (searchParams.returnDate) {
      queryParams.append('returnDate', searchParams.returnDate);
    }

    // Navigate to marketplace
    const searchUrl = queryParams.toString()
      ? `/marketplace?${queryParams.toString()}`
      : '/marketplace';

    navigate(searchUrl);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        {/* Abstract Background with Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/40 z-10" />
          <img
            src="/images/Porsche 911 Carrera S parked with trees in background.jpeg"
            alt="Luxury Car"
            className="w-full h-full object-cover object-center scale-105"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-6 flex flex-col items-center text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-600/20 border border-blue-500/30 backdrop-blur-md text-blue-100 text-sm font-medium tracking-wide">
              The Smarter Way to Rent
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
              Drive the car <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">you deserve</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
              Connect with local owners and rent exceptional cars for your next adventure. Fast, secure, and hassle-free.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full max-w-5xl mt-12 animate-fade-in-up delay-100">
            <form onSubmit={handleSearch} className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-2xl border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
                {/* Location */}
                <div className="lg:col-span-4 space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Location</label>
                  <div className="relative group">
                    <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">location_on</span>
                    <input
                      type="text"
                      placeholder="City, airport, or address"
                      value={searchParams.departure}
                      onChange={(e) => handleInputChange('departure', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="lg:col-span-3 space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Pick up</label>
                  <div className="relative group">
                    <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">event</span>
                    <input
                      type="date"
                      value={searchParams.pickupDate}
                      onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="lg:col-span-3 space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Return</label>
                  <div className="relative group">
                    <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">event</span>
                    <input
                      type="date"
                      value={searchParams.returnDate}
                      onChange={(e) => handleInputChange('returnDate', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Button */}
                <div className="lg:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-6 rounded-xl font-bold shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <span className="material-icons text-xl">search</span>
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Simple placeholders for "Trusted by" logos or stats */}
            <div className="flex items-center gap-2">
              <span className="material-icons text-gray-400">verified_user</span>
              <span className="font-semibold text-gray-600">Verified Hosts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-icons text-gray-400">shield</span>
              <span className="font-semibold text-gray-600">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-icons text-gray-400">support_agent</span>
              <span className="font-semibold text-gray-600">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-display">Seamless Experience</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Skip the rental counter. Book the car you want, whenever you need it.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: 'search',
                title: 'Find the perfect car',
                desc: 'Enter your location and dates to browse thousands of cars shared by local hosts.',
                color: 'blue'
              },
              {
                icon: 'check_circle',
                title: 'Book instantly',
                desc: 'Book on the GetSetRide app or website, and get approved instantly.',
                color: 'indigo'
              },
              {
                icon: 'directions_car',
                title: 'Hit the road',
                desc: 'Pick up the car from the host or meet them at a convenient location.',
                color: 'sky'
              }
            ].map((item, index) => (
              <div key={index} className="group p-8 rounded-3xl bg-gray-50 hover:bg-white border border-gray-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl bg-${item.color}-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <span className={`material-icons text-${item.color}-600 text-2xl`}>{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Host CTA - Modern Design */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Turn your car into an <span className="text-blue-400">earning engine</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Join thousands of hosts who are earning safely with GetSetRide. We provide the platform, insurance, and support you need to succeed.
              </p>

              <div className="space-y-4">
                {[
                  'Earn passive income when you are not using your car',
                  'Comprehensive insurance coverage included',
                  'Screened and verified borrowers'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="material-icons text-green-400 text-sm">check</span>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link to="/become-host" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-900 transition-all duration-200 bg-white border border-transparent rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white">
                  Become a Host
                </Link>
                <Link to="/how-it-works" className="ml-4 inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-transparent border border-gray-700 rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-700">
                  How it works
                </Link>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50 group">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10 opacity-60"></div>
                <img
                  src="/images/Landing page image .png"
                  alt="Host Dashboard"
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl">
                    <p className="text-sm text-gray-300">Average Monthly Earnings</p>
                    <p className="text-2xl font-bold text-white mt-1">$750 - $1,500</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Drivers</h2>
            <p className="text-lg text-gray-500">Don't just take our word for it.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Alex Morgan", role: "Renter", quote: "The car was in perfect condition and the host was super friendly. Best rental experience I've had.", color: "orange" },
              { name: "David Chen", role: "Host", quote: "I've made over $2k this month just renting out my car on weekends. The insurance coverage gives me peace of mind.", color: "blue" },
              { name: "Sarah Williams", role: "Renter", quote: "So much better than traditional rental agencies. No lines, no hidden fees, just great cars.", color: "purple" }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-full bg-${t.color}-100 flex items-center justify-center font-bold text-${t.color}-600 text-xl`}>
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{t.name}</h4>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{t.role}</span>
                  </div>
                </div>
                <div className="flex text-yellow-500 mb-4 text-sm">
                  {[1, 2, 3, 4, 5].map(star => <span key={star} className="material-icons text-base">star</span>)}
                </div>
                <p className="text-gray-600 leading-relaxed italic">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">Ready to start your journey?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/marketplace" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold font-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25">
                Browse Cars
              </Link>
              <Link to="/signup" className="px-8 py-4 bg-gray-100 text-gray-900 rounded-xl font-bold font-lg hover:bg-gray-200 transition-colors">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
