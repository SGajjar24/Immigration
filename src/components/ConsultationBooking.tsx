import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, CheckCircle2, ChevronRight, ChevronLeft, Star, Verified, Languages, Video, ArrowRight, CalendarPlus, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';

const timeSlots = {
    morning: ['09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM'],
    afternoon: ['01:00 PM', '01:45 PM', '02:30 PM', '03:15 PM']
};

const ConsultationBooking = () => {
    const [step, setStep] = useState<'select' | 'confirm'>('select');
    const [weekOffset, setWeekOffset] = useState(0);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleBook = () => {
        if (selectedDate && selectedTime) {
            setStep('confirm');
        }
    };

    // Generate 7 days based on week offset
    const dates = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + 1 + i + (weekOffset * 7));
        return d;
    });

    return (
        <section className="py-12 px-4 md:px-8 max-w-[1440px] mx-auto relative overflow-hidden">
            {/* Ambient Glows */}
            <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full relative z-10 flex flex-col gap-8">
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                        <span className="px-2 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase">Demo Mode</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Schedule Consultation</h2>
                    <p className="text-gray-400 text-lg font-light">Secure your 1-on-1 session with our top immigration experts.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Consultant Profile */}
                    <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
                        <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden group border-t-2 border-t-white/10">
                            {/* Consultant Badge */}
                            <div className="absolute top-4 right-4 bg-accent-gold/10 border border-accent-gold/20 text-accent-gold text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current" /> Top Rated
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                                        alt="Dr. Emily Chen"
                                        className="w-20 h-20 rounded-2xl object-cover ring-2 ring-primary/20"
                                    />
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-background-dark" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <h3 className="font-bold text-white text-lg">Dr. Emily Chen</h3>
                                        <Verified className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <p className="text-primary text-sm font-bold">RCIC - IRB Specialist</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Star className="w-3 h-3 text-accent-gold fill-current" />
                                        <span className="text-xs text-gray-300 font-medium">4.9 (1,240+ reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px w-full bg-white/5" />

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                    <Languages className="w-4 h-4 text-accent-gold" />
                                    <span>English, Mandarin, Cantonese</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                    <Video className="w-4 h-4 text-accent-gold" />
                                    <span>Zoom, Google Meet, WhatsApp</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                                <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest text-center">Next Available Slot</p>
                                <p className="text-sm font-bold text-white text-center">Dec 30, 2025 • 10:30 AM</p>
                            </div>
                        </div>

                        {/* Recent Reviews Summary */}
                        <div className="glass-panel rounded-2xl p-6 hidden lg:flex flex-col gap-4">
                            <h4 className="text-sm font-bold text-white uppercase tracking-widest text-gray-400 text-[10px]">Client Feedback</h4>
                            <div className="space-y-4">
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-accent-gold fill-current" />)}
                                    </div>
                                    <p className="text-xs text-gray-300 italic">"Emily made the complex EE process feel simple. Got my ITA in 4 months!"</p>
                                    <span className="text-[10px] text-gray-500 font-bold">- Marcus J. (Tech Manager)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Dynamic Steps */}
                    <div className="lg:col-span-8 order-1 lg:order-2">
                        <AnimatePresence mode="wait">
                            {step === 'select' ? (
                                <motion.div
                                    key="select"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex flex-col gap-6"
                                >
                                    {/* Date Selection Strip */}
                                    <div className="glass-panel p-4 rounded-2xl flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-white font-bold flex items-center gap-2">
                                                <CalendarIcon className="w-5 h-5 text-accent-gold" /> Choose a Date
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => setWeekOffset(prev => Math.max(0, prev - 1))}
                                                    disabled={weekOffset === 0}
                                                    className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-30 transition-all"
                                                >
                                                    <ChevronLeft className="w-5 h-5 text-white" />
                                                </button>
                                                <span className="text-xs font-bold text-gray-400 w-24 text-center">Dec 2025</span>
                                                <button
                                                    onClick={() => setWeekOffset(prev => prev + 1)}
                                                    className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-all"
                                                >
                                                    <ChevronRight className="w-5 h-5 text-white" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-7 gap-2">
                                            {dates.map((date, i) => {
                                                const isSelected = selectedDate?.toDateString() === date.toDateString();
                                                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                                                return (
                                                    <button
                                                        key={i}
                                                        onClick={() => setSelectedDate(date)}
                                                        className={cn(
                                                            "flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-300",
                                                            isSelected
                                                                ? "bg-primary border-primary shadow-lg shadow-primary/20 scale-105"
                                                                : isWeekend
                                                                    ? "border-white/5 opacity-40 cursor-not-allowed"
                                                                    : "border-white/10 hover:border-accent-gold hover:bg-white/5"
                                                        )}
                                                    >
                                                        <span className={cn("text-[10px] font-bold uppercase tracking-widest", isSelected ? "text-white/80" : "text-gray-500")}>
                                                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                                        </span>
                                                        <span className={cn("text-lg font-black", isSelected ? "text-white" : "text-gray-300")}>
                                                            {date.getDate()}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Time Slots */}
                                    <div className="glass-panel p-6 rounded-2xl flex flex-col gap-6 min-h-[300px]">
                                        <div className="flex items-center gap-2 text-white font-bold">
                                            <Clock className="w-5 h-5 text-accent-gold" /> Available Slots
                                        </div>

                                        {!selectedDate ? (
                                            <div className="flex-grow flex flex-col items-center justify-center text-center gap-4 opacity-50">
                                                <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center">
                                                    <CalendarIcon className="w-6 h-6 text-gray-600" />
                                                </div>
                                                <p className="text-gray-500 text-sm">Please select a date to view available times</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                <div>
                                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Morning Sessions</p>
                                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                        {timeSlots.morning.map(time => (
                                                            <button
                                                                key={time}
                                                                onClick={() => setSelectedTime(time)}
                                                                className={cn(
                                                                    "py-2.5 rounded-lg text-sm font-bold border transition-all",
                                                                    selectedTime === time
                                                                        ? "bg-accent-gold text-background-dark border-accent-gold shadow-lg shadow-accent-gold/20"
                                                                        : "border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/5"
                                                                )}
                                                            >
                                                                {time}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Afternoon Sessions</p>
                                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                        {timeSlots.afternoon.map(time => (
                                                            <button
                                                                key={time}
                                                                onClick={() => setSelectedTime(time)}
                                                                className={cn(
                                                                    "py-2.5 rounded-lg text-sm font-bold border transition-all",
                                                                    selectedTime === time
                                                                        ? "bg-accent-gold text-background-dark border-accent-gold shadow-lg shadow-accent-gold/20"
                                                                        : "border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/5"
                                                                )}
                                                            >
                                                                {time}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-auto pt-6 flex items-center justify-between">
                                            <p className="text-gray-400 text-xs italic">* Duration: 45 minutes intensive profile review</p>
                                            <button
                                                onClick={handleBook}
                                                disabled={!selectedDate || !selectedTime}
                                                className="btn-primary group py-3 px-10 rounded-xl"
                                            >
                                                <span>Confirm Selection</span>
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="confirm"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center gap-8 border-t-4 border-t-green-500/50"
                                >
                                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-bold text-white">Consultation Reserved</h3>
                                        <p className="text-gray-400 max-w-md mx-auto">
                                            Your session with <span className="text-white font-bold">Dr. Emily Chen</span> has been provisionally scheduled. A confirmation link has been sent to your registered email.
                                        </p>
                                    </div>

                                    <div className="w-full max-w-sm grid grid-cols-2 gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                                        <div className="text-left">
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Date</p>
                                            <p className="text-sm font-bold text-white">{selectedDate?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                        </div>
                                        <div className="text-left border-l border-white/10 pl-4">
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Time (EST)</p>
                                            <p className="text-sm font-bold text-white">{selectedTime}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md pt-4">
                                        <button className="flex-1 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-all flex items-center justify-center gap-2">
                                            <CalendarPlus className="w-4 h-4" />
                                            Add to Calendar
                                        </button>
                                        <button
                                            onClick={() => navigate('/dashboard')}
                                            className="flex-1 px-4 py-3 rounded-lg btn-primary flex items-center justify-center gap-2"
                                        >
                                            <LayoutDashboard className="w-4 h-4" />
                                            Go to Dashboard
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultationBooking;
