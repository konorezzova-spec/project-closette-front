import { create } from "zustand";
import { persist } from "zustand/middleware";

//Ось це має бути в clientApi.ts
interface CreateOrderParams {
  name: string;
  surname: string;
  tel: string;
  city: string;
  postOffice: number;
  amount: number;
  goodsOrderList: {
    goodId: string;
    quantity: number;
  }[];
}

interface OrderDraftStore {
  draft: CreateOrderParams;
  setDraft: (order: CreateOrderParams) => void;
  clearDraft: () => void;
}

const initialDraft: CreateOrderParams = {
  name: "",
  surname: "",
  tel: "",
  city: "",
  postOffice: 0,
  amount: 1,
  goodsOrderList: [{ goodId: "", quantity: 0 }],
};

export const useOrderStore = create<OrderDraftStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: order => set(() => ({ draft: order })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      // Ключ у localStorage
      name: "order-draft",
      // Зберігаємо лише властивість draft
      partialize: state => ({ draft: state.draft }),
    }
  )
);

// 1. Якщо потрібна кількість першого товару:
// const quantity = useOrderStore(
//   state => state.draft.goodsOrderList[0].quantity
// );

// 2. Якщо потрібно отримати кількість усіх товарів:
// const goodsOrderList = useOrderStore(
//   state => state.draft.goodsOrderList
// );
// const totalQuantity = goodsOrderList.reduce(
//   (total, good) => total + good.quantity,
//   0
// );

// 3. Якщо потрібно отримати кількість конкретного товару:
// const quantity = useRecipeStore(state =>
//   state.draft.goodsOrderList.find(
//     good => good.goodId === id
//   )?.quantity
// );
