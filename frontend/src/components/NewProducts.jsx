import Container from "./commonLayouts/Container";
import ProductLayout from "./commonLayouts/ProductLayout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "./Button";
import { useEffect, useMemo, useRef, useState } from "react";
import { TfiAngleDown } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";
import { setNewProducts } from "../slices/productsSlice";
import LoadingSpinner from "./LoadingSpinner";


const NewProducts = () => {
    // States
    const [limit, setLimit] = useState(5);
    const [selectedCategory, setSelectedCategory] = useState({ id: 1, name: "All Categories", value: "all" });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const localStorageProducts = JSON.parse(localStorage.getItem("newProducts")) || [];
    const [showLoading, setShowLoading] = useState(false);

    // Redux state and dispatch
    const dispatch = useDispatch();
    const newProducts = useSelector(state => state.products.new);

    // Refs
    const dropdownRef = useRef(null);
    const timerRef = useRef(null);


    const categories = [
        { id: 1, name: "All Categories", value: "all" },
        { id: 2, name: "Mobiles", value: "mobile" },
        { id: 3, name: "Tablets", value: "tablet" },
        { id: 4, name: "Computers", value: "computer" },
        { id: 5, name: "Laptops", value: "laptop" },
    ];


    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        setIsDropdownOpen(false);
    }

    const handleLoadMore = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        setShowLoading(true);

        timerRef.current = setTimeout(() => {
            setLimit(limit + 5);
            setShowLoading(false);
        }, 800);
    }


    const fetchProducts = async () => {
        setLoading(true)
        const q = query(collection(db, "Products"), where("tags", "array-contains", "New"), where("type", "in", ["Desktop", "Computer", "Laptop", "Mobile", "Tablet"]));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => {
            const product = doc.data();

            return {
                ...product,
                createdAt: product.createdAt ? product.createdAt.toDate().getTime() : null
            };
        });

        dispatch(setNewProducts(data));
        setLoading(false);
        localStorage.setItem("newProducts", JSON.stringify(data));
    }

    // Filtered products based on selected category and memorizing it for better performance
    const filteredProducts = useMemo(() => {
        if (!newProducts || newProducts.length === 0) return [];

        switch (selectedCategory.value) {
            case "all":
                return newProducts; 
            case "computer":
                return newProducts.filter(p => p.type.toLowerCase() === "computer" || p.type.toLowerCase() === "desktop");
            case "laptop":
                return newProducts.filter(p => p.type.toLowerCase() === "laptop");
            case "mobile":
                return newProducts.filter(p => p.type.toLowerCase() === "mobile");
            case "tablet":
                return newProducts.filter(p => p.type.toLowerCase() === "tablet");                
        }
    }, [newProducts, selectedCategory]);

    // useEffect to fetch new products
    useEffect(() => {
        if (localStorageProducts.length === 0) {
            fetchProducts();
        }
        else {
            dispatch(setNewProducts(localStorageProducts));
        }
    }, [])

    useEffect(() => {
        const handleCloseDropdown = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleCloseDropdown);

        return () => document.removeEventListener("mousedown", handleCloseDropdown);
    }, [])

    return (
        <section id="new-arrival" className="mb-20 sm:px-5 2xl:px-0">
            <Container>
                <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-[22px] sm:text-3xl md:text-4xl text-[#303030] font-['Poppins'] leading-[46px] font-semibold">New Products</h2>
                    </div>
                    <div className="flex items-center gap-4 relative">
                        <p className="text-[#303030] font-['Montserrat'] leading-6">Sort by</p>

                        <div className="relative" ref={dropdownRef}>
                            <select className="hidden" name="categories" value={selectedCategory.value || ""} onChange={e => handleSelectCategory(e.target.value)}>

                            </select>


                            {/* Custom dropdown */}
                            <div
                                className="p-2 cursor-pointer flex items-center"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                {selectedCategory &&
                                    <>
                                        <span className="mr-10 sm:text-lg font-bold text-[#FF624C]">{selectedCategory?.name}</span>
                                        <TfiAngleDown className={`text-[#303030] text-[11px] sm:text-base ${isDropdownOpen ? "rotate-180" : ""} transition`} />
                                    </>
                                }
                            </div>

                            {/* Country list */}
                            {isDropdownOpen && (
                                <ul className="absolute w-full border border-gray-300 bg-white shadow-lg z-10">
                                    {categories.map(category => (
                                        <li className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer"
                                            key={category?.id}
                                            onClick={() => handleSelectCategory(category)} >
                                            <span className="text-[11.5px] sm:text-base">{category?.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                    </div>
                </div>
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center sm:flex-wrap gap-3">
                    {(!loading && newProducts.length > 0) ? (
                        (filteredProducts.length > 0) ? filteredProducts.slice(0, limit).map(p => (
                            <ProductLayout key={p.id} title={p.title} images={p.images} type={p.type} discountTag={p.discountTag} discountPercent={p.discountTag ? p.discountPercent : ""} rating={p.rating} totalRatings={p.totalRatings} price={p.price} previousPrice={p.discountTag ? p.previousPrice : ""} tags={p.tags} id={p.id} />
                        )) : <p className="text-center text-xl sm:text-2xl text-[#303030]">No products available</p>
                    ) : <LoadingSpinner message="Loading New Products..." />}
                </div>

                {
                    showLoading && <LoadingSpinner message="Loading..." />
                }

                {
                    (limit < filteredProducts.length && !loading) ? (
                        <div className="text-center mt-16">
                            <Button handleLoadMore={handleLoadMore} value="Load More" bg="white" color="#FF624C" border={true} />
                        </div>
                    ) : <></>
                }

            </Container>
        </section>
    );
};

export default NewProducts;