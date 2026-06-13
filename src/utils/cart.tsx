export interface CartProduct {
    id: number;
    image: string;
    title: string;
    price: number;
}

export interface CartItem extends CartProduct {
    quantity: number;
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return typeof value === "object" && value !== null;
};

const isCartItem = (value: unknown): value is CartItem => {
    if (!isRecord(value)) {
        return false;
    }

    return (
        typeof value.id === "number" &&
        typeof value.image === "string" &&
        typeof value.title === "string" &&
        typeof value.price === "number" &&
        typeof value.quantity === "number"
    );
};

export const getCart = (): CartItem[] => {
    try {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        return Array.isArray(storedCart) ? storedCart.filter(isCartItem) : [];
    } catch {
        return [];
    }
};

export const saveCart = (cart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
};

export const addToCart = (product: CartProduct) => {
    const cart = getCart();
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
};

export const removeFromCart = (id: number) => {
    const cart = getCart().filter((item) => item.id !== id);
    saveCart(cart);
};

export const increaseQty = (id: number) => {
    const cart = getCart().map((item) =>
        item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
    );

    saveCart(cart);
};

export const decreaseQty = (id: number) => {
    const cart = getCart()
        .map((item) =>
            item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item,
        )
        .filter((item) => item.quantity > 0);

    saveCart(cart);
};

export const clearCart = () => {
    saveCart([]);
};
