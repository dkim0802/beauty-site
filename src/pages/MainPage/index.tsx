import React from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { products } from "../../data/ProductCard";
import { boxes } from "../../data/ProductCard";
import "./style.css";


const MainPage: React.FC = () => {
    const allBoxes = Array(4).fill(boxes).flat();
    return (
        <div className="container-main">
            <h1 className="logo-main">Каталог</h1>
            <div className="cards">
                {products.map((item, index) => (
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
            
            <h1 className="logo-main">Боксы</h1>
            <div className="cards-boxes">
                {allBoxes.map((item) => (
                    <Card
                        key={`${item.title}`}
                        image={item.image}
                        title={item.title}
                        price={`${item.price} ₸`}
                        onButtonClick={() => console.log("Добавлено в корзину:", item)}
                    />
                ))}
            </div>
        </div>
    );
};

export default MainPage;