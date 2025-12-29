import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, User, Briefcase, MapPin, Users, Award, ChevronDown, ChevronUp, ArrowRight, Check, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useImmigrationStore } from '../../store/useImmigrationStore';
import { calculateCRS } from '../../utils/crsLogic';
import type { CRSState as CRSLogicState } from '../../utils/crsLogic';
import PRReportCard from '../../components/PRReportCard';

// Custom Dropdown Component that opens upward
interface DropdownOption {
    label: string;
    value: string | number;
}

interface CustomDropdownProps {
    options: DropdownOption[];
    value: string | number;
    onChange: (value: string | number) => void;
    placeholder?: string;
    openDirection?: 'up' | 'down';
}

const CustomDropdown = ({ options, value, onChange, placeholder = 'Select...', openDirection = 'up' }: CustomDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full h-12 glass-input rounded-xl px-4 flex items-center justify-between cursor-pointer text-white font-medium outline-none transition-all duration-200",
                    isOpen ? "border-accent-gold/50 ring-1 ring-accent-gold/30" : "hover:border-white/20"
                )}
            >
                <span className={selectedOption ? "text-white" : "text-gray-400"}>
                    {selectedOption?.label || placeholder}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {openDirection === 'up' ? (
                        <ChevronUp className="text-gray-400 w-4 h-4" />
                    ) : (
                        <ChevronDown className="text-gray-400 w-4 h-4" />
                    )}
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: openDirection === 'up' ? 10 : -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: openDirection === 'up' ? 10 : -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className={cn(
                            "absolute left-0 right-0 z-50 glass-panel rounded-xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden max-h-64 overflow-y-auto",
                            openDirection === 'up' ? "bottom-full mb-2" : "top-full mt-2"
                        )}
                    >
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "w-full px-4 py-3 text-left text-sm font-medium transition-all flex items-center justify-between",
                                    option.value === value
                                        ? "bg-accent-gold/10 text-accent-gold"
                                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <span>{option.label}</span>
                                {option.value === value && (
                                    <Check className="w-4 h-4 text-accent-gold" />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const CRSCalculator = () => {
    const { crsData, updateCRSData } = useImmigrationStore();

    // State initialized from store
    const [age, setAge] = useState(crsData.age);
    const [education, setEducation] = useState(crsData.education);
    const [maritalStatus, setMaritalStatus] = useState(crsData.maritalStatus);

    const [language, setLanguage] = useState(crsData.language);
    const [experience, setExperience] = useState(crsData.experience);

    const [additional, setAdditional] = useState(crsData.additional);
    const [showReport, setShowReport] = useState(false);

    // Performance: Prevent sync on initial mount
    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        updateCRSData({
            age,
            education,
            maritalStatus,
            language,
            experience,
            additional
        });
    }, [age, education, maritalStatus, language, experience, additional, updateCRSData]);

    // Calculate Scores using external utility
    const scores = useMemo(() => {
        const data: CRSLogicState = {
            age,
            education,
            maritalStatus,
            language,
            experience,
            additional
        };
        return calculateCRS(data);
    }, [age, education, language, experience, additional, maritalStatus]);

    // Save score to store
    useEffect(() => {
        if (scores.total !== crsData.lastCalculatedScore) {
            updateCRSData({ lastCalculatedScore: scores.total });
        }
    }, [scores.total, updateCRSData, crsData.lastCalculatedScore]);

    const educationOptions: DropdownOption[] = [
        { label: "PhD", value: 150 },
        { label: "Master's Degree OR Professional Degree", value: 135 },
        { label: "Two or more certificates/degrees", value: 128 },
        { label: "Bachelor's Degree (3+ years)", value: 120 },
        { label: "Two-year program at college/trade", value: 98 },
        { label: "High School", value: 30 }
    ];

    const maritalOptions: DropdownOption[] = [
        { label: "Single / Never Married", value: 'single' },
        { label: "Married", value: 'married' },
        { label: "Common-Law Partner", value: 'common-law' },
        { label: "Divorced / Separated", value: 'divorced' },
        { label: "Widowed", value: 'widowed' }
    ];

    return (
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 w-full p-4 md:p-8">
            {/* Header Area */}
            <div className="col-span-12 mb-4 text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">CRS <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-600">Calculator</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">Real-time scoring powered by AI. Determine your eligibility for Canadian Express Entry.</p>
                </div>
            </div>

            {/* Left Form Column */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">

                {/* Section 1: Core Human Capital */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel rounded-2xl p-8 relative overflow-hidden border-t-2 border-t-white/10"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-50">
                        <User className="w-16 h-16 text-white/5" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-accent-gold rounded-full"></span>
                        Core Human Capital
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                        {/* Age Slider */}
                        <div className="col-span-1 md:col-span-2 space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-gray-300 font-medium text-sm uppercase tracking-wider">Age</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        min="18" max="60"
                                        value={age}
                                        onChange={(e) => setAge(Math.min(60, Math.max(18, parseInt(e.target.value) || 18)))}
                                        className="w-16 h-8 bg-accent-gold/10 border border-accent-gold/20 rounded-lg text-center font-bold text-accent-gold text-lg focus:ring-1 focus:ring-accent-gold/50 outline-none"
                                    />
                                    <span className="text-gray-500 text-xs font-bold">YRS</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                min="18" max="60"
                                value={age}
                                onChange={(e) => setAge(parseInt(e.target.value))}
                                className="w-full accent-accent-gold h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-500 font-medium">
                                <span>18</span><span>25</span><span>35</span><span>45+</span>
                            </div>
                        </div>

                        {/* Marital Status - Custom Dropdown opening UP */}
                        <div className="space-y-2">
                            <label className="text-gray-300 font-medium text-sm uppercase tracking-wider">Marital Status</label>
                            <CustomDropdown
                                options={maritalOptions}
                                value={maritalStatus}
                                onChange={(val) => setMaritalStatus(val as string)}
                                openDirection="up"
                            />
                        </div>

                        {/* Education - Custom Dropdown opening UP */}
                        <div className="space-y-2">
                            <label className="text-gray-300 font-medium text-sm uppercase tracking-wider">Level of Education</label>
                            <CustomDropdown
                                options={educationOptions}
                                value={education}
                                onChange={(val) => setEducation(val as number)}
                                openDirection="up"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Section 2: Language */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-panel rounded-2xl p-8 border-t-2 border-t-white/10"
                >
                    <div className="flex justify-between items-start mb-8">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="w-1 h-6 bg-blue-400 rounded-full"></span>
                            Language Proficiency
                        </h3>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-white/5 rounded-lg text-xs font-medium text-gray-300 border border-white/10">IELTS</span>
                            <span className="px-3 py-1 bg-primary text-white rounded-lg text-xs font-medium border border-primary-light shadow-lg shadow-primary/30">CELPIP</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {Object.entries(language).map(([key, val]) => (
                            <div key={key} className="space-y-3">
                                <div className="flex justify-between">
                                    <label className="text-sm font-medium text-gray-300 capitalize">{key} Score</label>
                                    <span className="text-white font-bold">CLB {Math.floor(val)}</span>
                                </div>
                                <input
                                    type="range"
                                    min="4" max="10" step="1"
                                    value={val}
                                    onChange={(e) => setLanguage(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                                    className="w-full accent-blue-400 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Section 3: Work Experience */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel rounded-2xl p-8 border-t-2 border-t-white/10"
                >
                    <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                        <span className="w-1 h-6 bg-green-400 rounded-full"></span>
                        Work Experience
                    </h3>
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <div>
                                    <label className="text-white font-semibold text-base block">Canadian Work Experience</label>
                                    <span className="text-gray-400 text-xs">Full-time skilled work in Canada</span>
                                </div>
                                <span className="text-green-400 font-bold text-lg bg-green-900/20 px-3 py-1 rounded-lg border border-green-500/20">{experience.canadian} Year{experience.canadian !== 1 ? 's' : ''}</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="5"
                                value={experience.canadian}
                                onChange={(e) => setExperience(prev => ({ ...prev, canadian: parseInt(e.target.value) }))}
                                className="w-full accent-green-400 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-500 font-medium"><span>None</span><span>1 Yr</span><span>2 Yrs</span><span>3 Yrs</span><span>4 Yrs</span><span>5+ Yrs</span></div>
                        </div>
                        <div className="h-px bg-white/5 w-full"></div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <div>
                                    <label className="text-white font-semibold text-base block">Foreign Work Experience</label>
                                    <span className="text-gray-400 text-xs">Skilled work outside Canada</span>
                                </div>
                                <span className="text-green-400 font-bold text-lg bg-green-900/20 px-3 py-1 rounded-lg border border-green-500/20">{experience.foreign} Year{experience.foreign !== 1 ? 's' : ''}</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="5"
                                value={experience.foreign}
                                onChange={(e) => setExperience(prev => ({ ...prev, foreign: parseInt(e.target.value) }))}
                                className="w-full accent-green-400 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-500 font-medium"><span>None</span><span>1 Yr</span><span>2 Yrs</span><span>3 Yrs</span><span>4 Yrs</span><span>5+ Yrs</span></div>
                        </div>
                    </div>
                </motion.div>

                {/* Section 4: Additional */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-panel rounded-2xl p-8 border-t-2 border-t-white/10"
                >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-maple-red rounded-full"></span>
                        Additional Points
                    </h3>
                    <div className="space-y-4">
                        {[
                            { id: 'pnp', label: 'Provincial Nomination (PNP)', points: '600', sub: 'Increases score by 600 points', icon: <MapPin className="text-purple-300" />, color: 'bg-purple-500/20' },
                            { id: 'jobOffer', label: 'Valid Job Offer (LMIA)', points: '50-200', sub: 'Supported by LMIA or exempt', icon: <Briefcase className="text-green-300" />, color: 'bg-green-500/20' },
                            { id: 'sibling', label: 'Sibling in Canada', points: '15', sub: 'Citizen or Permanent Resident (18+)', icon: <Users className="text-blue-300" />, color: 'bg-blue-500/20' },
                            { id: 'tradeCert', label: 'Trade Certificate', points: '50', sub: 'Certificate of Qualification', icon: <Award className="text-accent-gold" />, color: 'bg-yellow-500/20' },
                        ].map((item) => (
                            <motion.div
                                key={item.id}
                                whileHover={{ scale: 1.01 }}
                                className={cn(
                                    "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer",
                                    additional[item.id as keyof typeof additional] ? "bg-white/10 border-accent-gold/40 shadow-lg shadow-accent-gold/10" : "bg-white/5 border-white/5 hover:border-accent-gold/30"
                                )}
                                onClick={() => setAdditional(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof additional] }))}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn("p-2 rounded-lg", item.color)}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold">{item.label}</p>
                                        <p className="text-gray-400 text-xs">{item.sub}</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                                    <input
                                        type="checkbox"
                                        checked={additional[item.id as keyof typeof additional]}
                                        onChange={(e) => setAdditional(prev => ({ ...prev, [item.id]: e.target.checked }))}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-gold peer-checked:after:bg-white peer-checked:after:border-white"></div>
                                </label>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>

            {/* Sticky Sidebar */}
            <div className="col-span-12 lg:col-span-4 min-w-0">
                <div className="sticky top-28 flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col items-center relative overflow-hidden shadow-2xl shadow-black/50 border-t-4 border-t-accent-gold"
                    >
                        {/* Background Blurs */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/30 rounded-full blur-[60px] pointer-events-none"></div>

                        <h2 className="text-gray-300 text-sm font-bold uppercase tracking-widest mb-6 relative z-10 w-full text-center border-b border-white/5 pb-4">Total CRS Score</h2>

                        <div className="relative size-64 mb-6 z-10">
                            <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                                <path className="text-gray-700/50" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5"></path>
                                <motion.path
                                    className="text-accent-gold drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    initial={{ strokeDasharray: "0, 100" }}
                                    animate={{ strokeDasharray: `${(scores.total / 1200) * 100}, 100` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                ></motion.path>
                            </svg>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center">
                                <motion.span
                                    key={scores.total}
                                    initial={{ scale: 1.2, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-6xl font-black text-white tracking-tight drop-shadow-lg"
                                >
                                    {scores.total}
                                </motion.span>
                                <span className="text-gray-400 text-sm font-medium mt-1">/ 1200</span>
                            </div>
                        </div>

                        <div className="w-full space-y-3 relative z-10">
                            <div className="flex justify-between items-center text-sm py-2 border-b border-white/5">
                                <span className="text-gray-400 flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-accent-gold shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
                                    Core Factors
                                </span>
                                <span className="font-bold text-white">{scores.core}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm py-2 border-b border-white/5">
                                <span className="text-gray-400 flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
                                    Spouse Factors
                                </span>
                                <span className="font-bold text-white">{scores.spouse}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm py-2 border-b border-white/5">
                                <span className="text-gray-400 flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                                    Skill Transferability
                                </span>
                                <span className="font-bold text-white">{scores.transferability}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm py-2">
                                <span className="text-gray-400 flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-maple-red shadow-[0_0_8px_rgba(220,38,38,0.8)]"></span>
                                    Additional Points
                                </span>
                                <span className="font-bold text-white">{scores.additional}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowReport(true)}
                            className="w-full mt-8 bg-gradient-to-r from-primary to-primary-light hover:to-primary text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 border border-white/10 group"
                        >
                            <span>View Detailed Report</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>

                    {/* Insight Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="glass-panel p-5 border border-accent-gold/20 relative overflow-hidden rounded-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/5 to-transparent pointer-events-none"></div>
                        <div className="flex items-start gap-3 relative z-10">
                            <Info className="w-5 h-5 text-accent-gold mt-1" />
                            <div>
                                <h4 className="text-accent-gold font-bold text-sm mb-1">Score Insight</h4>
                                <p className="text-gray-300 text-xs leading-relaxed">
                                    {scores.total >= 500 ? (
                                        <>Your score of <strong className="text-accent-gold">{scores.total}</strong> is competitive for recent Express Entry draws. You have a strong chance of receiving an ITA!</>
                                    ) : scores.total >= 450 ? (
                                        <>You are <strong className="text-white">{500 - scores.total} points</strong> below the typical cutoff. Consider a Provincial Nomination to boost your score by 600 points.</>
                                    ) : (
                                        <>Enabling "Provincial Nomination" would add <strong className="text-accent-gold">600 points</strong> to your score, making you highly competitive.</>
                                    )}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Detailed Report Modal */}
            <AnimatePresence>
                {showReport && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setShowReport(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setShowReport(false)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <PRReportCard
                                crsScore={scores.total}
                                hasJobOffer={additional.jobOffer}
                                yearsExperience={experience.canadian}
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CRSCalculator;

