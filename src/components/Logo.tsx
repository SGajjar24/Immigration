import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
    className?: string;
    size?: number;
    showText?: boolean;
    onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40, showText = true, onClick }) => {
    return (
        <div className={`flex items-center gap-3 group ${className}`} onClick={onClick}>
            <motion.div
                className="relative flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-[0_0_15px_rgba(191,33,47,0.3)]"
                >
                    {/* Base outer ring */}
                    <circle cx="50" cy="50" r="48" stroke="white" strokeOpacity="0.1" strokeWidth="0.5" />

                    {/* Main diamond path */}
                    <motion.path
                        d="M50 10L85 50L50 90L15 50L50 10Z"
                        stroke="url(#logo-gradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    {/* Inner Maple Leaf stylized geometry */}
                    <motion.path
                        d="M50 25 L58 42 L75 38 L65 55 L78 70 L55 65 L50 85 L45 65 L22 70 L35 55 L25 38 L42 42 Z"
                        fill="url(#maple-gradient)"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
                    />

                    {/* Pulse effect */}
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="url(#logo-gradient)"
                        strokeWidth="0.5"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />

                    <defs>
                        <linearGradient id="logo-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#BF212F" />
                            <stop offset="1" stopColor="#1F3B61" />
                        </linearGradient>
                        <linearGradient id="maple-gradient" x1="25" y1="25" x2="75" y2="85" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FF4D4D" />
                            <stop offset="1" stopColor="#BF212F" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full"></div>
            </motion.div>

            {showText && (
                <span className="text-white text-xl font-black tracking-tight flex items-baseline">
                    CanadaPath
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-500 ml-1">AI</span>
                </span>
            )}
        </div>
    );
};

export default Logo;
