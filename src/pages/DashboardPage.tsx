import { DashboardLayout } from "../components/dashboard/DashboardLayout"
import { DashboardMetrics } from "../components/dashboard/DashboardMetrics"
import { ScoreTrendChart } from "../components/dashboard/ScoreTrendChart"
import { ApplicationTracker } from "../components/dashboard/ApplicationTracker"
import { useImmigrationStore } from "../store/useImmigrationStore"

const DashboardPage = () => {
    const { userProfile } = useImmigrationStore();
    const firstName = userProfile.name?.split(' ')[0] || 'there';

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Welcome Section */}
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Welcome back, {firstName}
                    </h1>
                    <p className="text-gray-400 mt-1">
                        Here's what happened with your application while you were away.
                    </p>
                </div>

                {/* Phase 2: Status Center */}
                <DashboardMetrics />

                <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
                    {/* Phase 3: Score Trend Chart */}
                    <ScoreTrendChart />

                    {/* Phase 4: Application Tracker */}
                    <ApplicationTracker />
                </div>
            </div>
        </DashboardLayout>
    )
}

export default DashboardPage
