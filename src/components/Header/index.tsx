import React from "react";
import hero from "../../assets/header-photo.png";
import Button from "../Button";
import './style.css';

const Header: React.FC = () => {
    return (
        <header id="header" className="header">
            <div className="container-header">
                <h1 className="logo-header">BeautySpace</h1>
                <nav className="nav">
                    <a href="#header">Главная</a>
                    <a href="#katalog">Каталог</a>
                    <a href="#box">Боксы</a>
                    <a href="cart.html" className="cart" id="openCart">Корзина (<span id="cartCount">0</span>)</a>
                </nav>

                <div className="hamburger" id="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div className="content">
                <div className="left">
                    <h1>Боксы с доставкой прямо к вам домой</h1>
                    <p>Красота теперь ближе, чем вы думаете - один клик и бокс уже в пути к вам.</p>
                    <Button text="Заказать бокс" onClick={() => {console.log("нажата кнопка заказать бокс")}} />
                </div>
                <div className="right">
                    <img src={hero} alt="Header" />
                </div>
            </div>
        </header>
    )
}

export default Header;