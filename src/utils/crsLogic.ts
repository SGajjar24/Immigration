/**
 * CRS Scoring Logic Utility
 * Based on IRCC Express Entry Comprehensive Ranking System (CRS) Criteria
 */

export interface CRSState {
    age: number;
    education: number;
    maritalStatus: string;
    language: {
        reading: number;
        writing: number;
        listening: number;
        speaking: number;
    };
    experience: {
        canadian: number;
        foreign: number;
    };
    additional: {
        pnp: boolean;
        jobOffer: boolean;
        sibling: boolean;
        tradeCert: boolean;
    };
}

export interface CRSResult {
    core: number;
    spouse: number;
    transferability: number;
    additional: number;
    total: number;
}

/**
 * Calculates the CRS score based on the provided data.
 */
export const calculateCRS = (data: CRSState): CRSResult => {
    const { age, education, maritalStatus, language, experience, additional } = data;
    const isMarried = maritalStatus === 'married' || maritalStatus === 'common-law';

    let core = 0;
    let spouse = 0;
    let transferability = 0;
    let additionalPoints = 0;

    // 1. Age (Max 110 Single, 100 Married)
    // 20-29: 110 (Single), 100 (Married)
    const baseAge = isMarried ? 100 : 110;
    if (age >= 20 && age <= 29) {
        core += baseAge;
    } else if (age < 20) {
        // 18: 99/90, 19: 105/95
        core += age === 18 ? (isMarried ? 90 : 99) : (isMarried ? 95 : 105);
    } else {
        // 30: 105/95, drops 5 per year
        core += Math.max(0, baseAge - (age - 29) * 5);
    }

    // 2. Education (Max 150 Single, 140 Married)
    // Values are passed as points from the UI options
    // For married, we apply a consistent relative reduction (~7%) or use hardcoded mappings
    // Since UI sends 150, 135, etc. we adjust for marital status
    const eduPoints = isMarried ? Math.round(education * 0.93) : education;
    core += eduPoints;

    // 3. First Official Language (Max 136 Single, 128 Married)
    // CLB 10+: 34/32 per skill
    // CLB 9: 31/29
    // CLB 8: 23/22
    // CLB 7: 17/16
    const langPoints = Object.values(language).reduce((acc, clb) => {
        if (clb >= 10) return acc + (isMarried ? 32 : 34);
        if (clb === 9) return acc + (isMarried ? 29 : 31);
        if (clb === 8) return acc + (isMarried ? 22 : 23);
        if (clb === 7) return acc + (isMarried ? 16 : 17);
        if (clb === 6) return acc + (isMarried ? 8 : 9);
        return acc + (isMarried ? 6 : 6);
    }, 0);
    core += langPoints;

    // 4. Canadian Experience (Max 80 Single, 70 Married)
    const expPoints = (yrs: number) => {
        if (yrs >= 5) return isMarried ? 70 : 80;
        if (yrs === 4) return isMarried ? 63 : 72;
        if (yrs === 3) return isMarried ? 56 : 64;
        if (yrs === 2) return isMarried ? 46 : 53;
        if (yrs === 1) return isMarried ? 35 : 40;
        return 0;
    };
    core += expPoints(experience.canadian);

    // 5. Spouse Factors (Simplification: Fixed bonus if married)
    if (isMarried) {
        spouse = 40; // Base assumption for "Spouse Human Capital"
    }

    // 6. Skill Transferability (Max 100)
    // Education + Language
    if (education >= 135 && Object.values(language).every(l => l >= 9)) {
        transferability += 50;
    } else if (education >= 120 && Object.values(language).every(l => l >= 7)) {
        transferability += 25;
    }

    // Foreign Exp + Language
    if (experience.foreign >= 3 && Object.values(language).every(l => l >= 9)) {
        transferability += 50;
    } else if (experience.foreign >= 1 && Object.values(language).every(l => l >= 7)) {
        transferability += 25;
    }
    transferability = Math.min(100, transferability);

    // 7. Additional Points (Max 600)
    if (additional.pnp) additionalPoints += 600;
    if (additional.jobOffer) additionalPoints += 50; // NOC 0, A, B
    if (additional.sibling) additionalPoints += 15;
    if (additional.tradeCert) additionalPoints += 50;

    const total = Math.min(1200, core + spouse + transferability + additionalPoints);

    return {
        core,
        spouse,
        transferability,
        additional: additionalPoints,
        total
    };
};
