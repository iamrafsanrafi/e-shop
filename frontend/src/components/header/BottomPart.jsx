import { Link, useLocation, useNavigate } from "react-router";
import Container from "../commonLayouts/Container";
import { IoIosMenu } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../../slices/menuSlice";
import { clearCategory } from "../../slices/productsSlice";
import { GoTriangleDown } from "react-icons/go";
import scrollToSection from "../../utils/scrollToSection";

const categories = [
    { name: "Computers & Tablets", url: "/products-list?q=Computers & Tablets" },
    { name: "Mobile & Accessories", url: "/products-list?q=Mobiles & Accessories" },
    { name: "TV & Home Theater", url: "/products-list?q=TV & Home Theater" },
    { name: "Audio & Headphones", url: "/products-list?q=Audio & Headphones" },
    { name: "Cameras & Camcorders", url: "/products-list?q=Cameras & Camcorders" },
    { name: "Gaming Equipment", url: "/products-list?q=Gaming Equipment" },
    { name: "Home Appliances", url: "/products-list?q=Home Appliances" }
];

const BottomPart = () => {
    // States
    const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
    const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);

    // Redux state s
    const isMenuOpen = useSelector(store => store.menu.showMenu);
    const { category } = useSelector(state => state.products);

    // Extra hooks
    const dispatch = useDispatch();
    const categoriesDropdownRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const handleCloseMenu = () => {
        dispatch(closeMenu());
    }

    const handleScroll = (id) => {
        if (location.pathname !== "/") {
            navigate("/", { state: { id } }); // Passing the id inside the state on homepage
            return;
        }

        scrollToSection(id, {
            fromNavigation: false,
            onComplete: () => {
                if (isMenuOpen) {
                    dispatch(closeMenu());
                }
            }
        });
    }

    const handleCloseDropdownAndClearCategory = () => {
        setIsCategoriesDropdownOpen(false);
        dispatch(clearCategory());
    }

    useEffect(() => {
        const handleCloseDropdown1 = (e) => {
            if (categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(e.target)) {
                setIsCategoriesDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleCloseDropdown1);

        return () => {
            document.removeEventListener("mousedown", handleCloseDropdown1);
        };
    }, []);

    // Another useEffect to handle body scroll lock when the sidebar is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        }
    }, [isMenuOpen])

    return (
        <>
            {/* ----Desktop Navbar---- */}
            <nav id="bottom-part" className="bg-[#FF624C] py-6 font-['Montserrat'] hidden sm:block sm:px-5 2xl:px-0">
                <Container>
                    <div className="flex justify-between">
                        <ul className="flex items-center sm:gap-8 md:gap-10 lg:gap-14 xl:gap-20 text-white font-bold leading-6">
                            <li className="relative" ref={categoriesDropdownRef}>
                                <button className="flex items-center gap-4 cursor-pointer" to="#" onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}>
                                    <IoIosMenu className="text-3xl" />
                                    <span className="hidden lg:inline">
                                        All Categories
                                    </span>
                                </button>

                                {isCategoriesDropdownOpen && (
                                    <div className="absolute top-[80%] left-0 mt-2 w-72 z-50 bg-white rounded-xl shadow-lg border border-gray-100 p-4 space-y-2 font-['Poppins']">
                                        {categories.map(c => (
                                            <Link
                                                onClick={handleCloseDropdownAndClearCategory}
                                                key={c.name}
                                                to={c.url}
                                                className="block px-4 py-2 rounded-lg text-sm text-[#303030] hover:bg-gray-100 transition duration-150"
                                            >{c.name}</Link>
                                        ))}
                                    </div>
                                )}
                            </li>
                            <li className="relative">
                                <Link className="flex items-center gap-2 cursor-pointer" to="/products-list">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog">Blog</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>
                        </ul>

                        <ul className="flex items-center sm:gap-8 md:gap-15 2xl:gap-20 text-white font-bold leading-6">
                            <li>
                                <button className="cursor-pointer" onClick={() => handleScroll("spring-sale")}>LIMITED SALE</button>
                            </li>
                            <li>
                                <button className="cursor-pointer" onClick={() => handleScroll("best-seller")}>Best Seller</button>
                            </li>
                            <li className="hidden xl:block">
                                <button className="cursor-pointer" onClick={() => handleScroll("new-arrival")}>New Arrival</button>
                            </li>
                        </ul>
                    </div>
                </Container>
            </nav>

            {/* ----Mobile Navbar---- */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={handleCloseMenu}
                ></div>
            )}

            {/* Sidebar Menu */}
            <div
                className={`fixed inset-0 w-[75%] max-w-[320px] z-50 bg-white sm:hidden rounded-r-2xl shadow-xl transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-500 ease-in-out`}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#ffffff] to-[#f9f9f9] rounded-tr-2xl border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-[#303030] tracking-wide">Menu</h2>
                    <button
                        onClick={handleCloseMenu}
                        className="text-3xl text-[#303030] hover:text-[#ff624c] transition duration-200"
                    >
                        &times;
                    </button>
                </div>

                {/* ----Menu Links---- */}
                <ul className="flex flex-col px-6 py-6 space-y-6 overflow-y-auto max-h-[calc(100vh-72px)]">
                    <li className="relative text-lg font-medium text-[#303030] cursor-pointer group transition-colors duration-200">
                        <span
                            onClick={() => setIsAllCategoriesOpen((prev) => !prev)}
                            className="flex items-center gap-2"
                        >
                            <GoTriangleDown
                                className={`text-3xl transition ${isAllCategoriesOpen ? "-rotate-180" : "rotate-0"
                                    }`}
                            />{" "}
                            All Categories
                        </span>

                        {/* ----Categories---- */}
                        {isAllCategoriesOpen && (
                            <div className="pl-9 flex flex-col items-start gap-y-3 mt-1">
                                {categories.map((c) => (
                                    <Link
                                        onClick={() => {
                                            handleCloseDropdownAndClearCategory();
                                            setIsAllCategoriesOpen(false);
                                            handleCloseMenu();
                                        }}
                                        key={c.name}
                                        to={c.url}
                                        className="border-b border-[#CBCBCB] text-[#FF624C]"
                                    >
                                        {c.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </li>

                    {[
                        { name: "Products", url: "/products-list" },
                        { name: "Blog", url: "/blog" },
                        { name: "Contact", url: "/contact" },
                    ].map((item, index) => (
                        <li
                            key={index}
                            className="relative text-lg font-medium text-[#303030] cursor-pointer group transition-colors duration-200"
                        >
                            <Link onClick={() => isMenuOpen(false)} to={item?.url}>
                                {item.name}
                            </Link>
                        </li>
                    ))}

                    <li className="relative text-lg font-medium text-[#303030] cursor-pointer group transition-colors duration-200">
                        <button className="cursor-pointer" onClick={() => handleScroll("spring-sale")}>
                            LIMITED SALE
                        </button>
                    </li>
                    <li className="relative text-lg font-medium text-[#303030] cursor-pointer group transition-colors duration-200">
                        <button className="cursor-pointer" onClick={() => handleScroll("best-seller")}>
                            Best Seller
                        </button>
                    </li>
                    <li className="relative text-lg font-medium text-[#303030] cursor-pointer group transition-colors duration-200">
                        <button className="cursor-pointer" onClick={() => handleScroll("new-arrival")}>
                            New Arrival
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default BottomPart;