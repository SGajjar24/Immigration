import { z } from 'zod';

// Language score schema (CLB levels 1-12)
const LanguageScoreSchema = z.object({
    reading: z.number().min(0).max(12),
    writing: z.number().min(0).max(12),
    listening: z.number().min(0).max(12),
    speaking: z.number().min(0).max(12),
});

// Education levels with point values
export const EducationLevels = {
    'none': { label: 'Less than secondary school', points: 0 },
    'secondary': { label: 'Secondary diploma (high school)', points: 30 },
    'one-year': { label: 'One-year post-secondary', points: 90 },
    'two-year': { label: 'Two-year post-secondary', points: 98 },
    'bachelor': { label: "Bachelor's degree", points: 120 },
    'two-or-more': { label: 'Two or more certificates/degrees', points: 128 },
    'master': { label: "Master's degree", points: 135 },
    'phd': { label: 'Doctoral degree (PhD)', points: 150 },
} as const;

export type EducationLevel = keyof typeof EducationLevels;

// Marital status options
export const MaritalStatusValues = ['single', 'married', 'common-law', 'divorced', 'widowed'] as const;
export type MaritalStatus = typeof MaritalStatusValues[number];

// Education level values
const EducationLevelValues = ['none', 'secondary', 'one-year', 'two-year', 'bachelor', 'two-or-more', 'master', 'phd'] as const;

// Main Immigration Profile Schema
export const ImmigrationProfileSchema = z.object({
    // Personal Information
    age: z.number()
        .min(18, 'You must be at least 18 years old')
        .max(60, 'Age must be 60 or below for Express Entry'),

    maritalStatus: z.enum(MaritalStatusValues),

    // Education
    educationLevel: z.enum(EducationLevelValues),
    educationInCanada: z.boolean().default(false),

    // Language (Primary - English or French)
    primaryLanguage: z.enum(['english', 'french']).default('english'),
    languageScores: LanguageScoreSchema,

    // Second language (optional)
    hasSecondLanguage: z.boolean().default(false),
    secondLanguageScores: LanguageScoreSchema.optional(),

    // Work Experience
    canadianExperience: z.number().min(0).max(5),
    foreignExperience: z.number().min(0).max(5),

    // NOC Code
    nocCode: z.string()
        .regex(/^\d{5}$/, 'NOC code must be exactly 5 digits')
        .optional(),

    // Spouse Details (conditional)
    spouseDetails: z.object({
        educationLevel: z.enum(EducationLevelValues).optional(),
        languageScores: LanguageScoreSchema.optional(),
        canadianExperience: z.number().min(0).max(5).optional(),
    }).optional(),

    // Additional Factors
    additionalFactors: z.object({
        provincialNomination: z.boolean(),
        arrangedEmployment: z.boolean(),
        canadianSibling: z.boolean(),
        tradesCertification: z.boolean(),
    }),
});

export type ImmigrationProfile = z.infer<typeof ImmigrationProfileSchema>;

