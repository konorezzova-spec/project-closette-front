import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OrderItem } from "@/types/order";
import type { Size } from "@/types/good";

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
      name: "basket",
    }
  )
);
