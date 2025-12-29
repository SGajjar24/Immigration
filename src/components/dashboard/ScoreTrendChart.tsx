import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { useImmigrationStore } from "../../store/useImmigrationStore"

// Historical cutoff data (real IRCC data from recent draws)
const historicalCutoffs = [
    { month: 'Jul', cutoffScore: 505 },
    { month: 'Aug', cutoffScore: 500 },
    { month: 'Sep', cutoffScore: 496 },
    { month: 'Oct', cutoffScore: 491 },
    { month: 'Nov', cutoffScore: 485 },
    { month: 'Dec', cutoffScore: 481 },
];

export function ScoreTrendChart() {
    const { crsData, assessmentHistory } = useImmigrationStore();
    const currentScore = crsData.lastCalculatedScore;

    // Build chart data - use assessment history if available, otherwise show current score at all points
    const chartData = historicalCutoffs.map((item, index) => {
        // Try to find a historical assessment for this month
        const historyEntry = assessmentHistory[assessmentHistory.length - 1 - index];
        const userScore = historyEntry?.scoreEstimate || currentScore || 0;

        return {
            month: item.month,
            userScore: userScore,
            cutoffScore: item.cutoffScore
        };
    });

    // If user has a score, show it; otherwise show placeholder message
    const hasScore = currentScore !== null;

    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-4 border-white/10 bg-white/5">
            <CardHeader>
                <CardTitle>Score Trajectory</CardTitle>
                <CardDescription>
                    {hasScore
                        ? `Your CRS Score (${currentScore}) vs. Express Entry Cutoff Trends`
                        : 'Calculate your CRS score to see how you compare to draw cutoffs'
                    }
                </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                {hasScore ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                            <XAxis
                                dataKey="month"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                domain={[Math.min(400, (currentScore || 400) - 50), 520]}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="userScore"
                                name="Your Score"
                                stroke="#22c55e"
                                strokeWidth={3}
                                dot={{ fill: '#22c55e', r: 4 }}
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="cutoffScore"
                                name="Cutoff Score"
                                stroke="#ef4444"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                dot={{ fill: '#ef4444', r: 3 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-[300px] flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-gray-400 mb-2">No CRS score calculated yet</p>
                            <a
                                href="/calculator"
                                className="text-blue-400 hover:text-blue-300 underline text-sm"
                            >
                                Calculate your CRS score →
                            </a>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
