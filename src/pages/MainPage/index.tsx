import React from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Layout from "../../layout";
import { useNavigate } from "react-router";
import { products, boxes } from "../../data/ProductCard";
import { addToCart } from "../../utils/cart";
import "./style.css";

const MainPage: React.FC = () => {
    const navigate = useNavigate();

    const allBoxes = Array.from({ length: 4 }, () => boxes[0]);

    return (
        <Layout>
            <div className="container-main">
                <h1 className="logo-main">Каталог</h1>

                <div className="cards">
                    {products.map((item, index) => (
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
                        text="Перейти в каталог"
                        onClick={() => navigate("/catalog")}
                    />
                </div>

                <h1 className="logo-main" id="boxes">
                    Боксы
                </h1>

                <div className="cards-boxes">
                    {allBoxes.map((item, index) => (
                        <Card
                            key={`${item.title}-${index}`}
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
            </div>
        </Layout>
    );
};

export default MainPage;