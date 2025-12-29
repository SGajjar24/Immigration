import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
    X,
    Mail,
    Lock,
    ArrowRight,
    Chrome,
    Loader2,
    AlertCircle,
    User,
    Eye,
    EyeOff
} from 'lucide-react';
import {
    auth
} from '../lib/firebase';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'signin' }) => {
    const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [resetSent, setResetSent] = useState(false);

    // Clear form when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setMode(initialMode);
            setError(null);
            setResetSent(false);
        } else {
            // Clear sensitive data when modal closes
            setEmail('');
            setPassword('');
            setDisplayName('');
            setShowPassword(false);
        }
    }, [isOpen, initialMode]);

    // Map Firebase error codes to user-friendly messages (security: don't expose internal errors)
    const getErrorMessage = (errorCode: string): string => {
        const errorMessages: Record<string, string> = {
            'auth/email-already-in-use': 'An account with this email already exists.',
            'auth/invalid-email': 'Please enter a valid email address.',
            'auth/operation-not-allowed': 'This sign-in method is not enabled.',
            'auth/weak-password': 'Password must be at least 6 characters.',
            'auth/user-disabled': 'This account has been disabled.',
            'auth/user-not-found': 'Invalid email or password.',
            'auth/wrong-password': 'Invalid email or password.',
            'auth/invalid-credential': 'Invalid email or password.',
            'auth/too-many-requests': 'Too many attempts. Please try again later.',
            'auth/network-request-failed': 'Network error. Please check your connection.',
            'auth/popup-closed-by-user': '',  // User cancelled - no error needed
            'auth/cancelled-popup-request': '',
            'auth/popup-blocked': 'Popup was blocked. Please allow popups for this site.',
            'auth/configuration-not-found': 'Authentication is not configured. Please contact support.',
        };
        return errorMessages[errorCode] || 'Authentication failed. Please try again.';
    };

    // Validate password strength
    const validatePassword = (pwd: string): string | null => {
        if (pwd.length < 6) return 'Password must be at least 6 characters.';
        if (pwd.length > 128) return 'Password is too long.';
        return null;
    };

    // Validate email format
    const validateEmail = (emailStr: string): string | null => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailStr)) return 'Please enter a valid email address.';
        if (emailStr.length > 254) return 'Email is too long.';
        return null;
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            onClose();
        } catch (err: unknown) {
            const firebaseError = err as { code?: string };
            const errorCode = firebaseError.code || '';
            const message = getErrorMessage(errorCode);
            if (message) setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Client-side validation
        const emailError = validateEmail(email.trim());
        if (emailError) {
            setError(emailError);
            return;
        }

        if (mode !== 'forgot') {
            const passwordError = validatePassword(password);
            if (passwordError) {
                setError(passwordError);
                return;
            }
        }

        if (mode === 'signup' && displayName.trim().length < 2) {
            setError('Please enter a valid name (at least 2 characters).');
            return;
        }

        setLoading(true);

        try {
            const trimmedEmail = email.trim().toLowerCase();

            if (mode === 'signup') {
                const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
                await updateProfile(userCredential.user, { displayName: displayName.trim() });
            } else if (mode === 'signin') {
                await signInWithEmailAndPassword(auth, trimmedEmail, password);
            } else if (mode === 'forgot') {
                await sendPasswordResetEmail(auth, trimmedEmail);
                setResetSent(true);
                return;
            }
            onClose();
        } catch (err: unknown) {
            const firebaseError = err as { code?: string };
            const errorCode = firebaseError.code || '';
            setError(getErrorMessage(errorCode));
        } finally {
            setLoading(false);
        }
    };

    // Use portal to render modal to document.body, avoiding CSS containing block issues
    // (backdrop-filter on parent nav creates a containing block that breaks fixed positioning)
    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] grid place-items-center p-4 bg-background-dark/95 backdrop-blur-sm overflow-y-auto"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) onClose();
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md glass-panel rounded-3xl shadow-premium bg-surface-dark border border-white/10"
                    >
                        {/* Header Gradient */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-maple-red via-accent-gold to-maple-red"></div>

                        <div className="p-8">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Logo/Title */}
                            <div className="mb-8 text-center">
                                <h2 className="text-3xl font-display font-bold text-white mb-2">
                                    {mode === 'signin' && 'Welcome Back'}
                                    {mode === 'signup' && 'Create Account'}
                                    {mode === 'forgot' && 'Reset Password'}
                                </h2>
                                <p className="text-gray-400">
                                    {mode === 'signin' && 'Sign in to access your immigration dashboard'}
                                    {mode === 'signup' && 'Start your Canadian journey today'}
                                    {mode === 'forgot' && 'Enter your email to receive a reset link'}
                                </p>
                            </div>

                            {/* Error Message */}
                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm"
                                    >
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        <span>{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Reset Success Message */}
                            {resetSent && (
                                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-start gap-3 text-green-400 text-sm">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <span>Password reset link sent! Please check your email inbox.</span>
                                </div>
                            )}

                            {/* Social Auth */}
                            {mode !== 'forgot' && (
                                <>
                                    <div className="grid grid-cols-1 gap-4 mb-8">
                                        <button
                                            onClick={handleGoogleSignIn}
                                            disabled={loading}
                                            className="flex items-center justify-center gap-3 w-full btn-glass py-3 hover:border-white/20 hover:bg-white/5"
                                        >
                                            {loading ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <Chrome className="w-5 h-5 text-blue-400" />
                                            )}
                                            <span>Continue with Google</span>
                                        </button>
                                    </div>

                                    <div className="relative mb-8">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-white/10"></div>
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-transparent px-2 text-gray-500">Or continue with email</span>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Form */}
                            <form onSubmit={handleEmailAuth} className="space-y-4">
                                {mode === 'signup' && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="text"
                                                required
                                                autoComplete="name"
                                                minLength={2}
                                                maxLength={100}
                                                placeholder="Enter your name"
                                                className="w-full pl-12 glass-input"
                                                value={displayName}
                                                onChange={(e) => setDisplayName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="email"
                                            required
                                            autoComplete="email"
                                            maxLength={254}
                                            placeholder="email@example.com"
                                            className="w-full pl-12 glass-input"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {mode !== 'forgot' && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between ml-1">
                                            <label className="text-sm font-medium text-gray-300">Password</label>
                                            {mode === 'signin' && (
                                                <button
                                                    type="button"
                                                    onClick={() => setMode('forgot')}
                                                    className="text-xs text-accent-gold hover:text-accent-gold-light"
                                                >
                                                    Forgot password?
                                                </button>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                required
                                                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                                                minLength={6}
                                                maxLength={128}
                                                placeholder="••••••••"
                                                className="w-full pl-12 pr-12 glass-input"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-primary flex items-center justify-center gap-2 group"
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            <span>
                                                {mode === 'signin' && 'Sign In'}
                                                {mode === 'signup' && 'Create Account'}
                                                {mode === 'forgot' && 'Send Reset Link'}
                                            </span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Footer Toggle */}
                            <div className="mt-8 text-center text-sm text-gray-400">
                                {mode === 'signin' ? (
                                    <p>
                                        Don't have an account?{' '}
                                        <button
                                            onClick={() => setMode('signup')}
                                            className="text-accent-gold font-semibold hover:text-accent-gold-light"
                                        >
                                            Sign Up
                                        </button>
                                    </p>
                                ) : mode === 'signup' ? (
                                    <p>
                                        Already have an account?{' '}
                                        <button
                                            onClick={() => setMode('signin')}
                                            className="text-accent-gold font-semibold hover:text-accent-gold-light"
                                        >
                                            Sign In
                                        </button>
                                    </p>
                                ) : (
                                    <button
                                        onClick={() => setMode('signin')}
                                        className="text-gray-400 hover:text-white flex items-center justify-center gap-2 mx-auto"
                                    >
                                        <ArrowRight className="w-4 h-4 rotate-180" />
                                        Back to Sign In
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};
