import { useState, useMemo } from 'react';
import { ArrowLeft, CheckSquare, FileText, Info, Download, Share2 } from 'lucide-react';
import { useImmigrationStore } from '../store/useImmigrationStore';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DocumentChecklistPage = () => {
    const { crsData } = useImmigrationStore();
    const navigate = useNavigate();

    // Derived checklist based on store data
    const checklistItems = useMemo(() => {
        const items = [
            { id: 'passport', category: 'Identity', label: 'Valid Passport', desc: 'Must be valid for at least 6 months.', required: true },
            { id: 'photo', category: 'Identity', label: 'Digital Photo', desc: 'According to IRCC specifications (50x70mm).', required: true },
            { id: 'medical', category: 'Medical', label: 'Medical Exam', desc: 'From an IRCC-approved panel physician.', required: true },
            { id: 'police', category: 'Security', label: 'Police Certificates', desc: 'For every country you lived in for 6+ months.', required: true },
        ];

        // Conditional Items
        if (crsData.maritalStatus !== 'single') {
            items.push({ id: 'marriage', category: 'Civil Status', label: 'Marriage Certificate', desc: 'English translation required if not in English/French.', required: true });
        }

        if (crsData.education > 30) {
            items.push({ id: 'eca', category: 'Education', label: 'ECA Report', desc: 'Educational Credential Assessment (WES, BCIT, etc.)', required: true });
            items.push({ id: 'degrees', category: 'Education', label: 'Degree/Diplomas', desc: 'Scans of original certificates.', required: true });
        }

        if (crsData.experience.canadian > 0 || crsData.experience.foreign > 0) {
            items.push({ id: 'employment', category: 'Work Experience', label: 'Employment Reference Letters', desc: 'On company letterhead with duties, hours, and salary.', required: true });
        }

        if (crsData.language.reading > 0) { // Assuming they have scores
            items.push({ id: 'ielts', category: 'Language', label: 'Language Test Results', desc: 'Valid IELTS/CELPIP/TEF report (less than 2 years old).', required: true });
        }

        if (crsData.additional.pnp) {
            items.push({ id: 'nomination', category: 'PNP', label: 'Provincial Nomination Certificate', desc: 'Valid certificate from the province.', required: true });
        }

        if (crsData.additional.jobOffer) {
            items.push({ id: 'offer', category: 'Employment', label: 'Job Offer Letter', desc: 'Signed by employer + LMIA number if applicable.', required: true });
        }

        return items;
    }, [crsData]);

    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const toggleCheck = (id: string) => {
        setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // Bug fix: Only count items that are BOTH checked AND in the current list
    const checkedCount = checklistItems.filter(item => checkedItems[item.id]).length;
    const progress = checklistItems.length > 0 ? Math.round((checkedCount / checklistItems.length) * 100) : 0;

    return (
        <div className="min-h-screen pt-24 pb-24 px-6 bg-background-dark">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </button>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                                <FileText className="w-8 h-8 text-accent-gold" />
                                Document Checklist
                            </h1>
                            <p className="text-gray-400">
                                Customized list based on your profile ({crsData.maritalStatus}, {crsData.education > 30 ? 'Educated' : ''}...).
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-black text-white">{progress}%</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest">Completed</div>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-white/5 rounded-full mb-8 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-accent-gold to-yellow-600"
                    />
                </div>

                {/* Checklist Groups */}
                <div className="space-y-6">
                    {['Identity', 'Education', 'Language', 'Work Experience', 'Civil Status', 'Medical', 'Security', 'PNP', 'Employment'].map(category => {
                        const categoryItems = checklistItems.filter(i => i.category === category);
                        if (categoryItems.length === 0) return null;

                        return (
                            <div key={category} className="glass-panel rounded-2xl overflow-hidden border border-white/10">
                                <div className="bg-white/5 px-6 py-3 border-b border-white/5">
                                    <h3 className="font-bold text-white">{category}</h3>
                                </div>
                                <div className="divide-y divide-white/5">
                                    {categoryItems.map(item => (
                                        <div
                                            key={item.id}
                                            role="checkbox"
                                            aria-checked={checkedItems[item.id] || false}
                                            tabIndex={0}
                                            onClick={() => toggleCheck(item.id)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    toggleCheck(item.id);
                                                }
                                            }}
                                            className={cn(
                                                "px-6 py-4 flex items-start gap-4 cursor-pointer transition-colors hover:bg-white/5 focus:outline-none focus:bg-white/5",
                                                checkedItems[item.id] ? "bg-accent-gold/5" : ""
                                            )}
                                        >
                                            <div className={cn(
                                                "w-6 h-6 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all",
                                                checkedItems[item.id]
                                                    ? "bg-accent-gold border-accent-gold text-background-dark"
                                                    : "border-gray-600 bg-transparent text-transparent"
                                            )}>
                                                <CheckSquare className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className={cn("font-medium mb-1 transition-colors", checkedItems[item.id] ? "text-accent-gold" : "text-gray-200")}>
                                                    {item.label}
                                                </div>
                                                <div className="text-sm text-gray-500">{item.desc}</div>
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100">
                                                <Info className="w-5 h-5 text-gray-600" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Actions */}
                <div className="mt-8 flex gap-4 justify-end">
                    <button className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium flex items-center gap-2 transition-colors">
                        <Share2 className="w-4 h-4" />
                        Share List
                    </button>
                    <button className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-light text-white font-bold flex items-center gap-2 transition-colors shadow-lg shadow-primary/20">
                        <Download className="w-4 h-4" />
                        Export PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DocumentChecklistPage;
