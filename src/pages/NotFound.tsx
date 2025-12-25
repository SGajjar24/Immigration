import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, MessageSquare } from 'lucide-react';

interface NotFoundProps {
    onNavigate?: (page: string) => void;
}

const NotFound = ({ onNavigate }: NotFoundProps) => {
    const handleGoHome = () => {
        if (onNavigate) {
            onNavigate('home');
        } else {
            window.location.href = '/';
        }
    };

    return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center p-6 pt-24 selection:bg-maple-red selection:text-white">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[30%] left-[20%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-maple-red/5 blur-[120px] rounded-full"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel rounded-2xl p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden z-10"
            >
                <div className="relative z-10">
                    {/* 404 Number */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6"
                    >
                        <span className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-maple-red via-primary to-accent-gold">
                            404
                        </span>
                    </motion.div>

                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Page Not Found
                    </h1>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        Looks like you've ventured into uncharted territory. The page you're looking for doesn't exist or has been moved.
                    </p>

                    {/* Quick Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <button
                            onClick={handleGoHome}
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-maple-red to-maple-dark hover:from-red-600 hover:to-red-800 text-white font-bold transition-all shadow-lg shadow-maple-red/20"
                        >
                            <Home className="w-4 h-4" />
                            Go Home
                        </button>
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </button>
                    </div>

                    {/* Helpful Links */}
                    <div className="pt-6 border-t border-white/10">
                        <p className="text-xs text-gray-500 mb-4">Popular destinations</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <button
                                onClick={() => onNavigate?.('assessment')}
                                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/10 text-sm text-gray-300 hover:text-white transition-all"
                            >
                                <Search className="w-3 h-3 inline mr-1.5" />
                                Eligibility Check
                            </button>
                            <button
                                onClick={() => onNavigate?.('calculator')}
                                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/10 text-sm text-gray-300 hover:text-white transition-all"
                            >
                                CRS Calculator
                            </button>
                            <button
                                onClick={() => onNavigate?.('resources')}
                                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/10 text-sm text-gray-300 hover:text-white transition-all"
                            >
                                <MessageSquare className="w-3 h-3 inline mr-1.5" />
                                Get Help
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default NotFound;
