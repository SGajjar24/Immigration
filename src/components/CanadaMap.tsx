import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, Lightbulb, Check, MapPin, ArrowRight, X, Sparkles, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';
import { ALL_PROVINCES, PROVINCE_LABELS, PROVINCE_PATHS, AVAILABLE_SECTORS } from '../data/provinceData';

type FilterState = {
    search: string;
    expressEntry: boolean;
    noJobOffer: boolean;
    aiRecommended: boolean;
    sectors: string[];
};

const CanadaMap = () => {
    const [selectedId, setSelectedId] = useState<string | null>('on');
    const [zoom, setZoom] = useState(1);
    const navigate = useNavigate();
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        expressEntry: false,
        noJobOffer: false,
        aiRecommended: false,
        sectors: []
    });

    // Filter provinces based on current filters
    const filteredProvinces = useMemo(() => {
        return Object.values(ALL_PROVINCES).filter(prov => {
            if (filters.search && !prov.name.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }
            if (filters.expressEntry && !prov.streams.some(s => s.expressEntry)) {
                return false;
            }
            if (filters.noJobOffer && !prov.streams.some(s => !s.jobOffer)) {
                return false;
            }
            if (filters.aiRecommended && prov.matchRate < 75) {
                return false;
            }
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
                                <Filter className="w-4 h-4 text-accent-gold" aria-hidden="true" />
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
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" aria-hidden="true" />
                            <input
                                type="text"
                                value={filters.search}
                                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                                placeholder="Search provinces..."
                                aria-label="Search provinces"
                                className="w-full glass-input pl-10"
                            />
                        </div>

                        {/* Toggle Filters */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] block">Eligibility</label>

                            {/* Express Entry */}
                            <button
                                onClick={() => setFilters(prev => ({ ...prev, expressEntry: !prev.expressEntry }))}
                                className={cn(
                                    "w-full flex items-center gap-3 p-3 rounded-lg border transition-colors",
                                    filters.expressEntry
                                        ? "bg-primary/20 border-primary/40"
                                        : "border-white/10 hover:bg-white/5"
                                )}
                            >
                                <div className={cn(
                                    "w-4 h-4 rounded border flex items-center justify-center transition-colors",
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
                                    "w-full flex items-center gap-3 p-3 rounded-lg border transition-colors",
                                    filters.noJobOffer
                                        ? "bg-primary/20 border-primary/40"
                                        : "border-white/10 hover:bg-white/5"
                                )}
                            >
                                <div className={cn(
                                    "w-4 h-4 rounded border flex items-center justify-center transition-colors",
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
                                    "w-full flex items-center gap-3 p-3 rounded-lg border transition-colors",
                                    filters.aiRecommended
                                        ? "bg-accent-gold/10 border-accent-gold/40"
                                        : "border-white/10 hover:bg-white/5"
                                )}
                            >
                                <div className={cn(
                                    "w-4 h-4 rounded flex items-center justify-center transition-colors",
                                    filters.aiRecommended ? "bg-accent-gold" : "border border-gray-600"
                                )}>
                                    {filters.aiRecommended && <Check className="w-3 h-3 text-background-dark" />}
                                </div>
                                <span className={cn("text-xs font-bold flex items-center gap-1.5", filters.aiRecommended ? "text-accent-gold" : "text-gray-400")}>
                                    AI Recommended
                                    <Sparkles className="w-3 h-3" aria-hidden="true" />
                                </span>
                            </button>
                        </div>

                        {/* Sector Pills */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] block">Target Sector</label>
                            <div className="flex flex-wrap gap-2">
                                {AVAILABLE_SECTORS.map(sector => (
                                    <button
                                        key={sector}
                                        onClick={() => toggleSector(sector)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide border transition-colors",
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
                    <div className="flex-1 relative min-h-[400px] bg-gradient-to-br from-background-dark to-primary/5 overflow-hidden">
                        {/* Static Background Glows */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
                            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-gold/5 rounded-full blur-[100px]" />
                        </div>

                        {/* Zoom Controls */}
                        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 glass-panel rounded-lg p-1">
                            <button
                                onClick={() => setZoom(z => Math.min(z + 0.2, 1.5))}
                                aria-label="Zoom in"
                                className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                            <div className="h-px w-4 bg-white/10 mx-auto" />
                            <button
                                onClick={() => setZoom(z => Math.max(z - 0.2, 0.8))}
                                aria-label="Zoom out"
                                className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Legend */}
                        <div className="absolute bottom-4 left-4 z-20 glass-panel rounded-full px-4 py-2 flex items-center gap-4 text-[10px]">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-accent-gold" aria-hidden="true" />
                                <span className="text-white font-bold">Best Match</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-primary" aria-hidden="true" />
                                <span className="text-gray-400">Standard</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-gray-600" aria-hidden="true" />
                                <span className="text-gray-400">Filtered</span>
                            </div>
                        </div>

                        {/* SVG Map */}
                        <div className="w-full h-full flex items-center justify-center p-8">
                            <svg
                                viewBox="20 10 620 340"
                                className="w-full h-full max-w-3xl"
                                preserveAspectRatio="xMidYMid meet"
                                style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease' }}
                                role="img"
                                aria-label="Interactive map of Canadian provinces and territories"
                            >
                                <defs>
                                    <filter id="selected-glow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="3" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>

                                {Object.entries(PROVINCE_PATHS).map(([id, path]) => {
                                    const isSelected = selectedId === id;
                                    const isFiltered = filteredIds.has(id);
                                    const province = ALL_PROVINCES[id];
                                    const isHighMatch = province && province.matchRate >= 85;
                                    const labelPos = PROVINCE_LABELS[id];

                                    return (
                                        <g
                                            key={id}
                                            onClick={() => setSelectedId(id)}
                                            className="cursor-pointer"
                                            role="button"
                                            aria-label={`Select ${province?.name || id}`}
                                            tabIndex={0}
                                            onKeyDown={(e) => e.key === 'Enter' && setSelectedId(id)}
                                        >
                                            <path
                                                d={path}
                                                fill={isSelected
                                                    ? 'rgba(31, 59, 97, 0.8)'
                                                    : isFiltered
                                                        ? isHighMatch
                                                            ? 'rgba(212, 175, 55, 0.15)'
                                                            : 'rgba(30, 41, 59, 0.6)'
                                                        : 'rgba(30, 41, 59, 0.2)'}
                                                stroke={isSelected
                                                    ? '#D4AF37'
                                                    : isFiltered
                                                        ? isHighMatch
                                                            ? 'rgba(212, 175, 55, 0.5)'
                                                            : 'rgba(255, 255, 255, 0.2)'
                                                        : 'rgba(255, 255, 255, 0.05)'}
                                                strokeWidth={isSelected ? 2 : 1}
                                                filter={isSelected ? 'url(#selected-glow)' : undefined}
                                                opacity={isFiltered ? 1 : 0.3}
                                                className="transition-all duration-200 hover:fill-[rgba(31,59,97,0.7)] hover:stroke-[#D4AF37]"
                                            />

                                            {/* Province Labels */}
                                            {labelPos && (
                                                <text
                                                    x={labelPos.x}
                                                    y={labelPos.y}
                                                    className="pointer-events-none select-none"
                                                    fill={isSelected ? '#D4AF37' : isFiltered ? '#ffffff' : '#6b7280'}
                                                    fontSize={isSelected ? 11 : 9}
                                                    fontWeight="bold"
                                                    textAnchor="middle"
                                                    opacity={isFiltered ? 1 : 0.4}
                                                >
                                                    {province?.code || id.toUpperCase()}
                                                </text>
                                            )}

                                            {/* High match indicator - static dot, no animation */}
                                            {isHighMatch && isFiltered && !isSelected && labelPos && (
                                                <circle
                                                    cx={labelPos.x}
                                                    cy={labelPos.y - 15}
                                                    r={4}
                                                    fill="#D4AF37"
                                                />
                                            )}
                                        </g>
                                    );
                                })}
                            </svg>
                        </div>
                    </div>

                    {/* RIGHT: Detail Panel */}
                    <AnimatePresence>
                        {currentProvince && (
                            <motion.aside
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                                className="lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col"
                            >
                                {/* Header */}
                                <div className="relative h-32 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-dark z-10" />
                                    <img
                                        src={currentProvince.image}
                                        alt={currentProvince.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        aria-label="Close province details"
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
                                        <MapPin className="w-3 h-3 text-accent-gold" aria-hidden="true" />
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
                                        <Lightbulb className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" aria-hidden="true" />
                                        <p className="text-xs text-gray-300 leading-relaxed">{currentProvince.highlight}</p>
                                    </div>
                                </div>

                                {/* Streams */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Top Streams</h4>
                                    {currentProvince.streams.slice(0, 3).map((stream, idx) => (
                                        <div
                                            key={idx}
                                            className={cn(
                                                "p-3 rounded-lg border transition-colors",
                                                stream.match === 'High'
                                                    ? "bg-accent-gold/5 border-accent-gold/20"
                                                    : "bg-white/5 border-white/10"
                                            )}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h5 className="text-xs font-bold text-white">{stream.name}</h5>
                                                {stream.status === 'Active' ? (
                                                    <span className="w-2 h-2 rounded-full bg-green-500" aria-label="Active" />
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
                                        </div>
                                    ))}
                                </div>

                                {/* Action */}
                                <div className="p-4 border-t border-white/10">
                                    <button
                                        onClick={() => navigate('/assessment')}
                                        className="w-full py-3 btn-primary flex items-center justify-center gap-2 group"
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
