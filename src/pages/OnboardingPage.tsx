import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { EligibilityWizard } from '../components/onboarding/EligibilityWizard';

export default function OnboardingPage() {
    return (
        <DashboardLayout>
            <div className="max-w-3xl mx-auto py-8">
                <EligibilityWizard />
            </div>
        </DashboardLayout>
    );
}
