import React from "react";
import hero from "../../assets/header-photo.png";
import Button from "../Button";
import { Link, useNavigate } from "react-router";
import { paths } from "../../router/routes";
import "./style.css";

const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleBoxesClick = () => {
        if (window.location.pathname === "/") {
            document.getElementById("boxes")?.scrollIntoView({behavior: "smooth",});
            return;
        }

        navigate("/");

        setTimeout(() => {
            document.getElementById("boxes")?.scrollIntoView({behavior: "smooth",});
        }, 150);
    };

    return (
        <header id="header" className="header">
            <div className="container-header">
                <h1 className="logo-header">BeautySpace</h1>

                <nav className="nav">
                    <Link to={paths.HOME.path}>Главная</Link>
                    <Link to={paths.CATALOG.path}>Каталог</Link>
                    <a className="nav-button" onClick={handleBoxesClick}>Боксы</a>
                    <Link to={paths.BASKET.path}>Корзина</Link>
                </nav>

                <div className="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div className="content">
                <div className="left">
                    <h1>Боксы с доставкой прямо к вам домой</h1>
                    <p>Красота теперь ближе, чем вы думаете — один клик и бокс уже в пути к вам.</p>

                    <Button
                        text="Заказать бокс"
                        onClick={() =>
                            handleBoxesClick()
                        }
                    />
                </div>

                <div className="right">
                    <img src={hero}alt="Header"/>
                </div>
            </div>
        </header>
    );
};

export default Header;