// CRS Calculation Utility
export function calculateCRS(profile: ImmigrationProfile): number {
    let score = 0;
    const isMarried = profile.maritalStatus === 'married' || profile.maritalStatus === 'common-law';

    // Age points (single vs married have different max points)
    const maxAgePoints = isMarried ? 100 : 110;
    if (profile.age >= 18 && profile.age <= 35) {
        score += maxAgePoints;
    } else if (profile.age <= 45) {
        score += maxAgePoints - ((profile.age - 35) * (maxAgePoints / 10));
    }

    // Education points
    const eduLevel = EducationLevels[profile.educationLevel];
    if (eduLevel) {
        score += isMarried ? Math.floor(eduLevel.points * 0.9) : eduLevel.points;
    }

    // Language points (simplified CLB calculation)
    const { reading, writing, listening, speaking } = profile.languageScores;
    const avgCLB = (reading + writing + listening + speaking) / 4;
    const langPoints = isMarried ? 128 : 136;
    score += Math.min(avgCLB * (langPoints / 12), langPoints);

    // Canadian experience
    const canExpPoints = isMarried ? 70 : 80;
    score += Math.min(profile.canadianExperience * (canExpPoints / 5), canExpPoints);

    // Skill Transferability (simplified - max 100 points)
    let transferability = 0;
    if (avgCLB >= 9 && profile.educationLevel !== 'none' && profile.educationLevel !== 'secondary') {
        transferability += 25;
    }
    if (profile.canadianExperience >= 1 && profile.foreignExperience >= 1) {
        transferability += 25;
    }
    if (avgCLB >= 7 && profile.canadianExperience >= 1) {
        transferability += 25;
    }
    score += Math.min(transferability, 100);

    // Additional points
    if (profile.additionalFactors.provincialNomination) score += 600;
    if (profile.additionalFactors.arrangedEmployment) score += 50;
    if (profile.additionalFactors.canadianSibling) score += 15;
    if (profile.additionalFactors.tradesCertification) score += 50;

    // Second language bonus
    if (profile.hasSecondLanguage && profile.secondLanguageScores) {
        const { reading: r2, writing: w2, listening: l2, speaking: s2 } = profile.secondLanguageScores;
        const avgSecond = (r2 + w2 + l2 + s2) / 4;
        score += Math.min(avgSecond * 6, 24);
    }

    // Canadian education bonus
    if (profile.educationInCanada) {
        score += profile.educationLevel === 'one-year' || profile.educationLevel === 'two-year' ? 15 : 30;
    }

    return Math.round(Math.min(score, 1200));
}

// Recommendation Generator
export interface Recommendation {
    id: string;
    title: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
    potentialPoints: number;
}

export function generateSuggestions(profile: ImmigrationProfile): Recommendation[] {
    const suggestions: Recommendation[] = [];
    const avgCLB = (profile.languageScores.reading + profile.languageScores.writing +
        profile.languageScores.listening + profile.languageScores.speaking) / 4;

    // Language improvements
    if (avgCLB < 9) {
        suggestions.push({
            id: 'improve-clb',
            title: 'Improve Language Scores',
            description: avgCLB < 7
                ? 'Your CLB scores are below 7. Consider intensive IELTS preparation to significantly boost your score.'
                : 'Achieving CLB 9+ in all abilities can add up to 30 points.',
            impact: 'high',
            potentialPoints: avgCLB < 7 ? 50 : 30
        });
    }

    // Education upgrades
    if (profile.educationLevel === 'bachelor') {
        suggestions.push({
            id: 'education-upgrade',
            title: 'Consider Two or More Credentials',
            description: 'Having two or more post-secondary credentials can add 8+ points and improve skill transferability.',
            impact: 'medium',
            potentialPoints: 15
        });
    }

    // Canadian experience
    if (profile.canadianExperience === 0) {
        suggestions.push({
            id: 'canadian-exp',
            title: 'Gain Canadian Work Experience',
            description: 'Even 1 year of Canadian experience significantly boosts your score and skill transferability.',
            impact: 'high',
            potentialPoints: 40
        });
    }

    // PNP consideration
    if (!profile.additionalFactors.provincialNomination) {
        suggestions.push({
            id: 'consider-pnp',
            title: 'Apply for Provincial Nomination',
            description: 'A PNP nomination adds 600 points, virtually guaranteeing an ITA.',
            impact: 'high',
            potentialPoints: 600
        });
    }

    // Second language
    if (!profile.hasSecondLanguage) {
        suggestions.push({
            id: 'second-language',
            title: 'Add a Second Language',
            description: 'French proficiency can add up to 24 bonus points.',
            impact: 'medium',
            potentialPoints: 24
        });
    }

    // Spouse language improvement
    if ((profile.maritalStatus === 'married' || profile.maritalStatus === 'common-law') &&
        profile.spouseDetails?.languageScores) {
        const spouseAvg = (profile.spouseDetails.languageScores.reading +
            profile.spouseDetails.languageScores.speaking +
            profile.spouseDetails.languageScores.listening +
            profile.spouseDetails.languageScores.writing) / 4;
        if (spouseAvg < 5) {
            suggestions.push({
                id: 'spouse-language',
                title: "Improve Spouse's Language Scores",
                description: "Your spouse's CLB scores can add up to 20 points.",
                impact: 'medium',
                potentialPoints: 20
            });
        }
    }

    return suggestions.sort((a, b) => b.potentialPoints - a.potentialPoints);
}
