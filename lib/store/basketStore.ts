import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OrderItem } from "@/types/order";
import type { Size } from "@/types/good";

//***** Новий стор кошика - використовуйте йщго в новому коді*****

interface BasketStore {
  items: OrderItem[];
  addItem: (item: OrderItem) => void;
  removeItem: (id: string, size: Size) => void;
  updateQuantity: (id: string, size: Size, quantity: number) => void;
  clearBasket: () => void;
}

const isSamePosition = (item: OrderItem, id: string, size: Size) =>
item.id === id && item.size === size;

export const useBasketStore = create<BasketStore>()(
  persist(
    set => ({
      items: [],
      
      addItem: newItem =>
        set(state => {
          const exists = state.items.some(item =>
            isSamePosition(item, newItem.id, newItem.size)
          );

          if (exists) {
            return {
              items: state.items.map(item =>
                isSamePosition(item, newItem.id, newItem.size)
                  ? { ...item, quantity: item.quantity + newItem.quantity }
                  : item
              ),
            };
          }

          return { items: [...state.items, newItem] };
        }),
      
      removeItem: (id, size) =>
        set(state => ({
          items: state.items.filter(item => !isSamePosition(item, id, size)),
        })),
      
      updateQuantity: (id, size, quantity) =>
        set(state => ({
          items: state.items.map(item =>
            isSamePosition(item, id, size) ? { ...item, quantity } : item
          ),
        })),
      
      clearBasket: () => set({ items: [] }),
    }),

    {
      name:"basket",
    }
  )
)

// СТАРИЙ стор — тимчасово залишаємо, щоб не зламати Header.
// Видалити, коли useOrderStore ніде не використовується.

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
  //  goodsOrderList: [{ goodId: "", quantity: 0 }],
// перевірка порожнього кошика 
    goodsOrderList: [],
};

/** @deprecated Використовуйте useBasketStore */
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
