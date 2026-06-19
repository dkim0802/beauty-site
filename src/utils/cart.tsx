export interface CartProduct {
    id: string | number; // Разрешаем строку для хранения 'prod-1' и 'box-1'
    title: string;
    image: string;
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
        // Изменено: валидатор теперь официально пропускает и строки, и числа
        (typeof value.id === "number" || typeof value.id === "string") &&
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

    // Сравниваем ID строго как строки, чтобы "prod-1" и "box-1" не склеивались
    const existing = cart.find((item) => String(item.id) === String(product.id));

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
};

export const removeFromCart = (id: number | string) => {
    const cart = getCart().filter((item) => String(item.id) !== String(id));
    saveCart(cart);
};

export const increaseQty = (id: number | string) => {
    const cart = getCart().map((item) =>
        String(item.id) === String(id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
    );
    saveCart(cart);
};

export const decreaseQty = (id: number | string) => {
    const cart = getCart()
        .map((item) =>
            String(item.id) === String(id)
                ? { ...item, quantity: item.quantity - 1 }
                : item
        )
        .filter((item) => item.quantity > 0);
    saveCart(cart);
};

export const clearCart = () => {
    saveCart([]);
};
