import { Link } from "react-router";
import Container from "./commonLayouts/Container";

const Banner = () => {
    return (
        <Container>
            <Link className="sm:px-5 block 2xl:px-0" to="/products">
                <img className="object-cover sm:mt-8" src="images/banner.png" alt="banner image" fetchPriority="high" />
            </Link>
        </Container>
    );
};

export default Banner;