import CartIcon from "../../icons/CartIcon";
import UserIcon from "../../icons/UserIcon";
import Container from "../commonLayouts/Container";
import logo from "../../../public/images/logo.webp"
import { TfiSearch } from "react-icons/tfi";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { openMenu, setInputValue } from "../../slices/menuSlice";
import { RxCross1 } from "react-icons/rx";
import { searchProducts } from "../../firebase/firestoreService";

const MiddlePart = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
    const [products, setProducts] = useState([]);

    const searchRef = useRef(null);
    const productsRef = useRef(null);
    const inputRef = useRef(null);
    const dispatch = useDispatch();

    const { loading, user } = useSelector(state => state.auth);
    const { totalPrice } = useSelector(state => state.cart);
    const { inputValue } = useSelector(state => state.menu);

    const handleOpenMenu = () => {
        dispatch(openMenu())
    }

    const handleSearchProducts = (e) => {
        dispatch(setInputValue(e.target.value));
    }

    const handleHideSearchAndClear = () => {
        setShowSearch(false);
        dispatch(setInputValue(""));
    }

    useEffect(() => {
        if (!inputValue) {
            setProducts([]);
            return;
        }

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

    useEffect(() => {
        const handleHideSearch = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSearch(false);
            }
        }

        const handleHideProducts = (e) => {
            if (productsRef.current && !productsRef.current.contains(e.target)) {
                setShowProducts(false);
            }
        }

        document.addEventListener("mousedown", (e) => {
            handleHideSearch(e);
            handleHideProducts(e);
        });

        return () => {
            document.removeEventListener("mousedown", (e) => {
                handleHideSearch(e);
                handleHideProducts(e);
            });
        }
    }, [])

    // This useEffect is being used for to automatic focus on input when enabled
    useEffect(() => {
        if (showSearch) {
            inputRef.current.focus();
        }

        if (showSearch) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        }
    }, [showSearch]);

    return (
        <Container>
            <div id="middle-part" className={`flex ${showSearch ? "justify-start" : "justify-between"} items-center py-4 sm:py-7 sm:px-5`}>
                <div className="flex items-center gap-2">
                    <FaBars onClick={handleOpenMenu} className={`sm:hidden ${showSearch && "hidden"} text-[#303030] mb-1 text-lg`} />

                    <Link to="/">
                        <img className={`w-[110px] object-cover sm:w-full ${showSearch ? "hidden" : ""}`} src={logo} alt="logo" />
                    </Link>
                </div>

                <div className={`flex items-center gap-[25px] sm:gap-[30px] ${showSearch && "flex-1 justify-center"}`}>
                    <div className={`relative ${showSearch && "w-[90%] ml-[-10px]"}`} ref={searchRef}>
                        <input
                            ref={inputRef}
                            value={inputValue}
                            onChange={handleSearchProducts}
                            className={`w-full sm:w-[308px] ${!showSearch && "hidden"} sm:inline text-sm text-[#303030] leading-5 py-2 pl-4 pr-9 sm:py-[18px] sm:pl-6 sm:pr-11 border border-[#E5E5E5] rounded-lg outline-none transition duration-200 focus:ring-1 focus:ring-[#FF624C] placeholder:font-semibold`} 
                            type="text" 
                            placeholder="Search In e-shop"
                        />

                        {/* ----Laptop & Desktop Search Icon---- */}
                        <TfiSearch className={`${showSearch && "inline"} hidden sm:inline text-lg font-bold absolute top-[50%] right-4 sm:right-6 translate-y-[-50%]`} />

                        {/* ----Mobile & Tablet Search Icon---- */}
                        <>
                            {showSearch ? (
                                <RxCross1 onClick={handleHideSearchAndClear} className="text-xl sm:text-lg font-bold absolute top-[40%] right-[-25px] sm:right-6 translate-y-[-50%] mt-1 sm:mt-0 md:hidden" />
                            ) : (
                                <TfiSearch onClick={() => setShowSearch(true)} className="text-xl sm:text-lg font-bold mt-[2px] sm:mt-0 sm:hidden" />
                            )}
                        </>

                        {/* Search Results */}
                        {(products.length > 0 && showProducts) && (
                            <ul 
                                ref={productsRef} 
                                className="absolute left-0 w-full bg-white shadow-lg rounded-md border border-gray-200 mt-2 z-50 max-h-64 overflow-y-auto"
                            >
                                {products.map((p) => (
                                    <Link key={p.id} to={`/product-details/${p.id}`} onClick={handleHideSearchAndClear}>
                                        <li
                                            className="px-4 py-2 cursor-pointer hover:bg-[#FFF2F0] transition-colors"
                                            tabIndex={0}
                                        >
                                            <span className="font-medium text-gray-800">{p.title}</span>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        )}

                    </div>

                    <div className={`flex gap-[25px] sm:gap-[50px] lg:gap-[90px] items-center ${showSearch ? "hidden" : ""}`}>
                        {/* Cart */}
                        <Link
                            to={user ? "/cart" : "/login"}
                            className="flex relative items-center gap-5 transition sm:after:content-[] sm:after:absolute sm:after:top-1/2 sm:after:right-[-25px] lg:after:right-[-45px] sm:after:w-[1px] sm:after:h-[32px] sm:after:bg-[#979797] sm:after:-translate-y-1/2 sm:after:-translate-x-1/2 hover:opacity-80"
                        >
                            <div className="w-[28px] sm:w-[32px]">
                                <CartIcon width="full" />
                            </div>

                            <div className="hidden lg:block">
                                <p className="text-[#303030] font-['Montserrat'] leading-6">Cart</p>
                                <span className="text-[#303030] font-['Montserrat'] leading-6 font-bold">$ {totalPrice}</span>
                            </div>
                        </Link>

                        {/* User account */}
                        <Link
                            to={user ? "/dashboard" : "/login"}
                            className={`flex items-center gap-5 ${showSearch ? "hidden" : ""} transition hover:opacity-80`}
                        >
                            <div className="w-[24px] sm:w-[28px]">
                                <UserIcon width="full" />
                            </div>

                            <div className="hidden md:block">
                                <p className="text-[#303030] font-['Montserrat'] leading-6">{(user && !loading) ? user.name : "Login"}</p>
                                <span className="text-[#303030] font-['Montserrat'] leading-6 font-bold">Account</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default MiddlePart;