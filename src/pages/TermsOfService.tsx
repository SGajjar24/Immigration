import { motion } from 'framer-motion';
import { FileText, AlertTriangle, CheckCircle, XCircle, Scale, Clock, Mail } from 'lucide-react';

const sections = [
    {
        icon: CheckCircle,
        title: "Acceptance of Terms",
        content: `By accessing or using CanadaPath AI ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.

These terms apply to all visitors, users, and others who access or use the Platform. We reserve the right to modify these terms at any time, and your continued use of the Platform constitutes acceptance of any changes.`
    },
    {
        icon: FileText,
        title: "Description of Services",
        content: `CanadaPath AI provides:

• **Immigration Assessment Tools**: Evaluate your eligibility for Canadian immigration programs
• **CRS Calculator**: Estimate your Comprehensive Ranking System score
• **NOC Code Search**: Find your National Occupational Classification code
• **Express Entry Information**: Educational content about immigration pathways
• **Document Checklists**: General guidance on required documentation

These tools are provided for informational purposes only.`
    },
    {
        icon: AlertTriangle,
        title: "Important Disclaimer",
        content: `**CanadaPath AI is NOT:**

• A law firm or legal service
• A licensed immigration consultant (RCIC)
• Affiliated with Immigration, Refugees and Citizenship Canada (IRCC)
• A representative of the Canadian government
• Providing official immigration advice

**Our tools provide estimates and general information only.** Immigration requirements change frequently, and individual circumstances vary. Always verify information with official IRCC sources and consult a licensed immigration professional before making any immigration decisions.`
    },
    {
        icon: XCircle,
        title: "Limitation of Liability",
        content: `To the maximum extent permitted by law:

• We provide the Platform "as is" without warranties of any kind
• We do not guarantee the accuracy, completeness, or reliability of any information
• We are not liable for any decisions made based on our tools or content
• We are not responsible for any direct, indirect, or consequential damages
• Your use of the Platform is at your own risk

Our total liability shall not exceed the amount you paid for our services (if any) in the 12 months preceding any claim.`
    },
    {
        icon: Scale,
        title: "User Responsibilities",
        content: `When using CanadaPath AI, you agree to:

• Provide accurate and truthful information
• Use the Platform only for lawful purposes
• Not attempt to circumvent any security measures
• Not use automated systems to access the Platform without permission
• Not impersonate others or provide false identity information
• Not share your account credentials with others
• Maintain the confidentiality of your account
• Notify us immediately of any unauthorized access`
    },
    {
        icon: Clock,
        title: "Account Terms",
        content: `**Account Creation:**
• You must be 18 years or older to create an account
• You are responsible for maintaining account security
• One account per person is permitted

**Account Termination:**
• You may delete your account at any time
• We may suspend or terminate accounts that violate these terms
• Upon termination, your data will be deleted per our Privacy Policy

**Data Accuracy:**
• You are responsible for the accuracy of information you provide
• We are not liable for results based on inaccurate input`
    }
];

export const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-background-dark pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-maple-red/10 border border-maple-red/20 mb-6">
                        <FileText className="w-8 h-8 text-maple-red" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Please read these terms carefully before using CanadaPath AI.
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                        Effective Date: January 2025
                    </p>
                </motion.div>

                {/* Key Notice */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8 p-4 bg-maple-red/10 border border-maple-red/20 rounded-xl"
                >
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-maple-red flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold text-white mb-1">Not Legal Advice</p>
                            <p className="text-sm text-gray-300">
                                CanadaPath AI provides informational tools only. We are not immigration consultants or lawyers.
                                For official advice, consult a licensed RCIC or immigration lawyer.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Sections */}
                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: (index + 1) * 0.1 }}
                            className="glass-panel rounded-2xl p-6 md:p-8"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-maple-red/10 flex items-center justify-center flex-shrink-0">
                                    <section.icon className="w-6 h-6 text-maple-red" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>
                                    <div className="prose prose-invert prose-sm max-w-none">
                                        {section.content.split('\n').map((line, i) => {
                                            if (line.startsWith('•')) {
                                                return (
                                                    <p key={i} className="text-gray-300 my-1 ml-4">
                                                        {line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').split('<strong>').map((part, j) => {
                                                            if (part.includes('</strong>')) {
                                                                const [bold, rest] = part.split('</strong>');
                                                                return <span key={j}><strong className="text-white">{bold}</strong>{rest}</span>;
                                                            }
                                                            return part;
                                                        })}
                                                    </p>
                                                );
                                            }
                                            if (line.trim() === '') return null;
                                            return (
                                                <p key={i} className="text-gray-400 my-2">
                                                    {line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').split('<strong>').map((part, j) => {
                                                        if (part.includes('</strong>')) {
                                                            const [bold, rest] = part.split('</strong>');
                                                            return <span key={j}><strong className="text-white">{bold}</strong>{rest}</span>;
                                                        }
                                                        return part;
                                                    })}
                                                </p>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Governing Law */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-8 glass-panel rounded-2xl p-6 text-center"
                >
                    <Scale className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-white mb-2">Governing Law</h3>
                    <p className="text-gray-400 text-sm">
                        These terms are governed by the laws of the Province of Ontario, Canada.
                        Any disputes shall be resolved in the courts of Ontario.
                    </p>
                </motion.div>

                {/* Contact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-400 mb-4">
                        Questions about these terms? Contact us:
                    </p>
                    <a
                        href="mailto:legal@canadapath.ai"
                        className="inline-flex items-center gap-2 text-maple-red hover:text-white transition-colors"
                    >
                        <Mail className="w-5 h-5" />
                        legal@canadapath.ai
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsOfService;
