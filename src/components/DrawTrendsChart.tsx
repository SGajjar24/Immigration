import { useMemo } from 'react';
import {
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    Area,
    ComposedChart
} from 'recharts';
import { TrendingUp, TrendingDown, Minus, Calendar, Users, Target } from 'lucide-react';
import { getGeneralDraws, getDrawStatistics } from '../data/drawData';

interface DrawTrendsChartProps {
    userScore?: number;
    className?: string;
}

export const DrawTrendsChart: React.FC<DrawTrendsChartProps> = ({
    userScore,
    className = ""
}) => {
    const draws = useMemo(() => getGeneralDraws().reverse(), []);
    const stats = useMemo(() => getDrawStatistics(), []);

    // Format data for chart
    const chartData = useMemo(() => {
        return draws.map(draw => ({
            date: new Date(draw.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            fullDate: draw.date,
            score: draw.crsScore,
            invitations: draw.invitationsIssued,
            program: draw.program
        }));
    }, [draws]);

    // Calculate trend
    const trend = useMemo(() => {
        if (chartData.length < 2) return 'stable';
        const recent = chartData.slice(-3).map(d => d.score);
        const older = chartData.slice(-6, -3).map(d => d.score);
        const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
        const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
        if (recentAvg > olderAvg + 3) return 'up';
        if (recentAvg < olderAvg - 3) return 'down';
        return 'stable';
    }, [chartData]);

    // Custom tooltip
    const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { score: number; invitations: number; fullDate: string; program: string } }> }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="glass-panel rounded-xl p-4 shadow-premium border border-white/10">
                    <p className="text-sm text-gray-400 mb-1">
                        {new Date(data.fullDate).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </p>
                    <p className="text-2xl font-bold text-white">{data.score} CRS</p>
                    <p className="text-sm text-gray-300 mt-1">
                        {data.invitations.toLocaleString()} invitations
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{data.program}</p>
                </div>
            );
        }
        return null;
    };

    const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
    const trendColor = trend === 'up' ? 'text-red-400' : trend === 'down' ? 'text-success' : 'text-gray-400';
    const trendLabel = trend === 'up' ? 'Rising' : trend === 'down' ? 'Falling' : 'Stable';

    return (
        <div className={`glass-panel rounded-2xl p-6 ${className}`}>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Target className="w-5 h-5 text-maple-red" />
                        Express Entry Draw Trends
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                        Recent CRS cutoff scores (excluding PNP draws)
                    </p>
                </div>
                <div className={`flex items-center gap-2 ${trendColor}`}>
                    <TrendIcon className="w-5 h-5" />
                    <span className="font-semibold">{trendLabel}</span>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-white">{stats.latest}</p>
                    <p className="text-xs text-gray-400">Latest Cutoff</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-accent-gold">{stats.average}</p>
                    <p className="text-xs text-gray-400">6-Month Avg</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-success">{stats.lowest}</p>
                    <p className="text-xs text-gray-400">Lowest</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-maple-red">{stats.highest}</p>
                    <p className="text-xs text-gray-400">Highest</p>
                </div>
            </div>

            {/* Chart */}
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#dc2626" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="#dc2626" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                        />
                        <YAxis
                            domain={['dataMin - 10', 'dataMax + 10']}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            width={40}
                        />
                        <Tooltip content={<CustomTooltip />} />

                        {/* User score reference line */}
                        {userScore && (
                            <ReferenceLine
                                y={userScore}
                                stroke="#22c55e"
                                strokeDasharray="5 5"
                                label={{
                                    value: `Your Score: ${userScore}`,
                                    fill: '#22c55e',
                                    fontSize: 12,
                                    position: 'insideTopRight'
                                }}
                            />
                        )}

                        <Area
                            type="monotone"
                            dataKey="score"
                            stroke="transparent"
                            fill="url(#scoreGradient)"
                        />
                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#dc2626"
                            strokeWidth={3}
                            dot={{ fill: '#dc2626', strokeWidth: 2, r: 4, stroke: '#0a0f1a' }}
                            activeDot={{ r: 6, fill: '#dc2626', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Last 12 draws</span>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{stats.totalInvitations.toLocaleString()} total invitations</span>
                </div>
                {userScore && (
                    <div className="flex items-center gap-2 text-success">
                        <div className="w-4 h-0.5 bg-success" style={{ borderTop: '2px dashed' }} />
                        <span>Your CRS Score</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DrawTrendsChart;
