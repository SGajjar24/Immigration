import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import ChatWidget from '../components/ChatWidget';
import { useSyncError } from '../store/useImmigrationStore';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const location = useLocation();
    const syncError = useSyncError();
    const isPathwayExplorer = location.pathname === '/pathway-explorer';
    const isDashboard = location.pathname.startsWith('/dashboard');

    return (
        <div className="min-h-screen bg-background-dark selection:bg-accent-red selection:text-white font-body scroll-smooth">
            {!isPathwayExplorer && !isDashboard && (
                <Navbar />
            )}

            <main>
                {children}
            </main>

            <ChatWidget />

            {/* Sync Status Indicator */}
            {syncError && (
                <div className="fixed bottom-20 left-4 z-50 bg-red-500/90 text-white px-4 py-2 rounded-lg text-sm shadow-lg animate-pulse">
                    ⚠️ {syncError}
                </div>
            )}
        </div>
    );
};

export default MainLayout;
