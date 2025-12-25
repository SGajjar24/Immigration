import { Calculator, Clock, FileCheck, Search } from 'lucide-react';

interface QuickToolsProps {
    onNavigate?: (page: string) => void;
}

const QuickTools = ({ onNavigate }: QuickToolsProps) => {
    const handleNavigate = (page: string) => {
        if (onNavigate) {
            onNavigate(page);
        }
    };

    return (
        <section className="py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="glass-panel p-2 flex flex-col md:flex-row items-stretch md:items-center gap-2">
                    <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-2">
                        <button
                            onClick={() => handleNavigate('calculator')}
                            className="flex items-center gap-3 p-4 hover:bg-white/5 rounded-xl transition-colors text-left"
                        >
                            <div className="p-2 bg-maple-red/10 rounded-lg text-maple-red">
                                <Calculator className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">CRS Calc</div>
                                <div className="text-[10px] text-white/40 uppercase tracking-wider">Predict Score</div>
                            </div>
                        </button>

                        <button
                            onClick={() => handleNavigate('resources')}
                            className="flex items-center gap-3 p-4 hover:bg-white/5 rounded-xl transition-colors text-left"
                        >
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">Timelines</div>
                                <div className="text-[10px] text-white/40 uppercase tracking-wider">IRCC Times</div>
                            </div>
                        </button>

                        <button
                            onClick={() => handleNavigate('resources')}
                            className="flex items-center gap-3 p-4 hover:bg-white/5 rounded-xl transition-colors text-left"
                        >
                            <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                                <FileCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">Checklist</div>
                                <div className="text-[10px] text-white/40 uppercase tracking-wider">Document Prep</div>
                            </div>
                        </button>

                        <button
                            onClick={() => handleNavigate('resources')}
                            className="flex items-center gap-3 p-4 hover:bg-white/5 rounded-xl transition-colors text-left"
                        >
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                                <Search className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">NOC Finder</div>
                                <div className="text-[10px] text-white/40 uppercase tracking-wider">Categorization</div>
                            </div>
                        </button>
                    </div>

                    <div className="hidden lg:block w-px h-12 bg-white/10 mx-4" />

                    <div className="p-2">
                        <button
                            onClick={() => handleNavigate('assessment')}
                            className="btn-primary w-full md:w-auto py-3 px-8 whitespace-nowrap rounded-lg"
                        >
                            Run AI Analysis
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuickTools;
