// ============================================
// ArcadeCalc — Profile State Store (Zustand)
// Manages active profile, saved profiles,
// and persists to localStorage.
// ============================================

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, Badge } from '@/lib/types';
import { calculateTotalPoints, getLeague } from '@/lib/calculator';

interface ProfileState {
  activeProfile: UserProfile | null;
  savedProfiles: UserProfile[];
  isLoading: boolean;
  error: string | null;
  showCommunityModal: boolean;

  setActiveProfile: (profile: UserProfile) => void;
  addProfile: (profile: UserProfile) => void;
  removeProfile: (id: string) => void;
  switchProfile: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setShowCommunityModal: (show: boolean) => void;
  clearAll: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      activeProfile: null,
      savedProfiles: [],
      isLoading: false,
      error: null,
      showCommunityModal: false,

      setActiveProfile: (profile) => {
        const points = calculateTotalPoints(profile.badges);
        const league = getLeague(points);
        const enriched = { ...profile, totalPoints: points, league };
        set({ activeProfile: enriched, error: null });
      },

      addProfile: (profile) => {
        const points = calculateTotalPoints(profile.badges);
        const league = getLeague(points);
        const enriched = { ...profile, totalPoints: points, league };
        const { savedProfiles } = get();
        const exists = savedProfiles.some((p) => p.id === profile.id);
        if (!exists) {
          set({ savedProfiles: [...savedProfiles, enriched] });
        }
        set({ activeProfile: enriched });
      },

      removeProfile: (id) => {
        const { savedProfiles, activeProfile } = get();
        const filtered = savedProfiles.filter((p) => p.id !== id);
        set({
          savedProfiles: filtered,
          activeProfile: activeProfile?.id === id ? filtered[0] || null : activeProfile,
        });
      },

      switchProfile: (id) => {
        const { savedProfiles } = get();
        const profile = savedProfiles.find((p) => p.id === id);
        if (profile) {
          set({ activeProfile: profile });
        }
      },

      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      setShowCommunityModal: (show) => set({ showCommunityModal: show }),
      clearAll: () =>
        set({ activeProfile: null, savedProfiles: [], error: null }),
    }),
    {
      name: 'arcadecalc-profiles',
      partialize: (state) => ({
        activeProfile: state.activeProfile,
        savedProfiles: state.savedProfiles,
      }),
    }
  )
);
