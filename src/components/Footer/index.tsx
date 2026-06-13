import React from "react";
import './style.css';

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="container-footer">
                <h1>BeautySpace твоё пространство ухода и красоты каждый день</h1>
                <div className="footer-content">
                    <div className="left-footer">
                        <span>Соцсети</span>

                        <div className="footer-item">
                            <b>Instagram:</b>
                            <a href="https://www.instagram.com/" target="_blank">
                                @beautyspace_kz
                            </a>
                        </div>

                        <div className="footer-item">
                            <b>Telegram:</b>
                            <a href="https://web.telegram.org/" target="_blank">
                                @beautyspace
                            </a>
                        </div>
                    </div>

                    <div className="right-footer">
                        <span>Контакты</span>

                        <div className="footer-item">
                            <b>Телефон:</b>
                            <a href="https://wa.me/77077106633" target="_blank">
                                +7 922 003 310
                            </a>
                        </div>

                        <div className="footer-item">
                            <b>Email:</b>
                            <a href="mailto:beautyspace@mail.com">
                                beautyspace@mail.com
                            </a>
                        </div>
                    </div>
                </div>
                <p className="f-p">© 2025 BeautySpace. Все права защищены.</p>
            </div>
        </footer>

    )
}

export default Footer;
