// Express Entry Draw Data - Historical
// Source: IRCC Express Entry Rounds of Invitations

export interface ExpressEntryDraw {
    id: string;
    date: string;
    program: 'No Program Specified' | 'Canadian Experience Class' | 'Provincial Nominee Program' | 'Federal Skilled Worker' | 'Federal Skilled Trades';
    crsScore: number;
    invitationsIssued: number;
    tieBreakingRule?: string;
}

// Last 6 months of Express Entry draws (sample data - update with real IRCC data)
export const expressEntryDraws: ExpressEntryDraw[] = [
    {
        id: "293",
        date: "2025-01-08",
        program: "No Program Specified",
        crsScore: 525,
        invitationsIssued: 5500
    },
    {
        id: "292",
        date: "2025-01-03",
        program: "Provincial Nominee Program",
        crsScore: 720,
        invitationsIssued: 1980
    },
    {
        id: "291",
        date: "2024-12-18",
        program: "No Program Specified",
        crsScore: 529,
        invitationsIssued: 5450
    },
    {
        id: "290",
        date: "2024-12-11",
        program: "Canadian Experience Class",
        crsScore: 517,
        invitationsIssued: 4800
    },
    {
        id: "289",
        date: "2024-12-04",
        program: "No Program Specified",
        crsScore: 531,
        invitationsIssued: 5500
    },
    {
        id: "288",
        date: "2024-11-27",
        program: "Provincial Nominee Program",
        crsScore: 739,
        invitationsIssued: 2040
    },
    {
        id: "287",
        date: "2024-11-20",
        program: "No Program Specified",
        crsScore: 533,
        invitationsIssued: 5000
    },
    {
        id: "286",
        date: "2024-11-06",
        program: "Canadian Experience Class",
        crsScore: 522,
        invitationsIssued: 4600
    },
    {
        id: "285",
        date: "2024-10-30",
        program: "No Program Specified",
        crsScore: 528,
        invitationsIssued: 5600
    },
    {
        id: "284",
        date: "2024-10-23",
        program: "Federal Skilled Worker",
        crsScore: 524,
        invitationsIssued: 4800
    },
    {
        id: "283",
        date: "2024-10-16",
        program: "No Program Specified",
        crsScore: 530,
        invitationsIssued: 5200
    },
    {
        id: "282",
        date: "2024-10-09",
        program: "Provincial Nominee Program",
        crsScore: 742,
        invitationsIssued: 1980
    },
    {
        id: "281",
        date: "2024-10-02",
        program: "No Program Specified",
        crsScore: 527,
        invitationsIssued: 5400
    },
    {
        id: "280",
        date: "2024-09-25",
        program: "Canadian Experience Class",
        crsScore: 519,
        invitationsIssued: 4500
    },
    {
        id: "279",
        date: "2024-09-18",
        program: "No Program Specified",
        crsScore: 531,
        invitationsIssued: 5000
    },
    {
        id: "278",
        date: "2024-09-11",
        program: "Federal Skilled Worker",
        crsScore: 526,
        invitationsIssued: 4700
    },
    {
        id: "277",
        date: "2024-09-04",
        program: "No Program Specified",
        crsScore: 524,
        invitationsIssued: 5500
    },
    {
        id: "276",
        date: "2024-08-28",
        program: "Provincial Nominee Program",
        crsScore: 735,
        invitationsIssued: 2100
    },
    {
        id: "275",
        date: "2024-08-21",
        program: "No Program Specified",
        crsScore: 532,
        invitationsIssued: 4900
    },
    {
        id: "274",
        date: "2024-08-14",
        program: "Canadian Experience Class",
        crsScore: 520,
        invitationsIssued: 4400
    },
    {
        id: "273",
        date: "2024-08-07",
        program: "No Program Specified",
        crsScore: 529,
        invitationsIssued: 5100
    },
    {
        id: "272",
        date: "2024-07-31",
        program: "Federal Skilled Worker",
        crsScore: 523,
        invitationsIssued: 4600
    },
    {
        id: "271",
        date: "2024-07-24",
        program: "No Program Specified",
        crsScore: 527,
        invitationsIssued: 5300
    },
    {
        id: "270",
        date: "2024-07-17",
        program: "Provincial Nominee Program",
        crsScore: 741,
        invitationsIssued: 1920
    }
];

// Get draws filtered by program type (excluding PNP for cleaner chart)
export const getGeneralDraws = (): ExpressEntryDraw[] => {
    return expressEntryDraws
        .filter(draw => draw.program !== 'Provincial Nominee Program')
        .slice(0, 12);
};

// Get statistics
export const getDrawStatistics = () => {
    const generalDraws = getGeneralDraws();
    const scores = generalDraws.map(d => d.crsScore);

    return {
        latest: generalDraws[0]?.crsScore || 0,
        average: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
        lowest: Math.min(...scores),
        highest: Math.max(...scores),
        totalInvitations: generalDraws.reduce((sum, d) => sum + d.invitationsIssued, 0)
    };
};

export default expressEntryDraws;
