import React, { useState, useEffect } from 'react';
import { Lock, Upload, Trash2, Edit, Plus, LogOut, Users, FileText, BarChart3, Image as ImageIcon, X, Check, Clock } from 'lucide-react';

interface Profile {
  _id: string;
  profileId: string;
  fullName: string;
  gender: string;
  age: number;
  dob: string;
  community: string;
  location: string;
  profession: string;
  education?: string;
  phone: string;
  email?: string;
  photos: string[];
  about?: string;
  height?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Registration {
  _id: string;
  registrationId: string;
  fullName: string;
  gender: string;
  age: number;
  dob: string;
  community: string;
  location: string;
  profession: string;
  phone: string;
  email?: string;
  status: string;
  submittedAt: string;
}

interface DashboardStats {
  totalProfiles: number;
  activeProfiles: number;
  totalRegistrations: number;
  pendingRegistrations: number;
  verifiedRegistrations: number;
}

const API_BASE = 'http://localhost:5000/api';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [token, setToken] = useState('');
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profiles' | 'registrations'>('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [profileForm, setProfileForm] = useState<Partial<Profile>>({});
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      fetchDashboardData();
    }
  }, []);

  const fetchDashboardData = async () => {
    const savedToken = localStorage.getItem('adminToken');
    if (!savedToken) return;

    try {
      // Fetch stats
      const statsRes = await fetch(`${API_BASE}/dashboard/stats`, {
        headers: { 'Authorization': `Bearer ${savedToken}` }
      });
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // Fetch profiles
      const profilesRes = await fetch(`${API_BASE}/profiles`);
      if (profilesRes.ok) {
        const profilesData = await profilesRes.json();
        setProfiles(profilesData);
      }

      // Fetch registrations
      const regsRes = await fetch(`${API_BASE}/registrations`, {
        headers: { 'Authorization': `Bearer ${savedToken}` }
      });
      if (regsRes.ok) {
        const regsData = await regsRes.json();
        setRegistrations(regsData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
        setIsAuthenticated(true);
        fetchDashboardData();
      } else {
        setLoginError(data.error || 'Login failed');
      }
    } catch (error) {
      setLoginError('Server error. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) return;

    const formData = new FormData();
    Object.entries(profileForm).forEach(([key, value]) => {
      if (key !== 'photos') {
        formData.append(key, value as string);
      }
    });

    selectedPhotos.forEach(photo => {
      formData.append('photos', photo);
    });

    try {
      const url = editingProfile 
        ? `${API_BASE}/profiles/${editingProfile.profileId}`
        : `${API_BASE}/profiles`;
      
      const method = editingProfile ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (response.ok) {
        setShowProfileModal(false);
        setEditingProfile(null);
        setProfileForm({});
        setSelectedPhotos([]);
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleDeleteProfile = async (profileId: string) => {
    if (!confirm('Are you sure you want to delete this profile?')) return;
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/profiles/${profileId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const handleEditProfile = (profile: Profile) => {
    setEditingProfile(profile);
    setProfileForm(profile);
    setSelectedPhotos([]);
    setShowProfileModal(true);
  };

  const handleAddProfile = () => {
    setEditingProfile(null);
    setProfileForm({
      gender: 'Bride',
      status: 'Active'
    });
    setSelectedPhotos([]);
    setShowProfileModal(true);
  };

  const handleUpdateRegistrationStatus = async (registrationId: string, status: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/registrations/${registrationId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error updating registration:', error);
    }
  };

  const handleDeleteRegistration = async (registrationId: string) => {
    if (!confirm('Are you sure you want to delete this registration?')) return;
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/registrations/${registrationId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error deleting registration:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-stone-800">Admin Dashboard</h1>
            <p className="text-stone-600 mt-2">Sri Lakshmi Matrimony</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter password"
                required
              />
            </div>
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Login
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-stone-500">
            <p>Default credentials:</p>
            <p className="font-medium">Username: admin | Password: admin123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-stone-800">Admin Dashboard</h1>
              <p className="text-stone-600 text-sm">Sri Lakshmi Matrimony</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-stone-600 hover:text-stone-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('profiles')}
              className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium transition-colors ${
                activeTab === 'profiles'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-stone-600 hover:text-stone-800'
              }`}
            >
              <Users className="w-4 h-4" />
              Profiles
            </button>
            <button
              onClick={() => setActiveTab('registrations')}
              className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium transition-colors ${
                activeTab === 'registrations'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-stone-600 hover:text-stone-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              Registrations
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-stone-600 text-sm">Total Profiles</p>
                  <p className="text-3xl font-bold text-stone-800 mt-2">{stats.totalProfiles}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-stone-600 text-sm">Active Profiles</p>
                  <p className="text-3xl font-bold text-emerald-600 mt-2">{stats.activeProfiles}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-stone-600 text-sm">Total Registrations</p>
                  <p className="text-3xl font-bold text-stone-800 mt-2">{stats.totalRegistrations}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-stone-600 text-sm">Pending Review</p>
                  <p className="text-3xl font-bold text-amber-600 mt-2">{stats.pendingRegistrations}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profiles' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-stone-800">Manage Profiles</h2>
              <button
                onClick={handleAddProfile}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Profile
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-stone-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-600 uppercase tracking-wider">Profile</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-600 uppercase tracking-wider">Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-600 uppercase tracking-wider">Photos</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-stone-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {profiles.map((profile) => (
                    <tr key={profile._id} className="hover:bg-stone-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {profile.photos[0] && (
                            <img
                              src={`http://localhost:5000${profile.photos[0]}`}
                              alt={profile.fullName}
                              className="w-12 h-12 rounded-full object-cover mr-4"
                            />
                          )}
                          <div>
                            <p className="font-medium text-stone-800">{profile.fullName}</p>
                            <p className="text-sm text-stone-600">{profile.profileId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-stone-800">{profile.gender}, {profile.age} yrs</p>
                        <p className="text-sm text-stone-600">{profile.community} • {profile.location}</p>
                        <p className="text-sm text-stone-600">{profile.profession}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          profile.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                          profile.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {profile.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <ImageIcon className="w-4 h-4 text-stone-600" />
                          <span className="text-sm text-stone-600">{profile.photos.length}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditProfile(profile)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProfile(profile.profileId)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'registrations' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-stone-800">Registration Requests</h2>

            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-stone-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-600 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-600 uppercase tracking-wider">Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-600 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-600 uppercase tracking-wider">Submitted</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-stone-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {registrations.map((reg) => (
                    <tr key={reg._id} className="hover:bg-stone-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-stone-800">{reg.fullName}</p>
                        <p className="text-sm text-stone-600">{reg.registrationId}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-stone-800">{reg.gender}, {reg.age} yrs</p>
                        <p className="text-sm text-stone-600">{reg.community} • {reg.location}</p>
                        <p className="text-sm text-stone-600">{reg.profession}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-stone-800">{reg.phone}</p>
                        <p className="text-sm text-stone-600">{reg.email || '-'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={reg.status}
                          onChange={(e) => handleUpdateRegistrationStatus(reg.registrationId, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${
                            reg.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' :
                            reg.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                            'bg-amber-100 text-amber-800'
                          }`}
                        >
                          <option value="Pending Verification">Pending Verification</option>
                          <option value="Verified">Verified</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-stone-600">{new Date(reg.submittedAt).toLocaleDateString()}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteRegistration(reg.registrationId)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-stone-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-stone-800">
                  {editingProfile ? 'Edit Profile' : 'Add New Profile'}
                </h2>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleProfileSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={profileForm.fullName || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Gender *</label>
                  <select
                    value={profileForm.gender || 'Bride'}
                    onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    required
                  >
                    <option value="Bride">Bride</option>
                    <option value="Groom">Groom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Age *</label>
                  <input
                    type="number"
                    value={profileForm.age || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, age: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    value={profileForm.dob || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, dob: e.target.value })}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Community *</label>
                  <input
                    type="text"
                    value={profileForm.community || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, community: e.target.value })}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Location *</label>
                  <input
                    type="text"
                    value={profileForm.location || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Profession *</label>
                  <input
                    type="text"
                    value={profileForm.profession || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, profession: e.target.value })}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={profileForm.phone || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profileForm.email || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Education</label>
                  <input
                    type="text"
                    value={profileForm.education || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, education: e.target.value })}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Height</label>
                  <input
                    type="text"
                    value={profileForm.height || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, height: e.target.value })}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Status</label>
                  <select
                    value={profileForm.status || 'Active'}
                    onChange={(e) => setProfileForm({ ...profileForm, status: e.target.value })}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">About</label>
                <textarea
                  value={profileForm.about || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, about: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Photos (up to 5)</label>
                <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setSelectedPhotos(Array.from(e.target.files || []))}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="w-8 h-8 text-stone-400 mb-2" />
                    <p className="text-sm text-stone-600">Click to upload photos</p>
                    <p className="text-xs text-stone-500 mt-1">PNG, JPG, WEBP up to 5MB each</p>
                  </label>
                  {selectedPhotos.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedPhotos.map((photo, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt={`Preview ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="flex-1 px-4 py-2 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                >
                  {editingProfile ? 'Update Profile' : 'Add Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
