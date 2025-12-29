import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import QuickTools from '../components/QuickTools';
import ProgramComparison from '../components/ProgramComparison';
import FeaturesSection from '../components/FeaturesSection';
import CanadaMap from '../components/CanadaMap';
import TestimonialsSection from '../components/TestimonialsSection';
import ConsultationBooking from '../components/ConsultationBooking';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <>
            <Hero />
            <HowItWorks />
            <QuickTools />
            <ProgramComparison />
            <FeaturesSection />
            <CanadaMap />
            <TestimonialsSection />
            <ConsultationBooking />
            <Footer />
        </>
    );
};

export default HomePage;
