import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    ImmigrationProfileSchema,
    type ImmigrationProfile,
    EducationLevels,
    MaritalStatusValues,
    calculateCRS,
    generateSuggestions
} from '../../lib/schema/immigrationProfile';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
    ChevronRight,
    ChevronLeft,
    User,
    GraduationCap,
    Languages,
    Briefcase,
    Award,
    Check,
    AlertCircle
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useImmigrationStore } from '../../store/useImmigrationStore';
import { useNavigate } from 'react-router-dom';

const STEPS = [
    { id: 'personal', title: 'Personal Info', icon: User },
    { id: 'education', title: 'Education', icon: GraduationCap },
    { id: 'language', title: 'Language', icon: Languages },
    { id: 'experience', title: 'Work Experience', icon: Briefcase },
    { id: 'additional', title: 'Additional Factors', icon: Award },
];

interface Props {
    onComplete?: (score: number) => void;
}

export function EligibilityWizard({ onComplete }: Props) {
    const [currentStep, setCurrentStep] = useState(0);
    const [calculatedScore, setCalculatedScore] = useState<number | null>(null);
    const navigate = useNavigate();
    const { updateCRSData, updateUserProfile } = useImmigrationStore();

    const form = useForm<ImmigrationProfile>({
        // @ts-ignore - zodResolver type mismatch with react-hook-form
        resolver: zodResolver(ImmigrationProfileSchema),
        defaultValues: {
            age: 25,
            maritalStatus: 'single',
            educationLevel: 'bachelor',
            educationInCanada: false,
            primaryLanguage: 'english',
            languageScores: { reading: 7, writing: 7, listening: 7, speaking: 7 },
            hasSecondLanguage: false,
            canadianExperience: 0,
            foreignExperience: 0,
            additionalFactors: {
                provincialNomination: false,
                arrangedEmployment: false,
                canadianSibling: false,
                tradesCertification: false,
            }
        },
        mode: 'onChange'
    });

    const { control, watch, handleSubmit, formState: { errors } } = form;
    const watchedValues = watch();
    const isMarried = watchedValues.maritalStatus === 'married' || watchedValues.maritalStatus === 'common-law';

    // Real-time score calculation
    const liveScore = calculateCRS(watchedValues as ImmigrationProfile);

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const onSubmit = (data: ImmigrationProfile) => {
        const score = calculateCRS(data);
        setCalculatedScore(score);

        // Update the store with the calculated data
        updateCRSData({
            age: data.age,
            education: EducationLevels[data.educationLevel].points,
            maritalStatus: data.maritalStatus,
            language: data.languageScores,
            experience: {
                canadian: data.canadianExperience,
                foreign: data.foreignExperience
            },
            additional: {
                pnp: data.additionalFactors.provincialNomination,
                jobOffer: data.additionalFactors.arrangedEmployment,
                sibling: data.additionalFactors.canadianSibling,
                tradeCert: data.additionalFactors.tradesCertification
            },
            lastCalculatedScore: score
        });

        updateUserProfile({ onboarded: true });

        if (onComplete) {
            onComplete(score);
        }
    };

    const progressPercent = ((currentStep + 1) / STEPS.length) * 100;

    // Input component styles
    const inputClass = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all";
    const selectClass = inputClass + " appearance-none cursor-pointer";
    const labelClass = "block text-sm font-medium text-gray-300 mb-2";
    const errorClass = "text-red-400 text-xs mt-1 flex items-center gap-1";

    // Render step content
    const renderStepContent = () => {
        switch (STEPS[currentStep].id) {
            case 'personal':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className={labelClass}>Age</label>
                            <Controller
                                name="age"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type="number"
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                        className={inputClass}
                                        min={18}
                                        max={60}
                                    />
                                )}
                            />
                            {errors.age && (
                                <p className={errorClass}>
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.age.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className={labelClass}>Marital Status</label>
                            <Controller
                                name="maritalStatus"
                                control={control}
                                render={({ field }) => (
                                    <select {...field} className={selectClass}>
                                        {MaritalStatusValues.map(status => (
                                            <option key={status} value={status} className="bg-gray-900">
                                                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                        </div>

                        {isMarried && (
                            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                <p className="text-sm text-blue-300">
                                    You will be able to add spouse details for additional points.
                                </p>
                            </div>
                        )}
                    </div>
                );

            case 'education':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className={labelClass}>Highest Level of Education</label>
                            <Controller
                                name="educationLevel"
                                control={control}
                                render={({ field }) => (
                                    <select {...field} className={selectClass}>
                                        {Object.entries(EducationLevels).map(([key, { label, points }]) => (
                                            <option key={key} value={key} className="bg-gray-900">
                                                {label} ({points} pts)
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <Controller
                                name="educationInCanada"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type="checkbox"
                                        checked={field.value}
                                        onChange={field.onChange}
                                        className="w-5 h-5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/50"
                                    />
                                )}
                            />
                            <label className="text-sm text-gray-300">
                                I completed my education in Canada
                            </label>
                        </div>
                    </div>
                );

            case 'language':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className={labelClass}>Primary Language Test</label>
                            <Controller
                                name="primaryLanguage"
                                control={control}
                                render={({ field }) => (
                                    <select {...field} className={selectClass}>
                                        <option value="english" className="bg-gray-900">English (IELTS/CELPIP)</option>
                                        <option value="french" className="bg-gray-900">French (TEF/TCF)</option>
                                    </select>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {(['reading', 'writing', 'listening', 'speaking'] as const).map(skill => (
                                <div key={skill}>
                                    <label className={labelClass}>{skill.charAt(0).toUpperCase() + skill.slice(1)} (CLB)</label>
                                    <Controller
                                        name={`languageScores.${skill}`}
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                type="number"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                                className={inputClass}
                                                min={0}
                                                max={12}
                                            />
                                        )}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <Controller
                                name="hasSecondLanguage"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type="checkbox"
                                        checked={field.value}
                                        onChange={field.onChange}
                                        className="w-5 h-5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/50"
                                    />
                                )}
                            />
                            <label className="text-sm text-gray-300">
                                I have a second official language (French/English)
                            </label>
                        </div>
                    </div>
                );

            case 'experience':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className={labelClass}>Canadian Work Experience (Years)</label>
                            <Controller
                                name="canadianExperience"
                                control={control}
                                render={({ field }) => (
                                    <select {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} className={selectClass}>
                                        {[0, 1, 2, 3, 4, 5].map(year => (
                                            <option key={year} value={year} className="bg-gray-900">
                                                {year === 0 ? 'None' : year === 5 ? '5+ years' : year + (year > 1 ? ' years' : ' year')}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Foreign Work Experience (Years)</label>
                            <Controller
                                name="foreignExperience"
                                control={control}
                                render={({ field }) => (
                                    <select {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} className={selectClass}>
                                        {[0, 1, 2, 3, 4, 5].map(year => (
                                            <option key={year} value={year} className="bg-gray-900">
                                                {year === 0 ? 'None' : year === 5 ? '5+ years' : year + (year > 1 ? ' years' : ' year')}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>NOC Code (Optional)</label>
                            <Controller
                                name="nocCode"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        className={inputClass}
                                        placeholder="e.g., 21231"
                                        maxLength={5}
                                    />
                                )}
                            />
                            {errors.nocCode && (
                                <p className={errorClass}>
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.nocCode.message}
                                </p>
                            )}
                        </div>
                    </div>
                );

            case 'additional':
                return (
                    <div className="space-y-4">
                        {[
                            { name: 'provincialNomination', label: 'Provincial Nomination (PNP)', points: 600 },
                            { name: 'arrangedEmployment', label: 'Valid Job Offer (LMIA)', points: 50 },
                            { name: 'canadianSibling', label: 'Sibling in Canada (PR/Citizen)', points: 15 },
                            { name: 'tradesCertification', label: 'Canadian Trades Certification', points: 50 },
                        ].map(factor => (
                            <label
                                key={factor.name}
                                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 cursor-pointer transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <Controller
                                        name={`additionalFactors.${factor.name}` as any}
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={field.onChange}
                                                className="w-5 h-5 rounded border-white/20 bg-white/5 text-green-500 focus:ring-green-500/50"
                                            />
                                        )}
                                    />
                                    <span className="text-white">{factor.label}</span>
                                </div>
                                <Badge variant="success">+{factor.points} pts</Badge>
                            </label>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    // Results view
    if (calculatedScore !== null) {
        const suggestions = generateSuggestions(watchedValues as ImmigrationProfile);

        return (
            <div className="space-y-6">
                <Card className="border-white/10 bg-gradient-to-br from-green-500/10 to-blue-500/10">
                    <CardContent className="pt-6 text-center">
                        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                            <span className="text-4xl font-bold text-white">{calculatedScore}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Your CRS Score</h2>
                        <p className="text-gray-400">
                            {calculatedScore >= 500 ? 'Excellent! You have a strong chance of receiving an ITA.' :
                                calculatedScore >= 470 ? 'Good score. Consider improvements to increase your chances.' :
                                    'There are opportunities to improve your score.'}
                        </p>
                    </CardContent>
                </Card>

                {suggestions.length > 0 && (
                    <Card className="border-white/10 bg-white/5">
                        <CardHeader>
                            <CardTitle>Recommendations</CardTitle>
                            <CardDescription>Ways to improve your CRS score</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {suggestions.slice(0, 4).map(suggestion => (
                                <div
                                    key={suggestion.id}
                                    className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
                                >
                                    <Badge variant={
                                        suggestion.impact === 'high' ? 'success' :
                                            suggestion.impact === 'medium' ? 'warning' : 'secondary'
                                    }>
                                        +{suggestion.potentialPoints}
                                    </Badge>
                                    <div>
                                        <p className="text-white font-medium">{suggestion.title}</p>
                                        <p className="text-sm text-gray-400">{suggestion.description}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                    Go to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Header */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Eligibility Assessment</h2>
                    <Badge variant="secondary">{currentStep + 1} of {STEPS.length}</Badge>
                </div>
                <Progress value={progressPercent} className="h-2" />

                {/* Step indicators */}
                <div className="flex justify-between mt-4">
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep;

                        return (
                            <div
                                key={step.id}
                                className={cn(
                                    "flex flex-col items-center gap-1 transition-all",
                                    isActive ? "text-blue-400" : isCompleted ? "text-green-400" : "text-gray-500"
                                )}
                            >
                                <div className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                                    isActive ? "border-blue-400 bg-blue-400/10" :
                                        isCompleted ? "border-green-400 bg-green-400/10" :
                                            "border-gray-600"
                                )}>
                                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                </div>
                                <span className="text-xs hidden sm:block">{step.title}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Live Score Preview */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-white/10">
                <div className="flex justify-between items-center">
                    <span className="text-gray-400">Estimated CRS Score</span>
                    <span className="text-3xl font-bold text-white">{liveScore}</span>
                </div>
            </div>

            {/* Step Content */}
            <Card className="border-white/10 bg-white/5 mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        {(() => { const Icon = STEPS[currentStep].icon; return <Icon className="w-5 h-5" />; })()}
                        {STEPS[currentStep].title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {renderStepContent()}
                </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={cn(
                        "flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all",
                        currentStep === 0
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                            : "bg-white/10 text-white hover:bg-white/20"
                    )}
                >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                </button>

                {currentStep === STEPS.length - 1 ? (
                    <button
                        // @ts-ignore - handleSubmit type compatibility
                        onClick={handleSubmit(onSubmit)}
                        className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                        Calculate Score
                        <Check className="w-5 h-5" />
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                        Next
                        <ChevronRight className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
}
