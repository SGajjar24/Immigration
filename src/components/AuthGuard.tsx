import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Lock, LogIn, Loader2, AlertCircle } from 'lucide-react';
import { useIsAuthenticated, useUserProfile } from '../store/useImmigrationStore';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import type { AuthError } from 'firebase/auth';

interface AuthGuardProps {
    children: ReactNode;
    /** If true, requires admin role */
    requireAdmin?: boolean;
    /** Custom fallback component when not authenticated */
    fallback?: ReactNode;
    /** Called when user successfully authenticates */
    onAuthenticated?: () => void;
}

/**
 * AuthGuard component that protects routes requiring authentication
 * Shows a login prompt for unauthenticated users
 */
export const AuthGuard = ({
    children,
    requireAdmin = false,
    fallback,
    onAuthenticated
}: AuthGuardProps) => {
    const isAuthenticated = useIsAuthenticated();
    const userProfile = useUserProfile();
    const isAdmin = userProfile.role === 'admin';
    const [signingIn, setSigningIn] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignIn = async () => {
        setSigningIn(true);
        setError(null);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            onAuthenticated?.();
        } catch (err) {
            console.error("Error signing in", err);
            const authError = err as AuthError;
            // User-friendly error messages
            switch (authError.code) {
                case 'auth/configuration-not-found':
                    setError('Google Sign-In is not configured. Please contact the administrator.');
                    break;
                case 'auth/popup-closed-by-user':
                case 'auth/cancelled-popup-request':
                    // User cancelled - no error needed
                    setError(null);
                    break;
                case 'auth/popup-blocked':
                    setError('Popup was blocked. Please allow popups for this site.');
                    break;
                case 'auth/network-request-failed':
                    setError('Network error. Please check your connection.');
                    break;
                default:
                    setError('Sign-in failed. Please try again.');
            }
        } finally {
            setSigningIn(false);
        }
    };

    // Clear error after 5 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    // Check authentication
    if (!isAuthenticated) {
        if (fallback) return <>{fallback}</>;

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="min-h-screen pt-24 pb-24 px-6 bg-background-dark flex items-center justify-center"
            >
                <div className="glass-panel rounded-2xl p-8 md:p-12 max-w-md w-full text-center relative overflow-hidden">
                    {/* Decorative blur */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative z-10">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                            <Lock className="w-10 h-10 text-primary-400" />
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            Authentication Required
                        </h1>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            Please sign in to access your personalized dashboard, saved assessments, and more.
                        </p>

                        <button
                            onClick={handleSignIn}
                            disabled={signingIn}
                            className="w-full bg-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                        >
                            {signingIn ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <LogIn className="w-5 h-5" />
                            )}
                            {signingIn ? 'Signing in...' : 'Sign in with Google'}
                        </button>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-2"
                            >
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        <p className="mt-6 text-xs text-gray-500">
                            Your data is securely stored and never shared with third parties.
                        </p>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Check admin requirement
    if (requireAdmin && !isAdmin) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="min-h-screen pt-24 pb-24 px-6 bg-background-dark flex items-center justify-center"
            >
                <div className="glass-panel rounded-2xl p-8 md:p-12 max-w-md w-full text-center relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-maple-red/20 blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative z-10">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-maple-red/10 border border-maple-red/30 flex items-center justify-center">
                            <Lock className="w-10 h-10 text-maple-red" />
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            Access Denied
                        </h1>
                        <p className="text-gray-400 mb-4 leading-relaxed">
                            This area requires administrator privileges.
                        </p>
                        <p className="text-sm text-gray-500">
                            You're signed in as <span className="text-white">{userProfile.email}</span>
                        </p>
                    </div>
                </div>
            </motion.div>
        );
    }

    // User is authenticated (and admin if required)
    return <>{children}</>;
};

export default AuthGuard;
