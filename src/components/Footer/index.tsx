import React from "react";
import './style.css';

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="container-footer">
                <h1>BeautySpace твоё пространство ухода и красоты каждый день</h1>
                <div className="footer-content">
                    <div className="left-footer">
                        <p> <span>Соцсети</span> 
                            <b>Instagram:</b> <a href="https://www.instagram.com/">@beautyspace_kz</a> 
                            <b>Telegram:</b> <a href="https://web.telegram.org/"> @beautyspace</a>
                        </p>
                    </div>
                    <div className="right-footer">
                        <p> <span>Контакты</span>
                            <b>Телефон</b> <a href="https://wa.me/77077106633" target="_blank">+7 922 003 310</a>
                            <b>Email:</b> <a
                                href="mailto:example@gmail.com?"
                                target="_blank">
                                beautyspace@mail.com
                            </a>
                        </p>
                    </div>
                </div>
                <p className="f-p">© 2025 BeautySpace. Все права защищены.</p>
            </div>
        </footer>

    )
}

export default Footer;
