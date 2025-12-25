import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Verified } from 'lucide-react';
import { cn } from '../utils/cn';

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Software Engineer",
        pathway: "OINP Tech Draw",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        quote: "CanadaPath AI predicted the OINP Tech Draw 3 days before it happened. I had my documents ready and got invited instantly!",
        stars: 5,
        crsBefore: 465,
        crsAfter: 512,
        timeline: "8 months"
    },
    {
        name: "Rahul Patel",
        role: "Data Scientist",
        pathway: "Express Entry (CEC)",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        quote: "The CRS calculator is insanely accurate. It even suggested a certificate course that bumped my score by 15 points.",
        stars: 5,
        crsBefore: 442,
        crsAfter: 478,
        timeline: "6 months"
    },
    {
        name: "Li Wei",
        role: "International Student",
        pathway: "Student Visa → PR",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
        quote: "I was confused about the new PGWP rules. The AI Assistant clarified everything in seconds. Highly recommended!",
        stars: 5,
        crsBefore: null,
        crsAfter: 489,
        timeline: "2 years"
    },
    {
        name: "Ahmed Hassan",
        role: "Healthcare Professional",
        pathway: "BC PNP Healthcare",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
        quote: "Being a nurse, I wasn't sure about my options. CanadaPath's BC Healthcare stream match was perfect - now I'm a PR!",
        stars: 5,
        crsBefore: 398,
        crsAfter: 998,
        timeline: "10 months"
    },
    {
        name: "Maria Santos",
        role: "Project Manager",
        pathway: "Alberta Express Entry",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
        quote: "I got my Alberta nomination with a CRS of just 380! The AI knew exactly which province would accept my profile.",
        stars: 5,
        crsBefore: 380,
        crsAfter: 980,
        timeline: "7 months"
    },
    {
        name: "James O'Connor",
        role: "Electrician",
        pathway: "SINP Trades",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
        quote: "As a tradesperson, I thought Express Entry wasn't for me. CanadaPath found the Saskatchewan trades pathway - game changer!",
        stars: 5,
        crsBefore: 345,
        crsAfter: 945,
        timeline: "9 months"
    }
];

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(testimonials.length / itemsPerPage);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalPages);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const visibleTestimonials = testimonials.slice(
        currentIndex * itemsPerPage,
        (currentIndex + 1) * itemsPerPage
    );

    return (
        <section className="py-24 relative overflow-hidden" id="testimonials">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-accent-gold/5 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[10%] left-[20%] w-[30%] h-[30%] bg-primary/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-xl">
                        <span className="inline-block py-1 px-3 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold text-xs font-bold uppercase tracking-widest mb-4">
                            Success Stories
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                            Trusted by <span className="text-gradient-gold">10,000+</span> Future Canadians
                        </h2>
                        <p className="text-gray-400">
                            Real stories from real people who achieved their Canadian dream with CanadaPath AI.
                        </p>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex items-center gap-3">
                        <div className="text-sm text-gray-500 mr-4">
                            <span className="text-white font-bold">{currentIndex + 1}</span> / {totalPages}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full border border-white/10 hover:bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                            aria-label="Previous testimonials"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full bg-gradient-to-r from-maple-red to-maple-dark hover:from-red-600 hover:to-red-800 flex items-center justify-center text-white transition-all shadow-lg shadow-maple-red/20"
                            aria-label="Next testimonials"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>

                {/* Testimonial Cards */}
                <div className="relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {visibleTestimonials.map((t, i) => (
                                <motion.div
                                    key={`${currentIndex}-${i}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-panel p-6 rounded-2xl relative group hover:bg-white/5 transition-all duration-300"
                                >
                                    {/* Quote Icon */}
                                    <Quote className="absolute top-4 right-4 w-8 h-8 text-white/5 group-hover:text-accent-gold/20 transition-colors duration-500" />

                                    {/* Stars */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(t.stars)].map((_, s) => (
                                            <Star key={s} className="w-4 h-4 fill-accent-gold text-accent-gold" />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <p className="text-gray-300 mb-6 leading-relaxed text-sm italic relative z-10">
                                        "{t.quote}"
                                    </p>

                                    {/* Stats Row */}
                                    {t.crsBefore && (
                                        <div className="flex items-center gap-4 mb-6 p-3 rounded-lg bg-white/5 border border-white/10">
                                            <div className="text-center flex-1">
                                                <p className="text-[9px] text-gray-500 uppercase tracking-wider">Before</p>
                                                <p className="text-lg font-bold text-gray-400">{t.crsBefore}</p>
                                            </div>
                                            <div className="text-accent-gold text-lg">→</div>
                                            <div className="text-center flex-1">
                                                <p className="text-[9px] text-gray-500 uppercase tracking-wider">After</p>
                                                <p className="text-lg font-bold text-accent-gold">{t.crsAfter}</p>
                                            </div>
                                            <div className="text-center flex-1 border-l border-white/10 pl-4">
                                                <p className="text-[9px] text-gray-500 uppercase tracking-wider">Timeline</p>
                                                <p className="text-sm font-bold text-white">{t.timeline}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Author */}
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div
                                                className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-white/10 group-hover:border-accent-gold/30 transition-colors"
                                                style={{ backgroundImage: `url(${t.image})` }}
                                            />
                                            <Verified className="absolute -bottom-1 -right-1 w-5 h-5 text-primary bg-background-dark rounded-full" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm flex items-center gap-1.5">
                                                {t.name}
                                            </h4>
                                            <p className="text-gray-500 text-xs">{t.role}</p>
                                            <p className="text-accent-gold text-[10px] font-bold uppercase tracking-wide mt-0.5">{t.pathway}</p>
                                        </div>
                                    </div>

                                    {/* Bottom Glow */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl"></div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all",
                                i === currentIndex
                                    ? "w-8 bg-accent-gold"
                                    : "bg-white/20 hover:bg-white/40"
                            )}
                            aria-label={`Go to page ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Trust Badges */}
                <div className="mt-16 pt-12 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                                <Verified className="w-6 h-6 text-green-500" />
                            </div>
                            <div className="text-left">
                                <p className="text-white font-bold">RCIC Partners</p>
                                <p className="text-xs text-gray-500">Licensed Consultants</p>
                            </div>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-white/10"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-3xl font-black text-white">4.9</div>
                            <div className="text-left">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-accent-gold text-accent-gold" />
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500">2,847 Reviews</p>
                            </div>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-white/10"></div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-xl">🇨🇦</span>
                            </div>
                            <div className="text-left">
                                <p className="text-white font-bold">10,000+</p>
                                <p className="text-xs text-gray-500">Successful PRs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
