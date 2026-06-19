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
import { PaymentForm } from "../../components/PaymentForm/PaymentForm";
import "./style.css";

const BasketPage: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>(getCart()); 
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const update = () => setCart(getCart());

    useEffect(() => {
        window.addEventListener("cartUpdated", update);
        return () => window.removeEventListener("cartUpdated", update);
    }, []);

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
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
                            <div key={String(item.id)} className="basket-item">
                                <img src={item.image} className="basket-img" alt={item.title} />

                                <div className="basket-info">
                                    <h3 className="basket-name">{item.title}</h3>
                                    <p style={{ margin: 0 }}>{item.price} ₸ </p>
                                </div>

                                <div className="basket-qty">
                                    {/* Используем 'as any', чтобы обойти жесткое требование number */}
                                    <button onClick={() => decreaseQty(item.id as any)}> - </button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => increaseQty(item.id as any)}> + </button>
                                </div>

                                <button 
                                    className="basket-delete" 
                                    onClick={() => removeFromCart(item.id as any)}
                                > 
                                    Удалить 
                                </button>
                            </div>
                        ))}
                    </div>

                    {cart.length > 0 && (
                        <div className="basket-checkout-section">
                            <PaymentForm
                                amount={totalPrice}
                                email={email}
                                name={name}
                                setEmail={setEmail}
                                setName={setName}
                                onSuccess={clearCart}
                            />
                            
                            <div className="basket-footer">
                                <h2>Итого: {totalPrice} ₸</h2>

                                <button
                                    className="basket-pay"
                                    type="submit"
                                    form="robo-payment-form"
                                >
                                    Оплатить
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default BasketPage;
