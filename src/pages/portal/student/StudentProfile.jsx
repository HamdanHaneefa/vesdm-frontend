import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Edit2, Save, X, Camera, Shield, Key } from 'lucide-react';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Rajesh Kumar Sharma',
    email: 'rajesh.sharma@example.com',
    phone: '+91 9876543210',
    dob: '1998-05-15',
    address: '123, MG Road, Bangalore, Karnataka 560001',
    regNumber: 'VESDM2025001234',
    program: 'Diploma in Computer Science',
    batch: '2025-2027',
    enrollmentDate: '2025-01-10',
    status: 'Active',
  });

  const [editData, setEditData] = useState(profileData);

  const handleEdit = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
          <p className="text-slate-500 mt-1">Manage your personal information and preferences</p>
        </div>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#007ACC] to-blue-600 hover:from-[#0069b4] hover:to-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30"
          >
            <Edit2 size={18} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all"
            >
              <X size={18} />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/30"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Profile Header Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#007ACC] via-blue-600 to-[#0F172A] rounded-3xl p-8 text-white shadow-xl"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center text-white text-5xl font-bold border-4 border-white/30 shadow-2xl">
              {profileData.name.charAt(0)}
            </div>
            {isEditing && (
              <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-slate-50 transition-all shadow-lg hover:scale-110">
                <Camera size={20} className="text-slate-700" />
              </button>
            )}
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold mb-2">{profileData.name}</h2>
            <p className="text-blue-100 font-mono text-lg mb-3">{profileData.regNumber}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="px-4 py-1.5 bg-emerald-500 text-white text-sm font-semibold rounded-full">
                {profileData.status}
              </span>
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                {profileData.program}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Personal Information */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
      >
        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <User size={22} className="text-blue-600" />
          </div>
          Personal Information
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {isEditing ? (
            <>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                <input
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={editData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={editData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
                <input
                  name="address"
                  value={editData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </>
          ) : (
            <>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-slate-500 mb-2">Full Name</p>
                <p className="font-semibold text-slate-900 text-lg">{profileData.name}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-slate-500 mb-2">Email Address</p>
                <p className="font-semibold text-slate-900 flex items-center gap-2">
                  <Mail size={18} className="text-slate-400" />
                  {profileData.email}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-slate-500 mb-2">Phone Number</p>
                <p className="font-semibold text-slate-900 flex items-center gap-2">
                  <Phone size={18} className="text-slate-400" />
                  {profileData.phone}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-slate-500 mb-2">Date of Birth</p>
                <p className="font-semibold text-slate-900 flex items-center gap-2">
                  <Calendar size={18} className="text-slate-400" />
                  {new Date(profileData.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div className="md:col-span-2 bg-slate-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-slate-500 mb-2">Address</p>
                <p className="font-semibold text-slate-900 flex items-start gap-2">
                  <MapPin size={18} className="text-slate-400 mt-1 flex-shrink-0" />
                  {profileData.address}
                </p>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Academic Information */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
      >
        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <BookOpen size={22} className="text-purple-600" />
          </div>
          Academic Information
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm font-semibold text-slate-500 mb-2">Registration Number</p>
            <p className="font-mono font-bold text-slate-900 text-xl">{profileData.regNumber}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm font-semibold text-slate-500 mb-2">Program</p>
            <p className="font-semibold text-slate-900 text-lg">{profileData.program}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm font-semibold text-slate-500 mb-2">Batch</p>
            <p className="font-semibold text-slate-900 text-lg">{profileData.batch}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm font-semibold text-slate-500 mb-2">Enrollment Date</p>
            <p className="font-semibold text-slate-900">{new Date(profileData.enrollmentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
      </motion.div>

      {/* Account Security */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
      >
        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <Shield size={22} className="text-emerald-600" />
          </div>
          Account Security
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Key size={22} className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Password</p>
                <p className="text-sm text-slate-500">Last changed 2 months ago</p>
              </div>
            </div>
            <button className="px-5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-slate-200 rounded-xl transition-colors">
              Change
            </button>
          </div>
          <div className="flex items-center justify-between p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Shield size={22} className="text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Two-Factor Authentication</p>
                <p className="text-sm text-slate-500">Add an extra layer of security</p>
              </div>
            </div>
            <button className="px-5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-slate-200 rounded-xl transition-colors">
              Enable
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentProfile;
