import { Link, useLocation } from "react-router-dom"
import { cn } from "../../utils/cn"
import { LayoutDashboard, User, Calculator, FileText, Briefcase, Settings, X } from "lucide-react"
import Logo from "../Logo"

const sidebarItems = [
    { label: "Home", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Profile", href: "/dashboard/profile", icon: User },
    { label: "CRS Calculator", href: "/calculator", icon: Calculator },
    { label: "Document Vault", href: "/dashboard/documents", icon: FileText },
    { label: "Job Matcher", href: "/dashboard/jobs", icon: Briefcase },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const location = useLocation();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside className={cn(
                "fixed top-0 left-0 z-50 h-screen w-64 bg-background-dark border-r border-white/10 transition-transform duration-300 lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex h-16 items-center px-6 border-b border-white/10 justify-between">
                    <Logo size={28} />
                    <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="py-6 px-3 space-y-1">
                    {sidebarItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                onClick={() => window.innerWidth < 1024 && onClose()}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-blue-500/10 text-blue-400"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </Link>
                        )
                    })}
                </div>

                <div className="absolute bottom-6 left-0 right-0 px-6">
                    <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-white/10">
                        <h4 className="text-white font-bold text-sm mb-1">Upgrade Plan</h4>
                        <p className="text-xs text-gray-400 mb-3">Unlock AI Document scanning.</p>
                        <button className="w-full bg-primary hover:bg-primary-light text-white text-xs font-bold py-2 rounded-lg transition-colors">
                            View Plans
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}
