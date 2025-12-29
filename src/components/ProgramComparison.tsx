import { motion } from 'framer-motion';
import { Clock, Users, GraduationCap, Briefcase, MapPin, Star } from 'lucide-react';

interface Program {
    name: string;
    category: 'Express Entry' | 'Provincial' | 'Other';
    requirements: {
        education: string;
        experience: string;
        language: string;
        age: string;
    };
    processingTime: string;
    successRate: string;
    highlights: string[];
    recommended?: boolean;
}

const programs: Program[] = [
    {
        name: "Federal Skilled Worker",
        category: "Express Entry",
        requirements: {
            education: "Bachelor's degree or higher",
            experience: "1+ years skilled work",
            language: "CLB 7+ (IELTS 6.0)",
            age: "Under 45 preferred"
        },
        processingTime: "6 months",
        successRate: "85%",
        highlights: ["No job offer required", "Points-based system", "Family included"],
        recommended: true
    },
    {
        name: "Canadian Experience Class",
        category: "Express Entry",
        requirements: {
            education: "No minimum",
            experience: "1+ years Canadian work",
            language: "CLB 5-7 (varies)",
            age: "No limit"
        },
        processingTime: "6 months",
        successRate: "90%",
        highlights: ["Fastest pathway", "Lower CRS needed", "For those already in Canada"]
    },
    {
        name: "Provincial Nominee Program",
        category: "Provincial",
        requirements: {
            education: "Varies by stream",
            experience: "0-2 years (varies)",
            language: "CLB 4-7 (varies)",
            age: "Varies"
        },
        processingTime: "12-18 months",
        successRate: "80%",
        highlights: ["+600 CRS points", "Province-specific", "Many streams available"]
    },
    {
        name: "Study Permit → PGWP",
        category: "Other",
        requirements: {
            education: "DLI acceptance",
            experience: "None required",
            language: "IELTS 6.0+ typically",
            age: "No limit"
        },
        processingTime: "2-4 years total",
        successRate: "75%",
        highlights: ["Canadian credentials", "Work permit after", "Pathway to CEC"]
    },
    {
        name: "Federal Skilled Trades",
        category: "Express Entry",
        requirements: {
            education: "Trade certification",
            experience: "2+ years in trade",
            language: "CLB 5 speaking/listening",
            age: "Under 45 preferred"
        },
        processingTime: "6 months",
        successRate: "82%",
        highlights: ["In-demand trades", "Lower education needed", "Job offer OR certificate"]
    }
];

export const ProgramComparison = () => {
    return (
        <section className="py-24 px-6 bg-surface-dark/50 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-maple-red/5 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-maple-red/10 border border-maple-red/20 text-maple-red text-sm font-medium mb-4">
                        Compare Programs
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        Find Your <span className="text-gradient-red">Perfect Pathway</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Compare immigration programs to find the best fit for your profile and goals.
                    </p>
                </motion.div>

                {/* Desktop Table */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="hidden lg:block overflow-x-auto"
                >
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-4 px-4 text-gray-400 font-medium">Program</th>
                                <th className="text-left py-4 px-4 text-gray-400 font-medium">
                                    <GraduationCap className="w-4 h-4 inline mr-2" />Education
                                </th>
                                <th className="text-left py-4 px-4 text-gray-400 font-medium">
                                    <Briefcase className="w-4 h-4 inline mr-2" />Experience
                                </th>
                                <th className="text-left py-4 px-4 text-gray-400 font-medium">
                                    <Clock className="w-4 h-4 inline mr-2" />Timeline
                                </th>
                                <th className="text-left py-4 px-4 text-gray-400 font-medium">
                                    <Users className="w-4 h-4 inline mr-2" />Success Rate
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {programs.map((program) => (
                                <tr
                                    key={program.name}
                                    className={`border-b border-white/5 hover:bg-white/5 transition-colors ${program.recommended ? 'bg-success/5' : ''
                                        }`}
                                >
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            {program.recommended && (
                                                <Star className="w-5 h-5 text-accent-gold fill-accent-gold" />
                                            )}
                                            <div>
                                                <p className="font-semibold text-white">{program.name}</p>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${program.category === 'Express Entry' ? 'bg-primary/20 text-primary-light' :
                                                    program.category === 'Provincial' ? 'bg-maple-red/20 text-maple-red' :
                                                        'bg-accent-gold/20 text-accent-gold'
                                                    }`}>
                                                    {program.category}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-gray-300 text-sm">{program.requirements.education}</td>
                                    <td className="py-4 px-4 text-gray-300 text-sm">{program.requirements.experience}</td>
                                    <td className="py-4 px-4">
                                        <span className="text-white font-medium">{program.processingTime}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-success rounded-full"
                                                    style={{ width: program.successRate }}
                                                />
                                            </div>
                                            <span className="text-success font-medium">{program.successRate}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4">
                    {programs.map((program, index) => (
                        <motion.div
                            key={program.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`glass-card rounded-xl p-5 ${program.recommended ? 'ring-2 ring-success/50' : ''}`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        {program.recommended && (
                                            <Star className="w-4 h-4 text-accent-gold fill-accent-gold" />
                                        )}
                                        <h3 className="font-bold text-white">{program.name}</h3>
                                    </div>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${program.category === 'Express Entry' ? 'bg-primary/20 text-primary-light' :
                                        program.category === 'Provincial' ? 'bg-maple-red/20 text-maple-red' :
                                            'bg-accent-gold/20 text-accent-gold'
                                        }`}>
                                        {program.category}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <p className="text-success font-bold">{program.successRate}</p>
                                    <p className="text-xs text-gray-500">success rate</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                                <div>
                                    <p className="text-gray-500 text-xs">Education</p>
                                    <p className="text-gray-300">{program.requirements.education}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Experience</p>
                                    <p className="text-gray-300">{program.requirements.experience}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Language</p>
                                    <p className="text-gray-300">{program.requirements.language}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Processing</p>
                                    <p className="text-white font-medium">{program.processingTime}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {program.highlights.map((highlight, i) => (
                                    <span key={i} className="text-xs px-2 py-1 bg-white/5 rounded-full text-gray-400">
                                        {highlight}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-sm text-gray-500 mt-8"
                >
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Success rates are estimates based on historical data. Individual results may vary.
                </motion.p>
            </div>
        </section>
    );
};

export default ProgramComparison;
