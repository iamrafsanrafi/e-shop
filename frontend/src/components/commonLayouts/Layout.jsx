import { Outlet } from "react-router";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useEffect, useState } from "react";
import { TfiAngleUp } from "react-icons/tfi";
import { FaAngleUp } from "react-icons/fa";

const Layout = () => {
    const [showGoTopBtn, setShowGoTopBtn] = useState(false);

    const handleGoTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }

    useEffect(() => {
        const handleShowGoTopBtn = () => {
            if(window.scrollY >= 800) {
                setShowGoTopBtn(true);
            }
            else {
                setShowGoTopBtn(false);
            }
        }

        window.addEventListener("scroll", handleShowGoTopBtn);

        return () => window.removeEventListener("scroll", handleShowGoTopBtn);
    }, []);

    return (
        <div>
            <Header />
            <Outlet />
            <Footer />

            <button onClick={handleGoTop} className={`${showGoTopBtn ? "" : "hidden"} transition duration-200 fixed z-50 right-5 sm:right-14 bottom-10 sm:bottom-20 bg-[#FF624C] p-2 sm:p-3 cursor-pointer rounded-lg text-white`}><FaAngleUp className="text-2xl font-bold" /></button>
        </div>
    );
};

export default Layout;