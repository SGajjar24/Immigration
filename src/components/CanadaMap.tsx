import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, Lightbulb, Check, MapPin, ArrowRight, X, Sparkles, Filter } from 'lucide-react';
import { cn } from '../utils/cn';

// Complete Province Data with all provinces and territories
const ALL_PROVINCES: Record<string, ProvinceData> = {
    on: {
        id: 'on', code: 'ON', name: 'Ontario', fullName: 'Ontario',
        image: 'https://images.unsplash.com/photo-1506509000-84c472c57e60?q=80&w=600&auto=format&fit=crop',
        region: 'Central Canada', timezone: 'EST',
        matchRate: 98, crsCutoff: 458, invites: 2105, lastDraw: '2024-12-20',
        sectors: ['Tech', 'Health', 'Finance'],
        streams: [
            { name: 'Human Capital Priorities', sector: 'Tech', match: 'High', percentage: 92, status: 'Active', expressEntry: true, jobOffer: false },
            { name: 'French-Speaking Worker', sector: 'General', match: 'Moderate', percentage: 65, status: 'Active', expressEntry: true, jobOffer: false },
            { name: 'Masters Graduate', sector: 'General', match: 'Low', percentage: 15, status: 'Paused', expressEntry: false, jobOffer: false }
        ],
        highlight: 'Weekly Tech Draws with lower cutoffs'
    },
    bc: {
        id: 'bc', code: 'BC', name: 'British Columbia', fullName: 'British Columbia',
        image: 'https://images.unsplash.com/photo-1582234033069-79a83dc984fa?q=80&w=600&auto=format&fit=crop',
        region: 'West Coast', timezone: 'PST',
        matchRate: 95, crsCutoff: 480, invites: 950, lastDraw: '2024-12-18',
        sectors: ['Tech', 'Health'],
        streams: [
            { name: 'BC PNP Tech', sector: 'Tech', match: 'High', percentage: 95, status: 'Active', expressEntry: true, jobOffer: false },
            { name: 'Healthcare Priority', sector: 'Health', match: 'High', percentage: 88, status: 'Active', expressEntry: true, jobOffer: false }
        ],
        highlight: 'Weekly Tech draws, 29 priority occupations'
    },
    ab: {
        id: 'ab', code: 'AB', name: 'Alberta', fullName: 'Alberta',
        image: 'https://images.unsplash.com/photo-1601053120286-905d2c2084c7?q=80&w=600&auto=format&fit=crop',
        region: 'Prairies', timezone: 'MST',
        matchRate: 88, crsCutoff: 350, invites: 500, lastDraw: '2024-12-15',
        sectors: ['Tech', 'Trades', 'Transport'],
        streams: [
            { name: 'Alberta Opportunity', sector: 'General', match: 'High', percentage: 85, status: 'Active', expressEntry: false, jobOffer: true },
            { name: 'Express Entry Stream', sector: 'Tech', match: 'Moderate', percentage: 70, status: 'Active', expressEntry: true, jobOffer: false }
        ],
        highlight: 'Lower CRS cutoffs, job offer pathways'
    },
    sk: {
        id: 'sk', code: 'SK', name: 'Saskatchewan', fullName: 'Saskatchewan',
        image: 'https://images.unsplash.com/photo-1578496479939-722d9dd1cc5b?q=80&w=600&auto=format&fit=crop',
        region: 'Prairies', timezone: 'CST',
        matchRate: 82, crsCutoff: 380, invites: 420, lastDraw: '2024-12-10',
        sectors: ['Trades', 'Transport', 'Health'],
        streams: [
            { name: 'SINP Express Entry', sector: 'General', match: 'High', percentage: 80, status: 'Active', expressEntry: true, jobOffer: false },
            { name: 'Occupation In-Demand', sector: 'Trades', match: 'Moderate', percentage: 65, status: 'Active', expressEntry: false, jobOffer: false }
        ],
        highlight: 'In-demand occupation list updated regularly'
    },
    mb: {
        id: 'mb', code: 'MB', name: 'Manitoba', fullName: 'Manitoba',
        image: 'https://images.unsplash.com/photo-1504285121652-3269b6dbd522?q=80&w=600&auto=format&fit=crop',
        region: 'Prairies', timezone: 'CST',
        matchRate: 75, crsCutoff: 400, invites: 380, lastDraw: '2024-12-12',
        sectors: ['Health', 'Trades'],
        streams: [
            { name: 'Skilled Worker Overseas', sector: 'General', match: 'Moderate', percentage: 60, status: 'Active', expressEntry: false, jobOffer: false },
            { name: 'International Education', sector: 'General', match: 'Moderate', percentage: 55, status: 'Active', expressEntry: false, jobOffer: false }
        ],
        highlight: 'Family connections valued for nominations'
    },
    qc: {
        id: 'qc', code: 'QC', name: 'Quebec', fullName: 'Quebec',
        image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=600&auto=format&fit=crop',
        region: 'Eastern Canada', timezone: 'EST',
        matchRate: 70, crsCutoff: 500, invites: 1200, lastDraw: '2024-12-08',
        sectors: ['Tech', 'Health', 'Finance'],
        streams: [
            { name: 'Regular Skilled Worker', sector: 'General', match: 'Moderate', percentage: 55, status: 'Active', expressEntry: false, jobOffer: false },
            { name: 'Quebec Experience', sector: 'General', match: 'High', percentage: 85, status: 'Active', expressEntry: false, jobOffer: false }
        ],
        highlight: 'CSQ required, French proficiency essential'
    },
    ns: {
        id: 'ns', code: 'NS', name: 'Nova Scotia', fullName: 'Nova Scotia',
        image: 'https://images.unsplash.com/photo-1583169927944-89c8c13d8a7d?q=80&w=600&auto=format&fit=crop',
        region: 'Atlantic Canada', timezone: 'AST',
        matchRate: 78, crsCutoff: 420, invites: 280, lastDraw: '2024-12-14',
        sectors: ['Health', 'Trades'],
        streams: [
            { name: 'Labour Market Priorities', sector: 'General', match: 'High', percentage: 75, status: 'Active', expressEntry: true, jobOffer: false }
        ],
        highlight: 'Atlantic Immigration Program eligible'
    },
    nb: {
        id: 'nb', code: 'NB', name: 'New Brunswick', fullName: 'New Brunswick',
        image: 'https://images.unsplash.com/photo-1588392382834-a891154bca4d?q=80&w=600&auto=format&fit=crop',
        region: 'Atlantic Canada', timezone: 'AST',
        matchRate: 72, crsCutoff: 410, invites: 220, lastDraw: '2024-12-11',
        sectors: ['Health', 'Trades'],
        streams: [
            { name: 'Express Entry Labour', sector: 'General', match: 'Moderate', percentage: 65, status: 'Active', expressEntry: true, jobOffer: false }
        ],
        highlight: 'Bilingual province, French an asset'
    },
    pe: {
        id: 'pe', code: 'PE', name: 'PEI', fullName: 'Prince Edward Island',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop',
        region: 'Atlantic Canada', timezone: 'AST',
        matchRate: 68, crsCutoff: 430, invites: 150, lastDraw: '2024-12-05',
        sectors: ['Trades', 'Transport'],
        streams: [
            { name: 'Express Entry Stream', sector: 'General', match: 'Moderate', percentage: 60, status: 'Active', expressEntry: true, jobOffer: false }
        ],
        highlight: 'Smaller population, faster processing'
    },
    nl: {
        id: 'nl', code: 'NL', name: 'Newfoundland', fullName: 'Newfoundland & Labrador',
        image: 'https://images.unsplash.com/photo-1473654729523-203e25dfda10?q=80&w=600&auto=format&fit=crop',
        region: 'Atlantic Canada', timezone: 'NST',
        matchRate: 65, crsCutoff: 440, invites: 180, lastDraw: '2024-12-06',
        sectors: ['Trades', 'Health'],
        streams: [
            { name: 'Express Entry Skilled', sector: 'General', match: 'Moderate', percentage: 58, status: 'Active', expressEntry: true, jobOffer: false }
        ],
        highlight: 'Growing tech sector, Atlantic program'
    },
    yt: {
        id: 'yt', code: 'YT', name: 'Yukon', fullName: 'Yukon Territory',
        image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=600&auto=format&fit=crop',
        region: 'Northern Canada', timezone: 'PST',
        matchRate: 55, crsCutoff: 450, invites: 50, lastDraw: '2024-11-28',
        sectors: ['Trades'],
        streams: [
            { name: 'Yukon Express Entry', sector: 'General', match: 'Low', percentage: 40, status: 'Active', expressEntry: true, jobOffer: true }
        ],
        highlight: 'Job offer usually required'
    },
    nt: {
        id: 'nt', code: 'NT', name: 'NWT', fullName: 'Northwest Territories',
        image: 'https://images.unsplash.com/photo-1483077318298-c8936a7e1c85?q=80&w=600&auto=format&fit=crop',
        region: 'Northern Canada', timezone: 'MST',
        matchRate: 50, crsCutoff: 460, invites: 40, lastDraw: '2024-11-20',
        sectors: ['Trades'],
        streams: [
            { name: 'Express Entry Stream', sector: 'General', match: 'Low', percentage: 35, status: 'Active', expressEntry: true, jobOffer: true }
        ],
        highlight: 'Limited draws, job offer essential'
    },
    nu: {
        id: 'nu', code: 'NU', name: 'Nunavut', fullName: 'Nunavut',
        image: 'https://images.unsplash.com/photo-1518882517949-67c2b0d85c15?q=80&w=600&auto=format&fit=crop',
        region: 'Northern Canada', timezone: 'EST',
        matchRate: 45, crsCutoff: 470, invites: 20, lastDraw: '2024-10-15',
        sectors: ['Trades'],
        streams: [
            { name: 'Nunavut Nominee', sector: 'General', match: 'Low', percentage: 30, status: 'Active', expressEntry: false, jobOffer: true }
        ],
        highlight: 'Very limited nominations, employer-driven'
    }
};

