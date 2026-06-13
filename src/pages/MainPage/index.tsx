import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Layout from "../../layout";
import { useNavigate } from "react-router";
import {
    getBoxes,
    getProducts,
    type BoxItem,
    type ProductItem,
} from "../../api/databaseApi";
import { addToCart } from "../../utils/cart";
import "./style.css";

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [boxes, setBoxes] = useState<BoxItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
                if (controller.signal.aborted) {
                    return;
                }

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

        loadCatalog();

        return () => controller.abort();
    }, []);

    const allBoxes =
        boxes.length > 0
            ? Array.from({ length: 4 }, (_, index) => boxes[index % boxes.length])
            : [];

    return (
        <Layout>
            <div className="container-main">
                <h1 className="logo-main">Каталог</h1>

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
                        {products.map((item, index) => (
                            <Card
                                key={`${item.id}-${index}`}
                                image={item.image}
                                title={item.title}
                                price={`${item.price} ₸`}
                                onButtonClick={() => addToCart(item)}
                            />
                        ))}
                    </div>
                )}

                <div className="btn-show-more">
                    <Button
                        text="Перейти в каталог"
                        onClick={() => navigate("/catalog")}
                    />
                </div>

                <h1 className="logo-main" id="boxes">
                    Боксы
                </h1>

                {!isLoading && !errorMessage && boxes.length === 0 && (
                    <p className="catalog-status">Боксы не найдены.</p>
                )}

                {!isLoading && !errorMessage && allBoxes.length > 0 && (
                    <div className="cards-boxes">
                        {allBoxes.map((item, index) => (
                            <Card
                                key={`${item.title}-${index}`}
                                image={item.image}
                                title={item.title}
                                price={`${item.price} ₸`}
                                onButtonClick={() => addToCart(item)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default MainPage;
