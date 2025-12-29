import { useState, useMemo, useCallback } from 'react';
import { nocDatabase, type NOCCode } from '../data/nocData';

interface UseNOCSearchResult {
    query: string;
    setQuery: (query: string) => void;
    results: NOCCode[];
    isSearching: boolean;
    selectedCode: NOCCode | null;
    selectCode: (code: NOCCode | null) => void;
    clearSearch: () => void;
}

/**
 * Calculate similarity score between two strings (simple fuzzy match)
 */
const calculateSimilarity = (str1: string, str2: string): number => {
    const s1 = str1.toLowerCase();
    const s2 = str2.toLowerCase();

    // Exact match
    if (s1 === s2) return 1;

    // Contains match
    if (s1.includes(s2) || s2.includes(s1)) return 0.8;

    // Word boundary match
    const words1 = s1.split(/\s+/);
    const words2 = s2.split(/\s+/);

    let matchCount = 0;
    for (const word1 of words1) {
        for (const word2 of words2) {
            if (word1.includes(word2) || word2.includes(word1)) {
                matchCount++;
            }
        }
    }

    if (matchCount > 0) {
        return 0.5 + (matchCount / Math.max(words1.length, words2.length)) * 0.3;
    }

    return 0;
};

/**
 * Search NOC codes with fuzzy matching
 */
const searchNOCCodes = (query: string): NOCCode[] => {
    if (!query || query.trim().length < 2) return [];

    const searchTerm = query.trim().toLowerCase();

    // Score each NOC code based on match quality
    const scoredResults = nocDatabase.map(noc => {
        let maxScore = 0;

        // Check NOC code
        if (noc.code.includes(searchTerm)) {
            maxScore = Math.max(maxScore, 0.95);
        }

        // Check main title
        const titleScore = calculateSimilarity(noc.title, searchTerm);
        maxScore = Math.max(maxScore, titleScore);

        // Check alternative titles
        for (const alt of noc.alternativeTitles) {
            const altScore = calculateSimilarity(alt, searchTerm);
            maxScore = Math.max(maxScore, altScore * 0.9); // Slightly lower weight for alternatives
        }

        // Check examples
        for (const example of noc.examples) {
            const exampleScore = calculateSimilarity(example, searchTerm);
            maxScore = Math.max(maxScore, exampleScore * 0.85);
        }

        return { noc, score: maxScore };
    });

    // Filter and sort by score
    return scoredResults
        .filter(item => item.score > 0.3)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
        .map(item => item.noc);
};

/**
 * Custom hook for NOC code search with fuzzy matching
 */
export const useNOCSearch = (): UseNOCSearchResult => {
    const [query, setQuery] = useState('');
    const [selectedCode, setSelectedCode] = useState<NOCCode | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const results = useMemo(() => {
        setIsSearching(true);
        const searchResults = searchNOCCodes(query);
        setIsSearching(false);
        return searchResults;
    }, [query]);

    const selectCode = useCallback((code: NOCCode | null) => {
        setSelectedCode(code);
        if (code) {
            setQuery(code.title);
        }
    }, []);

    const clearSearch = useCallback(() => {
        setQuery('');
        setSelectedCode(null);
    }, []);

    return {
        query,
        setQuery,
        results,
        isSearching,
        selectedCode,
        selectCode,
        clearSearch
    };
};

export default useNOCSearch;
