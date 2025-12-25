import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    MapPin, Mail, Phone, Clock, Send, CheckCircle2,
    Linkedin, Twitter, Youtube, ArrowRight, Shield,
    Users, Award, Heart, Globe, Building2, Sparkles
} from 'lucide-react';
import { cn } from '../utils/cn';

interface AboutContactProps {
    onNavigate?: (page: string) => void;
}

const teamMembers = [
    {
        name: "Dr. Emily Chen",
        role: "CEO & Founder",
        bio: "Former IRCC officer with 15+ years experience",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
    },
    {
        name: "Michael Roberts",
        role: "CTO",
        bio: "AI/ML expert, ex-Google engineer",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop"
    },
    {
        name: "Priya Sharma",
        role: "Head of Immigration",
        bio: "RCIC licensed, 500+ successful PR cases",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop"
    },
    {
        name: "James Wilson",
        role: "Head of Customer Success",
        bio: "Passionate about client experience",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop"
    }
];

const stats = [
    { value: "10,000+", label: "Successful PRs", icon: Users },
    { value: "98%", label: "Success Rate", icon: Award },
    { value: "4.9★", label: "Client Rating", icon: Heart },
    { value: "50+", label: "Countries Served", icon: Globe }
];

const AboutContact = ({ onNavigate }: AboutContactProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="min-h-screen bg-background-dark pt-20">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-primary/10 blur-[150px] rounded-full"></div>
                    <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-accent-gold/5 blur-[120px] rounded-full"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                            About CanadaPath AI
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                            Pioneering <span className="text-gradient-gold">AI-Powered</span> Immigration Solutions
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                            We're on a mission to democratize Canadian immigration by making expert guidance accessible to everyone, everywhere.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                    <stat.icon className="w-6 h-6 text-primary" />
                                </div>
                                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                CanadaPath AI was founded with a simple belief: everyone deserves access to accurate,
                                personalized immigration guidance. Traditional consultations can cost thousands of dollars
                                and take weeks to schedule. We're changing that.
                            </p>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Our AI analyzes your unique profile against 80+ immigration streams in seconds,
                                providing insights that previously required hours of expert consultation. But we
                                don't replace human experts—we empower them to focus on what matters most: your success.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                                    <Shield className="w-4 h-4 text-accent-gold" />
                                    <span className="text-sm text-gray-300">RCIC Licensed Partners</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                                    <Sparkles className="w-4 h-4 text-accent-gold" />
                                    <span className="text-sm text-gray-300">AI-Powered Accuracy</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-panel rounded-2xl p-8 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/10 blur-[60px] rounded-full"></div>
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-accent-gold" />
                                Our Values
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { title: "Transparency", desc: "No hidden fees, clear pricing, honest assessments" },
                                    { title: "Accuracy", desc: "AI trained on latest IRCC data & regulations" },
                                    { title: "Accessibility", desc: "Service available 24/7, anywhere in the world" },
                                    { title: "Empathy", desc: "We understand the stakes of your immigration journey" }
                                ].map((value, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                                        <CheckCircle2 className="w-5 h-5 text-accent-gold mt-0.5 shrink-0" />
                                        <div>
                                            <h4 className="text-white font-semibold text-sm">{value.title}</h4>
                                            <p className="text-gray-500 text-xs">{value.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            A diverse team of immigration experts, technologists, and customer success specialists.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, i) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-panel rounded-2xl p-6 text-center group hover:bg-white/5 transition-all"
                            >
                                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-white/10 group-hover:border-accent-gold/30 transition-colors">
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-white font-bold">{member.name}</h3>
                                <p className="text-accent-gold text-sm font-medium mb-2">{member.role}</p>
                                <p className="text-gray-500 text-xs">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20" id="contact">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-white mb-6">Get In Touch</h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Have questions? Our team is here to help. Reach out through any channel below
                                or fill out the form and we'll get back to you within 24 hours.
                            </p>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Office Location</h4>
                                        <p className="text-gray-400 text-sm">100 King Street West, Suite 5600<br />Toronto, ON M5X 1C9, Canada</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Email Us</h4>
                                        <a href="mailto:hello@canadapath.ai" className="text-accent-gold hover:text-yellow-400 transition-colors text-sm">
                                            hello@canadapath.ai
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Call Us</h4>
                                        <a href="tel:+14165551234" className="text-gray-400 hover:text-white transition-colors text-sm">
                                            +1 (416) 555-1234
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <Clock className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Business Hours</h4>
                                        <p className="text-gray-400 text-sm">Mon - Fri: 9:00 AM - 6:00 PM EST<br />AI Chat: 24/7 Available</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-3">
                                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all">
                                    <Twitter className="w-4 h-4" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all">
                                    <Youtube className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-panel rounded-2xl p-8"
                        >
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center py-12"
                                >
                                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                    <p className="text-gray-400 mb-6">We'll get back to you within 24 hours.</p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-sm text-accent-gold hover:text-yellow-400 transition-colors"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-all"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-all"
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-all"
                                                placeholder="+1 (xxx) xxx-xxxx"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Subject *</label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-primary/50 focus:outline-none transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="">Select topic</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="assessment">Assessment Help</option>
                                                <option value="consultation">Book Consultation</option>
                                                <option value="partnership">Partnership</option>
                                                <option value="feedback">Feedback</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message *</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-all resize-none"
                                            placeholder="Tell us how we can help you..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={cn(
                                            "w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all",
                                            isLoading
                                                ? "bg-gray-600 cursor-not-allowed"
                                                : "bg-gradient-to-r from-maple-red to-maple-dark hover:from-red-600 hover:to-red-800 shadow-lg shadow-maple-red/20"
                                        )}
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-primary/20 to-transparent">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
                    <p className="text-gray-400 mb-8">Take our free eligibility assessment and discover your best pathway to Canada.</p>
                    <button
                        onClick={() => onNavigate?.('assessment')}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-maple-red to-maple-dark hover:from-red-600 hover:to-red-800 text-white font-bold shadow-lg shadow-maple-red/30 transition-all group"
                    >
                        Start Free Assessment
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AboutContact;
