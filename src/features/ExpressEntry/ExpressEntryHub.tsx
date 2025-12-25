import {
    LayoutDashboard,
    Calculator,
    CheckSquare,
    MessageSquare,
    BarChart3,
    Settings,
    CheckCircle,
    Verified,
    AlertTriangle,
    ArrowRight,
    ArrowUpRight,
    Briefcase,
    Globe,
    GraduationCap,
    ChevronRight,
    Diamond
} from 'lucide-react';
import { cn } from '../../utils/cn';

const ExpressEntryHub = () => {
    const tabs = ['Federal Skilled Worker', 'Canadian Experience Class', 'Federal Skilled Trades', 'PNP'];
    const activeTab = 'Federal Skilled Worker';

    return (
        <div className="min-h-screen bg-background-dark text-white font-body selection:bg-primary selection:text-white flex flex-col">
            {/* Top Navigation Bar - Keeping it local to the hub for now or assume global nav exists */}
            {/* Assuming Global Navbar is used, but this hub has specific sub-nav elements in design. 
                For strict adherence to design 'code.html', I will implement the Hub's structure.
            */}

            <div className="flex-1 max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row gap-6 p-4 lg:p-8">
                {/* Left Sidebar */}
                <aside className="w-full lg:w-64 hidden md:flex flex-col gap-6 sticky top-24 h-fit">
                    {/* Mini Profile */}
                    <div className="glass-panel p-4 rounded-xl flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-inner">JD</div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">CRS Score</p>
                            <p className="text-lg font-bold text-white flex items-center gap-1">
                                482 <span className="text-xs font-normal text-green-400">▲ 2</span>
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-2">
                        {[
                            { icon: LayoutDashboard, label: 'Dashboard', active: true },
                            { icon: Calculator, label: 'CRS Calculator' },
                            { icon: CheckSquare, label: 'Document Checklist' },
                            { icon: MessageSquare, label: 'Community Forum' },
                            { icon: BarChart3, label: 'Score Analysis' },
                        ].map((item) => (
                            <button
                                key={item.label}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                                    item.active
                                        ? "bg-primary/20 border border-primary/30 text-white shadow-[0_0_15px_rgba(31,59,97,0.3)]"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5", item.active ? "text-accent-gold" : "text-current")} />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-2 border-t border-white/10 pt-4">
                        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors w-full text-sm font-medium">
                            <Settings className="w-5 h-5" />
                            Settings
                        </button>
                    </div>

                    {/* Pro Plan Promo */}
                    <div className="mt-4 glass-panel p-4 rounded-xl relative overflow-hidden group cursor-pointer border border-accent-gold/20">
                        <div className="absolute inset-0 bg-gradient-to-tr from-accent-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2 text-accent-gold">
                                <Diamond className="w-4 h-4 fill-current" />
                                <span className="text-xs font-bold uppercase">Pro Plan</span>
                            </div>
                            <p className="text-sm text-gray-300 mb-3">Get detailed draw predictions and document review.</p>
                            <button className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/10 transition-colors">
                                Upgrade Now
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0 flex flex-col gap-8">
                    {/* Welcome / Hero */}
                    <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold border border-green-500/30 mb-3">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    Profile Active in Pool
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">Welcome Back, John</h2>
                                <p className="text-gray-300 max-w-xl text-sm leading-relaxed">
                                    Your profile is currently active. The next predicted draw for <strong className="text-white">Federal Skilled Worker</strong> is in <span className="text-accent-gold">3 days</span>. Ensure your employment records are up to date to maximize your CRS score.
                                </p>
                            </div>
                            <div className="flex gap-3 shrink-0">
                                <button className="px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-colors">
                                    Update Profile
                                </button>
                                <button className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-light text-white font-medium text-sm shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                                    View Next Steps
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-white/10">
                        <div className="flex gap-8 overflow-x-auto pb-1 no-scrollbar">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    className={cn(
                                        "pb-3 border-b-2 text-sm whitespace-nowrap transition-colors",
                                        activeTab === tab
                                            ? "border-accent-gold text-white font-semibold"
                                            : "border-transparent text-gray-400 hover:text-white font-medium"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chart & Eligibility Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        {/* Chart Area */}
                        <div className="xl:col-span-2 glass-panel p-6 rounded-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-white">Score Trend Analysis</h3>
                                <div className="flex bg-white/5 rounded-lg p-0.5">
                                    {['6M', '1Y', 'All'].map((p, i) => (
                                        <button key={p} className={cn(
                                            "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                                            i === 0 ? "bg-white/10 text-white shadow-sm" : "text-gray-400 hover:text-white"
                                        )}>
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* CSS Chart */}
                            <div className="h-64 w-full flex items-end justify-between gap-2 px-2 pb-2 border-b border-l border-white/10 relative">
                                {/* Grid Lines */}
                                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                                    {[...Array(5)].map((_, i) => <div key={i} className="border-t border-white w-full h-0"></div>)}
                                </div>

                                {/* Bars */}
                                {[
                                    { val: 481, h: '40%' }, { val: 489, h: '55%' }, { val: 483, h: '45%' },
                                    { val: 496, h: '65%' }, { val: 491, h: '60%' },
                                    { val: 524, h: '85%', active: true }
                                ].map((bar, i) => (
                                    <div key={i} className="w-full max-w-[40px] flex flex-col justify-end h-full gap-2 z-10 group cursor-pointer">
                                        <div
                                            className={cn(
                                                "w-full rounded-t-sm transition-all relative",
                                                bar.active
                                                    ? "bg-gradient-to-t from-primary/50 to-accent-gold shadow-[0_0_15px_rgba(225,173,1,0.3)]"
                                                    : "bg-white/10 hover:bg-primary/40"
                                            )}
                                            style={{ height: bar.h }}
                                        >
                                            <div className={cn(
                                                "absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity",
                                                bar.active ? "text-accent-gold font-bold opacity-100" : "text-white"
                                            )}>
                                                {bar.val}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-gray-500 px-2">
                                <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span className="text-accent-gold font-bold">Oct</span>
                            </div>
                        </div>

                        {/* Eligibility Mini Card */}
                        <div className="xl:col-span-1 glass-panel p-6 rounded-2xl flex flex-col justify-between bg-gradient-to-br from-primary/20 to-transparent">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-primary/30 rounded-lg">
                                        <Verified className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">Eligibility Check</h3>
                                </div>
                                <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                                    Based on recent trends, your current score of <strong>482</strong> is competitive for category-based draws but may require improvement for general draws.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                                    <span className="text-gray-400">Education</span>
                                    <span className="text-green-400 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Maxed</span>
                                </div>
                                <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                                    <span className="text-gray-400">Language</span>
                                    <span className="text-accent-gold flex items-center gap-1"><AlertTriangle className="w-4 h-4" /> Improve</span>
                                </div>
                                <button className="w-full mt-4 py-2.5 rounded-lg bg-white text-primary-light font-bold text-sm hover:bg-gray-100 transition-colors">
                                    Simulate Improvements
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Program Requirements */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Program Requirements</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { icon: Briefcase, title: 'Work Experience', text: 'Must have 1 year of continuous full-time (or equivalent) paid work experience in the last 10 years.', color: 'border-l-primary' },
                                { icon: Globe, title: 'Language Skills', text: 'Minimum CLB 7 in all four abilities for FSW. Higher scores significantly boost CRS ranking.', color: 'border-l-accent-gold' },
                                { icon: GraduationCap, title: 'Education', text: 'Secondary education required. ECA report needed for foreign degrees.', color: 'border-l-gray-500' },
                            ].map((card, i) => (
                                <div key={i} className={cn("glass-panel p-5 rounded-xl border-l-4 hover:bg-white/5 transition-colors group cursor-pointer", card.color)}>
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white">
                                            <card.icon className="w-5 h-5" />
                                        </div>
                                        <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <h4 className="font-bold text-white mb-1">{card.title}</h4>
                                    <p className="text-xs text-gray-400 leading-relaxed">{card.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                {/* Right Sidebar (Live Data) */}
                <aside className="w-full lg:w-80 flex flex-col gap-6 sticky top-24 h-fit">
                    {/* Live Results Widget */}
                    <div className="glass-panel rounded-xl overflow-hidden shadow-lg shadow-black/20">
                        <div className="bg-primary/20 p-4 border-b border-white/10 flex justify-between items-center">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Latest Draw</h3>
                            <span className="animate-pulse w-2 h-2 rounded-full bg-accent-red"></span>
                        </div>
                        <div className="p-6 text-center">
                            <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">CRS Score Cut-off</p>
                            <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#E1AD01] mb-2 drop-shadow-sm">524</h2>
                            <div className="inline-block bg-white/5 rounded px-2 py-1 text-xs text-gray-300 mb-6">
                                Draw #273 • General
                            </div>
                            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                                <div className="text-left">
                                    <p className="text-[10px] text-gray-500 uppercase">Date</p>
                                    <p className="text-sm font-semibold text-white">Oct 24, 2023</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-500 uppercase">Invites</p>
                                    <p className="text-sm font-semibold text-white">3,000</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-accent-red/10 p-3 text-center border-t border-accent-red/20">
                            <button className="text-xs font-bold text-accent-red hover:text-red-400 transition-colors flex items-center justify-center gap-1 mx-auto">
                                View Full Analysis <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* News Feed */}
                    <div>
                        <div className="flex items-center justify-between mb-4 px-1">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Latest News</h3>
                            <button className="text-xs text-primary-light hover:text-white transition-colors">View All</button>
                        </div>
                        <div className="flex flex-col gap-3">
                            {[
                                { title: 'IRCC announces new category-based selection for transport', time: '2 hours ago', img: 'https://images.unsplash.com/photo-1542296332-2e44a403d21e?q=80&w=200&auto=format&fit=crop' },
                                { title: 'Ontario PNP draw invites 1,200 tech workers', time: '1 day ago', img: 'https://images.unsplash.com/photo-1506509000-84c472c57e60?q=80&w=200&auto=format&fit=crop' },
                                { title: 'Understanding the new Proof of Funds requirements', time: '3 days ago', img: 'https://images.unsplash.com/photo-1628108502570-55e109d30005?q=80&w=200&auto=format&fit=crop' }
                            ].map((news, i) => (
                                <div key={i} className="glass-panel p-3 rounded-lg flex gap-3 hover:bg-white/5 transition-colors group cursor-pointer">
                                    <div className="w-12 h-12 rounded bg-cover bg-center shrink-0 opacity-80 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: `url(${news.img})` }}></div>
                                    <div className="flex flex-col justify-center">
                                        <h5 className="text-xs font-bold text-white leading-tight mb-1 line-clamp-2 mix-blend-screen">{news.title}</h5>
                                        <p className="text-[10px] text-gray-500">{news.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ExpressEntryHub;