// Province label positions for map
const PROVINCE_LABELS: Record<string, { x: number; y: number }> = {
    yt: { x: 115, y: 140 },
    nt: { x: 210, y: 130 },
    nu: { x: 400, y: 100 },
    bc: { x: 95, y: 260 },
    ab: { x: 168, y: 230 },
    sk: { x: 212, y: 230 },
    mb: { x: 258, y: 230 },
    on: { x: 340, y: 250 },
    qc: { x: 440, y: 220 },
    nb: { x: 495, y: 280 },
    ns: { x: 535, y: 305 },
    pe: { x: 545, y: 272 },
    nl: { x: 575, y: 180 }
};

interface Stream {
    name: string;
    sector: string;
    match: 'High' | 'Moderate' | 'Low';
    percentage: number;
    status: 'Active' | 'Paused';
    expressEntry: boolean;
    jobOffer: boolean;
}

interface ProvinceData {
    id: string;
    code: string;
    name: string;
    fullName: string;
    image: string;
    region: string;
    timezone: string;
    matchRate: number;
    crsCutoff: number;
    invites: number;
    lastDraw: string;
    sectors: string[];
    streams: Stream[];
    highlight: string;
}

type FilterState = {
    search: string;
    expressEntry: boolean;
    noJobOffer: boolean;
    aiRecommended: boolean;
    sectors: string[];
};

