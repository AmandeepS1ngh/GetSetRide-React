import React, { useState } from 'react';
import Header from '../components/common/Header';

const BecomeHostPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Host Information
    fullName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
    licenseNumber: '',
    licenseExpiry: '',

    // Vehicle Information
    carMake: '',
    carModel: '',
    carYear: '',
    registrationNumber: '',
    fuelType: '',
    transmission: '',
    seats: '',
    carType: '',

    // Pricing
    dailyRate: '',
    weeklyDiscount: '',
    monthlyDiscount: '',
    availability: 'always',

    // Bank Details
    bankAccount: '',
    ifscCode: '',
    accountName: ''
  });

  const steps = [
    { number: 1, title: 'Host Info' },
    { number: 2, title: 'Vehicle Info' },
    { number: 3, title: 'Documents' },
    { number: 4, title: 'Pricing' },
    { number: 5, title: 'Agreement' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep === 5) {
      // Submit form
      alert('Registration completed successfully!');
      console.log('Form Data:', formData);
    } else {
      nextStep();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Host Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="fullName">Full Name *</label>
                <div className="relative group">
                  <span className="material-icons absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors">person</span>
                  <input
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder-gray-400"
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="email">Email Address *</label>
                <div className="relative group">
                  <span className="material-icons absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors">email</span>
                  <input
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder-gray-400"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="phone">Phone Number *</label>
                <div className="relative group">
                  <span className="material-icons absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors">phone</span>
                  <input
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder-gray-400"
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="city">City *</label>
                <div className="relative group">
                  <span className="material-icons absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors">location_city</span>
                  <input
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder-gray-400"
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="state">State *</label>
                <div className="relative group">
                  <span className="material-icons absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors">map</span>
                  <select
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium appearance-none"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select your state</option>
                    <option value="delhi">Delhi</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="chennai">Chennai</option>
                    <option value="kolkata">Kolkata</option>
                    <option value="pune">Pune</option>
                    <option value="hyderabad">Hyderabad</option>
                  </select>
                  <span className="material-icons absolute top-3.5 right-4 text-gray-400 pointer-events-none">expand_more</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="pincode">PIN Code *</label>
                <div className="relative group">
                  <span className="material-icons absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors">pin_drop</span>
                  <input
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder-gray-400"
                    id="pincode"
                    name="pincode"
                    type="text"
                    placeholder="Enter PIN code"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Driver's License Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="licenseNumber">License Number *</label>
                  <input
                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder-gray-400"
                    id="licenseNumber"
                    name="licenseNumber"
                    type="text"
                    placeholder="Enter license number"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="licenseExpiry">License Expiry Date *</label>
                  <input
                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-500"
                    id="licenseExpiry"
                    name="licenseExpiry"
                    type="date"
                    value={formData.licenseExpiry}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="licenseUpload">Upload License Copy *</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => document.getElementById('licenseUpload').click()}>
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="material-icons text-3xl">cloud_upload</span>
                    </div>
                    <p className="text-gray-900 font-medium mb-1">Click to upload or drag and drop</p>
                    <p className="text-gray-500 text-sm mb-4">PDF, JPG or PNG (max. 5MB)</p>
                    <input className="hidden" id="licenseUpload" type="file" accept="image/*,.pdf" required />
                    <button
                      type="button"
                      className="text-blue-600 font-bold hover:text-blue-700 transition-colors"
                    >
                      Browse Files
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Vehicle Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="carMake">Car Make *</label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium appearance-none"
                    id="carMake"
                    name="carMake"
                    value={formData.carMake}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select car make</option>
                    <option value="maruti">Maruti Suzuki</option>
                    <option value="hyundai">Hyundai</option>
                    <option value="tata">Tata</option>
                    <option value="mahindra">Mahindra</option>
                    <option value="honda">Honda</option>
                    <option value="toyota">Toyota</option>
                    <option value="kia">Kia</option>
                    <option value="mg">MG</option>
                  </select>
                  <span className="material-icons absolute top-3.5 right-4 text-gray-400 pointer-events-none">expand_more</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="carModel">Car Model *</label>
                <input
                  className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder-gray-400"
                  id="carModel"
                  name="carModel"
                  type="text"
                  placeholder="Enter car model"
                  value={formData.carModel}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="carYear">Year *</label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium appearance-none"
                    id="carYear"
                    name="carYear"
                    value={formData.carYear}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select year</option>
                    {Array.from({ length: 15 }, (_, i) => 2024 - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <span className="material-icons absolute top-3.5 right-4 text-gray-400 pointer-events-none">expand_more</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="registrationNumber">Registration Number *</label>
                <input
                  className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder-gray-400"
                  id="registrationNumber"
                  name="registrationNumber"
                  type="text"
                  placeholder="Enter registration number"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="fuelType">Fuel Type *</label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium appearance-none"
                    id="fuelType"
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select fuel type</option>
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="cng">CNG</option>
                    <option value="electric">Electric</option>
                  </select>
                  <span className="material-icons absolute top-3.5 right-4 text-gray-400 pointer-events-none">expand_more</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="transmission">Transmission *</label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium appearance-none"
                    id="transmission"
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select transmission</option>
                    <option value="manual">Manual</option>
                    <option value="automatic">Automatic</option>
                  </select>
                  <span className="material-icons absolute top-3.5 right-4 text-gray-400 pointer-events-none">expand_more</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="seats">Seats *</label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium appearance-none"
                    id="seats"
                    name="seats"
                    value={formData.seats}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select seats</option>
                    <option value="2">2 Seater</option>
                    <option value="4">4 Seater</option>
                    <option value="5">5 Seater</option>
                    <option value="7">7 Seater</option>
                    <option value="8">8 Seater</option>
                  </select>
                  <span className="material-icons absolute top-3.5 right-4 text-gray-400 pointer-events-none">expand_more</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="carType">Car Type *</label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium appearance-none"
                    id="carType"
                    name="carType"
                    value={formData.carType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select car type</option>
                    <option value="hatchback">Hatchback</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="muv">MUV</option>
                    <option value="coupe">Coupe</option>
                    <option value="convertible">Convertible</option>
                    <option value="wagon">Wagon</option>
                  </select>
                  <span className="material-icons absolute top-3.5 right-4 text-gray-400 pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <label className="block text-lg font-bold text-gray-900 mb-2">Car Photos *</label>
              <p className="text-sm text-gray-500 mb-6">Upload high-quality photos of your car (interior and exterior)</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => document.getElementById('exteriorPhotos').click()}>
                  <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-icons text-3xl">directions_car</span>
                  </div>
                  <p className="text-gray-900 font-medium mb-1">Exterior Photos</p>
                  <p className="text-gray-500 text-sm mb-4">Front, Back, Side views</p>
                  <input type="file" multiple accept="image/*" className="hidden" id="exteriorPhotos" />
                  <button type="button" className="text-purple-600 font-bold hover:text-purple-700 transition-colors">Select Photos</button>
                </div>

                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => document.getElementById('interiorPhotos').click()}>
                  <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-icons text-3xl">airline_seat_recline_normal</span>
                  </div>
                  <p className="text-gray-900 font-medium mb-1">Interior Photos</p>
                  <p className="text-gray-500 text-sm mb-4">Dashboard, Seats, Boot</p>
                  <input type="file" multiple accept="image/*" className="hidden" id="interiorPhotos" />
                  <button type="button" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors">Select Photos</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Documents Upload</h2>
            <div className="space-y-6">
              {[
                { id: 'rcUpload', title: 'Vehicle Registration Certificate (RC)', icon: 'description', color: 'blue' },
                { id: 'insuranceUpload', title: 'Insurance Certificate', icon: 'shield', color: 'green' },
                { id: 'pucUpload', title: 'Pollution Under Control Certificate (PUC)', icon: 'check_circle', color: 'orange' }
              ].map((doc) => (
                <div key={doc.id} className="border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition-shadow bg-white">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 bg-${doc.color}-50 text-${doc.color}-600`}>
                    <span className="material-icons text-3xl">{doc.icon}</span>
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{doc.title}</h3>
                    <p className="text-gray-500 text-sm">Upload a clear copy of the document</p>
                  </div>
                  <div className="flex-shrink-0">
                    <input type="file" accept="image/*,.pdf" className="hidden" id={doc.id} />
                    <button
                      type="button"
                      onClick={() => document.getElementById(doc.id).click()}
                      className="px-6 py-2.5 rounded-lg border border-gray-300 font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Upload
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Pricing & Availability</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="dailyRate">Daily Rate (₹) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-400 font-bold">₹</span>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-lg placeholder-gray-400"
                    id="dailyRate"
                    name="dailyRate"
                    type="number"
                    placeholder="2500"
                    value={formData.dailyRate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="weeklyDiscount">Weekly Discount (%)</label>
                <input
                  className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder-gray-400"
                  id="weeklyDiscount"
                  name="weeklyDiscount"
                  type="number"
                  placeholder="e.g. 10"
                  value={formData.weeklyDiscount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-2">
                <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3">
                  <span className="material-icons text-blue-600 mt-0.5">info</span>
                  <p className="text-sm text-blue-800">We recommend setting a competitive price to attract more bookings. GetSetRide charges a 15% platform fee.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Availability</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <label className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${formData.availability === 'always' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="availability"
                      value="always"
                      checked={formData.availability === 'always'}
                      onChange={handleInputChange}
                      className="mr-3 w-5 h-5 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-bold text-gray-900">Always Available</span>
                  </div>
                  <p className="text-sm text-gray-500 ml-8">Your car is available for booking anytime by default.</p>
                </label>

                <label className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${formData.availability === 'custom' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="availability"
                      value="custom"
                      checked={formData.availability === 'custom'}
                      onChange={handleInputChange}
                      className="mr-3 w-5 h-5 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-bold text-gray-900">Custom Schedule</span>
                  </div>
                  <p className="text-sm text-gray-500 ml-8">Set specific dates when your car is available.</p>
                </label>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="bankAccount">Bank Account Number *</label>
                  <input
                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder-gray-400"
                    id="bankAccount"
                    name="bankAccount"
                    type="text"
                    placeholder="Enter bank account number"
                    value={formData.bankAccount}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="ifscCode">IFSC Code *</label>
                  <input
                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder-gray-400"
                    id="ifscCode"
                    name="ifscCode"
                    type="text"
                    placeholder="Enter IFSC code"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-900 mb-2" htmlFor="accountName">Account Holder Name *</label>
                  <input
                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder-gray-400"
                    id="accountName"
                    name="accountName"
                    type="text"
                    placeholder="Enter account holder name"
                    value={formData.accountName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Terms & Agreement</h2>
            <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
              <h3 className="text-lg font-bold mb-4">Host Agreement</h3>
              <div className="text-sm text-gray-600 space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                <p><strong>1. Vehicle Condition:</strong> You certify that your vehicle is in good working condition and meets all safety requirements.</p>
                <p><strong>2. Insurance:</strong> Your vehicle must have valid insurance coverage throughout the rental period.</p>
                <p><strong>3. Availability:</strong> You agree to keep your vehicle available as per the schedule you set.</p>
                <p><strong>4. Pricing:</strong> You have the right to set your own pricing, subject to platform guidelines.</p>
                <p><strong>5. Platform Fee:</strong> GetSetRide charges a 15% platform fee on each booking.</p>
                <p><strong>6. Damage Policy:</strong> Any damage to your vehicle will be covered by our insurance policy, subject to terms and conditions.</p>
                <p><strong>7. Cleanliness:</strong> You agree to provide a clean vehicle for each rental.</p>
                <p><strong>8. Communication:</strong> You agree to respond to rental requests within 4 hours.</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                <input type="checkbox" required className="mt-1 mr-3 w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300" />
                <span className="text-sm text-gray-700">
                  I agree to the <a href="#" className="text-blue-600 font-bold hover:underline">Terms of Service</a> and
                  <a href="#" className="text-blue-600 font-bold hover:underline ml-1">Privacy Policy</a>
                </span>
              </label>
              <label className="flex items-start p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                <input type="checkbox" required className="mt-1 mr-3 w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300" />
                <span className="text-sm text-gray-700">
                  I certify that all information provided is accurate and complete
                </span>
              </label>
              <label className="flex items-start p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                <input type="checkbox" required className="mt-1 mr-3 w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300" />
                <span className="text-sm text-gray-700">
                  I understand that GetSetRide will verify all documents before approving my listing
                </span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="pt-8 pb-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Become a Host</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start earning money by listing your vehicle on GetSetRide. Join thousands of hosts who are making passive income from their cars.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex justify-between items-center relative">
              {/* Line Background */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0 mx-8"></div>

              {/* Active Line Fill */}
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 z-0 mx-8 transition-all duration-500 ease-in-out"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              ></div>

              {steps.map((step, index) => (
                <div key={step.number} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-4 ${currentStep > step.number
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : currentStep === step.number
                          ? 'bg-white border-blue-600 text-blue-600 scale-110 shadow-lg'
                          : 'bg-white border-gray-200 text-gray-400'
                      }`}
                  >
                    {currentStep > step.number ? (
                      <span className="material-icons text-sm">check</span>
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className={`text-xs font-bold mt-2 uppercase tracking-wide transition-colors duration-300 ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Container */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 relative overflow-hidden">
              {/* top accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12 pt-8 border-t border-gray-100">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`px-8 py-3 rounded-xl font-bold transition-all ${currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  disabled={currentStep === 1}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5"
                >
                  {currentStep === 5 ? 'Submit Application' : 'Next Step'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BecomeHostPage;
