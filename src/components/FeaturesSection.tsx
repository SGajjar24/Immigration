import { motion } from 'framer-motion';
import { Bot, Map, FileCheck, Zap, Globe, Shield } from 'lucide-react';
import { cn } from '../utils/cn';

const features = [
    {
        icon: Bot,
        title: "AI-Powered Analysis",
        description: "Our advanced AI evaluates your profile against 80+ immigration streams instantly.",
        color: "text-accent-gold",
        bg: "bg-accent-gold/10",
        border: "border-accent-gold/20"
    },
    {
        icon: Map,
        title: "Interactive PNP Maps",
        description: "Visual exploration of Provincial Nominee Programs with real-time status updates.",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20"
    },
    {
        icon: FileCheck,
        title: "Smart Document Review",
        description: "Get instant feedback on your documents before you submit your application.",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/20"
    },
    {
        icon: Zap,
        title: "Real-Time Draw Alerts",
        description: "Never miss an opportunity. Get notified the moment a relevant draw opens.",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        border: "border-purple-400/20"
    },
    {
        icon: Globe,
        title: "Global Standards",
        description: "Always up-to-date with the latest IRCC regulations and policies.",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        border: "border-cyan-400/20"
    },
    {
        icon: Shield,
        title: "Bank-Grade Security",
        description: "Your personal data is encrypted and protected with enterprise-level security.",
        color: "text-red-400",
        bg: "bg-red-400/10",
        border: "border-red-400/20"
    }
];

const FeaturesSection = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <span className="inline-block py-1 px-3 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold text-xs font-bold uppercase tracking-widest mb-4">
                        Why Choose Us
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
                        Immigration Intelligence <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Reimagined</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        We combine cutting-edge AI with deep immigration expertise to give you the clearest path to Canadian permanent residency.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="glass-prism p-8 rounded-2xl group relative overflow-hidden flex flex-col items-start"
                        >
                            {/* Animated Background Gradient */}
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500",
                                feature.color === 'text-accent-gold' ? 'from-accent-gold to-yellow-500' :
                                    feature.color === 'text-red-400' ? 'from-maple-red to-red-800' :
                                        'from-primary to-blue-900'
                            )}></div>

                            <div className={cn(
                                "w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all group-hover:scale-110 group-hover:rotate-3 duration-500 shadow-lg shadow-black/20 z-10",
                                feature.bg, feature.color, "border border-white/10"
                            )}>
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-gold transition-colors z-10">{feature.title}</h3>
                            <p className="text-gray-400 text-base leading-relaxed mb-6 z-10">
                                {feature.description}
                            </p>

                            <div className={cn(
                                "mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500 z-10",
                                feature.color
                            )}>
                                Learn More <Globe className="w-3 h-3" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
