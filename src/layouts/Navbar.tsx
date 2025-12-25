import { Compass, ChevronRight } from 'lucide-react';

interface NavbarProps {
    onNavigate: (page: string) => void;
    currentPage: string;
}

const Navbar = ({ onNavigate, currentPage }: NavbarProps) => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 border-b-white/5 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => onNavigate('home')}
                >
                    <div className="size-8 rounded-lg bg-gradient-to-br from-maple-red to-primary flex items-center justify-center shadow-lg shadow-maple-red/20 group-hover:shadow-maple-red/40 transition-all">
                        <Compass className="text-white w-5 h-5" />
                    </div>
                    <span className="text-white text-xl font-bold tracking-tight group-hover:text-white/90 transition-colors">
                        CanadaPath <span className="text-maple-red">AI</span>
                    </span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <button
                        onClick={() => onNavigate('home')}
                        className={cn("text-sm font-medium transition-colors hover:text-accent-gold", currentPage === 'home' ? "text-white" : "text-gray-300")}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => onNavigate('assessment')}
                        className={cn("text-sm font-medium transition-colors hover:text-accent-gold", currentPage === 'assessment' ? "text-white" : "text-gray-300")}
                    >
                        Assessment
                    </button>
                    <button
                        onClick={() => onNavigate('calculator')}
                        className={cn("text-sm font-medium transition-colors hover:text-accent-gold", currentPage === 'calculator' ? "text-white" : "text-gray-300")}
                    >
                        CRS Calc
                    </button>
                    <button
                        onClick={() => onNavigate('about')}
                        className={cn("text-sm font-medium transition-colors hover:text-accent-gold", currentPage === 'about' || currentPage === 'contact' ? "text-white" : "text-gray-300")}
                    >
                        About
                    </button>
                    <button
                        onClick={() => onNavigate('resources')}
                        className={cn("text-sm font-medium transition-colors hover:text-accent-gold", currentPage === 'resources' ? "text-white" : "text-gray-300")}
                    >
                        Resources
                    </button>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => onNavigate('login')}
                        className={cn("hidden sm:block text-sm font-medium transition-colors hover:text-white", currentPage === 'login' ? "text-white" : "text-gray-300")}
                    >
                        Log In
                    </button>
                    <button
                        onClick={() => onNavigate('assessment')}
                        className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary/20 hover:bg-primary/40 border border-primary/50 text-white text-sm font-bold transition-all shadow-lg shadow-primary/10 group"
                    >
                        <span className="truncate flex items-center gap-2">
                            Get Started
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

// Simple helper inside since we need it here and I don't want to import from relative path if I can avoid extra complexity in this chunk
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
