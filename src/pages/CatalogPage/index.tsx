import React from "react";
import Card from "../../components/Card";
import { products } from "../../data/ProductCard"
import Button from "../../components/Button";
import Layout from "../../layout";
import "./style.css";

const Catalog: React.FC = () => {
    const allProducts = Array(4).fill(products).flat();

    return (
        <Layout>
            <div className="сatalog">
                <div className="container-catalog">

                    <h1 className="logo-catalog">Каталог</h1>

                    <div className="cards">
                        {allProducts.map((item, index) => (
                            <Card
                                key={`${item.id}-${index}`}
                                image={item.image}
                                title={item.title}
                                price={`${item.price} ₸`}
                                onButtonClick={() => console.log("Добавлено в корзину:", item)}                             
                            />
                        ))}
                    </div>
                    <div className="btn-show-more">
                        <Button text="Показать больше" onClick={() => console.log("Показать больше")} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Catalog;