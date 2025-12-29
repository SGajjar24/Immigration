import { useState, useRef, useEffect } from "react"
import { Sidebar } from "./Sidebar"
import { Bell, Menu, ChevronRight, LogOut, User as UserIcon, Settings } from "lucide-react"
import { cn } from "../../utils/cn"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { auth } from "../../lib/firebase"
import { signOut } from "firebase/auth"
import { useImmigrationStore } from "../../store/useImmigrationStore"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const profileRef = useRef<HTMLDivElement>(null);

    // Get real user data from store
    const { userProfile } = useImmigrationStore();
    const userName = userProfile.name || 'User';
    const userEmail = userProfile.email || '';
    const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    // Generate breadcrumbs from path
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = pathSegments.map((segment, index) => ({
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        href: '/' + pathSegments.slice(0, index + 1).join('/')
    }));

    return (
        <div className="min-h-screen bg-background-dark">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content */}
            <div className="lg:pl-64 flex flex-col min-h-screen">
                {/* Top Header */}
                <header className="sticky top-0 z-40 h-16 bg-background-dark/80 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-400 hover:text-white"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Breadcrumbs */}
                        <nav className="hidden md:flex items-center text-sm text-gray-500">
                            {breadcrumbs.map((crumb, index) => (
                                <div key={crumb.href} className="flex items-center">
                                    {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
                                    <Link
                                        to={crumb.href}
                                        className={cn(
                                            "hover:text-white transition-colors",
                                            index === breadcrumbs.length - 1 ? "text-white font-medium" : ""
                                        )}
                                    >
                                        {crumb.label}
                                    </Link>
                                </div>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Notification Bell */}
                        <button className="relative text-gray-400 hover:text-white transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                                3
                            </span>
                        </button>

                        <div className="h-6 w-px bg-white/10 mx-2" />

                        {/* User Profile Dropdown */}
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-3 hover:bg-white/5 p-1.5 rounded-full transition-colors group"
                            >
                                {userProfile.photoURL ? (
                                    <img
                                        src={userProfile.photoURL}
                                        alt={userName}
                                        className="w-8 h-8 rounded-full ring-2 ring-transparent group-hover:ring-accent-gold transition-all object-cover"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-transparent group-hover:ring-accent-gold transition-all">
                                        {userInitials}
                                    </div>
                                )}
                                <span className="hidden md:block text-sm font-medium text-white group-hover:text-gray-200">
                                    {userName}
                                </span>
                            </button>

                            {/* Dropdown Menu */}
                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-[#0f172a] border border-white/10 rounded-xl shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                                    <div className="px-4 py-2 border-b border-white/5">
                                        <p className="text-sm font-medium text-white">{userName}</p>
                                        <p className="text-xs text-gray-400 truncate">{userEmail}</p>
                                    </div>
                                    <Link
                                        to="/dashboard/profile"
                                        onClick={() => setProfileOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        <UserIcon className="w-4 h-4" />
                                        Profile
                                    </Link>
                                    <Link
                                        to="/dashboard/settings"
                                        onClick={() => setProfileOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </Link>
                                    <div className="h-px bg-white/5 my-1" />
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
