import React from "react";
import Button from "../Button";
import "./style.css";

interface BasketCardProps {
    image?: string;
    title: string;
    description?: string;
    price: number;
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    onDelete: () => void;
}

const BasketCard: React.FC<BasketCardProps> = ({
    image,
    title,
    description,
    price,
    quantity,
    onIncrease,
    onDecrease,
    onDelete,
}) => {
    const itemTotalPrice = price * quantity;

    return (
        <div className="basket-card">
            {image && (
                <img src={image} alt={title} className="basket-card-image" />
            )}

            <div className="basket-card-content">
                <h2 className="basket-card-title">{title}</h2>

                {description && (
                    <p className="basket-card-description">{description}</p>
                )}

                <p className="basket-card-price">{itemTotalPrice} ₸</p>

                <div className="basket-quantity">
                    <button className="quantity-btn" onClick={onDecrease}>-</button>
                    <span className="quantity-value">{quantity}</span>
                    <button className="quantity-btn" onClick={onIncrease}>+</button>
                </div>
            </div>

            <div className="basket-card-actions">
                <Button
                    text="Удалить"
                    onClick={onDelete}
                />
            </div>
        </div>
    );
};

export default BasketCard;
