import React from "react";
import Button from "../Button";
import "./style.css";

interface BoxModalProps {
    title: string;
    description: string;
    price: number;
    image?: string; 
    onClose: () => void;
    onAddToBasket: () => void;
}

const BoxModal: React.FC<BoxModalProps> = ({
    title, 
    description, 
    price, 
    image, 
    onClose, 
    onAddToBasket
}) => {
    const defaultImage = "https://res.cloudinary.com/dt0ceydok/image/upload/v1781611882/aaa_wtbx2g.webp";

    return (
        <div className="box-modal-overlay" onClick={onClose}>
            <div className="box-modal" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="close-button" onClick={onClose}>×</button>
                
                <img 
                    src={image || defaultImage} 
                    alt={title} 
                    className="box-modal-image" 
                />
                
                <h2 className="box-modal-title">{title}</h2>
                <p className="box-modal-description">{description}</p>
                <p className="box-modal-price">{price} ₸</p>
                <Button text="Добавить в корзину" onClick={onAddToBasket} />
            </div>
        </div>
    );
};

export default BoxModal;
