import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ReviewDraft {
  author: string;
  description: string;
  rate: number;
}

interface ReviewDraftStore {
  drafts: Record<string, ReviewDraft>;
  setDraft: (goodId: string, draft: ReviewDraft) => void;
  clearDraft: (goodId: string) => void;
}

export const useReviewDraftStore = create<ReviewDraftStore>()(
  persist(
    set => ({
      drafts: {},

      setDraft: (goodId, draft) =>
        set(state => ({ drafts: { ...state.drafts, [goodId]: draft } })),

      clearDraft: goodId =>
        set(state => {
          const drafts = { ...state.drafts };
          delete drafts[goodId];
          return { drafts };
        }),
    }),
    {
      name: "review-drafts",
    }
  )
);