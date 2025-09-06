import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const HomePage = () => {
  return (
    <>
      <div className="relative z-30">
        <Header />
      </div>
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('/images/Porsche 911 Carrera S parked with trees in background.jpeg')`
          }}
        />
        
        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Title Section */}
          <div className="flex-1 flex items-center">
            <div className="container mx-auto px-6 max-w-7xl">
              <div className="max-w-2xl">
                <h1 className="text-5xl lg:text-7xl font-light text-white leading-tight">
                  Rent a Car for Every Journey
                </h1>
              </div>
            </div>
          </div>
          
          {/* Booking Form - Bottom Section */}
          <div className="pb-8">
            <div className="container mx-auto px-6 max-w-7xl">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
                <div className="flex flex-wrap gap-4 mb-4">
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                  {/* Departure */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Departure</label>
                    <div className="relative">
                      <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                        location_on
                      </span>
                      <input
                        type="text"
                        placeholder="City, airport or station"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                  
                  {/* Return Location */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Return Location</label>
                    <div className="relative">
                      <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                        location_on
                      </span>
                      <input
                        type="text"
                        placeholder="City, airport or station"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                  
                  {/* Pick Up Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Pick Up Date & Time</label>
                    <div className="relative">
                      <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                        event
                      </span>
                      <input
                        type="date"
                        defaultValue="2025-09-04"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                  
                  {/* Pick Up Time */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 opacity-0">Time</label>
                    <div className="relative">
                      <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                        schedule
                      </span>
                      <input
                        type="time"
                        defaultValue="10:30"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                  
                  {/* Search Button */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 opacity-0">Search</label>
                    <Link
                      to="/marketplace"
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      Search
                      <span className="material-icons">search</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-gray-900 mb-4">How it works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to get you on the road
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="material-icons text-3xl text-white">search</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">1</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Find Your Car</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse our curated selection of premium vehicles in your area
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="material-icons text-3xl text-white">event</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-purple-600">2</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Book Instantly</h3>
              <p className="text-gray-600 leading-relaxed">
                Select your dates and book instantly with our secure payment system
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="material-icons text-3xl text-white">directions_car</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-green-600">3</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Hit the Road</h3>
              <p className="text-gray-600 leading-relaxed">
                Pick up your car and enjoy the freedom of the open road
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="why-choose-us" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">What our customers say</h2>
            <p className="text-lg text-gray-600">Trusted by thousands of happy customers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <img 
                  src="https://media.istockphoto.com/id/507995592/photo/pensive-man-looking-at-the-camera.jpg?s=612x612&w=0&k=20&c=fVoaIqpHo07YzX0-Pw51VgDBiWPZpLyGEahSxUlai7M=" 
                  alt="John Smith" 
                  className="w-12 h-12 rounded-full object-cover mr-4" 
                />
                <div>
                  <h4 className="font-semibold text-gray-900">John Smith</h4>
                  <div className="flex text-yellow-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-icons text-sm">star</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "Exceptional service and pristine vehicles. The booking process was seamless and the support team was incredibly helpful."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <img 
                  src="https://media.istockphoto.com/id/507995592/photo/pensive-man-looking-at-the-camera.jpg?s=612x612&w=0&k=20&c=fVoaIqpHo07YzX0-Pw51VgDBiWPZpLyGEahSxUlai7M=" 
                  alt="Sarah Johnson" 
                  className="w-12 h-12 rounded-full object-cover mr-4" 
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <div className="flex text-yellow-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-icons text-sm">star</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "Amazing experience! The car was spotless and the digital key system made pickup effortless. Highly recommended!"
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <img 
                  src="https://media.istockphoto.com/id/507995592/photo/pensive-man-looking-at-the-camera.jpg?s=612x612&w=0&k=20&c=fVoaIqpHo07YzX0-Pw51VgDBiWPZpLyGEahSxUlai7M=" 
                  alt="Mike Davis" 
                  className="w-12 h-12 rounded-full object-cover mr-4" 
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Mike Davis</h4>
                  <div className="flex text-yellow-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-icons text-sm">star</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "Great value for money and transparent pricing. The quality of vehicles exceeded my expectations every time."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Host Section */}
      <section id="become-host" className="py-28 bg-gray-50">
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-extrabold text-gray-900">Become a HOST</h2>
            <p className="text-lg text-gray-600 mt-4">
              A high-performing web-based car rental system for any rent-a-car company and website.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Image */}
            <div>
              <img 
                src="/images/Landing page image .png" 
                alt="Host with vehicle" 
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </div>
            {/* Right Content */}
            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="material-icons text-blue-600 text-3xl">monetization_on</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Earn Passive Income</h3>
                  <p className="text-gray-600 mt-2">
                    List your car or bike when you are not using it and earn money safely. Be your own boss, take control.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="material-icons text-blue-600 text-3xl">calendar_today</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Be your own boss</h3>
                  <p className="text-gray-600 mt-2">
                    Set your availability, pricing, and approve rental requests. Your car, your rules. You're in charge.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="material-icons text-blue-600 text-3xl">verified</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">We Handle the Hassle</h3>
                  <p className="text-gray-600 mt-2">
                    We handle payments, agreements, and documentation. Sit back, relax, and watch your car pay for your next trip or earning.
                  </p>
                </div>
              </div>
              <Link 
                to="/become-host" 
                className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
              Ready to hit the road?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover the freedom of premium car rental
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link 
                to="/marketplace"
                className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-medium text-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Explore Cars
              </Link>
              <Link 
                to="/signup"
                className="border-2 border-gray-200 text-gray-700 px-10 py-4 rounded-2xl font-medium text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* <Footer /> */}
    </>
  );
};

export default HomePage;
