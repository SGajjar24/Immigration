import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Mic, Minimize2, Maximize2, Bot, Sparkles } from 'lucide-react';
import { cn } from '../utils/cn';

// Immigration Knowledge Base for intelligent responses
const IMMIGRATION_KB: Record<string, string> = {
    // CRS & Express Entry
    'crs': 'The Comprehensive Ranking System (CRS) scores candidates out of 1,200 points. Core factors include age (max 110), education (max 150), language (max 160), and work experience (max 80). Additional factors can add up to 600 more points.',
    'express entry': 'Express Entry manages 3 federal programs: Federal Skilled Worker (FSW), Canadian Experience Class (CEC), and Federal Skilled Trades (FST). Draws occur approximately every 2 weeks, with recent cutoffs ranging from 430-530 points.',
    'cutoff': 'Recent Express Entry draw cutoffs have ranged from 430-530 CRS points. Category-based draws (STEM, Healthcare, French) often have lower cutoffs around 350-450 points.',
    'proof of funds': 'As of 2024, proof of funds requirements are: 1 person = $14,690 CAD, 2 people = $18,288 CAD, 3 people = $22,483 CAD, 4 people = $27,297 CAD. These amounts are updated annually.',
    'processing time': 'Current Express Entry processing is approximately 6 months. Study Permits take 4-16 weeks depending on country. Work Permits (LMIA-based) take 2-4 months.',

    // Provincial Nominees
    'pnp': 'Provincial Nominee Programs (PNP) are immigration pathways offered by Canadian provinces. Each province has its own streams and requirements. Popular ones include Ontario OINP, BC PNP, Alberta AAIP, and Saskatchewan SINP.',
    'ontario': 'Ontario Immigrant Nominee Program (OINP) offers streams like Human Capital Priorities (Tech Draws), French-Speaking Skilled Worker, and Masters/PhD Graduate streams. Tech Draws occur regularly with lower CRS cutoffs.',
    'bc': 'BC PNP offers Tech and Healthcare streams with weekly draws. The Tech stream targets 29 in-demand occupations with expedited processing. BCPNP adds 600 points to your CRS score if nominated.',
    'alberta': 'Alberta Advantage Immigration Program (AAIP) includes Alberta Opportunity Stream (requires Alberta job offer) and Alberta Express Entry Stream. Recent draws have had scores as low as 300 CRS.',

    // Study & Work
    'study permit': 'Study Permit requirements: acceptance letter from DLI, proof of funds ($20,635/year or $833/month), clean background, and medical exam. Processing times vary from 4-16 weeks by country.',
    'pgwp': 'Post-Graduation Work Permit (PGWP) validity depends on program length: 8+ months = up to 3 years, under 8 months = not eligible. Must apply within 180 days of receiving final marks.',
    'work permit': 'Work Permit types include LMIA-based (employer-sponsored), LMIA-exempt (intra-company transfers, CUSMA), and Open Work Permits (spouses of skilled workers, PGWP holders).',
    'lmia': 'Labour Market Impact Assessment (LMIA) is required for most employer-sponsored work permits. Processing takes 2-4 months. Employers must prove no Canadians available for the role.',

    // General
    'eligibility': 'I can help assess your eligibility! Key factors include: age (18-35 ideal), education level, language scores (IELTS/CELPIP/TEF), work experience, and any Canadian connections. Would you like to start an assessment?',
    'ielts': 'For Express Entry, you need minimum CLB 7 for FSW (IELTS 6.0 each band). Higher scores significantly boost CRS: CLB 9 (IELTS 7.0) can add 30+ points compared to CLB 7.',
    'age': 'Age scoring in CRS: Maximum points (110) at ages 20-29, gradual decrease after 30, significant drop after 35, minimal points after 45. Each year over 30 loses approximately 5-10 points.',
    'education': 'Education Credential Assessment (ECA) is required for foreign degrees. WES, IQAS, or other designated organizations can assess your credentials. Processing takes 4-8 weeks.',
    'spouse': 'Spouse/partner factors can add up to 40 CRS points for their language, education, and Canadian work experience. Open Work Permits are available for spouses of skilled workers.',

    // Default responses
    'hello': 'Hello! 👋 Welcome to CanadaPath AI. I specialize in Canadian immigration guidance. How can I assist you today?',
    'hi': 'Hi there! 👋 I\'m your CanadaPath AI assistant. I can help with Express Entry, PNP programs, study permits, and more. What would you like to know?',
    'thanks': 'You\'re welcome! 🍁 If you have any more questions about Canadian immigration, I\'m here to help. Good luck with your immigration journey!',
    'default': 'That\'s a great question! For detailed guidance on this topic, I recommend speaking with one of our RCIC-certified consultants. Would you like me to help you book a consultation?'
};

const QUICK_PROMPTS = [
    'What is my CRS score?',
    'Express Entry requirements',
    'Processing times',
    'Study Permit info',
    'PNP options',
    'Proof of funds'
];

