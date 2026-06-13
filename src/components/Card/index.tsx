import React from 'react';
import Button from "../Button";
import './style.css';

interface CardProps {
    image: string;
    title: string;
    price: string;
    onButtonClick: () => void;
    // Добавляем новые пропсы для управления количеством
    quantity?: number; 
    onIncrease?: () => void;
    onDecrease?: () => void;
}

const Card: React.FC<CardProps> = ({ 
    image, 
    title, 
    price, 
    onButtonClick, 
    quantity = 0, // По умолчанию 0
    onIncrease, 
    onDecrease 
}) => {
    return (
        <div className="card">
            <img src={image} alt={title} className="card-image" />
            <h2 className="card-title">{title}</h2>
            <p className="card-price">{price}</p>
            
            {/* Если товара нет в корзине (quantity 0), показываем обычную кнопку */}
            {quantity === 0 ? (
                <Button text="в корзину" onClick={onButtonClick} />
            ) : (
                /* Если товар уже добавлен, показываем кнопки + и - */
                <div className="card-quantity-control">
                    <button className="quantity-btn" onClick={onDecrease}>−</button>
                    <span className="quantity-count">{quantity}</span>
                    <button className="quantity-btn" onClick={onIncrease}>+</button>
                </div>
            )}
        </div>
    );
};

export default Card;
