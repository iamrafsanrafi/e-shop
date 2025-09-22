import { useEffect, useMemo, useRef, useState } from "react";
import ProductLayout from "./commonLayouts/ProductLayout";
import Pagination from "./Pagination";
import MenuIcon from "../icons/MenuIcon";
import { TfiAngleDown } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../firebase/firestoreService";
import { setAllProducts } from "../slices/productsSlice";
import LoadingSpinner from "./LoadingSpinner";

const ProductsListProducts = ({ selectedCategories, selectedBrands }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortByCategories, setSortByCategories] = useState("None");
    const [sortByPrice, setSortByPrice] = useState("None");
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isPriceOpen, setIsPriceOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const localStorageProducts =
        JSON.parse(localStorage.getItem("allProducts")) || [];

    const categoriesDropdownRef = useRef(null);
    const priceDropdownRef = useRef(null);

    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products.allProducts);
    const { minValue, maxValue } = useSelector((state) => state.products);

    const itemsPerPage = 16;

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

        // Sidebar categories
        if (selectedCategories.length > 0) {
            products = products.filter((p) => selectedCategories.includes(p.category));
        }

        // Sidebar brands
        if (selectedBrands.length > 0) {
            products = products.filter((p) => selectedBrands.includes(p.brand));
        }

        // Price filter
        if (minValue && maxValue) {
            products = products.filter(
                (p) =>
                    parseInt(p.price) >= parseInt(minValue) &&
                    parseInt(p.price) <= parseInt(maxValue)
            );
        }

        // Category-based sorting
        if (sortByCategories && sortByCategories !== "None") {
            products.sort((a, b) => {
                switch (sortByCategories) {
                    case "Popularity":
                        return (b.totalRatings || 0) - (a.totalRatings || 0);
                    case "Rating":
                        return (b.rating || 0) - (a.rating || 0);
                    case "Availability":
                        return (b.stock || 0) - (a.stock || 0);
                    default:
                        return 0;
                }
            });
        }

        // Price-based sorting
        if (sortByPrice && sortByPrice !== "None") {
            products.sort((a, b) => {
                switch (sortByPrice) {
                    case "Price Low-to-High":
                        return (a.price || 0) - (b.price || 0);
                    case "Price High-to-Low":
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
        sortByPrice,
        selectedCategories,
        selectedBrands,
        minValue,
        maxValue,
    ]);

    const totalItems = filteredProducts.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

    // ✅ Reset page if filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategories, selectedBrands, minValue, maxValue]);

    // ✅ Clamp page if out of bounds
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

        const handleClosePriceDropdown = (e) => {
            if (
                priceDropdownRef.current &&
                !priceDropdownRef.current.contains(e.target)
            ) {
                setIsPriceOpen(false);
            }
        };

        const handleDocClick = (e) => {
            handleCloseCategoriesDropdown(e);
            handleClosePriceDropdown(e);
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
            <div className="flex flex-col md:flex-row gap-y-5 md:gap-y-0 mb-6 md:mb-0 justify-between items-center">
                <p className="text-[#303030] font-['Montserrat'] leading-6 text-sm sm:text-base">
                    Showing {totalItems > 0 ? startIndex + 1 : 0} - {endIndex} of{" "}
                    {totalItems}
                </p>

                <div className="flex items-center">
                    <span className="hidden md:inline text-[#303030] font-['Montserrat'] leading-6 mr-4">
                        Sort by
                    </span>

                    <div className="flex gap-[45px]">
                        {/* ----Categories Dropdown---- */}
                        <div
                            className="relative after:content-[''] after:absolute after:w-[1px] after:h-[32px] after:bg-[#CBCBCB] after:top-1/2 after:-right-6 after:-translate-y-1/2"
                            ref={categoriesDropdownRef}
                        >
                            <div
                                className="w-[120px] sm:w-[150px] flex justify-between items-center cursor-pointer"
                                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                            >
                                <span className="text-[#FF624C] font-['Montserrat'] font-bold text-sm sm:text-base">
                                    {sortByCategories}
                                </span>
                                <TfiAngleDown
                                    className={`text-[#303030] text-sm transition-transform ${isCategoriesOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </div>

                            {isCategoriesOpen && (
                                <ul className="absolute w-[120px] sm:w-[150px] border border-gray-300 bg-white shadow-lg z-10 mt-1">
                                    {["None", "Popularity", "Rating", "Availability"].map(
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

                        {/* ----Price Dropdown---- */}
                        <div
                            className="relative after:content-[''] after:absolute 2xl:after:w-[1px] sm:after:h-[32px] after:bg-[#CBCBCB] after:top-1/2 after:-right-6 after:-translate-y-1/2"
                            ref={priceDropdownRef}
                        >
                            <div
                                className="w-[160px] sm:w-[216px] flex justify-between items-center cursor-pointer"
                                onClick={() => setIsPriceOpen(!isPriceOpen)}
                            >
                                <span className="text-[#FF624C] font-['Montserrat'] font-bold text-sm sm:text-base">
                                    {sortByPrice}
                                </span>
                                <TfiAngleDown
                                    className={`text-[#303030] text-sm transition-transform ${isPriceOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </div>

                            {isPriceOpen && (
                                <ul className="absolute w-[160px] sm:w-[216px] border border-gray-300 bg-white shadow-lg z-10 mt-1">
                                    {["None", "Price Low-to-High", "Price High-to-Low"].map(
                                        (option) => (
                                            <li
                                                key={option}
                                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                                onClick={() => {
                                                    setSortByPrice(option);
                                                    setIsPriceOpen(false);
                                                }}
                                            >
                                                <span className="text-black">{option}</span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}
                        </div>

                        <div className="hidden 2xl:block">
                            <MenuIcon />
                        </div>
                    </div>
                </div>
            </div>

            {/* ----Products Grid---- */}
            <div className="flex flex-col items-center gap-y-6 sm:flex-row sm:flex-wrap sm:mt-[52px] sm:justify-center sm:gap-5 xl:justify-start">
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
                ) : (
                    <p className="text-2xl text-[#FF624C]">No products found!</p>
                )}
            </div>

            {/* ----Pagination---- */}
            {totalItems > itemsPerPage && (
                <Pagination
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    );
};

export default ProductsListProducts;