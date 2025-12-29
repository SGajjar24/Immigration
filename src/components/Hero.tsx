import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, ArrowRight, MoreVertical, Send, Bot, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <section className="relative min-h-screen w-full flex flex-col pt-24 overflow-hidden">
            {/* Background - Static gradient, no continuous animations */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=60&w=1920&auto=format&fit=crop')" }}
                />
                {/* Static gradient overlays */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background-dark via-background-dark/90 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark/60 via-transparent to-background-dark" />

                {/* Static decorative orbs - no animation */}
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-maple-red/15 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent-gold/10 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full flex-grow flex flex-col justify-center relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-12 lg:py-20">

                    {/* Left Column: Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="lg:col-span-6 flex flex-col gap-8"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
                            <span className="text-accent-gold text-xs font-bold uppercase tracking-wider">New: AI Visa Predictor</span>
                        </motion.div>

                        <div className="space-y-4">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white"
                            >
                                Unlock Your <span className="text-gradient-red">Canadian Dream</span> with <span className="text-gradient-gold">AI Precision</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-xl"
                            >
                                Stop guessing. Let our advanced AI analyze your profile, calculate your CRS points, and build your personalized immigration roadmap in minutes.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.4 }}
                            className="flex flex-wrap gap-4 pt-2"
                        >
                            <Link
                                to="/assessment"
                                className="flex items-center gap-2 h-12 px-8 rounded-xl btn-primary group"
                            >
                                <span>Check Eligibility Free</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                to="/resources"
                                className="flex items-center gap-2 h-12 px-8 rounded-xl btn-glass group"
                            >
                                <PlayCircle className="w-5 h-5 text-accent-gold" />
                                <span>Watch Demo</span>
                            </Link>
                        </motion.div>

                        <div className="flex items-center gap-4 text-sm text-gray-400 pt-4">
                            <div className="flex -space-x-3">
                                {[
                                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
                                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
                                ].map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt={`Happy customer ${i + 1}`}
                                        loading="lazy"
                                        className="size-8 rounded-full border-2 border-background-dark object-cover"
                                    />
                                ))}
                            </div>
                            <p>Trusted by <span className="text-white font-bold">10,000+</span> applicants</p>
                        </div>
                    </motion.div>

                    {/* Right Column: Chat Preview - Simplified */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className="lg:col-span-6 relative flex justify-center lg:justify-end"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

                        <div
                            className={`relative w-full max-w-md bg-surface-dark/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-premium flex flex-col gap-6 transition-transform duration-300 ${isHovering ? 'scale-[1.02]' : ''}`}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-primary/30 flex items-center justify-center border border-primary/50">
                                        <Bot className="w-5 h-5 text-accent-gold" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm">CanadaPath AI Assistant</h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="size-2 rounded-full bg-green-500" aria-hidden="true" />
                                            <span className="text-xs text-gray-400">Online • 95% Accuracy</span>
                                        </div>
                                    </div>
                                </div>
                                <button aria-label="More options" className="p-1 hover:bg-white/10 rounded transition-colors">
                                    <MoreVertical className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            {/* Chat Messages */}
                            <div className="flex flex-col gap-4">
                                <div className="flex items-end justify-end gap-3">
                                    <div className="flex flex-col gap-1 items-end max-w-[85%]">
                                        <div className="rounded-2xl rounded-tr-sm px-4 py-3 bg-primary text-white text-sm shadow-md">
                                            <p>What is my estimated CRS score for Express Entry?</p>
                                        </div>
                                        <span className="text-[11px] text-gray-500">Applicant • Just now</span>
                                    </div>
                                </div>

                                <div className="flex items-end gap-3">
                                    <div className="size-8 rounded-full bg-gradient-to-br from-maple-red to-primary flex-shrink-0 flex items-center justify-center text-[10px] font-bold border border-white/10 shadow-lg">AI</div>
                                    <div className="flex flex-col gap-1 items-start max-w-[90%]">
                                        <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-white/10 border border-white/5 text-gray-100 text-sm backdrop-blur-md shadow-md">
                                            <p className="mb-2">Based on your profile (Age: 29, Master's Degree, IELTS 8.0), your estimated score is <strong className="text-accent-gold">478</strong>.</p>
                                            <div className="h-px w-full bg-white/10 my-2" />
                                            <p className="text-xs text-gray-300">This is a competitive score for recent draws! Would you like to see the breakdown?</p>
                                        </div>
                                        <span className="text-[11px] text-gray-500">AI Assistant • Just now</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    <button className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-accent-gold transition-colors">Show Breakdown</button>
                                    <button className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 transition-colors">Check PNP Options</button>
                                </div>
                            </div>

                            {/* Input */}
                            <div className="mt-2 relative">
                                <div className="w-full h-10 rounded-lg bg-black/20 border border-white/10 flex items-center px-4 text-sm text-gray-500">
                                    Type your message...
                                </div>
                                <button
                                    aria-label="Send message"
                                    className="absolute right-2 top-2 p-1 bg-primary/50 rounded hover:bg-primary transition-colors"
                                >
                                    <Send className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Stats Strip */}
                <div className="w-full pb-12">
                    <div className="glass-panel w-full rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-maple-red to-transparent opacity-50" />
                        {[
                            { value: "98%", label: "Client Satisfaction Rate" },
                            { value: "50+", label: "Immigration Programs" },
                            { value: "24/7", label: "AI Support Available" },
                            { value: "15 min", label: "Avg Roadmap Creation" }
                        ].map((stat, idx) => (
                            <div key={idx} className={`flex flex-col items-center md:items-start text-center md:text-left flex-1 ${idx !== 3 ? 'md:border-r border-white/10' : ''} pb-4 md:pb-0 md:px-4`}>
                                <span className="text-3xl font-bold text-white mb-1">{stat.value}</span>
                                <span className="text-sm text-gray-400 font-medium">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
