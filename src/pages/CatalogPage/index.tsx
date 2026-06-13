import React from "react";
import Card from "../../components/Card";
import { products } from "../../data/ProductCard";
import Button from "../../components/Button";
import Layout from "../../layout";
import { useNavigate } from "react-router";
import { addToCart } from "../../utils/cart";
import "./style.css";

const Catalog: React.FC = () => {
    const navigate = useNavigate();

    const allProducts = Array(4).fill(products).flat();

    return (
        <Layout>
            <div className="catalog">
                <div className="container-catalog">

                    <h1 className="logo-catalog">Каталог</h1>

                    <div className="cards">
                        {allProducts.map((item, index) => (
                            <Card
                            key={`${item.id}-${index}`}
                            image={item.image}
                            title={item.title}
                            price={`${item.price} ₸`}
                            onButtonClick={() =>
                                addToCart({
                                    id: item.id,
                                    image: item.image,
                                    title: item.title,
                                    price: item.price,
                                })
                            }
                        />
                        ))}
                    </div>

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