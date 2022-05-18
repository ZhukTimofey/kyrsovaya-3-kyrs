import React from "react";
import "./styles.scss";
import Typography from "@mui/material/Typography";

const Footer = () => {
    return (
        <div className={"footer-wrapper"}>
            <div>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <a className={"footer-link"} href="https://github.com/">
                        {" "}
                        www.github.com
                    </a>
                </Typography>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <a className={"footer-link"} href="https://mail.google.com/">
                        Обратная связь
                    </a>
                </Typography>
            </div>
            <div>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    +375-44-444-44-44
                </Typography>
                <div className={"footer-icons"}>
                    <a href="https://vk.com/">
                        <img
                            className={"footer-icon"}
                            src="https://img.icons8.com/color/344/vk-circled.png"
                            alt="vk"
                        />
                    </a>
                    <a href="https://ru-ru.facebook.com/">
                        <img
                            className={"footer-icon"}
                            src="https://img.icons8.com/fluency/344/facebook-new.png"
                            alt="fb"
                        />
                    </a>
                    <a href="https://web.telegram.org/k/">
                        <img
                            className={"footer-icon"}
                            src="https://img.icons8.com/color/344/telegram-app.png"
                            alt="fb"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;