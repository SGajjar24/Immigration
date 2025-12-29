import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Briefcase, ChevronRight, Info, CheckCircle2 } from 'lucide-react';
import { useNOCSearch } from '../hooks/useNOCSearch';
import { teerDescriptions, type NOCCode } from '../data/nocData';

interface NOCSearchProps {
    onSelect?: (code: NOCCode) => void;
    placeholder?: string;
    className?: string;
}

export const NOCSearch: React.FC<NOCSearchProps> = ({
    onSelect,
    placeholder = "Search by job title or NOC code...",
    className = ""
}) => {
    const { query, setQuery, results, selectedCode, selectCode, clearSearch } = useNOCSearch();
    const [isOpen, setIsOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (code: NOCCode) => {
        selectCode(code);
        setIsOpen(false);
        setShowDetails(true);
        onSelect?.(code);
    };

    const handleClear = () => {
        clearSearch();
        setShowDetails(false);
        inputRef.current?.focus();
    };

    const getTeerBadgeColor = (teer: number) => {
        return teerDescriptions[teer]?.color || 'bg-gray-500';
    };

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                        setShowDetails(false);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-12 py-4 glass-input text-lg rounded-xl"
                    autoComplete="off"
                />
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
                {isOpen && results.length > 0 && !selectedCode && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 w-full mt-2 glass-panel rounded-xl overflow-hidden shadow-premium max-h-[400px] overflow-y-auto"
                    >
                        {results.map((noc, index) => (
                            <button
                                key={noc.code}
                                onClick={() => handleSelect(noc)}
                                className={`w-full px-4 py-3 flex items-center gap-4 hover:bg-white/5 transition-colors text-left ${index !== results.length - 1 ? 'border-b border-white/5' : ''
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-lg ${getTeerBadgeColor(noc.teer)} flex items-center justify-center flex-shrink-0`}>
                                    <Briefcase className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-medium truncate">{noc.title}</p>
                                    <p className="text-sm text-gray-400">
                                        NOC {noc.code} • {teerDescriptions[noc.teer]?.label}
                                    </p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* No Results */}
            <AnimatePresence>
                {isOpen && query.length >= 2 && results.length === 0 && !selectedCode && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 w-full mt-2 glass-panel rounded-xl p-6 text-center"
                    >
                        <Info className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                        <p className="text-gray-400">No matching NOC codes found</p>
                        <p className="text-sm text-gray-500 mt-1">Try a different job title or occupation</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Selected Code Details */}
            <AnimatePresence>
                {showDetails && selectedCode && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-4 glass-panel rounded-xl p-6"
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <div className={`w-12 h-12 rounded-xl ${getTeerBadgeColor(selectedCode.teer)} flex items-center justify-center flex-shrink-0`}>
                                <CheckCircle2 className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white">{selectedCode.title}</h3>
                                <p className="text-gray-400">
                                    NOC {selectedCode.code} • {teerDescriptions[selectedCode.teer]?.label}
                                </p>
                            </div>
                        </div>

                        {/* TEER Description */}
                        <div className="mb-4 p-3 bg-white/5 rounded-lg">
                            <p className="text-sm text-gray-300">
                                <span className="font-semibold text-white">{teerDescriptions[selectedCode.teer]?.label}:</span>{' '}
                                {teerDescriptions[selectedCode.teer]?.description}
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 mb-4">{selectedCode.description}</p>

                        {/* Examples */}
                        {selectedCode.examples.length > 0 && (
                            <div>
                                <p className="text-sm font-semibold text-gray-400 mb-2">Example job titles:</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedCode.examples.map((example, i) => (
                                        <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300">
                                            {example}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Express Entry Eligibility Note */}
                        {selectedCode.teer <= 3 && (
                            <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
                                <p className="text-sm text-success flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Eligible for Express Entry (TEER 0, 1, 2, or 3)
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NOCSearch;
