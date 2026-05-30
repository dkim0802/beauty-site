import React from 'react';
import Button from "../Button";
import './style.css';

interface CardProps {
    image: string;
    title: string;
    price: string;
    onButtonClick: () => void;
}

const Card: React.FC<CardProps> = ({ image, title, price, onButtonClick }) => {
    return (
        <div className="card">
            <img src={image} alt={title} className="card-image" />
            <h2 className="card-title">{title}</h2>
            <p className="card-price">{price}</p>
            <Button text="в корзину" onClick={onButtonClick} />
        </div>
    );
};

export default Card;