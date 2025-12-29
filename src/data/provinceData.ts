// Province Data for Canada Map
// Centralized data for maintainability

export interface Stream {
    name: string;
    sector: string;
    match: 'High' | 'Moderate' | 'Low';
    percentage: number;
    status: 'Active' | 'Paused';
    expressEntry: boolean;
    jobOffer: boolean;
}

export interface ProvinceData {
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

export const ALL_PROVINCES: Record<string, ProvinceData> = {
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
export const PROVINCE_LABELS: Record<string, { x: number; y: number }> = {
    yt: { x: 88, y: 108 },
    nt: { x: 200, y: 72 },
    nu: { x: 420, y: 78 },
    bc: { x: 78, y: 210 },
    ab: { x: 145, y: 175 },
    sk: { x: 194, y: 175 },
    mb: { x: 252, y: 188 },
    on: { x: 330, y: 200 },
    qc: { x: 415, y: 210 },
    nb: { x: 475, y: 268 },
    ns: { x: 508, y: 295 },
    pe: { x: 512, y: 262 },
    nl: { x: 530, y: 200 }
};

// SVG Paths for Canada map
export const PROVINCE_PATHS: Record<string, string> = {
    yt: 'M50,160 L50,60 L60,55 L75,58 L90,52 L105,58 L120,55 L125,60 L125,100 L120,105 L125,115 L120,125 L125,145 L120,155 L110,150 L100,155 L90,148 L80,155 L65,148 L55,155 Z',
    nt: 'M125,60 L125,100 L140,95 L155,100 L170,92 L185,98 L195,90 L210,95 L230,88 L245,94 L260,85 L278,90 L278,55 L260,48 L240,55 L220,45 L195,52 L175,45 L155,50 L135,45 L125,55 Z',
    nu: 'M278,55 L278,90 L290,85 L295,100 L310,95 L320,110 L310,125 L325,130 L335,120 L350,128 L365,115 L380,125 L395,112 L410,122 L430,108 L450,118 L470,105 L490,115 L520,95 L540,108 L555,90 L565,100 L565,60 L540,50 L510,58 L480,45 L445,55 L410,42 L375,52 L340,38 L305,50 Z',
    bc: 'M50,160 L55,155 L65,148 L80,155 L90,148 L100,155 L110,150 L120,155 L125,145 L120,200 L115,220 L100,235 L85,245 L70,255 L55,262 L42,268 L35,258 L45,242 L38,225 L48,208 L40,190 L52,175 Z',
    ab: 'M120,125 L125,115 L120,105 L125,100 L140,95 L155,100 L170,118 L170,200 L165,220 L170,245 L120,245 L115,220 L120,200 Z',
    sk: 'M170,118 L155,100 L170,92 L185,98 L195,90 L210,95 L218,115 L218,200 L215,220 L218,245 L170,245 L165,220 L170,200 Z',
    mb: 'M218,115 L210,95 L230,88 L245,94 L260,85 L278,90 L285,110 L290,140 L305,160 L295,180 L280,195 L265,215 L270,240 L268,260 L218,260 L218,245 L222,220 L218,200 Z',
    on: 'M285,110 L290,85 L295,100 L310,95 L320,110 L310,125 L325,130 L335,145 L350,160 L365,175 L380,195 L395,215 L385,235 L365,252 L345,268 L325,278 L305,285 L285,290 L268,285 L268,260 L270,240 L265,215 L280,195 L295,180 L305,160 L290,140 Z',
    qc: 'M335,145 L325,130 L335,120 L350,128 L365,115 L380,125 L395,112 L410,122 L430,135 L455,148 L475,165 L490,185 L495,210 L485,235 L470,255 L455,272 L440,285 L420,295 L400,302 L380,298 L360,290 L345,280 L345,268 L365,252 L385,235 L395,215 L380,195 L365,175 L350,160 Z',
    nb: 'M470,255 L485,248 L495,258 L492,278 L478,290 L462,285 L455,272 Z',
    ns: 'M492,278 L510,272 L528,280 L535,295 L525,312 L505,318 L488,310 L485,295 Z',
    pe: 'M502,258 L522,254 L530,262 L520,272 L502,268 Z',
    nl: 'M490,185 L510,168 L535,162 L555,172 L568,195 L560,222 L540,242 L518,248 L500,238 L495,210 Z M530,265 L555,258 L572,272 L565,292 L545,302 L525,292 Z'
};

// Available sectors for filtering
export const AVAILABLE_SECTORS = ['Tech', 'Health', 'Trades', 'Transport', 'Finance'] as const;
