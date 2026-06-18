import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Layout from "../../layout";
import { useNavigate } from "react-router";
import { addToCart, removeFromCart } from "../../utils/cart";
import { getProducts, type ProductItem } from "../../api/databaseApi.ts";
import "./style.css";

const Catalog: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    const [cartQuantities, setCartQuantities] = useState<Record<number, number>>(() => {
        try {
            const savedCart = localStorage.getItem("cart");
            if (!savedCart) return {};
            
            const parsedCart = JSON.parse(savedCart);
            const quantities: Record<number, number> = {};
            parsedCart.forEach((item: { id: number; count?: number }) => {
                quantities[item.id] = item.count || 1;
            });
            return quantities;
        } catch (error) {
            console.error("Ошибка чтения корзины из localStorage:", error);
            return {};
        }
    });

    useEffect(() => {
        const controller = new AbortController();

        const loadProducts = async () => {
            try {
                setIsLoading(true);
                setErrorMessage(null);
                const data = await getProducts(controller.signal);
                setProducts(data);
            } catch (error) {
                if (controller.signal.aborted) return;

                setErrorMessage(
                    error instanceof Error
                        ? error.message
                        : "Не удалось загрузить каталог.",
                );
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        loadProducts();

        return () => controller.abort();
    }, []);

    const handleIncrease = (item: ProductItem) => {
        setCartQuantities((prev) => ({
            ...prev,
            [item.id]: (prev[item.id] || 0) + 1,
        }));
        addToCart(item);
    };

    const handleDecrease = (item: ProductItem) => {
        setCartQuantities((prev) => {
            const currentQty = prev[item.id] || 0;
            if (currentQty <= 1) {
                const updated = { ...prev };
                delete updated[item.id];
                return updated;
            }
            return {
                ...prev,
                [item.id]: currentQty - 1,
            };
        });
        removeFromCart(item.id); 
    };

    return (
        <Layout>
            <div className="catalog">
                <div className="container-catalog">
                    <h1 className="logo-catalog">Каталог</h1>

                    {isLoading && <p className="catalog-status">Загрузка каталога...</p>}

                    {errorMessage && (
                        <p className="catalog-status catalog-status-error">
                            {errorMessage}
                        </p>
                    )}

                    {!isLoading && !errorMessage && products.length === 0 && (
                        <p className="catalog-status">Товары не найдены.</p>
                    )}

                    {!isLoading && !errorMessage && products.length > 0 && (
                        <div className="cards">
                            {products.map((item, index) => {
                                const quantity = cartQuantities[item.id] || 0;

                                return (
                                    <div key={`${item.id}-${index}`} className="card-wrapper">
                                        <Card
                                            image={item.image}
                                            title={item.title}
                                            price={`${item.price} ₸`}
                                            onButtonClick={quantity === 0 ? () => handleIncrease(item) : () => {}}
                                        />
                                        
                                        {quantity > 0 && (
                                            <div className="quantity-controls">
                                                <button 
                                                    className="quantity-btn btn-minus" 
                                                    onClick={() => handleDecrease(item)}
                                                >
                                                    -
                                                </button>
                                                <span className="quantity-value">{quantity}</span>
                                                <button 
                                                    className="quantity-btn btn-plus" 
                                                    onClick={() => handleIncrease(item)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <div className="btn-show-more">
                        <Button
                            text="Вернуться на главную"
                            onClick={() => navigate("/")}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Catalog;
