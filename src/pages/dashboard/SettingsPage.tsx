import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Bell, Moon, Globe, Shield, Trash2 } from 'lucide-react';
import { useImmigrationStore } from '../../store/useImmigrationStore';
import { Badge } from '../../components/ui/badge';

export default function SettingsPage() {
    const { userProfile, updateUserProfile, resetStore } = useImmigrationStore();
    const preferences = userProfile.preferences || { notifications: true, theme: 'dark', language: 'en' };

    const handleToggle = (key: 'notifications') => {
        updateUserProfile({
            preferences: {
                ...preferences,
                [key]: !preferences[key]
            }
        });
    };

    const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
        updateUserProfile({
            preferences: {
                ...preferences,
                theme
            }
        });
    };

    const handleLanguageChange = (language: string) => {
        updateUserProfile({
            preferences: {
                ...preferences,
                language
            }
        });
    };

    return (
        <DashboardLayout>
            <div className="max-w-3xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">Settings</h1>
                    <p className="text-gray-400">Manage your account preferences</p>
                </div>

                {/* Notifications */}
                <Card className="border-white/10 bg-white/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="w-5 h-5" /> Notifications
                        </CardTitle>
                        <CardDescription>Control how you receive updates</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                            <div>
                                <p className="text-white font-medium">Email Notifications</p>
                                <p className="text-sm text-gray-400">Receive updates about draws and application status</p>
                            </div>
                            <button
                                onClick={() => handleToggle('notifications')}
                                className={`w-12 h-6 rounded-full transition-colors ${preferences.notifications ? 'bg-green-500' : 'bg-gray-600'
                                    }`}
                            >
                                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${preferences.notifications ? 'translate-x-6' : 'translate-x-0.5'
                                    }`} />
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Appearance */}
                <Card className="border-white/10 bg-white/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Moon className="w-5 h-5" /> Appearance
                        </CardTitle>
                        <CardDescription>Customize the look and feel</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-3">
                            {(['light', 'dark', 'system'] as const).map(theme => (
                                <button
                                    key={theme}
                                    onClick={() => handleThemeChange(theme)}
                                    className={`p-4 rounded-lg border text-center transition-all ${preferences.theme === theme
                                            ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                                            : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                                        }`}
                                >
                                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Language */}
                <Card className="border-white/10 bg-white/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="w-5 h-5" /> Language
                        </CardTitle>
                        <CardDescription>Choose your preferred language</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <select
                            value={preferences.language}
                            onChange={(e) => handleLanguageChange(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        >
                            <option value="en" className="bg-gray-900">English</option>
                            <option value="fr" className="bg-gray-900">Français</option>
                            <option value="es" className="bg-gray-900">Español</option>
                            <option value="zh" className="bg-gray-900">中文</option>
                            <option value="hi" className="bg-gray-900">हिन्दी</option>
                        </select>
                    </CardContent>
                </Card>

                {/* Account Security */}
                <Card className="border-white/10 bg-white/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5" /> Account Security
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                            <div>
                                <p className="text-white font-medium">Account Status</p>
                                <p className="text-sm text-gray-400">Your account is secure</p>
                            </div>
                            <Badge variant="success">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                            <div>
                                <p className="text-white font-medium">Two-Factor Authentication</p>
                                <p className="text-sm text-gray-400">Add an extra layer of security</p>
                            </div>
                            <Badge variant="secondary">Coming Soon</Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-red-500/20 bg-red-500/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-400">
                            <Trash2 className="w-5 h-5" /> Danger Zone
                        </CardTitle>
                        <CardDescription className="text-red-300/70">Irreversible actions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <button
                            onClick={() => {
                                if (confirm('Are you sure? This will reset all your data.')) {
                                    resetStore();
                                }
                            }}
                            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg font-medium hover:bg-red-500/30 transition-colors"
                        >
                            Reset All Data
                        </button>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
