import { useState, useMemo } from 'react';
import { Info, User, Briefcase, MapPin, Users, Award, ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

const CRSCalculator = () => {
    // State for granular inputs
    const [age, setAge] = useState(29);
    const [education, setEducation] = useState(150); // Mapped value
    const [maritalStatus, setMaritalStatus] = useState('single');

    const [language, setLanguage] = useState({
        reading: 9,
        writing: 9,
        listening: 10,
        speaking: 9
    });

    const [experience, setExperience] = useState({
        canadian: 1,
        foreign: 3
    });

    const [additional, setAdditional] = useState<{
        pnp: boolean;
        jobOffer: boolean;
        sibling: boolean;
        tradeCert: boolean;
    }>({
        pnp: false,
        jobOffer: false,
        sibling: false,
        tradeCert: false
    });

    // Calculate Scores (Simplified Logic for Demo)
    const scores = useMemo(() => {
        // 1. Core / Human Capital
        let core = 0;

        // Age: Max 110 at 20-29, drops by 5 per year after 29
        const ageScore = age >= 20 && age <= 29 ? 110 : Math.max(0, 110 - (age - 29) * 5);
        core += ageScore;

        // Education (Directly using the state value which represents the level)
        core += education;

        // Language: Approx 34 points per section max
        const langScore = Object.values(language).reduce((acc, val) => acc + (val * 3.4), 0); // Simplified multiplier
        core += Math.min(136, Math.round(langScore));

        // Canadian Exp: Max 80
        const cadExpScore = Math.min(80, experience.canadian * 20); // 20 pts per year rough approx
        core += cadExpScore;

        // 2. Spouse Factors (0 for single)
        const spouse = 0;

        // 3. Skill Transferability (Bonus points)
        // High education + High Language = Bonus
        let transferability = 0;
        if (education >= 135 && Object.values(language).every(l => l >= 9)) {
            transferability += 50;
        }
        if (experience.foreign >= 3 && Object.values(language).every(l => l >= 9)) {
            transferability += 50;
        }

        // 4. Additional Points
        let additionalPoints = 0;
        if (additional.pnp) additionalPoints += 600;
        if (additional.jobOffer) additionalPoints += 50;
        if (additional.sibling) additionalPoints += 15;
        if (additional.tradeCert) additionalPoints += 50;

        const total = Math.min(1200, core + spouse + transferability + additionalPoints);

        return {
            core,
            spouse,
            transferability,
            additional: additionalPoints,
            total
        };
    }, [age, education, language, experience, additional]);

    const educationOptions = [
        { label: "PhD", value: 150 },
        { label: "Master's Degree OR Professional Degree", value: 135 },
        { label: "Two or more certificates/degrees", value: 128 },
        { label: "Bachelor's Degree (3+ years)", value: 120 },
        { label: "Two-year program at college/trade", value: 98 },
        { label: "High School", value: 30 }
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
                <div className="glass-panel rounded-2xl p-8 relative overflow-hidden border-t-2 border-t-white/10">
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
                                <span className="text-accent-gold font-bold text-xl bg-accent-gold/10 px-3 py-1 rounded-lg border border-accent-gold/20">{age}</span>
                            </div>
                            <input
                                type="range"
                                min="18" max="50"
                                value={age}
                                onChange={(e) => setAge(parseInt(e.target.value))}
                                className="w-full accent-accent-gold h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-500 font-medium">
                                <span>18</span><span>25</span><span>35</span><span>45+</span>
                            </div>
                        </div>

                        {/* Marital Status */}
                        <div className="space-y-2">
                            <label className="text-gray-300 font-medium text-sm uppercase tracking-wider">Marital Status</label>
                            <div className="relative">
                                <select
                                    value={maritalStatus}
                                    onChange={(e) => setMaritalStatus(e.target.value)}
                                    className="w-full h-12 glass-input rounded-xl px-4 appearance-none cursor-pointer text-white font-medium outline-none focus:border-accent-gold/50"
                                >
                                    <option value="single">Single / Never Married</option>
                                    <option value="married">Married</option>
                                    <option value="common-law">Common-Law</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                            </div>
                        </div>

                        {/* Education */}
                        <div className="space-y-2">
                            <label className="text-gray-300 font-medium text-sm uppercase tracking-wider">Level of Education</label>
                            <div className="relative">
                                <select
                                    value={education}
                                    onChange={(e) => setEducation(parseInt(e.target.value))}
                                    className="w-full h-12 glass-input rounded-xl px-4 appearance-none cursor-pointer text-white font-medium outline-none focus:border-accent-gold/50"
                                >
                                    {educationOptions.map(opt => (
                                        <option key={opt.value} value={opt.value} className="bg-background-dark text-white">{opt.label}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Language */}
                <div className="glass-panel rounded-2xl p-8 border-t-2 border-t-white/10">
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
                </div>

                {/* Section 3: Work Experience */}
                <div className="glass-panel rounded-2xl p-8 border-t-2 border-t-white/10">
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
                </div>

                {/* Section 4: Additional */}
                <div className="glass-panel rounded-2xl p-8 border-t-2 border-t-white/10">
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
                            <div key={item.id} className={cn(
                                "flex items-center justify-between p-4 rounded-xl border transition-all",
                                additional[item.id as keyof typeof additional] ? "bg-white/10 border-accent-gold/40" : "bg-white/5 border-white/5 hover:border-accent-gold/30"
                            )}>
                                <div className="flex items-center gap-4">
                                    <div className={cn("p-2 rounded-lg", item.color)}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold">{item.label}</p>
                                        <p className="text-gray-400 text-xs">{item.sub}</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={additional[item.id as keyof typeof additional]}
                                        onChange={(e) => setAdditional(prev => ({ ...prev, [item.id]: e.target.checked }))}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-gold peer-checked:after:bg-white peer-checked:after:border-white"></div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Sticky Sidebar */}
            <div className="col-span-12 lg:col-span-4 min-w-0">
                <div className="sticky top-28 flex flex-col gap-6">
                    <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col items-center relative overflow-hidden shadow-2xl shadow-black/50 border-t-4 border-t-accent-gold">
                        {/* Background Blurs */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/30 rounded-full blur-[60px] pointer-events-none"></div>

                        <h2 className="text-gray-300 text-sm font-bold uppercase tracking-widest mb-6 relative z-10 w-full text-center border-b border-white/5 pb-4">Total CRS Score</h2>

                        <div className="relative size-64 mb-6 z-10">
                            <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                                <path className="text-gray-700/50" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5"></path>
                                <path
                                    className="text-accent-gold drop-shadow-[0_0_10px_rgba(251,191,36,0.5)] transition-all duration-1000 ease-out"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeDasharray={`${(scores.total / 1200) * 100}, 100`}
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                ></path>
                            </svg>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center">
                                <span className="text-6xl font-black text-white tracking-tight drop-shadow-lg">{scores.total}</span>
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

                        <button className="w-full mt-8 bg-gradient-to-r from-primary to-primary-light hover:to-primary text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 border border-white/10 group">
                            <span>View Detailed Report</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Insight Card */}
                    <div className="glass-panel p-5 border border-accent-gold/20 relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/5 to-transparent pointer-events-none"></div>
                        <div className="flex items-start gap-3 relative z-10">
                            <Info className="w-5 h-5 text-accent-gold mt-1" />
                            <div>
                                <h4 className="text-accent-gold font-bold text-sm mb-1">Score Insight</h4>
                                <p className="text-gray-300 text-xs leading-relaxed">
                                    You are <strong className="text-white">43 points</strong> below the latest cutoff. Enabling "Provincial Nomination" would boost you well above the threshold.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CRSCalculator;
