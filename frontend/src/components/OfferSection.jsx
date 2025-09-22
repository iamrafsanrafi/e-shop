import { Link } from "react-router";
import Container from "./commonLayouts/Container"

const OfferSection = () => {
    return (
        <Container>
            <div className="flex flex-col items-center sm:flex-row gap-5 2xl:gap-0 sm:justify-between mb-20 sm:px-5 2xl:px-0">
                <Link to="/products-list" className="block"><img src="images/offer-image-1.png" alt="Offer 1" /></Link>
                <Link to="/products-list" className="block"><img src="images/offer-image-2.png" alt="Offer 2" /></Link>
            </div>
        </Container>
    );
};

export default OfferSection;