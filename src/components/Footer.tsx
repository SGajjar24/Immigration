import { Link } from 'react-router-dom';
import {
    ExternalLink,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Youtube,
    Shield,
    Award
} from 'lucide-react';
import Logo from './Logo';

const footerLinks = {
    services: [
        { label: "Free Assessment", href: "/assessment" },
        { label: "CRS Calculator", href: "/calculator" },
        { label: "Express Entry Hub", href: "/express-entry" },
        { label: "Provincial Programs", href: "/pathways" },
        { label: "Document Checklist", href: "/documents" }
    ],
    company: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/about#contact" },
        { label: "Resources", href: "/resources" },
        { label: "Blog", href: "/blog" }
    ],
    legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Disclaimer", href: "/disclaimer" }
    ]
};

const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" }
];

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="footer" className="bg-background-dark border-t border-white/5">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Logo className="h-10 mb-6" />
                        <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
                            AI-powered immigration guidance helping thousands achieve their Canadian dream.
                            Get personalized pathways, accurate CRS scores, and expert insights.
                        </p>

                        {/* Trust Badges */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Shield className="w-4 h-4 text-success" />
                                <span>Secure & Private</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Award className="w-4 h-4 text-accent-gold" />
                                <span>Trusted Platform</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Services</h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* ICCRC Disclaimer */}
            <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="glass-card rounded-xl p-4 bg-primary/5">
                        <p className="text-xs text-gray-500 leading-relaxed">
                            <strong className="text-gray-400">Important Disclaimer:</strong> CanadaPath AI is an information platform and does not provide legal immigration advice.
                            We are not a law firm, not licensed immigration consultants, and not affiliated with Immigration, Refugees and Citizenship Canada (IRCC) or the
                            College of Immigration and Citizenship Consultants (CICC). The information provided is for educational purposes only.
                            For official immigration advice, please consult a licensed immigration consultant (RCIC) or lawyer.
                            <a
                                href="https://college-ic.ca/find-an-rcic"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-light hover:text-white ml-1 inline-flex items-center gap-1"
                            >
                                Find an RCIC <ExternalLink className="w-3 h-3" />
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-500 text-sm">
                            © {currentYear} CanadaPath AI. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                            <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
