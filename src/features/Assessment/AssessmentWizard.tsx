import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, User, GraduationCap, Languages, Briefcase, CheckCircle, Lightbulb, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useImmigrationStore } from '../../store/useImmigrationStore';

const steps = [
    {
        id: 'personal',
        title: 'Personal Info',
        icon: <User className="w-4 h-4" />,
        insight: "Age is a critical factor. You obtain maximum points between 20-29 years of age."
    },
    {
        id: 'education',
        title: 'Education',
        icon: <GraduationCap className="w-4 h-4" />,
        insight: "A Master's degree or two post-secondary certificates significantly boosts your score compared to a Bachelor's alone."
    },
    {
        id: 'language',
        title: 'Language',
        icon: <Languages className="w-4 h-4" />,
        insight: "Scoring CLB 9 or higher in all four English abilities provides a massive point jump in the 'Skill Transferability' factors."
    },
    {
        id: 'experience',
        title: 'Experience',
        icon: <Briefcase className="w-4 h-4" />,
        insight: "Combining 3+ years of foreign experience with strong language scores optimizes your transferable points."
    },
    {
        id: 'results',
        title: 'Analysis',
        icon: <CheckCircle className="w-4 h-4" />,
        insight: "Your profile is being compared against the latest Express Entry draws and PNP criteria."
    }
];

