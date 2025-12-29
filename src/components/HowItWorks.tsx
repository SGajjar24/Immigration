import { motion } from 'framer-motion';
import { ClipboardCheck, Calculator, FileCheck, ArrowRight } from 'lucide-react';

const steps = [
    {
        step: 1,
        title: "Assess Your Profile",
        description: "Complete our comprehensive eligibility assessment to understand your immigration options and potential pathways.",
        icon: ClipboardCheck,
        color: "from-maple-red to-red-600"
    },
    {
        step: 2,
        title: "Calculate Your Score",
        description: "Use our CRS calculator to get an accurate estimate of your Comprehensive Ranking System score for Express Entry.",
        icon: Calculator,
        color: "from-accent-gold to-yellow-500"
    },
    {
        step: 3,
        title: "Apply With Confidence",
        description: "Follow your personalized roadmap with document checklists and expert guidance to submit a strong application.",
        icon: FileCheck,
        color: "from-success to-green-500"
    }
];

export const HowItWorks = () => {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm font-medium mb-4">
                        Simple 3-Step Process
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        How It <span className="text-gradient-gold">Works</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Our AI-powered platform guides you through every step of your Canadian immigration journey.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting line - desktop only */}
                    <div className="hidden md:block absolute top-24 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-maple-red via-accent-gold to-success opacity-30" />

                    {steps.map((item, index) => (
                        <motion.div
                            key={item.step}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="relative"
                        >
                            {/* Step card */}
                            <div className="glass-card rounded-2xl p-8 h-full relative group">
                                {/* Step number badge */}
                                <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                                    <span className="text-white font-bold text-lg">{item.step}</span>
                                </div>

                                {/* Icon */}
                                <div className="mt-8 mb-6 flex justify-center">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} bg-opacity-10 flex items-center justify-center`}>
                                        <item.icon className="w-8 h-8 text-white" />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-white text-center mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 text-center leading-relaxed">
                                    {item.description}
                                </p>

                                {/* Arrow for mobile */}
                                {index < steps.length - 1 && (
                                    <div className="md:hidden flex justify-center mt-6">
                                        <ArrowRight className="w-6 h-6 text-gray-600 rotate-90" />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <a
                        href="/assessment"
                        className="inline-flex items-center gap-2 btn-primary px-8 py-4 text-lg group"
                    >
                        Start Your Assessment
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;
