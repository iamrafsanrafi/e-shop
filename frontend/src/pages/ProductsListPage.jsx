import { useState } from "react";
import Container from "../components/commonLayouts/Container";

import ProductsListLeftSide from "../components/ProductsListLeftSide";
import ProductsListProducts from "../components/ProductsListProducts";

const ProductsListPage = () => {
    const [selectedCategories, setSelectedCategories] = useState("");
    const [selectedBrands, setSelectedBrands] = useState("");

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