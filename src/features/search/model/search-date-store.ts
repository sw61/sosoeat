'use client';

import { create } from 'zustand';

type SearchDateState = {
  defaultDateStartIso: string | null;
};

type SearchDateActions = {
  initializeDefaultDateStart: (defaultDateStartIso: string) => void;
  syncDefaultDateStart: (defaultDateStartIso: string) => void;
  reset: () => void;
};

export const useSearchDateStore = create<SearchDateState & SearchDateActions>()((set, get) => ({
  defaultDateStartIso: null,
  initializeDefaultDateStart: (defaultDateStartIso) => {
    if (get().defaultDateStartIso !== null) return;

    set({ defaultDateStartIso });
  },
  syncDefaultDateStart: (defaultDateStartIso) => set({ defaultDateStartIso }),
  reset: () => set({ defaultDateStartIso: null }),
}));
