import AssessmentWizard from '../features/Assessment/AssessmentWizard';

const AssessmentPage = () => {
    return (
        <div className="min-h-screen pt-32 pb-24 px-6 bg-brand-navy-dark">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">AI Eligibility <span className="text-brand-red font-extrabold uppercase tracking-tighter">Analysis</span></h1>
                    <p className="text-white/40 max-w-xl mx-auto">
                        Complete this 2-minute assessment to discover your best path to Permanent Residency in Canada.
                    </p>
                </div>

                <AssessmentWizard />
            </div>
        </div>
    );
};

export default AssessmentPage;
