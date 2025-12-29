import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, TrendingUp, BookOpen, Briefcase, MapPin } from 'lucide-react';
import ScoreGauge from './ScoreGauge';

interface PRReportCardProps {
    crsScore: number;
    nocCode?: string;
    hasJobOffer?: boolean;
    educationLevel?: string;
    yearsExperience?: number;
}

export const PRReportCard = ({
    crsScore,
    nocCode,
    hasJobOffer,
    educationLevel,
    yearsExperience
}: PRReportCardProps) => {

    // Basic logic to determine probability (mock logic for visualization)
    const getProbability = (score: number) => {
        if (score >= 500) return { label: "Excellent", color: "text-success", bg: "bg-success/10", border: "border-success/20", icon: CheckCircle2 };
        if (score >= 470) return { label: "Good", color: "text-accent-gold", bg: "bg-accent-gold/10", border: "border-accent-gold/20", icon: TrendingUp };
        if (score >= 440) return { label: "Fair", color: "text-yellow-600", bg: "bg-yellow-600/10", border: "border-yellow-600/20", icon: AlertCircle };
        return { label: "Low (Needs Improvement)", color: "text-maple-red", bg: "bg-maple-red/10", border: "border-maple-red/20", icon: AlertCircle };
    };

    const probability = getProbability(crsScore);
    const ProbabilityIcon = probability.icon;

    // Dynamic recommendations based on profile
    const recommendations = [
        {
            title: "Improve Language Scores",
            desc: "Maxing out CLB9+ in all bands can add up to 50 points.",
            impact: "High",
            icon: BookOpen,
            condition: true
        },
        {
            title: "Provincial Nomination",
            desc: nocCode ? `Look for PNP streams relevant to NOC ${nocCode}.` : "Look for PNP streams relevant to your key occupation.",
            impact: "Medium",
            icon: MapPin,
            condition: crsScore < 500
        },
        {
            title: "Gain Canadian Experience",
            desc: (yearsExperience || 0) < 1 ? "One year of Canadian work experience opens up CEC and boosts score." : "More Canadian experience can significantly increase your CRS.",
            impact: "High",
            icon: Briefcase,
            condition: true
        },
        {
            title: "Secure a Job Offer",
            desc: "A valid LMIA job offer can add 50 or 200 points.",
            impact: "High",
            icon: Briefcase,
            condition: !hasJobOffer
        },
        {
            title: "Upgrade Education",
            desc: "A Master's degree or second credential adds significant points.",
            impact: "Medium",
            icon: BookOpen,
            condition: educationLevel !== 'PhD' && educationLevel !== "Master's" && educationLevel !== "Master's Degree OR Professional Degree"
        }
    ].filter(r => r.condition).slice(0, 4);

    return (
        <div className="glass-panel rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">

                {/* Left Column: Gauge & Verdict */}
                <div className="flex-shrink-0 flex flex-col items-center">
                    <ScoreGauge score={crsScore} size={220} />

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className={`mt-6 px-6 py-3 rounded-xl border ${probability.bg} ${probability.border} flex items-center gap-3`}
                    >
                        <ProbabilityIcon className={`w-6 h-6 ${probability.color}`} />
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Approval Probability</p>
                            <p className={`text-lg font-bold ${probability.color}`}>{probability.label}</p>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Insights & Recommendations */}
                <div className="flex-1 w-full">
                    <h3 className="text-2xl font-bold text-white mb-2">Immigration Profile Assessment</h3>
                    <p className="text-gray-400 mb-6">
                        Based on your CRS score of <span className="text-white font-bold">{crsScore}</span>, here is a breakdown of your standing in the current Express Entry pool.
                    </p>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Key Recommendations to Improve
                        </h4>

                        {recommendations.map((rec, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 + idx * 0.1 }}
                                className="bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-4 flex items-start gap-4"
                            >
                                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                                    <rec.icon className="w-5 h-5 text-primary-light" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h5 className="font-semibold text-white">{rec.title}</h5>
                                        <span className={`text-xs px-2 py-0.5 rounded-full border ${rec.impact === 'High'
                                            ? 'bg-success/10 border-success/20 text-success'
                                            : 'bg-accent-gold/10 border-accent-gold/20 text-accent-gold'
                                            }`}>
                                            {rec.impact} Impact
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400 mt-1">{rec.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PRReportCard;
