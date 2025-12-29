import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Calendar, TrendingUp, CheckCircle2, Award } from "lucide-react"
import { Badge } from "../ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { useImmigrationStore } from "../../store/useImmigrationStore"

// Helper to calculate profile completeness
function calculateProfileCompleteness(userProfile: any, crsData: any): number {
    let score = 0;
    const checks = [
        userProfile.name && userProfile.name !== 'Guest', // Has name
        userProfile.email, // Has email
        userProfile.targetProvince, // Selected target province
        crsData.lastCalculatedScore !== null, // Has calculated CRS
        crsData.language.reading > 0 && crsData.language.writing > 0, // Has language scores
        crsData.education > 0, // Has education
        crsData.experience.canadian > 0 || crsData.experience.foreign > 0, // Has work experience
        userProfile.onboarded, // Completed onboarding
    ];

    checks.forEach(check => { if (check) score += 12.5; });
    return Math.round(score);
}

// Helper to determine success chance based on CRS score
function getSuccessChance(score: number | null): { level: string; variant: 'success' | 'warning' | 'destructive' } {
    if (!score) return { level: 'Unknown', variant: 'warning' };
    if (score >= 500) return { level: 'High', variant: 'success' };
    if (score >= 470) return { level: 'Medium', variant: 'warning' };
    return { level: 'Low', variant: 'destructive' };
}

// Get CRS percentile estimate
function getCRSPercentile(score: number | null): string {
    if (!score) return 'Calculate your score';
    if (score >= 500) return 'Top 5% of pool';
    if (score >= 480) return 'Top 10% of pool';
    if (score >= 470) return 'Top 15% of pool';
    if (score >= 450) return 'Top 25% of pool';
    if (score >= 400) return 'Top 40% of pool';
    return 'Consider PNP streams';
}

export function DashboardMetrics() {
    const { userProfile, crsData } = useImmigrationStore();

    const crsScore = crsData.lastCalculatedScore;
    const profileCompleteness = calculateProfileCompleteness(userProfile, crsData);
    const successChance = getSuccessChance(crsScore);
    const percentile = getCRSPercentile(crsScore);

    const completenessData = [
        { name: "Completed", value: profileCompleteness },
        { name: "Remaining", value: 100 - profileCompleteness }
    ];
    const COLORS = ['#22c55e', '#374151'];

    // Determine what's missing for profile
    const getMissingItem = (): string => {
        if (!crsScore) return 'Calculate CRS to continue';
        if (!userProfile.targetProvince) return 'Select target province';
        if (crsData.language.reading === 0) return 'Add language scores';
        if (!userProfile.onboarded) return 'Complete onboarding';
        return 'Profile complete!';
    };

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: CRS Score */}
            <Card className="border-white/10 bg-white/5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">CRS Score</CardTitle>
                    <Award className="h-4 w-4 text-accent-gold" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-white">
                        {crsScore ?? '–'}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                        <span className="text-green-400 font-medium">{percentile}</span>
                    </p>
                </CardContent>
            </Card>

            {/* Card 2: Next Draw */}
            <Card className="border-white/10 bg-white/5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Next Draw</CardTitle>
                    <Calendar className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-white">~4 Days</div>
                    <p className="text-xs text-gray-400 mt-1">
                        Probability: <span className="text-blue-400">High</span>
                    </p>
                </CardContent>
            </Card>

            {/* Card 3: Profile Completeness */}
            <Card className="border-white/10 bg-white/5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completeness</CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                    <div className="h-12 w-12 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={completenessData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={15}
                                    outerRadius={22}
                                    paddingAngle={0}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {completenessData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
                            {profileCompleteness}%
                        </div>
                    </div>
                    <p className="text-xs text-gray-400">
                        {getMissingItem()}
                    </p>
                </CardContent>
            </Card>

            {/* Card 4: Success Chance */}
            <Card className="border-white/10 bg-white/5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Est. Success</CardTitle>
                    <TrendingUp className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="text-2xl font-bold text-white">{successChance.level}</div>
                    </div>
                    <Badge variant={successChance.variant} className="mt-1">
                        {crsScore ? (crsScore >= 470 ? 'Good Standing' : 'Improve Score') : 'Calculate Score'}
                    </Badge>
                </CardContent>
            </Card>
        </div>
    )
}
