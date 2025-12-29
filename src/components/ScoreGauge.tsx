import { motion } from 'framer-motion';

interface ScoreGaugeProps {
    score: number;
    maxScore?: number;
    size?: number;
    strokeWidth?: number;
    label?: string;
    className?: string;
}

export const ScoreGauge = ({
    score,
    maxScore = 1200,
    size = 200,
    strokeWidth = 15,
    label = "CRS Score",
    className = ""
}: ScoreGaugeProps) => {
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(score / maxScore, 1);
    const offset = circumference - progress * circumference;

    // Color logic based on score ranges (approximate for CRS)
    const getColor = (s: number) => {
        if (s >= 500) return "#22c55e"; // Success/High (Sage Green)
        if (s >= 450) return "#fbbf24"; // Warning/Medium (Gold)
        return "#dc2626"; // Danger/Low (Maple Red)
    };

    const color = getColor(score);

    return (
        <div className={`relative flex flex-col items-center justify-center ${className}`}>
            <div className="relative" style={{ width: size, height: size }}>
                {/* Background Circle */}
                <svg className="transform -rotate-90 w-full h-full">
                    <circle
                        className="text-white/10"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        r={radius}
                        cx={center}
                        cy={center}
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        fill="transparent"
                        r={radius}
                        cx={center}
                        cy={center}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="text-4xl font-bold font-display text-white"
                    >
                        {score}
                    </motion.span>
                    <span className="text-sm text-gray-400 font-medium uppercase tracking-wider mt-1">
                        {label}
                    </span>
                </div>
            </div>

            {/* Range Indicators (Optional decorative element) */}
            <div className="flex gap-2 mt-4 text-xs font-medium text-gray-500">
                <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-maple-red"></span> &lt;450
                </span>
                <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-accent-gold"></span> 450-499
                </span>
                <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-success"></span> 500+
                </span>
            </div>
        </div>
    );
};

export default ScoreGauge;
