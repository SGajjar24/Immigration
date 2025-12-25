import { ServerCrash, RefreshCw, Twitter, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface MaintenancePageProps {
    estimatedTime?: string;
}

const MaintenancePage = ({ estimatedTime = '30 minutes' }: MaintenancePageProps) => {
    return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center p-6 selection:bg-maple-red selection:text-white">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[30%] bg-accent-gold/5 blur-[120px] rounded-full"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel rounded-2xl p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden z-10"
            >
                {/* Animated Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary via-accent-gold to-primary"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        style={{ width: '50%' }}
                    />
                </div>

                <div className="relative z-10">
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"
                    >
                        <ServerCrash className="w-12 h-12 text-primary" />
                    </motion.div>

                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        We'll Be Right Back
                    </h1>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                        CanadaPath AI is currently undergoing scheduled maintenance to bring you an even better experience.
                    </p>

                    {/* Estimated Time */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-8">
                        <p className="text-sm text-gray-500 mb-1">Estimated Downtime</p>
                        <p className="text-2xl font-bold text-accent-gold">{estimatedTime}</p>
                    </div>

                    {/* Status Updates */}
                    <div className="mb-8">
                        <p className="text-xs text-gray-500 mb-3">Follow us for updates</p>
                        <div className="flex justify-center gap-4">
                            <a
                                href="https://twitter.com/canadapathai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-gray-300 transition-colors"
                            >
                                <Twitter className="w-4 h-4" />
                                @canadapathai
                            </a>
                            <a
                                href="https://status.canadapath.ai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-gray-300 transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Status Page
                            </a>
                        </div>
                    </div>

                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary hover:bg-primary-light text-white font-bold transition-all shadow-lg shadow-primary/20 mx-auto"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh Page
                    </button>

                    <p className="text-xs text-gray-600 mt-8">
                        © 2025 CanadaPath AI • Precision Immigration Technology
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default MaintenancePage;
