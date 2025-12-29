import { Construction, ArrowLeft, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

interface UnderConstructionProps {
    pageName?: string;
    onBack?: () => void;
}

const UnderConstruction = ({ pageName = 'This feature', onBack }: UnderConstructionProps) => {
    return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center p-6 pt-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel rounded-2xl p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden"
            >
                {/* Decorative glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-accent-gold/20 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center">
                        <Construction className="w-10 h-10 text-accent-gold" />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Coming Soon
                    </h1>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        <span className="text-white font-semibold">{pageName}</span> is currently under construction.
                        We're working hard to bring you more amazing features!
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                            <span>Progress</span>
                            <span className="text-accent-gold font-bold">75%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-gradient-to-r from-accent-gold to-yellow-400 rounded-full"></div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={onBack || (() => window.location.href = '/')}
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {onBack ? 'Go Back' : 'Home'}
                        </button>
                        <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary-light text-white font-bold transition-all shadow-lg shadow-primary/20">
                            <Bell className="w-4 h-4" />
                            Notify Me
                        </button>
                    </div>

                    <p className="text-xs text-gray-500 mt-8">
                        Expected launch: Q1 2025
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default UnderConstruction;
