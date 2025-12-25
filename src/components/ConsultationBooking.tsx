import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, CheckCircle2, ChevronRight, ChevronLeft, Star, Verified, Languages, Video, ArrowRight, CalendarPlus, LayoutDashboard } from 'lucide-react';
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
                {/* Header */}
                <div className="flex flex-col gap-2 text-center md:text-left">
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

                            <div className="flex flex-col items-center text-center mt-4">
                                <div className="size-24 rounded-full border-2 border-primary/50 p-1 mb-4">
                                    <div className="size-full rounded-full bg-gray-700 overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Consultant" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <h3 className="text-white text-xl font-bold">Dr. Emily Chen, RCIC</h3>
                                <p className="text-gray-400 text-sm mt-1">Senior Immigration Consultant</p>
                                <div className="flex gap-2 mt-4 justify-center flex-wrap">
                                    <span className="bg-white/5 text-gray-300 text-xs px-2 py-1 rounded border border-white/10">Express Entry</span>
                                    <span className="bg-white/5 text-gray-300 text-xs px-2 py-1 rounded border border-white/10">Study Permit</span>
                                </div>
                            </div>

                            <div className="h-px w-full bg-white/5 my-2"></div>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-start gap-3">
                                    <Verified className="w-5 h-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-white text-sm font-semibold">200+ Successful Cases</p>
                                        <p className="text-gray-500 text-xs">Specializing in complex refusals</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Languages className="w-5 h-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-white text-sm font-semibold">English, Mandarin, French</p>
                                        <p className="text-gray-500 text-xs">Fluent communication</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Video className="w-5 h-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-white text-sm font-semibold">Video Call</p>
                                        <p className="text-gray-500 text-xs">Google Meet or Zoom</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Session Fee</span>
                                <span className="text-white text-lg font-bold">$150.00</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Calendar & Time Selection */}
                    <div className="lg:col-span-8 flex flex-col gap-6 order-1 lg:order-2">
                        <AnimatePresence mode="wait">
                            {step === 'select' ? (
                                <motion.div
                                    key="select"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="glass-panel rounded-2xl p-6 lg:p-8 flex flex-col gap-8 border-t-2 border-t-white/10"
                                >
                                    {/* Calendar Header */}
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                            <CalendarIcon className="w-5 h-5 text-primary" />
                                            Select Date & Time
                                        </h3>
                                        <div className="flex items-center gap-2 bg-black/20 rounded-lg p-1 border border-white/10">
                                            <button
                                                onClick={() => setWeekOffset(prev => Math.max(0, prev - 1))}
                                                disabled={weekOffset === 0}
                                                className="size-8 flex items-center justify-center hover:bg-white/5 rounded-md text-gray-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <span className="text-sm font-medium text-white px-2">
                                                {dates[0].toLocaleString('default', { month: 'long', year: 'numeric' })}
                                            </span>
                                            <button
                                                onClick={() => setWeekOffset(prev => Math.min(3, prev + 1))}
                                                disabled={weekOffset >= 3}
                                                className="size-8 flex items-center justify-center hover:bg-white/5 rounded-md text-gray-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Date Strip */}
                                    <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                                        {dates.map((d) => (
                                            <button
                                                key={d.toISOString()}
                                                onClick={() => setSelectedDate(d)}
                                                className={cn(
                                                    "flex flex-col items-center justify-center h-20 rounded-xl border transition-all duration-300 relative overflow-hidden",
                                                    selectedDate?.toDateString() === d.toDateString()
                                                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105 z-10"
                                                        : "bg-white/5 border-transparent text-gray-400 hover:bg-white/10 hover:text-white"
                                                )}
                                            >
                                                <span className="text-xs uppercase font-bold tracking-wider mb-1 opacity-70">
                                                    {d.toLocaleString('default', { weekday: 'short' })}
                                                </span>
                                                <span className="text-xl font-bold">{d.getDate()}</span>
                                                {selectedDate?.toDateString() === d.toDateString() && (
                                                    <div className="absolute bottom-1 w-1 h-1 bg-white rounded-full"></div>
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Time Slots */}
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                            <span className="text-sm font-medium text-gray-400">Available Slots (Eastern Time)</span>
                                            <span className="text-xs text-primary font-medium flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> 45 min
                                            </span>
                                        </div>

                                        <div className="space-y-4">
                                            {/* Morning */}
                                            <div>
                                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Morning</h4>
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                    {timeSlots.morning.map((t) => (
                                                        <button
                                                            key={t}
                                                            onClick={() => setSelectedTime(t)}
                                                            className={cn(
                                                                "py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-200 relative",
                                                                selectedTime === t
                                                                    ? "bg-primary/20 border-primary text-primary shadow-inner"
                                                                    : "bg-white/5 border-white/5 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20"
                                                            )}
                                                        >
                                                            {t}
                                                            {selectedTime === t && (
                                                                <span className="absolute -top-1.5 -right-1.5 size-4 bg-primary rounded-full text-white flex items-center justify-center text-[10px]">
                                                                    <CheckCircle2 className="w-3 h-3" />
                                                                </span>
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Afternoon */}
                                            <div>
                                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Afternoon</h4>
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                    {timeSlots.afternoon.map((t) => (
                                                        <button
                                                            key={t}
                                                            onClick={() => setSelectedTime(t)}
                                                            className={cn(
                                                                "py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-200 relative",
                                                                selectedTime === t
                                                                    ? "bg-primary/20 border-primary text-primary shadow-inner"
                                                                    : "bg-white/5 border-white/5 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20"
                                                            )}
                                                        >
                                                            {t}
                                                            {selectedTime === t && (
                                                                <span className="absolute -top-1.5 -right-1.5 size-4 bg-primary rounded-full text-white flex items-center justify-center text-[10px]">
                                                                    <CheckCircle2 className="w-3 h-3" />
                                                                </span>
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footer */}
                                    <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
                                        <div className="text-sm text-gray-400">
                                            {selectedDate && selectedTime ? (
                                                <span>Selected: <span className="text-white font-semibold">
                                                    {selectedDate.toLocaleString('default', { month: 'short', day: 'numeric' })}, {selectedTime}
                                                </span></span>
                                            ) : (
                                                <span>Please select a date and time</span>
                                            )}
                                        </div>
                                        <button
                                            onClick={handleBook}
                                            disabled={!selectedDate || !selectedTime}
                                            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-primary hover:bg-red-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-primary/30 transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Confirm Booking
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="confirm"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="glass-panel rounded-2xl p-8 lg:p-12 flex flex-col items-center text-center border-t-4 border-t-accent-gold"
                                >
                                    <div className="size-20 bg-accent-gold/20 rounded-full flex items-center justify-center border border-accent-gold/40 shadow-xl shadow-accent-gold/10 mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-accent-gold" />
                                    </div>

                                    <h3 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h3>
                                    <p className="text-gray-400 max-w-md mx-auto mb-8">
                                        Your consultation with Dr. Emily Chen has been scheduled. A confirmation email with the video link has been sent to you.
                                    </p>

                                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 w-full max-w-sm flex items-start gap-4 text-left mb-8">
                                        <div className="bg-white/5 p-3 rounded-lg text-gray-400">
                                            <CalendarIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold text-lg">
                                                {selectedDate?.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </p>
                                            <p className="text-accent-gold text-sm font-medium">{selectedTime} (Eastern Time)</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                                        <button className="flex-1 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-all flex items-center justify-center gap-2">
                                            <CalendarPlus className="w-4 h-4" />
                                            Add to Calendar
                                        </button>
                                        <button className="flex-1 px-4 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                                            <LayoutDashboard className="w-4 h-4" />
                                            Go to Dashboard
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => setStep('select')}
                                        className="mt-6 text-sm text-gray-500 hover:text-white transition-colors"
                                    >
                                        Book another session
                                    </button>
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
