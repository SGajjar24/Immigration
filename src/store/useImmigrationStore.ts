import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Types derived from existing components
export interface CRSState {
    age: number;
    education: number;
    maritalStatus: string;
    language: {
        reading: number;
        writing: number;
        listening: number;
        speaking: number;
    };
    experience: {
        canadian: number;
        foreign: number;
    };
    additional: {
        pnp: boolean;
        jobOffer: boolean;
        sibling: boolean;
        tradeCert: boolean;
    };
    lastCalculatedScore: number | null;
}

export interface AssessmentResult {
    id: string; // Uuid
    date: string; // ISO date
    eligible: boolean;
    recommendedPath: string;
    scoreEstimate: number;
    tags: string[]; // e.g., ["French Speaker", "Stem"]
}

export interface UserProfile {
    id?: string;
    name: string;
    email?: string;
    photoURL?: string;
    role: 'user' | 'admin';
    targetProvince?: string;
    phoneNumber?: string;
    bio?: string;
    onboarded: boolean;
    createdAt?: string;
    lastLogin?: string;
    preferences?: {
        notifications: boolean;
        theme: 'light' | 'dark' | 'system';
        language: string;
    };
}

interface ImmigrationStore {
    // User Profile
    userProfile: UserProfile;
    updateUserProfile: (profile: Partial<UserProfile>) => void;

    // Authentication state
    isAuthenticated: boolean;

    // Sync state for UI feedback
    syncError: string | null;
    lastSyncedAt: string | null;
    clearSyncError: () => void;

    // CRS Calculator Data
    crsData: CRSState;
    updateCRSData: (data: Partial<CRSState>) => void;

    // Assessment History
    assessmentHistory: AssessmentResult[];
    addAssessmentResult: (result: Omit<AssessmentResult, 'id' | 'date'>) => void;
    clearHistory: () => void;

    // Utilities
    resetStore: () => void;
}

const initialCRSState: CRSState = {
    age: 0,
    education: 0,
    maritalStatus: '',
    language: { reading: 0, writing: 0, listening: 0, speaking: 0 },
    experience: { canadian: 0, foreign: 0 },
    additional: { pnp: false, jobOffer: false, sibling: false, tradeCert: false },
    lastCalculatedScore: null
};

const initialUserProfile: UserProfile = {
    name: 'Guest',
    role: 'user',
    onboarded: false,
    preferences: {
        notifications: true,
        theme: 'dark',
        language: 'en'
    }
};

export const useImmigrationStore = create<ImmigrationStore>()(
    persist(
        (set) => ({
            // Initial state
            userProfile: initialUserProfile,
            isAuthenticated: false,
            syncError: null,
            lastSyncedAt: null,
            crsData: initialCRSState,
            assessmentHistory: [],

            // Actions
            updateUserProfile: (profile) => set((state) => ({
                userProfile: { ...state.userProfile, ...profile }
            })),

            clearSyncError: () => set({ syncError: null }),

            updateCRSData: (data) => set((state) => ({
                crsData: { ...state.crsData, ...data }
            })),

            addAssessmentResult: (result) => set((state) => ({
                assessmentHistory: [
                    {
                        ...result,
                        id: crypto.randomUUID(),
                        date: new Date().toISOString()
                    },
                    ...state.assessmentHistory
                ].slice(0, 50) // Keep only last 50 assessments
            })),

            clearHistory: () => set({ assessmentHistory: [] }),

            resetStore: () => set({
                userProfile: initialUserProfile,
                isAuthenticated: false,
                syncError: null,
                lastSyncedAt: null,
                crsData: initialCRSState,
                assessmentHistory: []
            })
        }),
        {
            name: 'canadapath-storage', // key in localStorage
            storage: createJSONStorage(() => localStorage),
            // Only persist certain fields to localStorage
            partialize: (state) => ({
                crsData: state.crsData,
                // Don't persist auth state to localStorage - get from Firebase
            })
        }
    )
);

// Selector hooks for optimized re-renders
export const useIsAuthenticated = () => useImmigrationStore((state) => state.isAuthenticated);
export const useUserProfile = () => useImmigrationStore((state) => state.userProfile);
export const useIsAdmin = () => useImmigrationStore((state) => state.userProfile.role === 'admin');
export const useSyncError = () => useImmigrationStore((state) => state.syncError);
