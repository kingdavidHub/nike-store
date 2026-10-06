import { create } from "zustand";

type StoreState = {
  favorites: string[]; // item ids
  cart: string[]; // item ids
  toggleFavorite: (id: string) => void;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
};

export const useStore = create<StoreState>((set) => ({
  favorites: [],
  cart: [],

  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id],
    })),

  addToCart: (id) =>
    set((state) => ({
      cart: state.cart.includes(id) ? state.cart : [...state.cart, id],
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((c) => c !== id),
    })),
}));
