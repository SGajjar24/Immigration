import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, AlertTriangle, Mail } from 'lucide-react';

const sections = [
    {
        icon: Database,
        title: "Information We Collect",
        content: `We collect information you provide directly to us, including:

• **Account Information**: When you create an account, we collect your name, email address, and password.
• **Profile Data**: Information you provide for immigration assessments, including age, education, work experience, and language test scores.
• **Assessment Results**: Your CRS scores, eligibility results, and recommended pathways.
• **Usage Data**: Information about how you interact with our platform, including pages visited and features used.
• **Device Information**: Browser type, operating system, and IP address for security and analytics purposes.`
    },
    {
        icon: Eye,
        title: "How We Use Your Information",
        content: `We use the information we collect to:

• Provide personalized immigration assessments and recommendations
• Calculate your CRS score and eligibility for various programs
• Improve and optimize our platform and services
• Send you updates about your immigration profile (with your consent)
• Respond to your inquiries and provide customer support
• Detect and prevent fraud or abuse
• Comply with legal obligations

We do **not** sell your personal information to third parties.`
    },
    {
        icon: Lock,
        title: "Data Storage & Security",
        content: `Your data security is our priority:

• **Encryption**: All data is encrypted in transit (TLS 1.3) and at rest (AES-256)
• **Secure Infrastructure**: We use Google Cloud Platform with enterprise-grade security
• **Access Controls**: Strict access controls limit who can view your data
• **Regular Audits**: We conduct regular security assessments and audits
• **Data Retention**: We retain your data for as long as your account is active
• **Data Location**: Your data is stored in secure data centers in North America`
    },
    {
        icon: UserCheck,
        title: "Your Rights & Choices",
        content: `You have the following rights regarding your data:

• **Access**: Request a copy of your personal data
• **Correction**: Update or correct inaccurate information
• **Deletion**: Request deletion of your account and data
• **Export**: Download your data in a portable format
• **Opt-out**: Unsubscribe from marketing communications
• **Withdraw Consent**: Revoke consent for data processing

To exercise these rights, contact us at privacy@canadapath.ai`
    },
    {
        icon: Shield,
        title: "Third-Party Services",
        content: `We use trusted third-party services:

• **Firebase (Google)**: Authentication and database services
• **Analytics**: Anonymous usage statistics to improve our platform
• **Payment Processors**: Secure payment handling (we don't store payment card data)

These services have their own privacy policies and are GDPR-compliant.`
    },
    {
        icon: AlertTriangle,
        title: "Important Notices",
        content: `Please note:

• This platform provides information only and is not legal advice
• We are not affiliated with IRCC or the Canadian government
• Immigration decisions should be made with licensed consultants
• We may update this policy; changes will be posted here
• By using CanadaPath AI, you agree to this Privacy Policy`
    }
];

export const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background-dark pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
                        <Shield className="w-8 h-8 text-primary-light" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Your privacy matters to us. This policy explains how we collect, use, and protect your personal information.
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                        Last updated: January 2025
                    </p>
                </motion.div>

                {/* Sections */}
                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-panel rounded-2xl p-6 md:p-8"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <section.icon className="w-6 h-6 text-primary-light" />
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

                {/* Contact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-400 mb-4">
                        Questions about this policy? Contact our privacy team:
                    </p>
                    <a
                        href="mailto:privacy@canadapath.ai"
                        className="inline-flex items-center gap-2 text-primary-light hover:text-white transition-colors"
                    >
                        <Mail className="w-5 h-5" />
                        privacy@canadapath.ai
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
