import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card, CardContent } from '../../components/ui/card';
import { Briefcase, MapPin, DollarSign, Clock, ExternalLink, Heart, Search } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../../components/ui/badge';

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: 'full-time' | 'part-time' | 'contract';
    nocCode: string;
    lmiaAvailable: boolean;
    postedDays: number;
    match: number; // percentage match
}

const mockJobs: Job[] = [
    {
        id: '1',
        title: 'Senior Software Engineer',
        company: 'Tech Solutions Inc.',
        location: 'Toronto, ON',
        salary: '$120,000 - $150,000',
        type: 'full-time',
        nocCode: '21231',
        lmiaAvailable: true,
        postedDays: 2,
        match: 95
    },
    {
        id: '2',
        title: 'Full Stack Developer',
        company: 'StartupXYZ',
        location: 'Vancouver, BC',
        salary: '$100,000 - $130,000',
        type: 'full-time',
        nocCode: '21231',
        lmiaAvailable: false,
        postedDays: 5,
        match: 88
    },
    {
        id: '3',
        title: 'DevOps Engineer',
        company: 'Cloud Systems Ltd.',
        location: 'Calgary, AB',
        salary: '$110,000 - $140,000',
        type: 'full-time',
        nocCode: '21231',
        lmiaAvailable: true,
        postedDays: 1,
        match: 82
    },
    {
        id: '4',
        title: 'Data Analyst',
        company: 'Analytics Corp',
        location: 'Montreal, QC',
        salary: '$80,000 - $100,000',
        type: 'full-time',
        nocCode: '21211',
        lmiaAvailable: false,
        postedDays: 7,
        match: 75
    },
];

export default function JobMatcherPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [savedJobs, setSavedJobs] = useState<string[]>([]);

    const filteredJobs = mockJobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleSave = (jobId: string) => {
        setSavedJobs(prev =>
            prev.includes(jobId)
                ? prev.filter(id => id !== jobId)
                : [...prev, jobId]
        );
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">Job Matcher</h1>
                    <p className="text-gray-400">Find LMIA-approved jobs that match your skills</p>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by job title, company, or location..."
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <Card className="border-white/10 bg-white/5">
                        <CardContent className="pt-4 text-center">
                            <p className="text-2xl font-bold text-white">{mockJobs.length}</p>
                            <p className="text-sm text-gray-400">Jobs Found</p>
                        </CardContent>
                    </Card>
                    <Card className="border-green-500/20 bg-green-500/5">
                        <CardContent className="pt-4 text-center">
                            <p className="text-2xl font-bold text-green-400">{mockJobs.filter(j => j.lmiaAvailable).length}</p>
                            <p className="text-sm text-gray-400">LMIA Available</p>
                        </CardContent>
                    </Card>
                    <Card className="border-blue-500/20 bg-blue-500/5">
                        <CardContent className="pt-4 text-center">
                            <p className="text-2xl font-bold text-blue-400">{savedJobs.length}</p>
                            <p className="text-sm text-gray-400">Saved Jobs</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Job Cards */}
                <div className="space-y-4">
                    {filteredJobs.map(job => (
                        <Card key={job.id} className="border-white/10 bg-white/5 hover:border-white/20 transition-colors">
                            <CardContent className="pt-6">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                                                <p className="text-gray-400">{job.company}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {job.lmiaAvailable && (
                                                    <Badge variant="success">LMIA Available</Badge>
                                                )}
                                                <Badge variant="secondary">{job.match}% Match</Badge>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" /> {job.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <DollarSign className="w-4 h-4" /> {job.salary}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" /> {job.postedDays}d ago
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Briefcase className="w-4 h-4" /> NOC {job.nocCode}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => toggleSave(job.id)}
                                            className={`p-2 rounded-lg transition-colors ${savedJobs.includes(job.id)
                                                ? 'bg-red-500/20 text-red-400'
                                                : 'bg-white/10 text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            <Heart className={`w-5 h-5 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                                        </button>
                                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2">
                                            Apply <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredJobs.length === 0 && (
                    <div className="text-center py-12">
                        <Briefcase className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                        <p className="text-gray-400">No jobs found matching your search.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
