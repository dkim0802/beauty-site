import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Layout from "../../layout";
import { useNavigate } from "react-router";
import { getProducts, type ProductItem } from "../../api/databaseApi";
import { addToCart } from "../../utils/cart";
import "./style.css";

const Catalog: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        const loadProducts = async () => {
            try {
                setIsLoading(true);
                setErrorMessage(null);
                setProducts(await getProducts(controller.signal));
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

        loadProducts();

        return () => controller.abort();
    }, []);

    const allProducts = Array.from({ length: 4 }, () => products).flat();

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
                            {allProducts.map((item, index) => (
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
