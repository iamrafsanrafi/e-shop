import { useEffect, useMemo, useRef, useState } from "react";
import ProductLayout from "./commonLayouts/ProductLayout";
import Pagination from "./Pagination";
import MenuIcon from "../icons/MenuIcon";
import { TfiAngleDown } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../firebase/firestoreService";
import { setAllProducts } from "../slices/productsSlice";
import LoadingSpinner from "./LoadingSpinner";

const ProductsListProducts = ({ selectedCategories, selectedBrands, showInStock, sortByCategories, setSortByCategories}) => {
    // States
    const [currentPage, setCurrentPage] = useState(1);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Redux states
    const allProducts = useSelector((state) => state.products.allProducts);
    const { minValue, maxValue } = useSelector((state) => state.products);
    const { category } = useSelector(state => state.products);

    // LocalStorage
    const localStorageProducts = JSON.parse(localStorage.getItem("allProducts")) || [];

    // Extra hooks
    const categoriesDropdownRef = useRef(null);
    const dispatch = useDispatch();

    const itemsPerPage = 18;

    // Functions
    const fetchProducts = async () => {
        setLoading(true);

        const products = await getProducts();

        dispatch(setAllProducts(products));

        setLoading(false);

        localStorage.setItem("allProducts", JSON.stringify(products));
    };

    // Filter + sort
    const filteredProducts = useMemo(() => {
        if (!allProducts || allProducts.length === 0) return [];

        let products = [...allProducts];

        // Checking if specific category is present by navbar options and getting the products
        if (category) {
            products = products.filter(p => p.category === category);
        }

        // Sidebar categories
        if (selectedCategories.length > 0) {
            products = products.filter(p => selectedCategories.includes(p.category));
        }

        // Sidebar brands
        if (selectedBrands.length > 0) {
            products = products.filter(p => selectedBrands.includes(p.brand));
        }

        // Sidebar avaiability
        if(showInStock) {
            products = products.filter(p => p.stock > 0);
            console.log(" I am here because of showInStock")
        }

        // Price filter
        if (minValue >= 0 && maxValue >= 0) {
            products = products.filter(
                (p) =>
                    parseInt(p.price) >= parseInt(minValue) &&
                    parseInt(p.price) <= parseInt(maxValue)
            );
        }

        // Sorting based on different criterias
        if (sortByCategories && sortByCategories !== "None") {
            products.sort((a, b) => {
                switch (sortByCategories) {
                    case "Price: Low to High":
                        return (a.price || 0) - (b.price || 0);
                    case "Price: High to Low":
                        return (b.price || 0) - (a.price || 0);
                    default:
                        return 0;
                }
            });
        }

        return products;
    }, [
        allProducts,
        sortByCategories,
        selectedCategories,
        selectedBrands,
        showInStock,
        minValue,
        maxValue,
        category
    ]);
    
    const goToTop = () => {
        const timeout = setTimeout(() => {
            window.scroll({
                top: 0,
                behavior: "smooth"
            });

            clearTimeout(timeout);
        }, 150);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);

        goToTop();
    }

    const totalItems = filteredProducts.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

    // Reset page if filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategories, selectedBrands, minValue, maxValue]);

    // Clamp page if out of bounds
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    // Slice items for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const currentItems = filteredProducts.slice(startIndex, endIndex);

    useEffect(() => {
        if (localStorageProducts.length === 0) {
            fetchProducts();
        } else {
            dispatch(setAllProducts(localStorageProducts));
        }
    }, []);

    useEffect(() => {
        const handleCloseCategoriesDropdown = (e) => {
            if (
                categoriesDropdownRef.current &&
                !categoriesDropdownRef.current.contains(e.target)
            ) {
                setIsCategoriesOpen(false);
            }
        };

        const handleDocClick = (e) => {
            handleCloseCategoriesDropdown(e);
        };

        document.addEventListener("mousedown", handleDocClick);
        return () => document.removeEventListener("mousedown", handleDocClick);
    }, []);

    return (
        <div className="w-full">
            <h2 className="hidden xl:block text-[#303030] text-4xl font-['Poppins'] font-semibold leading-[46px] mb-6">
                Products
            </h2>

            {/* ----Sorting Dropdowns---- */}
            <div className="flex flex-col sm:flex-row gap-y-5 md:gap-y-0 mb-6 md:mb-0 justify-between items-center">
                <p className="text-[#303030] font-['Montserrat'] leading-6 text-sm sm:text-lg">
                    Showing {totalItems > 0 ? startIndex + 1 : 0} - {endIndex} of{" "}
                    {totalItems}
                </p>

                <div className="flex items-center">
                    <span className="md:inline text-[#303030] font-['Montserrat'] leading-6 mr-4">
                        Sort by
                    </span>

                    <div className="flex gap-[45px]">
                        {/* ----Categories Dropdown---- */}
                        <div
                            ref={categoriesDropdownRef}
                        >
                            <div
                                className="w-[160px] sm:w-[180px] flex justify-between items-center cursor-pointer"
                                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                            >
                                <span className="text-[#FF624C] font-['Montserrat'] font-bold text-sm sm:text-base">
                                    {sortByCategories}
                                </span>
                                <TfiAngleDown
                                    className={`text-black text-sm transition-transform ${isCategoriesOpen ? "rotate-180" : ""}`}
                                />
                            </div>

                            {isCategoriesOpen && (
                                <ul className="absolute w-[160px] sm:w-[180px] border border-gray-300 bg-white shadow-lg z-10 mt-1">
                                    {["None", "Price: Low to High", "Price: High to Low"].map(
                                        (option) => (
                                            <li
                                                key={option}
                                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                                onClick={() => {
                                                    setSortByCategories(option);
                                                    setIsCategoriesOpen(false);
                                                }}
                                            >
                                                <span className="text-black">{option}</span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ----Products Layout---- */}
            <div className="flex flex-col items-center gap-y-6 sm:flex-row sm:flex-wrap sm:mt-[52px] sm:justify-center sm:gap-3">
                {!loading && currentItems.length > 0 ? (
                    currentItems.map((p) => (
                        <ProductLayout
                            key={p.id}
                            title={p.title}
                            images={p.images}
                            type={p.type}
                            discountTag={p.discountTag}
                            discountPercent={p.discountTag ? p.discountPercent : ""}
                            rating={p.rating}
                            totalRatings={p.totalRatings}
                            price={p.price}
                            previousPrice={p.discountTag ? p.previousPrice : ""}
                            tags={p.tags}
                            id={p.id}
                        />
                    ))
                ) : (loading && currentItems.length === 0) ? (
                    <LoadingSpinner message="Loading Products" />
                ) : (
                    <p className="text-xl font-['Montserrat'] my-5 text-[#FF624C] sm:text-[22px] md:text-2xl">No products found!</p>
                )}
            </div>

            {/* ----Pagination---- */}
            {totalItems > itemsPerPage && (
                <Pagination
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default ProductsListProducts;