interface CanadaMapProps {
    onNavigate?: (page: string) => void;
}

const CanadaMap = ({ onNavigate }: CanadaMapProps) => {
    const [selectedId, setSelectedId] = useState<string | null>('on');
    const [zoom, setZoom] = useState(1);
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        expressEntry: false,
        noJobOffer: false,
        aiRecommended: true,
        sectors: []
    });

    // Filter provinces based on current filters
    const filteredProvinces = useMemo(() => {
        return Object.values(ALL_PROVINCES).filter(prov => {
            // Search filter
            if (filters.search && !prov.name.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }
            // Express Entry filter
            if (filters.expressEntry && !prov.streams.some(s => s.expressEntry)) {
                return false;
            }
            // No job offer filter
            if (filters.noJobOffer && !prov.streams.some(s => !s.jobOffer)) {
                return false;
            }
            // AI Recommended (match > 75%)
            if (filters.aiRecommended && prov.matchRate < 75) {
                return false;
            }
            // Sector filter
            if (filters.sectors.length > 0 && !filters.sectors.some(s => prov.sectors.includes(s))) {
                return false;
            }
            return true;
        });
    }, [filters]);

    const filteredIds = new Set(filteredProvinces.map(p => p.id));

    const toggleSector = (sector: string) => {
        setFilters(prev => ({
            ...prev,
            sectors: prev.sectors.includes(sector)
                ? prev.sectors.filter(s => s !== sector)
                : [...prev.sectors, sector]
        }));
    };

    const resetFilters = () => {
        setFilters({
            search: '',
            expressEntry: false,
            noJobOffer: false,
            aiRecommended: false,
            sectors: []
        });
    };

    const currentProvince = selectedId ? ALL_PROVINCES[selectedId] : null;

    // SVG Paths
    const paths: Record<string, string> = {
        yt: 'M89.5,180.5 L89.5,95.5 L145.5,95.5 L145.5,175.5 L135.5,185.5 L120.5,185.5 L110.5,190.5 L100.5,185.5 Z',
        nt: 'M145.5,95.5 L145.5,175.5 L155.5,185.5 L190.5,175.5 L235.5,185.5 L280.5,175.5 L280.5,95.5 L240.5,60.5 L200.5,75.5 L160.5,60.5 Z',
        nu: 'M280.5,95.5 L280.5,175.5 L320.5,190.5 L370.5,160.5 L420.5,180.5 L470.5,150.5 L500.5,180.5 L540.5,140.5 L540.5,60.5 L480.5,40.5 L420.5,55.5 L360.5,35.5 L300.5,55.5 Z',
        bc: 'M89.5,180.5 L100.5,185.5 L110.5,190.5 L120.5,185.5 L135.5,185.5 L145.5,175.5 L145.5,285.5 L130.5,290.5 L110.5,320.5 L95.5,315.5 L80.5,340.5 L65.5,330.5 L55.5,350.5 L50.5,320.5 L60.5,290.5 L70.5,250.5 L80.5,220.5 Z',
        ab: 'M145.5,175.5 L155.5,185.5 L190.5,175.5 L190.5,285.5 L145.5,285.5 Z',
        sk: 'M190.5,175.5 L235.5,185.5 L235.5,285.5 L190.5,285.5 Z',
        mb: 'M235.5,185.5 L280.5,175.5 L280.5,240.5 L295.5,260.5 L280.5,285.5 L235.5,285.5 Z',
        on: 'M280.5,175.5 L320.5,190.5 L370.5,160.5 L380.5,200.5 L400.5,220.5 L385.5,260.5 L365.5,280.5 L340.5,290.5 L310.5,320.5 L280.5,310.5 L270.5,285.5 L295.5,260.5 L280.5,240.5 Z',
        qc: 'M370.5,160.5 L420.5,180.5 L470.5,150.5 L500.5,180.5 L520.5,220.5 L490.5,260.5 L450.5,280.5 L420.5,310.5 L380.5,290.5 L365.5,280.5 L385.5,260.5 L400.5,220.5 L380.5,200.5 Z',
        nb: 'M490.5,260.5 L510.5,270.5 L520.5,295.5 L500.5,310.5 L480.5,295.5 L475.5,275.5 Z',
        ns: 'M520.5,295.5 L545.5,290.5 L560.5,310.5 L540.5,325.5 L515.5,315.5 Z',
        pe: 'M530.5,270.5 L550.5,268.5 L555.5,278.5 L535.5,282.5 Z',
        nl: 'M540.5,140.5 L580.5,120.5 L610.5,150.5 L600.5,200.5 L560.5,230.5 L530.5,200.5 L540.5,160.5 Z M570.5,250.5 L600.5,240.5 L620.5,270.5 L600.5,300.5 L570.5,290.5 Z'
    };

    const activeFiltersCount = [filters.expressEntry, filters.noJobOffer, filters.aiRecommended].filter(Boolean).length + filters.sectors.length;

    return (
        <section className="py-16 relative overflow-hidden" id="provinces-map">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-3">
                            Provincial Programs
                        </span>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                            Explore <span className="text-gradient-gold">All 13</span> Provinces & Territories
                        </h2>
                    </div>
                    <p className="text-gray-400 text-sm max-w-md">
                        Click any region to see PNP streams, CRS cutoffs, and your AI-predicted match rate.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-6 glass-panel rounded-2xl overflow-hidden min-h-[600px]">

                    {/* LEFT: Filters Panel */}
                    <aside className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 p-5 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Filter className="w-4 h-4 text-accent-gold" />
                                Stream Filters
                                {activeFiltersCount > 0 && (
                                    <span className="ml-1 px-1.5 py-0.5 rounded-full bg-accent-gold text-background-dark text-[10px] font-bold">
                                        {activeFiltersCount}
                                    </span>
                                )}
                            </h3>
                            <button
                                onClick={resetFilters}
                                className="text-[10px] text-gray-500 hover:text-white transition-colors underline"
                            >
                                Reset
                            </button>
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <input
                                type="text"
                                value={filters.search}
                                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                                placeholder="Search provinces..."
                                className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:border-accent-gold/50 focus:outline-none transition-all"
                            />
                        </div>

                        {/* Toggle Filters */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] block">Eligibility</label>

                            {/* Express Entry */}
                            <button
                                onClick={() => setFilters(prev => ({ ...prev, expressEntry: !prev.expressEntry }))}
                                className={cn(
                                    "w-full flex items-center gap-3 p-3 rounded-lg border transition-all",
                                    filters.expressEntry
                                        ? "bg-primary/20 border-primary/40"
                                        : "border-white/10 hover:bg-white/5"
                                )}
                            >
                                <div className={cn(
                                    "w-4 h-4 rounded border flex items-center justify-center transition-all",
                                    filters.expressEntry ? "bg-primary border-primary" : "border-gray-600"
                                )}>
                                    {filters.expressEntry && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span className={cn("text-xs font-medium", filters.expressEntry ? "text-white" : "text-gray-400")}>
                                    Express Entry Aligned
                                </span>
                            </button>

                            {/* No Job Offer */}
                            <button
                                onClick={() => setFilters(prev => ({ ...prev, noJobOffer: !prev.noJobOffer }))}
                                className={cn(
                                    "w-full flex items-center gap-3 p-3 rounded-lg border transition-all",
                                    filters.noJobOffer
                                        ? "bg-primary/20 border-primary/40"
                                        : "border-white/10 hover:bg-white/5"
                                )}
                            >
                                <div className={cn(
                                    "w-4 h-4 rounded border flex items-center justify-center transition-all",
                                    filters.noJobOffer ? "bg-primary border-primary" : "border-gray-600"
                                )}>
                                    {filters.noJobOffer && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span className={cn("text-xs font-medium", filters.noJobOffer ? "text-white" : "text-gray-400")}>
                                    No Job Offer Required
                                </span>
                            </button>

                            {/* AI Recommended */}
                            <button
                                onClick={() => setFilters(prev => ({ ...prev, aiRecommended: !prev.aiRecommended }))}
                                className={cn(
                                    "w-full flex items-center gap-3 p-3 rounded-lg border transition-all",
                                    filters.aiRecommended
                                        ? "bg-accent-gold/10 border-accent-gold/40"
                                        : "border-white/10 hover:bg-white/5"
                                )}
                            >
                                <div className={cn(
                                    "w-4 h-4 rounded flex items-center justify-center transition-all",
                                    filters.aiRecommended ? "bg-accent-gold" : "border border-gray-600"
                                )}>
                                    {filters.aiRecommended && <Check className="w-3 h-3 text-background-dark" />}
                                </div>
                                <span className={cn("text-xs font-bold flex items-center gap-1.5", filters.aiRecommended ? "text-accent-gold" : "text-gray-400")}>
                                    AI Recommended
                                    <Sparkles className="w-3 h-3" />
                                </span>
                            </button>
                        </div>

                        {/* Sector Pills */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] block">Target Sector</label>
                            <div className="flex flex-wrap gap-2">
                                {['Tech', 'Health', 'Trades', 'Transport', 'Finance'].map(sector => (
                                    <button
                                        key={sector}
                                        onClick={() => toggleSector(sector)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide border transition-all",
                                            filters.sectors.includes(sector)
                                                ? "bg-primary/30 text-white border-primary/50"
                                                : "bg-black/20 text-gray-500 border-white/5 hover:text-white hover:border-white/20"
                                        )}
                                    >
                                        {sector}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="pt-4 border-t border-white/10">
                            <p className="text-xs text-gray-400">
                                Showing <span className="text-white font-bold">{filteredProvinces.length}</span> of 13 regions
                            </p>
                        </div>
                    </aside>

                    {/* CENTER: Map */}
                    <div className="flex-1 relative min-h-[400px] bg-gradient-to-br from-background-dark to-primary/5">
                        {/* Zoom Controls */}
                        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 glass-panel rounded-lg p-1">
                            <button onClick={() => setZoom(z => Math.min(z + 0.2, 1.5))} className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                <Plus className="w-4 h-4" />
                            </button>
                            <div className="h-px w-4 bg-white/10 mx-auto"></div>
                            <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.8))} className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                <Minus className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Legend */}
                        <div className="absolute bottom-4 left-4 z-20 glass-panel rounded-full px-4 py-2 flex items-center gap-4 text-[10px]">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-accent-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]"></span>
                                <span className="text-white font-bold">Best Match</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                                <span className="text-gray-400">Standard</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-gray-600"></span>
                                <span className="text-gray-400">Filtered</span>
                            </div>
                        </div>

                        {/* SVG Map */}
                        <div className="w-full h-full flex items-center justify-center p-8">
                            <motion.svg
                                viewBox="40 20 600 340"
                                className="w-full h-full max-w-3xl"
                                preserveAspectRatio="xMidYMid meet"
                                animate={{ scale: zoom }}
                                transition={{ duration: 0.3 }}
                            >
                                <defs>
                                    <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="4" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                    <filter id="glow-primary" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="3" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>

                                {Object.entries(paths).map(([id, path]) => {
                                    const isSelected = selectedId === id;
                                    const isFiltered = filteredIds.has(id);
                                    const province = ALL_PROVINCES[id];
                                    const isHighMatch = province && province.matchRate >= 85;
                                    const labelPos = PROVINCE_LABELS[id];

                                    return (
                                        <g key={id} onClick={() => setSelectedId(id)} className="cursor-pointer">
                                            <motion.path
                                                d={path}
                                                initial={{ opacity: 0 }}
                                                animate={{
                                                    opacity: isFiltered ? 1 : 0.3,
                                                    fill: isSelected
                                                        ? 'rgba(31, 59, 97, 0.8)'
                                                        : isFiltered
                                                            ? isHighMatch
                                                                ? 'rgba(212, 175, 55, 0.15)'
                                                                : 'rgba(30, 41, 59, 0.6)'
                                                            : 'rgba(30, 41, 59, 0.2)',
                                                    stroke: isSelected
                                                        ? '#D4AF37'
                                                        : isFiltered
                                                            ? isHighMatch
                                                                ? 'rgba(212, 175, 55, 0.5)'
                                                                : 'rgba(255, 255, 255, 0.2)'
                                                            : 'rgba(255, 255, 255, 0.05)',
                                                    strokeWidth: isSelected ? 2 : 1,
                                                    filter: isSelected ? 'url(#glow-gold)' : isHighMatch && isFiltered ? 'url(#glow-primary)' : 'none'
                                                }}
                                                whileHover={{
                                                    scale: 1.02,
                                                    fill: 'rgba(31, 59, 97, 0.7)',
                                                    stroke: '#D4AF37',
                                                    strokeWidth: 1.5
                                                }}
                                                transition={{ duration: 0.2 }}
                                            />

                                            {/* Province Labels - ALL provinces */}
                                            {labelPos && (
                                                <motion.text
                                                    x={labelPos.x}
                                                    y={labelPos.y}
                                                    className="pointer-events-none select-none"
                                                    fill={isSelected ? '#D4AF37' : isFiltered ? '#ffffff' : '#6b7280'}
                                                    fontSize={isSelected ? 11 : 9}
                                                    fontWeight="bold"
                                                    textAnchor="middle"
                                                    animate={{
                                                        opacity: isFiltered ? 1 : 0.4,
                                                        fill: isSelected ? '#D4AF37' : isFiltered ? '#ffffff' : '#6b7280'
                                                    }}
                                                >
                                                    {province?.code || id.toUpperCase()}
                                                </motion.text>
                                            )}

                                            {/* Pulse indicator for high matches */}
                                            {isHighMatch && isFiltered && !isSelected && labelPos && (
                                                <motion.circle
                                                    cx={labelPos.x}
                                                    cy={labelPos.y - 15}
                                                    r={4}
                                                    fill="#D4AF37"
                                                    initial={{ scale: 0.8, opacity: 0.5 }}
                                                    animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                />
                                            )}
                                        </g>
                                    );
                                })}
                            </motion.svg>
                        </div>
                    </div>

                    {/* RIGHT: Detail Panel */}
                    <AnimatePresence>
                        {currentProvince && (
                            <motion.aside
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col"
                            >
                                {/* Compact Header */}
                                <div className="relative h-32 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-dark z-10"></div>
                                    <img
                                        src={currentProvince.image}
                                        alt={currentProvince.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    <div className="absolute bottom-3 left-4 z-20">
                                        <span className="px-2 py-0.5 rounded-md bg-accent-gold text-background-dark text-[10px] font-black uppercase">
                                            {currentProvince.matchRate}% Match
                                        </span>
                                    </div>
                                </div>

                                {/* Province Info */}
                                <div className="p-4 border-b border-white/10">
                                    <h3 className="text-xl font-bold text-white mb-1">{currentProvince.name}</h3>
                                    <p className="text-xs text-gray-400 flex items-center gap-1">
                                        <MapPin className="w-3 h-3 text-accent-gold" />
                                        {currentProvince.region} • {currentProvince.timezone}
                                    </p>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-3 divide-x divide-white/10 border-b border-white/10">
                                    <div className="p-3 text-center">
                                        <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">CRS</p>
                                        <p className="text-lg font-bold text-white">{currentProvince.crsCutoff}</p>
                                    </div>
                                    <div className="p-3 text-center">
                                        <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">Invites</p>
                                        <p className="text-lg font-bold text-white">{currentProvince.invites.toLocaleString()}</p>
                                    </div>
                                    <div className="p-3 text-center">
                                        <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">Last Draw</p>
                                        <p className="text-sm font-bold text-white">{new Date(currentProvince.lastDraw).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                    </div>
                                </div>

                                {/* Highlight */}
                                <div className="p-4 bg-accent-gold/5 border-b border-white/10">
                                    <div className="flex items-start gap-2">
                                        <Lightbulb className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                                        <p className="text-xs text-gray-300 leading-relaxed">{currentProvince.highlight}</p>
                                    </div>
                                </div>

                                {/* Streams */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Top Streams</h4>
                                    {currentProvince.streams.slice(0, 3).map((stream, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className={cn(
                                                "p-3 rounded-lg border transition-all",
                                                stream.match === 'High'
                                                    ? "bg-accent-gold/5 border-accent-gold/20"
                                                    : "bg-white/5 border-white/10"
                                            )}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h5 className="text-xs font-bold text-white">{stream.name}</h5>
                                                {stream.status === 'Active' ? (
                                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                                ) : (
                                                    <span className="text-[8px] text-maple-red font-bold">PAUSED</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                                {stream.expressEntry && <span className="px-1.5 py-0.5 rounded bg-primary/30 text-blue-200">EE</span>}
                                                {!stream.jobOffer && <span className="px-1.5 py-0.5 rounded bg-green-500/20 text-green-300">No JO</span>}
                                                <span className={cn(
                                                    "ml-auto font-bold",
                                                    stream.match === 'High' ? "text-accent-gold" : "text-gray-400"
                                                )}>{stream.percentage}%</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Action */}
                                {/* Action */}
                                <div className="p-4 border-t border-white/10">
                                    <button
                                        onClick={() => onNavigate?.('assessment')}
                                        className="w-full py-3 bg-primary hover:bg-primary-light text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group transition-all"
                                    >
                                        <span>Full Eligibility Check</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.aside>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default CanadaMap;
