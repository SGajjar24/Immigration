import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useImmigrationStore } from '../../store/useImmigrationStore';
import { User, Mail, MapPin, Phone, Shield, Calendar } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../../components/ui/badge';

export default function ProfilePage() {
    const { userProfile, updateUserProfile, crsData } = useImmigrationStore();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: userProfile.name || '',
        phoneNumber: userProfile.phoneNumber || '',
        targetProvince: userProfile.targetProvince || '',
        bio: userProfile.bio || ''
    });

    const provinces = [
        'Ontario', 'British Columbia', 'Alberta', 'Quebec', 'Manitoba',
        'Saskatchewan', 'Nova Scotia', 'New Brunswick', 'Newfoundland and Labrador',
        'Prince Edward Island', 'Northwest Territories', 'Yukon', 'Nunavut'
    ];

    const handleSave = () => {
        updateUserProfile(formData);
        setIsEditing(false);
    };

    const inputClass = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50";

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white">My Profile</h1>
                        <p className="text-gray-400">Manage your personal information</p>
                    </div>
                    <button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${isEditing
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                            }`}
                    >
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                </div>

                {/* Profile Card */}
                <Card className="border-white/10 bg-white/5">
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                {userProfile.photoURL ? (
                                    <img
                                        src={userProfile.photoURL}
                                        alt={userProfile.name}
                                        className="w-24 h-24 rounded-full object-cover ring-4 ring-white/10"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold ring-4 ring-white/10">
                                        {userProfile.name?.charAt(0) || 'U'}
                                    </div>
                                )}
                            </div>

                            {/* Info Grid */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                                        <User className="w-4 h-4" /> Full Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className={inputClass}
                                        />
                                    ) : (
                                        <p className="text-white font-medium">{userProfile.name || 'Not set'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                                        <Mail className="w-4 h-4" /> Email
                                    </label>
                                    <p className="text-white font-medium">{userProfile.email || 'Not set'}</p>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                                        <Phone className="w-4 h-4" /> Phone Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            value={formData.phoneNumber}
                                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                            className={inputClass}
                                            placeholder="+1 (xxx) xxx-xxxx"
                                        />
                                    ) : (
                                        <p className="text-white font-medium">{userProfile.phoneNumber || 'Not set'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                                        <MapPin className="w-4 h-4" /> Target Province
                                    </label>
                                    {isEditing ? (
                                        <select
                                            value={formData.targetProvince}
                                            onChange={(e) => setFormData({ ...formData, targetProvince: e.target.value })}
                                            className={inputClass}
                                        >
                                            <option value="" className="bg-gray-900">Select province...</option>
                                            {provinces.map(p => (
                                                <option key={p} value={p} className="bg-gray-900">{p}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <p className="text-white font-medium">{userProfile.targetProvince || 'Not set'}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="mt-6">
                            <label className="text-sm text-gray-400 mb-1 block">Bio / Notes</label>
                            {isEditing ? (
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    className={`${inputClass} min-h-[100px]`}
                                    placeholder="Add any notes about your immigration journey..."
                                />
                            ) : (
                                <p className="text-gray-300">{userProfile.bio || 'No bio added yet.'}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* CRS Summary */}
                <Card className="border-white/10 bg-white/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5" /> Immigration Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-white/5 rounded-lg">
                                <p className="text-3xl font-bold text-white">{crsData.lastCalculatedScore ?? '–'}</p>
                                <p className="text-sm text-gray-400">CRS Score</p>
                            </div>
                            <div className="text-center p-4 bg-white/5 rounded-lg">
                                <p className="text-3xl font-bold text-white">{crsData.age || '–'}</p>
                                <p className="text-sm text-gray-400">Age</p>
                            </div>
                            <div className="text-center p-4 bg-white/5 rounded-lg">
                                <p className="text-3xl font-bold text-white">{crsData.experience.canadian || 0}</p>
                                <p className="text-sm text-gray-400">Canadian Exp (yrs)</p>
                            </div>
                            <div className="text-center p-4 bg-white/5 rounded-lg">
                                <Badge variant={userProfile.onboarded ? 'success' : 'warning'}>
                                    {userProfile.onboarded ? 'Onboarded' : 'Pending'}
                                </Badge>
                                <p className="text-sm text-gray-400 mt-2">Profile Status</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Account Info */}
                <Card className="border-white/10 bg-white/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" /> Account Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-400">Account Created</p>
                                <p className="text-white">{userProfile.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : 'Unknown'}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Last Login</p>
                                <p className="text-white">{userProfile.lastLogin ? new Date(userProfile.lastLogin).toLocaleString() : 'Unknown'}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Account Type</p>
                                <Badge variant={userProfile.role === 'admin' ? 'success' : 'secondary'}>
                                    {userProfile.role === 'admin' ? 'Administrator' : 'Standard User'}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
