import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { CheckCircle2, Circle, Lock, Clock } from "lucide-react"
import { cn } from "../../utils/cn"
import { useImmigrationStore } from "../../store/useImmigrationStore"

interface ApplicationStage {
    id: string;
    title: string;
    status: 'completed' | 'active' | 'pending' | 'locked';
    date?: string;
    tasks?: { id: string; label: string; status: 'completed' | 'pending' }[];
}

export function ApplicationTracker() {
    const { crsData, assessmentHistory } = useImmigrationStore();

    // Determine stages based on actual user progress
    const hasCalculatedScore = crsData.lastCalculatedScore !== null;
    const hasAssessment = assessmentHistory.length > 0;
    const hasLanguageScores = crsData.language.reading > 0 && crsData.language.writing > 0;

    // Dynamic stages based on real user progress
    const applicationStages: ApplicationStage[] = [
        {
            id: '1',
            title: 'Eligibility Check',
            status: hasAssessment ? 'completed' : (hasCalculatedScore ? 'active' : 'pending'),
            date: hasAssessment ? new Date(assessmentHistory[0]?.date || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : undefined
        },
        {
            id: '2',
            title: 'Document Gathering',
            status: hasAssessment ? 'active' : 'locked',
            tasks: hasAssessment ? [
                { id: 't1', label: 'WES Evaluation', status: 'pending' },
                { id: 't2', label: 'IELTS/CELPIP Exam', status: hasLanguageScores ? 'completed' : 'pending' },
                { id: 't3', label: 'Reference Letters', status: 'pending' },
                { id: 't4', label: 'Police Clearance', status: 'pending' }
            ] : undefined
        },
        {
            id: '3',
            title: 'Profile Submission',
            status: 'locked'
        },
        {
            id: '4',
            title: 'ITA Received',
            status: 'locked'
        }
    ];

    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-3 border-white/10 bg-white/5">
            <CardHeader>
                <CardTitle>Immigration Roadmap</CardTitle>
                <CardDescription>
                    Track your progress towards Permanent Residency
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    {/* Progress Bar Background */}
                    <div className="absolute top-5 left-0 w-full h-0.5 bg-white/10 hidden md:block" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
                        {applicationStages.map((stage, index) => {
                            const isActive = stage.status === 'active';
                            const isCompleted = stage.status === 'completed';

                            return (
                                <div key={stage.id} className="relative flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">

                                    {/* Icon Node */}
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 shrink-0 bg-background-dark",
                                        isCompleted ? "border-green-500 text-green-500" :
                                            isActive ? "border-blue-500 text-blue-500 animate-pulse" :
                                                "border-white/10 text-gray-500"
                                    )}>
                                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> :
                                            isActive ? <Clock className="w-5 h-5" /> :
                                                <Lock className="w-4 h-4" />}
                                    </div>

                                    {/* Mobile Connecting Line */}
                                    {index !== applicationStages.length - 1 && (
                                        <div className="absolute left-5 top-10 bottom-[-2rem] w-0.5 bg-white/10 md:hidden block" />
                                    )}

                                    <div className="md:mt-4 md:text-center w-full md:w-auto">
                                        <h4 className={cn(
                                            "text-sm font-semibold",
                                            isCompleted ? "text-white" :
                                                isActive ? "text-blue-400" :
                                                    "text-gray-500"
                                        )}>
                                            {stage.title}
                                        </h4>

                                        {stage.date && (
                                            <p className="text-xs text-green-400 mt-0.5">Completed: {stage.date}</p>
                                        )}

                                        {isActive && stage.tasks && (
                                            <div className="mt-3 space-y-2 bg-white/5 p-3 rounded-lg border border-white/5">
                                                {stage.tasks.map(task => (
                                                    <div key={task.id} className="flex items-center gap-2">
                                                        {task.status === 'completed' ? (
                                                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                                                        ) : (
                                                            <Circle className="w-3 h-3 text-gray-500" />
                                                        )}
                                                        <span className={cn("text-xs", task.status === 'completed' ? "text-gray-400 line-through" : "text-white")}>
                                                            {task.label}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {!hasAssessment && stage.status === 'pending' && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                <a href="/assessment" className="text-blue-400 hover:underline">Start assessment</a>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
