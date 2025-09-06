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
          <div className="form-section">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Host Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="fullName">Full Name *</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
                  id="fullName" 
                  name="fullName"
                  type="text" 
                  placeholder="Enter your full name" 
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email Address *</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="Enter your email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phone">Phone Number *</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
                  id="phone" 
                  name="phone"
                  type="tel" 
                  placeholder="Enter your phone number" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="city">City *</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
                  id="city" 
                  name="city"
                  type="text" 
                  placeholder="Enter your city" 
                  value={formData.city}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="state">State *</label>
                <select 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
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
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="pincode">PIN Code *</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
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
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Driver's License Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="licenseNumber">License Number *</label>
                  <input 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
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
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="licenseExpiry">License Expiry Date *</label>
                  <input 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
                    id="licenseExpiry" 
                    name="licenseExpiry"
                    type="date" 
                    value={formData.licenseExpiry}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="licenseUpload">Upload License Copy *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <span className="material-icons text-4xl text-gray-400 mb-2">cloud_upload</span>
                    <p className="text-gray-500 mb-2">Drop your license file here or click to browse</p>
                    <input className="hidden" id="licenseUpload" type="file" accept="image/*,.pdf" required />
                    <button 
                      type="button" 
                      onClick={() => document.getElementById('licenseUpload').click()}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Choose File
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-section">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Vehicle Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="carMake">Car Make *</label>
                <select 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
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
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="carModel">Car Model *</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
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
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="carYear">Year *</label>
                <select 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
                  id="carYear" 
                  name="carYear"
                  value={formData.carYear}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select year</option>
                  {Array.from({length: 15}, (_, i) => 2024 - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="registrationNumber">Registration Number *</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
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
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="fuelType">Fuel Type *</label>
                <select 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
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
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="transmission">Transmission *</label>
                <select 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
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
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="seats">Seats *</label>
                <select 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
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
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="carType">Car Type *</label>
                <select 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
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
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Car Photos *</label>
              <p className="text-sm text-gray-500 mb-4">Upload high-quality photos of your car (interior and exterior)</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <span className="material-icons text-3xl text-gray-400 mb-2">add_a_photo</span>
                  <p className="text-gray-500 mb-2">Exterior Photos</p>
                  <input type="file" multiple accept="image/*" className="hidden" id="exteriorPhotos" />
                  <button 
                    type="button" 
                    onClick={() => document.getElementById('exteriorPhotos').click()}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Upload Photos
                  </button>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <span className="material-icons text-3xl text-gray-400 mb-2">add_a_photo</span>
                  <p className="text-gray-500 mb-2">Interior Photos</p>
                  <input type="file" multiple accept="image/*" className="hidden" id="interiorPhotos" />
                  <button 
                    type="button" 
                    onClick={() => document.getElementById('interiorPhotos').click()}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Upload Photos
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-section">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Documents Upload</h2>
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <span className="material-icons text-4xl text-gray-400 mb-2">description</span>
                <p className="text-gray-500 mb-2">Vehicle Registration Certificate (RC)</p>
                <input type="file" accept="image/*,.pdf" className="hidden" id="rcUpload" />
                <button 
                  type="button" 
                  onClick={() => document.getElementById('rcUpload').click()}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Upload RC
                </button>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <span className="material-icons text-4xl text-gray-400 mb-2">shield</span>
                <p className="text-gray-500 mb-2">Insurance Certificate</p>
                <input type="file" accept="image/*,.pdf" className="hidden" id="insuranceUpload" />
                <button 
                  type="button" 
                  onClick={() => document.getElementById('insuranceUpload').click()}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Upload Insurance
                </button>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <span className="material-icons text-4xl text-gray-400 mb-2">check_circle</span>
                <p className="text-gray-500 mb-2">Pollution Under Control Certificate (PUC)</p>
                <input type="file" accept="image/*,.pdf" className="hidden" id="pucUpload" />
                <button 
                  type="button" 
                  onClick={() => document.getElementById('pucUpload').click()}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Upload PUC
                </button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="form-section">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Pricing & Availability</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="dailyRate">Daily Rate (₹) *</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
                  id="dailyRate" 
                  name="dailyRate"
                  type="number" 
                  placeholder="Enter daily rate" 
                  value={formData.dailyRate}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="weeklyDiscount">Weekly Discount (%)</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
                  id="weeklyDiscount" 
                  name="weeklyDiscount"
                  type="number" 
                  placeholder="Weekly discount percentage" 
                  value={formData.weeklyDiscount}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="monthlyDiscount">Monthly Discount (%)</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
                  id="monthlyDiscount" 
                  name="monthlyDiscount"
                  type="number" 
                  placeholder="Monthly discount percentage" 
                  value={formData.monthlyDiscount}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Availability</h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="availability" 
                      value="always" 
                      checked={formData.availability === 'always'}
                      onChange={handleInputChange}
                      className="mr-3" 
                    />
                    <span className="font-medium">Always Available</span>
                  </label>
                  <p className="text-sm text-gray-500 ml-6">Your car is available for booking anytime</p>
                </div>
                <div>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="availability" 
                      value="custom" 
                      checked={formData.availability === 'custom'}
                      onChange={handleInputChange}
                      className="mr-3" 
                    />
                    <span className="font-medium">Custom Schedule</span>
                  </label>
                  <p className="text-sm text-gray-500 ml-6">Set specific dates when your car is available</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="bankAccount">Bank Account Number *</label>
                  <input 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
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
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="ifscCode">IFSC Code *</label>
                  <input 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
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
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="accountName">Account Holder Name *</label>
                  <input 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]" 
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
          <div className="form-section">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Terms & Agreement</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">Host Agreement</h3>
              <div className="text-sm text-gray-700 space-y-2 max-h-64 overflow-y-auto">
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
              <label className="flex items-start">
                <input type="checkbox" required className="mt-1 mr-3" />
                <span className="text-sm text-gray-700">
                  I agree to the <a href="#" className="text-[var(--primary-color)] hover:underline">Terms of Service</a> and 
                  <a href="#" className="text-[var(--primary-color)] hover:underline ml-1">Privacy Policy</a>
                </span>
              </label>
              <label className="flex items-start">
                <input type="checkbox" required className="mt-1 mr-3" />
                <span className="text-sm text-gray-700">
                  I certify that all information provided is accurate and complete
                </span>
              </label>
              <label className="flex items-start">
                <input type="checkbox" required className="mt-1 mr-3" />
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
    <>
      <Header />
      <main className="bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Become a Host</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start earning money by listing your vehicle on GetSetRide. Join thousands of hosts who are making passive income from their cars.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-center items-center space-x-4 mb-4">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      currentStep === step.number 
                        ? 'bg-[var(--primary-color)] text-white' 
                        : currentStep > step.number
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-16 h-1 bg-gray-200"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-center text-sm text-gray-500 space-x-12">
              {steps.map(step => (
                <span key={step.number}>{step.title}</span>
              ))}
            </div>
          </div>

          {/* Form Container */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    currentStep === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  disabled={currentStep === 1}
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--primary-hover-color)] transition-colors"
                >
                  {currentStep === 5 ? 'Complete Registration' : 'Next'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default BecomeHostPage;