const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Check for keyword matches
    for (const [keyword, response] of Object.entries(IMMIGRATION_KB)) {
        if (lowerMessage.includes(keyword)) {
            return response;
        }
    }

    // Check for question patterns
    if (lowerMessage.includes('how much') || lowerMessage.includes('cost')) {
        return 'Immigration costs vary by pathway. Express Entry government fees are $1,365 CAD per adult. Add biometrics ($85), medical exam (~$200-300), and ECA (~$200). Total estimate: $2,000-2,500 CAD per person, excluding legal fees.';
    }

    if (lowerMessage.includes('how long') || lowerMessage.includes('time')) {
        return IMMIGRATION_KB['processing time'];
    }

    if (lowerMessage.includes('score') || lowerMessage.includes('point')) {
        return IMMIGRATION_KB['crs'];
    }

    return IMMIGRATION_KB['default'];
};

interface Message {
    id: number;
    type: 'user' | 'ai';
    text: string;
}

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimised, setIsMinimised] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<Message[]>([
        { id: 1, type: 'ai', text: "Hello! 👋 I'm your CanadaPath AI assistant. I can provide instant guidance on Express Entry, CRS scores, Provincial Nominee Programs, and more. How can I help you today?" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isTyping]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newUserMsg: Message = { id: Date.now(), type: 'user', text: inputValue };
        setMessages(prev => [...prev, newUserMsg]);
        const userQuery = inputValue;
        setInputValue("");
        setIsTyping(true);

        // Simulate AI thinking time (realistic delay)
        const typingDelay = 1000 + Math.random() * 1500;
        setTimeout(() => {
            const aiResponse = getAIResponse(userQuery);
            const newAiMsg: Message = { id: Date.now() + 1, type: 'ai', text: aiResponse };
            setMessages(prev => [...prev, newAiMsg]);
            setIsTyping(false);
        }, typingDelay);
    };

    const handleQuickPrompt = (prompt: string) => {
        setInputValue(prompt);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={cn(
                            "pointer-events-auto bg-background-dark/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right",
                            isMinimised ? "w-72 h-16 rounded-2xl" : "w-[90vw] md:w-[420px] h-[650px] max-h-[85vh] rounded-2xl"
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-primary/20 to-transparent cursor-pointer" onClick={() => isMinimised && setIsMinimised(false)}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/30">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                                        CanadaPath AI
                                        <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
                                    </h3>
                                    {!isMinimised && (
                                        <p className="text-[10px] text-accent-gold flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                            Online • Avg. response: 2s
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsMinimised(!isMinimised); }}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                    aria-label={isMinimised ? "Maximize chat" : "Minimize chat"}
                                >
                                    {isMinimised ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                    aria-label="Close chat"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        {!isMinimised && (
                            <>
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                                    {messages.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={cn("flex gap-3 max-w-[90%]", msg.type === 'user' ? "ml-auto flex-row-reverse" : "")}
                                        >
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/10",
                                                msg.type === 'ai' ? "bg-gradient-to-br from-primary to-blue-600 text-white" : "bg-white/5 text-gray-300"
                                            )}>
                                                {msg.type === 'ai' ? <Bot className="w-4 h-4" /> : <div className="text-xs font-bold">ME</div>}
                                            </div>
                                            <div className={cn(
                                                "p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm",
                                                msg.type === 'ai'
                                                    ? "bg-primary/20 border border-primary/20 text-gray-100 rounded-tl-sm"
                                                    : "bg-white/10 border border-white/5 text-white rounded-tr-sm"
                                            )}>
                                                {msg.text}
                                            </div>
                                        </motion.div>
                                    ))}
                                    {isTyping && (
                                        <div className="flex gap-3 max-w-[85%]">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shrink-0 border border-white/10 text-white">
                                                <Bot className="w-4 h-4" />
                                            </div>
                                            <div className="p-4 rounded-2xl rounded-tl-sm bg-primary/20 border border-primary/20 flex items-center gap-1.5">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Quick Prompts */}
                                <div className="px-4 pb-2">
                                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                                        {QUICK_PROMPTS.map(prompt => (
                                            <button
                                                key={prompt}
                                                onClick={() => handleQuickPrompt(prompt)}
                                                className="shrink-0 px-3 py-1.5 rounded-full bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/30 text-[11px] text-gray-300 hover:text-white transition-all whitespace-nowrap"
                                            >
                                                {prompt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer Input */}
                                <div className="p-4 bg-white/5 border-t border-white/10">
                                    <div className="relative">
                                        <input
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                            placeholder="Ask about immigration..."
                                            className="w-full bg-black/30 border border-white/10 rounded-xl pl-4 pr-20 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                                            aria-label="Type your message"
                                        />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                            <button
                                                className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors"
                                                aria-label="Voice input"
                                            >
                                                <Mic className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={handleSend}
                                                className="p-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors shadow-lg shadow-primary/30"
                                                aria-label="Send message"
                                            >
                                                <Send className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-center text-[9px] text-gray-600 mt-2">
                                        AI guidance is not legal advice. Consult an RCIC for official advice.
                                    </p>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "pointer-events-auto w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group border",
                    isOpen
                        ? "bg-background-dark border-white/10 text-gray-400 hover:text-white"
                        : "bg-gradient-to-br from-primary to-blue-600 border-primary/50 text-white hover:shadow-primary/50 hover:shadow-xl"
                )}
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 fill-current" />}
                </motion.div>

                {!isOpen && (
                    <>
                        <span className="absolute top-0 right-0 w-4 h-4 bg-accent-red border-2 border-background-dark rounded-full flex items-center justify-center text-[8px] font-bold">1</span>
                        <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping pointer-events-none"></span>
                    </>
                )}
            </motion.button>
        </div>
    );
};

export default ChatWidget;
