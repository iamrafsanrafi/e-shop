import { useEffect } from "react";
import Banner from "../components/Banner";
import BestSeller from "../components/BestSeller";
import Facilities from "../components/Facilities";
import FaqSection from "../components/faq/FaqSection";
import FeaturedProducts from "../components/FeaturedProducts";
import NewProducts from "../components/NewProducts";
import SpringSale from "../components/SpringSale";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../slices/menuSlice";
import { clearCategory } from "../slices/productsSlice";
import scrollToSection from "../utils/scrollToSection";

const HomePage = () => {
    // Redux states
    const isMenuOpen = useSelector(store => store.menu.showMenu);
    const { category } = useSelector(state => state.products);

    // Extra hooks
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(category) {
            dispatch(clearCategory());
        }
    }, [])

    // This useEffect is used for navigating to the specified section from another page
    useEffect(() => {
        if (location.state?.id) {
            const id = location.state.id;

            scrollToSection(id, {
                fromNavigation: true,
                onComplete: () => {
                    if(isMenuOpen) {
                        dispatch(closeMenu());
                    }
                }
            });
        }
        else if (window.scrollY > 0) {
            // If not section id found then go to top
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, []);

    return (
        <main>
            <Banner />
            <Facilities />
            <FeaturedProducts />
            <NewProducts />
            <SpringSale />
            <BestSeller />
            <FaqSection />
        </main>
    );
};

export default HomePage;