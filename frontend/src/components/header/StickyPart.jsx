import { useEffect, useRef, useState } from "react"
import Container from "../commonLayouts/Container";
import { Link, useLocation, useNavigate } from "react-router";
import { FaBars } from "react-icons/fa";
import { searchProducts } from "../../firebase/firestoreService";
import { TfiSearch } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import CartIcon from "../../icons/CartIcon";
import UserIcon from "../../icons/UserIcon";
import { setInputValue } from "../../slices/menuSlice";
import { RxCross2 } from "react-icons/rx";
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

const StickyPart = () => {
    // States
    const [showFixedNav, setShowFixedNav] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [products, setProducts] = useState([]);
    const [showProducts, setShowProducts] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);

    // Redux States
    const { user, loading } = useSelector(state => state.auth);
    const { totalPrice } = useSelector(state => state.cart);
    const { inputValue } = useSelector(state => state.menu);

    // Extra hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchRef = useRef(null);
    const productsRef = useRef(null);
    const menuRef = useRef(null);
    const inputRef = useRef(null);
    const location = useLocation();

    const handleOpenMenu = () => {
        setShowMenu(true);
    }

    const handleCloseMenu = () => {
        setShowMenu(false);
    }

    const ScrollTo = (id) => {
        if (location.pathname !== "/") {
            navigate("/", { state: { id } });
            setShowMenu(false); // passing the id inside the state
            return;
        }

        scrollToSection(id, {
            fromNavigation: false,
            onComplete: () => {
                if (showMenu) {
                    setShowMenu(false);
                }
            }
        });
    }

    const handleSearchProducts = (e) => {
        dispatch(setInputValue(e.target.value));
    }

    const handleHideSearchAndClear = () => {
        setShowInput(false);
        dispatch(setInputValue(""));
    }

    // This is for showing the fixed nav when scrolled at a certain length
    useEffect(() => {
        const handleScroll = () => {
            const topPart = document.getElementById("top-part");
            const middlePart = document.getElementById("middle-part");
            const bottomPart = document.getElementById("bottom-part");

            if (window.scrollY >= (topPart.offsetHeight + middlePart.offsetHeight + bottomPart.offsetHeight) + 1) {
                setShowFixedNav(true);
            }
            else {
                setShowFixedNav(false);
            }
        }

        const handleCloseSearchResults = (e) => {
            if (productsRef.current && !productsRef.current.contains(e.target)) {
                setShowProducts(false);
            }
        }

        const handleCloseMenuBar = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }

        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleCloseSearchResults);
        document.addEventListener("mousedown", handleCloseMenuBar);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleCloseSearchResults);
            document.removeEventListener("mousedown", handleCloseMenuBar);
        }
    }, []);

    // This useEffect is being used to fetch searched products
    useEffect(() => {
        if (!inputValue) {
            setProducts([]);
            return;
        }

        // Debounce technique to improve performance and avoid unnecessary api calls
        const timer = setTimeout(() => {
            const results = searchProducts(inputValue);

            results.then(data => {
                if (data.length > 0) {
                    setProducts(data);
                    setShowProducts(true);
                }
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [inputValue])

    // Another useEffect to handle body scroll lock when the sidebar is open
    useEffect(() => {
        if (showInput) {
            inputRef.current.focus();
        }

        if (showMenu || showInput) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        }
    }, [showMenu, showInput]);

    return (
        <>
            {/* ----Main navbar---- */}
            <nav
                id="sticky-nav"
                className={`${showFixedNav ? "block" : "hidden"} transition-all duration-300 sm:px-5 2xl:px-0 shadow-md bg-white p-3 fixed top-0 left-0 w-full z-70  border-b border-gray-100`}
            >
                <Container>
                    <div className="flex items-center justify-between">
                        {/* Left side: Logo + Menu icon */}
                        <div className={`flex items-center gap-2 ${showInput ? "hidden" : ""}`}>
                            <button
                                onClick={handleOpenMenu}
                                className="p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                                aria-label="Open Menu"
                            >
                                <FaBars className="text-[#303030] text-xl sm:text-2xl" />
                            </button>
                            <Link to="/">
                                <img
                                    className="w-[110px] sm:w-full object-contain"
                                    src="/public/images/logo.webp"
                                    alt="logo"
                                />
                            </Link>
                        </div>

                        {/* Middle: Search bar */}
                        <div className="relative flex-1 max-w-xl mx-4" ref={searchRef}>
                            <input
                                ref={inputRef}
                                value={inputValue}
                                onChange={handleSearchProducts}
                                className={`${showInput ? "inline" : "hidden"} sm:inline w-full border border-gray-300 rounded-lg py-2 pl-4 pr-9 sm:py-3 sm:pl-5 sm:pr-11 text-sm text-[#303030] outline-none transition duration-200 focus:ring-1 focus:ring-[#FF624C] placeholder:font-semibold`}
                                type="text"
                                placeholder="Search In e-shop"
                            />

                            {window.innerWidth <= 640 ? (
                                <TfiSearch onClick={() => setShowInput(true)} className="text-xl absolute top-1/2 right-4 -translate-y-1/2 text-[#303030]" />
                            ) : (
                                <TfiSearch className="text-xl absolute top-1/2 right-4 -translate-y-1/2 text-gray-500" />
                            )}

                            <RxCross2 onClick={handleHideSearchAndClear} className={`absolute top-1/2 -translate-y-1/2 -right-7 text-2xl text-[#303030] ${showInput ? "" : "hidden"}`} />

                            {/* Search Results */}
                            {products.length > 0 && showProducts && (
                                <ul
                                    ref={productsRef}
                                    className="absolute left-0 w-full bg-white shadow-lg rounded-md border border-gray-200 mt-2 z-50 max-h-64 overflow-y-auto animate-fadeIn"
                                >
                                    {products.map((p) => (
                                        <Link
                                            key={p.id}
                                            to={`/product-details/${p.id}`}
                                            onClick={handleHideSearchAndClear}
                                        >
                                            <li className="px-4 py-2 cursor-pointer hover:bg-[#FFF2F0] transition-colors">
                                                <span className="font-medium text-gray-800">{p.title}</span>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Right side: Cart + User */}
                        <div className={`flex gap-[25px] sm:gap-[50px] lg:gap-[90px] items-center ${showInput ? "hidden" : ""}`}>
                            {/* Cart */}
                            <div className="flex relative items-center gap-5 sm:after:content-[] sm:after:absolute sm:after:top-1/2 sm:after:right-[-25px] lg:after:right-[-45px] sm:after:w-[1px] sm:after:h-[32px] sm:after:bg-[#979797] sm:after:-translate-y-1/2 sm:after:-translate-x-1/2">
                                <Link to="/cart" className="relative">
                                    <CartIcon />
                                </Link>
                                <div className="hidden lg:block">
                                    <p className="text-[#303030] font-medium">Cart</p>
                                    <span className="text-[#303030] font-bold">
                                        ${totalPrice}
                                    </span>
                                </div>
                            </div>

                            {/* User */}
                            <Link
                                to={user ? "/dashboard" : "/login"}
                                className="flex items-center gap-6 hover:opacity-80 transition"
                            >
                                <UserIcon />
                                <div className="hidden md:block">
                                    <p className="text-[#303030]">
                                        {(user && !loading) ? user.name : "Guest"}
                                    </p>
                                    <span className="font-bold text-[#303030]">Account</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </Container>
            </nav>

            {/* Shadow overlay when menu sidebar is open */}
            {showMenu && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60 transition-opacity duration-300"
                    onClick={handleCloseMenu}
                />
            )}

            {/* Shadow overlay when mobile search bar is on */}
            {showInput && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60 transition-opacity duration-300"
                    onClick={handleHideSearchAndClear}
                />
            )}

            {/* ----Sidebar Menu---- */}
            <div
                ref={menuRef}
                className={`fixed top-0 left-0 h-screen w-[320px] z-70 bg-white rounded-r-2xl shadow-xl transform ${showMenu ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-500 ease-in-out`}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-[#303030]">Menu</h2>
                    <button
                        onClick={handleCloseMenu}
                        className="text-3xl text-[#303030] hover:text-[#FF624C] transition duration-200 cursor-pointer"
                        aria-label="Close Menu"
                    >
                        &times;
                    </button>
                </div>

                {/* ----Links---- */}
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
                                            dispatch(clearCategory(""));
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
                        <li key={index}>
                            <Link
                                className="text-lg font-medium text-[#303030] hover:text-[#FF624C] transition-colors"
                                onClick={() => setShowMenu(false)}
                                to={item?.url}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}

                    <li>
                        <button
                            className="text-lg font-medium text-[#303030] hover:text-[#FF624C] transition-colors cursor-pointer"
                            onClick={() => ScrollTo("spring-sale")}
                        >
                            LIMITED SALE
                        </button>
                    </li>
                    <li>
                        <button
                            className="text-lg font-medium text-[#303030] hover:text-[#FF624C] transition-colors cursor-pointer"
                            onClick={() => ScrollTo("best-seller")}
                        >
                            Best Seller
                        </button>
                    </li>
                    <li>
                        <button
                            className="text-lg font-medium text-[#303030] hover:text-[#FF624C] transition-colors cursor-pointer"
                            onClick={() => ScrollTo("new-arrival")}
                        >
                            New Arrival
                        </button>
                    </li>
                </ul>
            </div>

        </>
    )
}

export default StickyPart