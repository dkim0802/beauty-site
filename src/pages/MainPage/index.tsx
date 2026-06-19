import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Layout from "../../layout";
import { useNavigate } from "react-router";
import { getBoxes, getProducts, type BoxItem, type ProductItem } from "../../api/databaseApi";
import { addToCart, removeFromCart, getCart, type CartProduct } from "../../utils/cart"; 
import "./style.css";

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [boxes, setBoxes] = useState<BoxItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Универсальная функция синхронизации количеств
    const syncQuantities = (): Record<number, number> => {
        const currentCart = getCart();
        const quantities: Record<number, number> = {};
        currentCart.forEach((item) => {
            // Приводим ID к числу на случай, если где-то записалась строка
            const idAsNumber = Number(item.id);
            if (!isNaN(idAsNumber)) {
                quantities[idAsNumber] = item.quantity;
            }
        });
        return quantities;
    };

    const [cartQuantities, setCartQuantities] = useState<Record<number, number>>(syncQuantities);

    // Подписка на кастомное событие обновления корзины
    useEffect(() => {
        const handleCartUpdate = () => setCartQuantities(syncQuantities());
        
        window.addEventListener("cartUpdated", handleCartUpdate);
        return () => window.removeEventListener("cartUpdated", handleCartUpdate);
    }, []);

    // Загрузка данных
    useEffect(() => {
        const controller = new AbortController();

        const loadCatalog = async () => {
            try {
                setIsLoading(true);
                setErrorMessage(null);

                const [loadedProducts, loadedBoxes] = await Promise.all([
                    getProducts(controller.signal),
                    getBoxes(controller.signal),
                ]);

                setProducts(loadedProducts);
                setBoxes(loadedBoxes);
            } catch (error) {
                if (controller.signal.aborted) return;
                setErrorMessage(
                    error instanceof Error ? error.message : "Не удалось загрузить каталог."
                );
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        loadCatalog();
        return () => controller.abort();
    }, []);

    // Безопасное добавление товара/бокса в корзину
    const handleIncrease = (item: ProductItem | BoxItem) => {
        const cartProduct: CartProduct = {
            id: Number(item.id), // Гарантируем, что ID — число
            title: 'title' in item ? item.title : (item as any).name || "Без названия",
            image: 'image' in item ? item.image : (item as any).img || (item as any).photo || "",
            price: 'price' in item ? item.price : Number((item as any).price || 0)
        };
        addToCart(cartProduct);
    };

    // Безопасное уменьшение количества
    const handleDecrease = (item: ProductItem | BoxItem) => {
        removeFromCart(Number(item.id));
    };

    // Ограничиваем вывод боксов до 4 штук
    const displayedBoxes = boxes.slice(0, 4);

    return (
        <Layout>
            <div className="main-page">
                <h1 className="logo-main">Каталог</h1>

                {isLoading && <p className="catalog-status">Загрузка каталога...</p>}

                {errorMessage && (
                    <p className="catalog-status catalog-status-error">{errorMessage}</p>
                )}

                {!isLoading && !errorMessage && products.length === 0 && (
                    <p className="catalog-status">Товары не найдены.</p>
                )}

                {!isLoading && !errorMessage && products.length > 0 && (
                    <div className="cards">
                        {products.slice(0, 4).map((item) => {
                            const quantity = cartQuantities[Number(item.id)] || 0;

                            return (
                                <div key={`prod-${item.id}`} className="card-wrapper">
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
                        text="Перейти в каталог"
                        onClick={() => navigate("/catalog")}
                    />
                </div>

                <h1 className="logo-main" id="boxes">Боксы</h1>

                {!isLoading && !errorMessage && boxes.length === 0 && (
                    <p className="catalog-status">Боксы не найдены.</p>
                )}

                {!isLoading && !errorMessage && displayedBoxes.length > 0 && (
                    <div className="cards-boxes">
                        {displayedBoxes.map((item) => {
                            const quantity = cartQuantities[Number(item.id)] || 0;

                            return (
                                <div key={`box-${item.id}`} className="card-wrapper">
                                    <Card
                                        image={'image' in item ? item.image : (item as any).img || (item as any).photo || ""}
                                        title={'title' in item ? item.title : (item as any).name || "Без названия"}
                                        price={`${'price' in item ? item.price : Number((item as any).price || 0)} ₸`}
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
            </div>
        </Layout>
    );
};

export default MainPage;
