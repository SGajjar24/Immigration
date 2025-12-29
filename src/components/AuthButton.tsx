import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { LogOut, User as UserIcon, Settings, LayoutDashboard } from 'lucide-react';
import { AuthModal } from './AuthModal';
import { Link } from 'react-router-dom';

export const AuthButton = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [signingOut, setSigningOut] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'signin' | 'signup'>('signin');
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const handleSignOut = async () => {
        if (signingOut) return; // Prevent double-click
        setSigningOut(true);
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out", error);
            // Silent fail - user will still see they're logged in if it fails
        } finally {
            setSigningOut(false);
        }
    };

    if (loading) return <div className="animate-pulse bg-white/10 h-10 w-32 rounded-xl"></div>;

    if (user) {
        return (
            <div className="flex items-center gap-4">
                <div className="hidden lg:flex flex-col items-end gap-0.5">
                    <p className="text-sm font-semibold text-white leading-none">{user.displayName || 'User'}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{user.email}</p>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center gap-2 p-1 rounded-full hover:bg-white/5 transition-colors"
                    >
                        {user.photoURL ? (
                            <img src={user.photoURL} alt="profile" className="w-10 h-10 rounded-full border-2 border-primary/50 hover:border-accent-gold transition-colors" />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/50 hover:border-accent-gold transition-colors">
                                <UserIcon className="w-5 h-5 text-primary-light" />
                            </div>
                        )}
                    </button>

                    {/* Dropdown Menu - Click based */}
                    {showDropdown && (
                        <>
                            {/* Backdrop to close dropdown */}
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setShowDropdown(false)}
                            />
                            <div className="absolute top-full right-0 mt-2 w-56 glass-panel rounded-2xl p-2 z-50 shadow-premium animate-fade-in">
                                <Link
                                    to="/dashboard"
                                    onClick={() => setShowDropdown(false)}
                                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => setShowDropdown(false)}
                                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                                >
                                    <Settings className="w-4 h-4" />
                                    Settings
                                </button>
                                <div className="h-px bg-white/5 my-2 mx-2"></div>
                                <button
                                    onClick={() => {
                                        setShowDropdown(false);
                                        handleSignOut();
                                    }}
                                    disabled={signingOut}
                                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <LogOut className={`w-4 h-4 ${signingOut ? 'animate-pulse' : ''}`} />
                                    {signingOut ? 'Signing Out...' : 'Sign Out'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={() => {
                    setModalMode('signin');
                    setIsModalOpen(true);
                }}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-4 py-2"
            >
                Log In
            </button>
            <button
                onClick={() => {
                    setModalMode('signup');
                    setIsModalOpen(true);
                }}
                className="bg-primary hover:bg-primary-light text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30"
            >
                Join Now
            </button>

            <AuthModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialMode={modalMode}
            />
        </div>
    );
};
