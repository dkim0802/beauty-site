export const getCart = () => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
};

export const saveCart = (cart: any[]) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
};

export const addToCart = (product: any) => {
    const cart = getCart();

    const existing = cart.find((item: any) => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
};

export const removeFromCart = (id: number) => {
    const cart = getCart().filter((item: any) => item.id !== id);
    saveCart(cart);
};

export const increaseQty = (id: number) => {
    const cart = getCart().map((item: any) =>
        item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
    );

    saveCart(cart);
};

export const decreaseQty = (id: number) => {
    const cart = getCart()
        .map((item: any) =>
            item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
        )
        .filter((item: any) => item.quantity > 0);

    saveCart(cart);
};

export const clearCart = () => {
    saveCart([]);
};