import { useEffect, useState } from "react";
import Container from "../components/commonLayouts/Container";

import ProductsListLeftSide from "../components/ProductsListLeftSide";
import ProductsListProducts from "../components/ProductsListProducts";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { setCategory, setFromNavbar } from "../slices/productsSlice";

const ProductsListPage = () => {
    const [selectedCategories, setSelectedCategories] = useState("");
    const [selectedBrands, setSelectedBrands] = useState("");

    // Extra hook
    const location = useLocation();
    const dispatch = useDispatch();

    // This useEffect is used to scroll back to top and also get the requested specific product category name
    useEffect(() => {
        // Scroll back to top
        if (window.scrollY > 0) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        // Format the search query and rebuilt it for usage
        if (location.search) {
            let category = location.search.slice(3, location.search.length);
            category = category.split("%20").join(" ");

            console.log(category);

            // Setting the category on redux state and marking as navbar navigation
            dispatch(setCategory(category));
            dispatch(setFromNavbar(true));

            // Clearing any local state values
            setSelectedCategories([]);
        }
        else {
            // Clearing redux states since there is nothing on location.search
            dispatch(setCategory(""));
            dispatch(setFromNavbar(false));
        }
    }, [location.search, dispatch]);


    // This useEffect for when the user leaves this page
    useEffect(() => {
        return () => {
            // Clearing states when user leaves the page
            dispatch(setCategory(""));
            dispatch(setFromNavbar(false));
        };
    }, [dispatch]);

    return (
        <Container>
            <div className="flex flex-col xl:items-start xl:flex-row gap-[25px] mt-5 sm:mt-16 mb-20 sm:px-5 xl:px-0">
                {/* Left Side */}
                <ProductsListLeftSide selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands} />

                {/* Right Side */}
                <ProductsListProducts selectedCategories={selectedCategories} selectedBrands={selectedBrands} />
            </div>
        </Container>
    );
};

export default ProductsListPage;