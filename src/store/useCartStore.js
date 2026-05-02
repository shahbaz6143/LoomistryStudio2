import { create } from 'zustand'

export const useCartStore = create((set, get) => ({
  cartItems: [],
  isCartOpen: false,
  
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  addToCart: (product, size) => set((state) => {
    const existingItem = state.cartItems.find(
      item => item.id === product.id && item.size === size
    )

    if (existingItem) {
      return {
        cartItems: state.cartItems.map(item => 
          item.id === product.id && item.size === size 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        isCartOpen: true // Open cart when item added
      }
    }

    return {
      cartItems: [...state.cartItems, { ...product, size, quantity: 1 }],
      isCartOpen: true // Open cart when item added
    }
  }),

  removeFromCart: (productId, size) => set((state) => ({
    cartItems: state.cartItems.filter(
      item => !(item.id === productId && item.size === size)
    )
  })),

  updateQuantity: (productId, size, newQuantity) => set((state) => ({
    cartItems: state.cartItems.map(item => 
      item.id === productId && item.size === size
        ? { ...item, quantity: Math.max(1, newQuantity) }
        : item
    )
  })),

  clearCart: () => set({ cartItems: [] }),

  getCartTotal: () => {
    return get().cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }
}))
