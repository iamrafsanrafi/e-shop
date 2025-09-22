import Banner from "../components/Banner";
import BestSeller from "../components/BestSeller";
import Facilities from "../components/Facilities";
import FaqSection from "../components/faq/FaqSection";
import FeaturedProducts from "../components/FeaturedProducts";
import NewProducts from "../components/NewProducts";
import OfferSection from "../components/OfferSection";
import SpringSale from "../components/SpringSale";

const HomePage = () => {
    return (
        <main>
            <Banner />
            <Facilities />
            <FeaturedProducts />
            <OfferSection />
            <NewProducts />
            <SpringSale />
            <BestSeller />
            <FaqSection />
        </main>
    );
};

export default HomePage;