const AssessmentWizard = () => {
    const { addAssessmentResult } = useImmigrationStore();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        age: '',
        nationality: '',
        education: 'bachelors',
        english: 'CLB 7',
        french: 'None',
        experience: '3+',
        jobOffer: false,
        relative: false
    });

    const updateField = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        setCurrentStep((prev) => {
            const next = Math.min(prev + 1, steps.length - 1);
            // If moving to results step (index 4), save the result
            if (next === 4 && prev === 3) {
                // Dynamic score calculation
                let scoreEst = 0;
                const age = parseInt(formData.age) || 30;
                scoreEst += age >= 20 && age <= 29 ? 110 : Math.max(0, 110 - (age - 29) * 5);
                if (formData.education === 'PhD') scoreEst += 150;
                else if (formData.education === 'Masters') scoreEst += 135;
                else if (formData.education === 'Bachelors') scoreEst += 120;
                else if (formData.education === 'Diploma (2yr+)') scoreEst += 98;
                else scoreEst += 30;
                if (formData.experience === '3+') scoreEst += 80;
                else if (formData.experience === '2') scoreEst += 50;
                else if (formData.experience === '1') scoreEst += 25;
                if (formData.jobOffer) scoreEst += 50;
                if (formData.relative) scoreEst += 15;
                // French bonus
                if (formData.french === 'B2+') scoreEst += 50;

                addAssessmentResult({
                    eligible: scoreEst >= 400,
                    recommendedPath: scoreEst >= 450 ? 'Express Entry' : 'Provincial Nominee',
                    scoreEstimate: scoreEst,
                    tags: formData.french !== 'None' ? ['French Speaker'] : []
                });
            }
            return next;
        });
    };
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    const renderStepContent = () => {
        switch (currentStep) {
            case 0: // Personal
                return (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <label className="text-lg font-semibold text-white">How old are you?</label>
                            <input
                                type="number"
                                value={formData.age}
                                onChange={(e) => updateField('age', e.target.value)}
                                placeholder="e.g., 29"
                                className="w-full glass-input rounded-xl px-4 py-3 text-lg"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-lg font-semibold text-white">What is your nationality?</label>
                            <select
                                value={formData.nationality}
                                onChange={(e) => updateField('nationality', e.target.value)}
                                className="w-full glass-input rounded-xl px-4 py-3 text-lg [&>option]:text-background-dark appearance-none"
                            >
                                <option value="">Select Country</option>
                                <option value="India">India</option>
                                <option value="Philippines">Philippines</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="China">China</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                );
            case 1: // Education
                return (
                    <div className="space-y-4">
                        <label className="text-lg font-semibold text-white">Highest Level of Education</label>
                        <div className="grid grid-cols-1 gap-3">
                            {['PhD', 'Masters', 'Bachelors', 'Diploma (2yr+)', 'High School'].map((opt) => (
                                <label key={opt} className="cursor-pointer group relative">
                                    <input
                                        type="radio"
                                        name="education"
                                        checked={formData.education === opt}
                                        onChange={() => updateField('education', opt)}
                                        className="sr-only"
                                    />
                                    <div className={cn(
                                        "p-4 rounded-xl border flex items-center justify-between transition-all duration-300",
                                        formData.education === opt
                                            ? "bg-primary/40 border-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                                            : "glass-card border-glass-border hover:bg-white/5"
                                    )}>
                                        <span className="text-sm font-medium text-white">{opt}</span>
                                        {formData.education === opt && <CheckCircle className="w-5 h-5 text-accent-gold" />}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                );
            case 2: // Language
                return (
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <label className="text-lg font-semibold text-white">English Proficiency (IELTS/CELPIP)</label>
                            <div className="h-16 rounded-xl glass-input flex items-center px-4 relative">
                                <input
                                    type="range"
                                    min="0" max="100"
                                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-accent-gold"
                                />
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 font-medium uppercase tracking-widest">
                                <span>Basic</span>
                                <span>Intermediate</span>
                                <span>Advanced</span>
                                <span>Native</span>
                            </div>
                        </div>
                        <div className="space-y-4 pt-4">
                            <label className="text-lg font-semibold text-white">Other Languages (French)?</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => updateField('french', 'B2+')}
                                    className={cn("p-4 rounded-xl border transition-all duration-300", formData.french === 'B2+' ? "border-accent-gold bg-accent-gold/10 text-white" : "glass-card border-glass-border text-gray-400")}
                                >Yes, B2+</button>
                                <button
                                    onClick={() => updateField('french', 'None')}
                                    className={cn("p-4 rounded-xl border transition-all duration-300", formData.french === 'None' ? "border-white/20 bg-white/10 text-white" : "glass-card border-glass-border text-gray-400")}
                                >None / Basic</button>
                            </div>
                        </div>
                    </div>
                );
            case 3: // Work
                return (
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <label className="text-lg font-semibold text-white">Total skilled work experience (last 10 years)</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {['0', '1', '2', '3+'].map((yr) => (
                                    <label key={yr} className="cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="exp_years"
                                            checked={formData.experience === yr}
                                            onChange={() => updateField('experience', yr)}
                                            className="sr-only"
                                        />
                                        <div className={cn(
                                            "h-14 rounded-lg border flex items-center justify-center transition-all duration-300",
                                            formData.experience === yr
                                                ? "bg-primary/40 border-accent-gold text-white"
                                                : "glass-card border-glass-border text-gray-300 hover:text-white"
                                        )}>
                                            <span className="text-sm font-medium">{yr === '0' ? '< 1 year' : yr === '1' ? '1 year' : yr + ' years'}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="h-px w-full bg-gradient-to-r from-transparent via-glass-border to-transparent"></div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-lg font-semibold text-white">Canadian Connections</label>
                                <span className="text-xs text-accent-gold bg-accent-gold/10 px-2 py-1 rounded border border-accent-gold/20">High Impact</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className="relative cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={formData.jobOffer}
                                        onChange={(e) => updateField('jobOffer', e.target.checked)}
                                        className="sr-only"
                                    />
                                    <div className={cn(
                                        "p-5 rounded-xl border transition-all duration-300 h-full",
                                        formData.jobOffer
                                            ? "bg-gradient-to-br from-primary/40 to-primary/10 border-accent-gold"
                                            : "glass-card border-glass-border hover:bg-white/5"
                                    )}>
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-white">
                                                <Briefcase className="w-5 h-5" />
                                            </div>
                                            {formData.jobOffer && <CheckCircle className="w-5 h-5 text-accent-gold" />}
                                        </div>
                                        <h3 className="font-semibold text-white mb-1">Valid Job Offer</h3>
                                        <p className="text-xs text-gray-400 leading-relaxed">LMIA-approved offer for at least 1 year.</p>
                                    </div>
                                </label>

                                <label className="relative cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={formData.relative}
                                        onChange={(e) => updateField('relative', e.target.checked)}
                                        className="sr-only"
                                    />
                                    <div className={cn(
                                        "p-5 rounded-xl border transition-all duration-300 h-full",
                                        formData.relative
                                            ? "bg-gradient-to-br from-primary/40 to-primary/10 border-accent-gold"
                                            : "glass-card border-glass-border hover:bg-white/5"
                                    )}>
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-white">
                                                <User className="w-5 h-5" />
                                            </div>
                                            {formData.relative && <CheckCircle className="w-5 h-5 text-accent-gold" />}
                                        </div>
                                        <h3 className="font-semibold text-white mb-1">Relative in Canada</h3>
                                        <p className="text-xs text-gray-400 leading-relaxed">Sibling or parent living as PR or Citizen.</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                );
            case 4: // Results
                return (
                    <div className="text-center space-y-8 py-4">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(34,197,94,0.4)] relative"
                        >
                            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-300 animate-bounce" />
                            <CheckCircle className="w-12 h-12 text-white" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="text-4xl font-black mb-2 text-white">You are Eligible!</h3>
                            <p className="text-gray-300 text-lg">Your profile shows <strong className="text-white">high potential</strong> for permanent residency.</p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-4 text-left max-w-md mx-auto">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="p-5 glass-card rounded-2xl border border-white/10"
                            >
                                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Recommended Path</p>
                                <p className="font-black text-xl text-maple-red">Express Entry</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="p-5 glass-card rounded-2xl border border-white/10"
                            >
                                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Est. CRS Score</p>
                                <div className="flex items-baseline gap-1">
                                    <p className="font-black text-xl text-accent-gold">472</p>
                                    <span className="text-xs text-green-400 font-bold">Good!</span>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="p-5 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex gap-4 text-left relative overflow-hidden group"
                        >
                            <AlertCircle className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                            <p className="text-sm text-blue-200 leading-relaxed">
                                <strong className="block text-blue-100 mb-1">Strategy Tip:</strong>
                                Boost your score by 50 points with CLB 7 French. This would virtually guarantee an invitation.
                            </p>
                        </motion.div>

                        <div className="pt-4">
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                            >
                                Start New Assessment
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };



    return (
        <div className="max-w-5xl mx-auto w-full mb-12">
            {/* Header: Progress & Title */}
            <div className="w-full mb-8">
                <div className="flex justify-between items-end mb-4 px-2">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            {steps[currentStep].title}
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">Step {currentStep + 1} of {steps.length}: Let's calculate your adaptability score.</p>
                    </div>
                    <div className="text-right hidden sm:block">
                        <span className="text-accent-gold font-bold text-xl">{Math.round(((currentStep) / (steps.length - 1)) * 100)}%</span>
                        <span className="text-gray-500 text-xs block uppercase tracking-wider">Completed</span>
                    </div>
                </div>
                {/* Segmented Progress Bar */}
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex gap-1 p-0.5">
                    {steps.map((_, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "h-full rounded-full w-1/5 transition-all duration-500",
                                idx < currentStep
                                    ? "bg-accent-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                                    : idx === currentStep
                                        ? "bg-white/20 relative overflow-hidden"
                                        : "bg-white/5"
                            )}
                        >
                            {idx === currentStep && (
                                <motion.div
                                    layoutId="activeStep"
                                    className="absolute inset-0 bg-accent-gold"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }} // Assuming we want it full for active step, or partial
                                    style={{ width: '50%' }} // Static 50% for active step visual
                                ></motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Split */}
            <div className="glass-panel w-full rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl animate-fade-in-up min-h-[500px]">
                {/* Left Sidebar (Desktop) */}
                <div className="hidden md:flex flex-col w-72 bg-black/20 border-r border-white/5 p-6 space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-accent-gold mb-2">
                            <Lightbulb className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">AI Insight</span>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            {steps[currentStep].insight}
                        </p>
                    </div>
                    <div className="h-px w-full bg-white/5"></div>
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wider">Your Journey</h3>
                        <ul className="space-y-3">
                            {steps.map((step, idx) => (
                                <li key={step.id} className={cn(
                                    "flex items-center gap-3 text-sm transition-colors",
                                    idx < currentStep ? "text-gray-400" : idx === currentStep ? "text-white font-medium" : "text-gray-600"
                                )}>
                                    <div className={cn(
                                        "w-5 h-5 rounded-full flex items-center justify-center text-[10px] border",
                                        idx < currentStep
                                            ? "bg-primary/30 border-primary/20 text-primary-light"
                                            : idx === currentStep
                                                ? "bg-accent-gold text-background-dark border-accent-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                                                : "border-gray-700 bg-transparent text-gray-600"
                                    )}>
                                        {idx < currentStep ? <CheckCircle className="w-3 h-3" /> : idx + 1}
                                    </div>
                                    {step.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 p-6 md:p-10 flex flex-col">
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {renderStepContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons for Form Steps */}
                    {currentStep < 4 && (
                        <div className="mt-10 flex items-center justify-between pt-6 border-t border-glass-border">
                            <button
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm group disabled:opacity-0"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Back
                            </button>
                            <button
                                onClick={nextStep}
                                className="relative overflow-hidden group bg-gradient-to-r from-primary to-primary-light hover:to-primary text-white pl-8 pr-6 py-3 rounded-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center gap-2"
                            >
                                <span className="relative z-10">{currentStep === 3 ? 'Analyze' : 'Next Step'}</span>
                                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></div>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssessmentWizard;
