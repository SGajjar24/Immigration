import CRSCalculator from '../features/Assessment/CRSCalculator';

const CalculatorPage = () => {
    return (
        <div className="min-h-screen pt-32 pb-24 px-6 bg-brand-navy-dark">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">Express Entry <span className="text-brand-red font-black tracking-tight">CRS CALCULATOR</span></h1>
                    <p className="text-white/40 max-w-2xl mx-auto text-lg">
                        Manually calculate your Comprehensive Ranking System (CRS) score and see how you rank against recent immigration draws.
                    </p>
                </div>

                <CRSCalculator />
            </div>
        </div>
    );
};

export default CalculatorPage;
