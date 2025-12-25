import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Check,
    ArrowRight,
    ArrowLeft,
    RotateCcw,
    Bot,
    Lightbulb,
    HelpCircle,
    ChevronRight,
    School,
    Briefcase,
    Globe
} from 'lucide-react';
import { cn } from '../utils/cn';

const PathwayExplorer = () => {
    const [selectedEducation, setSelectedEducation] = useState('bachelor');

    return (
        <div className="flex h-screen bg-background-dark text-slate-200 overflow-hidden relative font-body selection:bg-accent-gold selection:text-primary">
            {/* Background Patterns */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-transparent to-background-dark/80 pointer-events-none z-10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(31,59,97,0.15),transparent_70%)] pointer-events-none z-0"></div>

            {/* Sidebar Left/Top Header Overlay for context */}
            <div className="absolute top-0 left-0 w-full z-20 px-8 py-6 pointer-events-none flex flex-col gap-2">
                <div className="flex items-center gap-2 pointer-events-auto">
                    <button className="text-slate-400 text-sm hover:text-white transition-colors">Tools</button>
                    <span className="text-slate-600 text-sm">/</span>
                    <span className="text-accent-gold text-sm font-medium">Pathway Explorer</span>
                </div>
                <div className="flex justify-between items-end pointer-events-auto mt-2">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-white tracking-tight">Discover Your Route</h2>
                        <p className="text-slate-400 mt-1 max-w-xl text-sm">Answer the questions to build your personalized immigration roadmap.</p>
                    </div>

                    {/* Legend */}
                    <div className="hidden lg:flex glass-panel px-4 py-2 rounded-lg gap-4 items-center">
                        <div className="flex items-center gap-2 text-xs text-slate-300">
                            <span className="w-2 h-2 rounded-full bg-accent-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
                            Current
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-300">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            Eligible
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-300">
                            <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                            Future
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Interactive Flowchart */}
            <section className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 p-10 pt-32 no-scrollbar">
                <div className="flex flex-col items-center min-h-full pb-20 max-w-4xl mx-auto">

                    {/* Step 1: Completed */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative group flex flex-col items-center"
                    >
                        <div className="glass-panel w-64 p-4 rounded-xl border-emerald-500/30 flex items-center justify-between opacity-60 hover:opacity-100 transition-opacity cursor-pointer mb-4">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-1">Step 1</p>
                                <p className="text-sm font-medium text-white">General Eligibility</p>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/50">
                                <Check className="w-3 h-3 font-bold" />
                            </div>
                        </div>
                        {/* Vertical Connector */}
                        <div className="h-12 w-0.5 bg-gradient-to-b from-emerald-500/50 to-accent-gold"></div>
                    </motion.div>

                    {/* Step 2: Active Question */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative w-full max-w-2xl mt-4"
                    >
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-accent-gold/20 to-primary/0 blur-xl opacity-50"></div>

                        <div className="glass-panel relative p-8 rounded-2xl border-accent-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-gold/10 text-accent-gold text-xs font-semibold border border-accent-gold/20 mb-3">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-gold opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-gold"></span>
                                        </span>
                                        Current Step
                                    </span>
                                    <h3 className="text-2xl font-display font-bold text-white leading-tight">What is your highest level of education?</h3>
                                    <p className="text-slate-400 mt-2 text-sm">Select the highest degree, diploma or certificate you have obtained or are in the process of obtaining.</p>
                                </div>
                                <button className="text-slate-500 hover:text-white transition-colors">
                                    <HelpCircle className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Options Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { id: 'hs', label: 'High School Diploma', sub: 'Secondary education only' },
                                    { id: 'bachelor', label: "Bachelor's Degree", sub: '3 or more year program' },
                                    { id: 'master', label: "Master's Degree", sub: 'Or professional degree' },
                                    { id: 'phd', label: 'PhD or Doctorate', sub: 'Highest level' },
                                ].map((opt) => (
                                    <label
                                        key={opt.id}
                                        className={cn(
                                            "group flex items-center gap-4 rounded-xl border p-4 cursor-pointer transition-all",
                                            selectedEducation === opt.id
                                                ? "bg-primary/40 border-accent-gold/50 shadow-inner"
                                                : "bg-primary/20 border-white/10 hover:bg-primary/40 hover:border-accent-gold/30"
                                        )}
                                    >
                                        <input
                                            type="radio"
                                            name="education"
                                            value={opt.id}
                                            checked={selectedEducation === opt.id}
                                            onChange={() => setSelectedEducation(opt.id)}
                                            className="w-5 h-5 border-2 border-slate-500 bg-transparent text-accent-gold focus:ring-accent-gold/20"
                                        />
                                        <div className="flex flex-col">
                                            <span className={cn(
                                                "font-medium text-sm transition-colors",
                                                selectedEducation === opt.id ? "text-accent-gold" : "text-white group-hover:text-accent-gold"
                                            )}>{opt.label}</span>
                                            <span className="text-slate-500 text-xs">{opt.sub}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
                                <button className="text-sm font-medium text-slate-400 hover:text-white flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors">
                                    <ArrowLeft className="w-4 h-4" /> Back
                                </button>
                                <button className="bg-accent-gold hover:bg-yellow-500 text-background-dark font-bold text-sm px-8 py-3 rounded-lg shadow-lg hover:shadow-accent-gold/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5">
                                    Next Step <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Future Steps Connector */}
                    <div className="h-16 w-0.5 border-l-2 border-dashed border-slate-700 mx-auto mt-4"></div>

                    {/* Future Steps Preview */}
                    <div className="flex gap-4 opacity-40 grayscale">
                        <div className="glass-panel w-48 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center border-dashed border-white/20">
                            <Globe className="w-6 h-6 text-slate-400" />
                            <p className="text-sm font-medium text-white">Language Skills</p>
                        </div>
                        <div className="glass-panel w-48 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center border-dashed border-white/20">
                            <Briefcase className="w-6 h-6 text-slate-400" />
                            <p className="text-sm font-medium text-white">Work History</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Bottom Left Reset */}
            <div className="absolute bottom-6 left-6 z-30">
                <button className="glass-panel p-3 rounded-full hover:bg-primary/40 text-accent-red hover:text-red-400 border-accent-red/20 transition-all shadow-lg text-white" title="Reset Flow">
                    <RotateCcw className="w-5 h-5" />
                </button>
            </div>

            {/* Right Assistant Sidebar */}
            <aside className="w-96 shrink-0 bg-[#0f1216]/95 border-l border-white/10 flex flex-col shadow-2xl z-30 backdrop-blur-md">
                {/* Header */}
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-3 text-white mb-1">
                        <Bot className="w-5 h-5 text-accent-gold" />
                        <h3 className="font-display font-bold text-lg">AI Assistant</h3>
                    </div>
                    <p className="text-xs text-slate-500">Real-time guidance based on your inputs.</p>
                </div>

                {/* Progress */}
                <div className="px-6 py-6 bg-primary/10 border-b border-white/5">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-medium text-slate-300">Eligibility Likelihood</span>
                        <span className="text-xl font-bold text-accent-gold">45%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                        <div className="bg-gradient-to-r from-accent-gold to-yellow-300 h-2 rounded-full w-[45%]"></div>
                    </div>
                    <div className="flex justify-between mt-3 text-xs">
                        <span className="text-slate-500">Express Entry</span>
                        <span className="text-emerald-400 font-medium">Moderate</span>
                    </div>
                </div>

                {/* Tips */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/30 border border-white/10 flex items-center justify-center shrink-0">
                            <Lightbulb className="w-4 h-4 text-accent-gold" />
                        </div>
                        <div className="space-y-1">
                            <div className="text-xs text-slate-500 font-medium">Tip</div>
                            <div className="text-sm text-slate-300 leading-relaxed bg-white/5 p-3 rounded-lg rounded-tl-none border border-white/5 text-[13px]">
                                Having a Master's degree significantly boosts your CRS score compared to a Bachelor's. It can add up to <strong className="text-white">135 points</strong> in the Express Entry pool.
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/30 border border-white/10 flex items-center justify-center shrink-0">
                            <School className="w-4 h-4 text-accent-gold" />
                        </div>
                        <div className="space-y-1">
                            <div className="text-xs text-slate-500 font-medium">Fact Check</div>
                            <div className="text-sm text-slate-300 leading-relaxed bg-white/5 p-3 rounded-lg rounded-tl-none border border-white/5 text-[13px]">
                                Ensure your degree has an Educational Credential Assessment (ECA) if it was obtained outside Canada.
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5">
                        <p className="text-xs font-medium text-slate-400 mb-3 uppercase tracking-wider">Related Resources</p>
                        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                            <div className="w-10 h-10 rounded bg-indigo-900/30 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-900/50 transition-colors">
                                <Briefcase className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-medium text-white group-hover:text-accent-gold transition-colors">ECA Guide</h4>
                                <p className="text-xs text-slate-500">How to verify your degree</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                        </a>
                    </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10 bg-[#0f1216]">
                    <div className="relative">
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-4 pr-10 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/50 transition-all"
                            placeholder="Ask about education points..."
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-accent-gold transition-colors">
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default PathwayExplorer;
