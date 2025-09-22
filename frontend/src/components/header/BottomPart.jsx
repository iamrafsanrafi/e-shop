import { Link } from "react-router";
import Container from "../commonLayouts/Container";
import { IoIosMenu } from "react-icons/io";
import { TfiAngleDown } from "react-icons/tfi";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../../slices/menuSlice";

const BottomPart = () => {
    const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
    const categoriesDropdownRef = useRef(null);

    const isMenuOpen = useSelector(store => store.menu.showMenu);
    const dispatch = useDispatch();

    const handleCloseMenu = () => {
        dispatch(closeMenu());
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
        if(isMenuOpen) {
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
            <nav className="bg-[#FF624C] py-6 font-['Montserrat'] hidden sm:block sm:px-5 2xl:px-0">
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
                                        <Link onClick={() => setIsCategoriesDropdownOpen(false)} to={`/products-list?q=Computers & Tablets`} className="block px-4 py-2 rounded-lg text-sm text-[#303030] hover:bg-gray-100 transition duration-150">
                                            Computers & Tablets
                                        </Link>

                                        <Link onClick={() => setIsCategoriesDropdownOpen(false)} to={`/products-list?q=Mobile & Accessories`} className="block px-4 py-2 rounded-lg text-sm text-[#303030] hover:bg-gray-100 transition duration-150">
                                            Mobile & Accessories
                                        </Link>

                                        <Link onClick={() => setIsCategoriesDropdownOpen(false)} to={`/products-list?q=TV & Home Theater`} className="block px-4 py-2 rounded-lg text-sm text-[#303030] hover:bg-gray-100 transition duration-150">
                                            TV & Home Theater
                                        </Link>

                                        <Link onClick={() => setIsCategoriesDropdownOpen(false)} to={`/products-list?q=Audio & Headphones`} className="block px-4 py-2 rounded-lg text-sm text-[#303030] hover:bg-gray-100 transition duration-150">
                                            Audio & Headphones
                                        </Link>

                                        <Link onClick={() => setIsCategoriesDropdownOpen(false)} to={`/products-list?q=Cameras & Camcorders`} className="block px-4 py-2 rounded-lg text-sm text-[#303030] hover:bg-gray-100 transition duration-150">
                                            Cameras & Camcorders
                                        </Link>

                                        <Link onClick={() => setIsCategoriesDropdownOpen(false)} to={`/products-list?q=Gaming Equipment`} className="block px-4 py-2 rounded-lg text-sm text-[#303030] hover:bg-gray-100 transition duration-150">
                                            Gaming Equipment
                                        </Link>

                                        <Link onClick={() => setIsCategoriesDropdownOpen(false)} to={`/products-list?q=Home Appliances`} className="block px-4 py-2 rounded-lg text-sm text-[#303030] hover:bg-gray-100 transition duration-150">
                                            Home Appliances
                                        </Link>
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
                                <Link to="/products-list">LIMITED SALE</Link>
                            </li>
                            <li>
                                <Link to="/products-list">Best Seller</Link>
                            </li>
                            <li className="hidden xl:block">
                                <Link to="/products-list">New Arrival</Link>
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
            <div className={`fixed inset-0 w-[75%] max-w-[320px] z-50 bg-white sm:hidden rounded-r-2xl shadow-xl transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-500 ease-in-out`}>

                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#ffffff] to-[#f9f9f9] rounded-tr-2xl border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-[#303030] tracking-wide">Menu</h2>
                    <button onClick={handleCloseMenu} className="text-3xl text-[#303030] hover:text-[#ff624c] transition duration-200">
                        &times;
                    </button>
                </div>

                {/* Menu Links */}
                <ul className="flex flex-col px-6 py-6 space-y-6">
                    {[
                        {
                            name: "All Categories",
                        },
                        {
                            name: "Products",
                            url: "/products-list"
                        },
                        {
                            name: "Blog",
                            url: "/blog"
                        },
                        {
                            name: "Contact",
                            url: "/contact"
                        },
                        {
                            name: "Limited Sale",
                            url: "/products-list"
                        },
                        {
                            name: "Best Seller",
                            url: "/products-list"
                        },
                        {
                            name: "New Arrival",
                            url: "/products-list"
                        }
                    ].map((item, index) => (
                        <li
                            key={index}
                            className="relative text-lg font-medium text-[#303030] cursor-pointer group transition-colors duration-200"
                        >
                            <Link onClick={() => isMenuOpen(false)} to={item?.url}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>

        </>
    );
};

export default BottomPart;