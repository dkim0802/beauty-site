import React, { useState, useEffect } from "react";
import hero from "../../assets/header-photo.png";
import Button from "../Button";
import { Link, useNavigate, useLocation } from "react-router"; // Добавили useLocation для SPA переходов
import { paths } from "../../router/routes";
import BoxModal from "../BoxModal";
import "./style.css";
import { addToCart } from "../../utils/cart";
import { getModalBox, type BoxItem } from "../../api/databaseApi"; 

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isBoxModalOpen, setIsBoxModalOpen] = useState(false);

    const [exclusiveBox, setExclusiveBox] = useState<BoxItem | null>(null);
    const [isBoxLoading, setIsBoxLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        const loadExclusiveBox = async () => {
            try {
                setIsBoxLoading(true);
                const data = await getModalBox(controller.signal);
                if (data) {
                    setExclusiveBox(data);
                }
            } catch (error) {
                console.error("Не удалось подгрузить бокс из Railway:", error);
            } finally {
                setIsBoxLoading(false);
            }
        };

        loadExclusiveBox();

        return () => controller.abort();
    }, []);

    const handleBoxesClick = () => {
        if (location.pathname === "/") {
            document.getElementById("boxes")?.scrollIntoView({ behavior: "smooth" });
            return;
        }

        navigate("/");
        setTimeout(() => {
            document.getElementById("boxes")?.scrollIntoView({ behavior: "smooth" });
        }, 200);
    };

    return (
        <header id="header" className="header">
            <div className="container-header">
                <h1 className="logo-header">BeautySpace</h1>

                <nav className="nav">
                    <Link to={paths.HOME.path}>Главная</Link>
                    <Link to={paths.CATALOG.path}>Каталог</Link>
                    <Link
                        to="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleBoxesClick();
                        }}>
                        Боксы
                    </Link>
                    <Link to={paths.BASKET.path} className="nav-cart">Корзина</Link>
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
                        text={isBoxLoading ? "Загрузка..." : "Заказать эксклюзивный бокс"}
                        onClick={() => {
                            if (isBoxLoading || !exclusiveBox) return;
                            setIsBoxModalOpen(true);
                        }}
                    />

                </div>

                <div className="right">
                    <img src={hero} alt="Header" />
                </div>
            </div>

            {isBoxModalOpen && exclusiveBox && (
                <BoxModal
                    image={exclusiveBox.image} 
                    title={exclusiveBox.title}
                    description={exclusiveBox.description || "Эксклюзивный бьюти-бокс."}
                    price={exclusiveBox.price}
                    onClose={() => setIsBoxModalOpen(false)}
                    onAddToBasket={() => {
                        addToCart(exclusiveBox);
                        setIsBoxModalOpen(false);
                    }}
                />
            )}
        </header>
    );
};

export default Header;
