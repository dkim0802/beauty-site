import React, { useEffect, useState } from "react";
import Layout from "../../layout";
import {
    getCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    type CartItem,
} from "../../utils/cart";
import "./style.css";

const BasketPage: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>(getCart());

    const update = () => setCart(getCart());

    useEffect(() => {
        window.addEventListener("cartUpdated", update);
        return () =>
            window.removeEventListener("cartUpdated", update);
    }, []);

    const totalPrice = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    return (
        <Layout>

            <div className="basket-page">
                <div className="basket-container">
                    <h1 className="basket-title">Корзина</h1>

                    {cart.length === 0 && (
                        <p className="basket-empty">Корзина пустая</p>
                    )}

                    <div className="basket-list">
                        {cart.map((item) => (
                            <div key={item.id} className="basket-item">
                                <img src={item.image} className="basket-img" alt={item.title} />

                                <div className="basket-info">
                                    <h3 className="basket-name">
                                        {item.title}
                                    </h3>

                                    <p className="basket-price">{item.price} ₸ </p>
                                </div>

                                <div className="basket-qty">
                                    <button onClick={() => decreaseQty(item.id)}> - </button>

                                    <span>{item.quantity}</span>

                                    <button onClick={() => increaseQty(item.id)}> + </button>
                                </div>

                                <button className="basket-delete" onClick={() => removeFromCart(item.id)}> Удалить </button>
                            </div>
                        ))}
                    </div>

                    <div className="basket-footer">
                        <h2>Итого: {totalPrice} ₸</h2>

                        <button
                            className="basket-pay"
                            onClick={() => {
                                clearCart();
                                setCart([]);
                                alert("Оплата прошла успешно!");
                            }}
                        >
                            Оплатить
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default BasketPage;
