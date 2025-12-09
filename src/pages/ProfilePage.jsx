import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import authService from '../services/auth';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const checkAuth = async () => {
      if (!authService.checkAuth()) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${authService.getToken()}`
          }
        });

        const data = await response.json();

        if (data.success) {
          setUser(data.user);
          setFormData({
            fullName: data.user.name,
            email: data.user.email,
            phone: data.user.phone || ''
          });
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage({ type: 'error', text: 'Failed to load user data' });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authService.getToken()}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        setIsEditing(false);
        setMessage({ type: 'success', text: 'Profile updated successfully!' });

        // Update local storage
        authService.updateUser({ name: data.user.name, phone: data.user.phone });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to update profile' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <p className="text-gray-600">User not found</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="py-12 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-gray-100">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
            <div className="px-8 pb-8">
              <div className="relative flex items-end -mt-16 mb-6">
                <div className="w-32 h-32 bg-white p-1 rounded-full shadow-lg">
                  <div className="w-full h-full bg-gray-100 text-blue-600 rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white">
                    {getInitials(user.name)}
                  </div>
                </div>
                <div className="ml-6 mb-2 flex-1">
                  <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-gray-600 font-medium">{user.email}</p>
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full capitalize border border-blue-200">
                      {user.role}
                    </span>
                  </div>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mb-4 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                  >
                    <span className="material-icons text-sm">edit</span>
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500 border-t border-gray-100 pt-6">
                <span className="flex items-center gap-2">
                  <span className="material-icons text-gray-400">calendar_today</span>
                  Joined {formatDate(user.joinDate)}
                </span>
                <span className="flex items-center gap-2">
                  <span className="material-icons text-gray-400">verified_user</span>
                  Email Verified
                </span>
              </div>
            </div>
          </div>

          {/* Alert Messages */}
          {message.text && (
            <div className={`mb-8 p-4 rounded-xl flex items-center gap-3 shadow-sm ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
                'bg-red-50 text-red-800 border border-red-200'
              }`}>
              <span className="material-icons">{message.type === 'success' ? 'check_circle' : 'error'}</span>
              <span className="font-medium">{message.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: Account Stats */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Stats</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <p className="text-gray-500 text-sm font-medium mb-1">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <p className="text-gray-500 text-sm font-medium mb-1">Completed Trips</p>
                    <p className="text-2xl font-bold text-green-600">0</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <p className="text-gray-500 text-sm font-medium mb-1">Cars Listed</p>
                    <p className="text-2xl font-bold text-purple-600">{user.role === 'host' ? '0' : 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Profile Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="material-icons text-blue-600">person</span>
                  Profile Information
                </h2>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-xl text-gray-500 cursor-not-allowed font-medium"
                        disabled
                      />
                      <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                        <span className="material-icons text-xs">lock</span>
                        Email cannot be changed
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Phone Number
                      </label>
                      <div className="relative group">
                        <span className="material-icons absolute left-4 top-3.5 text-gray-400">phone</span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4 pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            fullName: user.name,
                            email: user.email,
                            phone: user.phone || ''
                          });
                          setMessage({ type: '', text: '' });
                        }}
                        className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                        <p className="text-lg font-bold text-gray-900">{user.name}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email</label>
                        <p className="text-lg font-medium text-gray-900">{user.email}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
                        <p className="text-lg font-medium text-gray-900">{user.phone || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Account Type</label>
                        <p className="text-lg font-medium text-gray-900 capitalize flex items-center gap-2">
                          {user.role}
                          {user.role === 'host' && <span className="material-icons text-blue-500 text-sm">verified</span>}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
