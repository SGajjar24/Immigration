import { ChevronRight, LayoutDashboard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import { AuthButton } from '../components/AuthButton';
import { cn } from '../utils/cn';
import { auth } from '../lib/firebase';
import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';

const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    const isActive = (path: string) => currentPath === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 border-b-white/5 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/">
                    <Logo
                        size={36}
                        className="cursor-pointer"
                    />
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8">
                    <Link
                        to="/"
                        className={cn("text-sm font-medium transition-colors hover:text-accent-gold", isActive('/') ? "text-white" : "text-gray-300")}
                    >
                        Home
                    </Link>
                    <Link
                        to="/assessment"
                        className={cn("text-sm font-medium transition-colors hover:text-accent-gold", isActive('/assessment') ? "text-white" : "text-gray-300")}
                    >
                        Assessment
                    </Link>
                    <Link
                        to="/calculator"
                        className={cn("text-sm font-medium transition-colors hover:text-accent-gold", isActive('/calculator') ? "text-white" : "text-gray-300")}
                    >
                        CRS Calc
                    </Link>
                    <Link
                        to="/about"
                        className={cn("text-sm font-medium transition-colors hover:text-accent-gold", isActive('/about') || isActive('/contact') ? "text-white" : "text-gray-300")}
                    >
                        About
                    </Link>
                    <Link
                        to="/resources"
                        className={cn("text-sm font-medium transition-colors hover:text-accent-gold", isActive('/resources') ? "text-white" : "text-gray-300")}
                    >
                        Resources
                    </Link>
                </div>

                {/* Auth & Actions */}
                <div className="flex items-center gap-4">
                    <AuthButton />

                    <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block"></div>

                    {user ? (
                        <Link
                            to="/dashboard"
                            className={cn(
                                "hidden sm:flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all hover:bg-white/5",
                                isActive('/dashboard') ? "text-white bg-white/10" : "text-gray-300"
                            )}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            to="/assessment"
                            className="hidden md:flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-5 bg-primary/20 hover:bg-primary/40 border border-primary/50 text-white text-sm font-bold transition-all shadow-lg shadow-primary/10 group"
                        >
                            <span className="truncate flex items-center gap-2">
                                Get Started
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
