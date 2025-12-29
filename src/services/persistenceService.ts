import { doc, setDoc, getDoc, onSnapshot, type Unsubscribe } from 'firebase/firestore';
import { db, auth, ADMIN_EMAILS } from '../lib/firebase';
import { useImmigrationStore } from '../store/useImmigrationStore';
import type { UserProfile } from '../store/useImmigrationStore';

// Store cleanup functions for proper memory management
let firestoreUnsubscribe: Unsubscribe | null = null;
let storeUnsubscribe: (() => void) | null = null;
let syncTimeout: ReturnType<typeof setTimeout> | null = null;

// Debounce delay for Firestore writes (prevents excessive writes)
const SYNC_DEBOUNCE_MS = 1500;

/**
 * Cleanup all subscriptions to prevent memory leaks
 */
const cleanup = () => {
    if (firestoreUnsubscribe) {
        firestoreUnsubscribe();
        firestoreUnsubscribe = null;
    }
    if (storeUnsubscribe) {
        storeUnsubscribe();
        storeUnsubscribe = null;
    }
    if (syncTimeout) {
        clearTimeout(syncTimeout);
        syncTimeout = null;
    }
};

/**
 * Debounced sync function to prevent excessive Firestore writes
 */
const debouncedSync = (userRef: ReturnType<typeof doc>, data: object) => {
    if (syncTimeout) {
        clearTimeout(syncTimeout);
    }
    syncTimeout = setTimeout(async () => {
        try {
            await setDoc(userRef, {
                ...data,
                updatedAt: new Date().toISOString()
            }, { merge: true });
        } catch (error) {
            console.error('Error syncing to Firestore:', error);
            // Optionally: Add error to store for UI feedback
            useImmigrationStore.setState({ syncError: 'Failed to save changes. Will retry.' });
        }
    }, SYNC_DEBOUNCE_MS);
};

/**
 * Setup bidirectional sync between Zustand store and Firestore
 */
export const setupStoreSync = () => {
    let isUpdatingFromFirestore = false;

    // Listen for auth changes
    const authUnsubscribe = auth.onAuthStateChanged(async (user) => {
        // Clean up previous subscriptions on any auth change
        cleanup();

        if (!user) {
            // User logged out - reset store to guest state
            useImmigrationStore.getState().resetStore();
            return;
        }

        const userRef = doc(db, 'users', user.uid);
        const role = ADMIN_EMAILS.includes(user.email?.toLowerCase() || '') ? 'admin' : 'user';

        try {
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                // Existing user - load their data
                const data = userDoc.data();
                isUpdatingFromFirestore = true;

                useImmigrationStore.setState({
                    userProfile: {
                        ...data.userProfile,
                        id: user.uid,
                        email: user.email || '',
                        photoURL: user.photoURL || '',
                        // Preserve existing role from DB, or use computed role for new admin detection
                        role: data.userProfile?.role || role,
                        lastLogin: new Date().toISOString()
                    },
                    crsData: data.crsData || useImmigrationStore.getState().crsData,
                    assessmentHistory: data.assessmentHistory || [],
                    isAuthenticated: true,
                    syncError: null
                });

                isUpdatingFromFirestore = false;

                // Update last login in background
                setDoc(userRef, {
                    userProfile: { lastLogin: new Date().toISOString() }
                }, { merge: true }).catch(console.error);

            } else {
                // New user - create their profile
                const newProfile: UserProfile = {
                    id: user.uid,
                    name: user.displayName || 'New User',
                    email: user.email || '',
                    photoURL: user.photoURL || '',
                    role: role as 'admin' | 'user',
                    onboarded: false,
                    createdAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString(),
                    preferences: {
                        notifications: true,
                        theme: 'dark' as const,
                        language: 'en'
                    }
                };

                const initialData = {
                    userProfile: newProfile,
                    crsData: useImmigrationStore.getState().crsData,
                    assessmentHistory: [],
                    updatedAt: new Date().toISOString()
                };

                await setDoc(userRef, initialData);

                isUpdatingFromFirestore = true;
                useImmigrationStore.setState({
                    userProfile: newProfile,
                    isAuthenticated: true,
                    syncError: null
                });
                isUpdatingFromFirestore = false;
            }

            // Setup real-time listener for changes from other devices/tabs
            firestoreUnsubscribe = onSnapshot(userRef, (snapshot) => {
                if (snapshot.exists() && !isUpdatingFromFirestore) {
                    const data = snapshot.data();
                    const currentStore = useImmigrationStore.getState();

                    // Only update if data actually changed (compare timestamps)
                    if (data.updatedAt && data.updatedAt !== currentStore.lastSyncedAt) {
                        isUpdatingFromFirestore = true;
                        useImmigrationStore.setState({
                            crsData: data.crsData || currentStore.crsData,
                            assessmentHistory: data.assessmentHistory || currentStore.assessmentHistory,
                            lastSyncedAt: data.updatedAt
                        });
                        isUpdatingFromFirestore = false;
                    }
                }
            }, (error) => {
                console.error('Firestore listener error:', error);
                useImmigrationStore.setState({ syncError: 'Lost connection to server.' });
            });

            // Subscribe to store changes and sync to Firestore (debounced)
            storeUnsubscribe = useImmigrationStore.subscribe((state, prevState) => {
                if (!isUpdatingFromFirestore && user) {
                    // Only sync if relevant data changed
                    const dataChanged =
                        state.crsData !== prevState.crsData ||
                        state.assessmentHistory !== prevState.assessmentHistory ||
                        state.userProfile !== prevState.userProfile;

                    if (dataChanged) {
                        const { userProfile, crsData, assessmentHistory } = state;
                        debouncedSync(userRef, { userProfile, crsData, assessmentHistory });
                    }
                }
            });

        } catch (error) {
            console.error('Error setting up Firestore sync:', error);
            useImmigrationStore.setState({
                syncError: 'Failed to load your data. Please refresh the page.'
            });
        }
    });

    // Return cleanup function for app unmount
    return () => {
        authUnsubscribe();
        cleanup();
    };
};
