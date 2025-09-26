import { Link } from "react-router";
import Button from "../Button";
import logo from "../../../public/images/logo.webp"
import Container from "../commonLayouts/Container";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

const categories = [
    { name: "Computers & Tablets", url: "/products-list?q=Computers & Tablets" },
    { name: "Mobile & Accessories", url: "/products-list?q=Mobiles & Accessories" },
    { name: "TV & Home Theater", url: "/products-list?q=TV & Home Theater" },
    { name: "Audio & Headphones", url: "/products-list?q=Audio & Headphones" },
    { name: "Cameras & Camcorders", url: "/products-list?q=Cameras & Camcorders" },
    { name: "Gaming Equipment", url: "/products-list?q=Gaming Equipment" },
    { name: "Home Appliances", url: "/products-list?q=Home Appliances" }
];

const Footer = () => {
    return (
        <Container>
            <footer>
                {/* ----Gradient Newsletter Card---- */}
                <div className="sm:px-5 2xl:px-0">
                    <div className="bg-[linear-gradient(90deg,_rgba(244,244,244,1)_28%,_rgba(217,217,217,1)_45%)] sm:h-[531px] rounded-[25px] p-8 sm:pt-[114px] sm:pl-[70px] md:pl-[100px]">
                        <h3 className="text-[#303030] text-3xl sm:text-4xl leading-[46px] font-semibold font-['Poppins']">Get Our Updates</h3>
                        <p className="sm:max-w-[514px] text-[#303030] text-sm sm:text-xl leading-[30px] font-['Montserrat'] mt-4">
                            Browse our wide selection of electronics and
                            find the perfect promo for you from newsletter.
                        </p>

                        <input
                            className="placeholder:text-[#303030] placeholder:opacity-75 font-['Montserrat'] text-sm sm:text-base leading-6 border border-[#929292] outline-none rounded-[10px] py-3 pl-3 sm:py-6 sm:pl-6 w-full sm:w-[470px] mt-8 mb-4"
                            type="text"
                            placeholder="Enter your email address ..."
                        />
                        <br />

                        <div className="sm:hidden">
                            <Button value="Subscribe" paddingY="12px" paddingX="12px" />
                        </div>
                        <div className="hidden sm:block">
                            <Button value="Subscribe" />
                        </div>
                    </div>
                </div>

                {/* ----Actual Footer---- */}
                <div className="mt-[100px] flex flex-col pl-5 pr-5 gap-y-6 lg:items-start md:flex-row md:flex-wrap md:justify-between pb-10 sm:pb-20">
                    <div className="md:w-[349px] w-full">
                        <div>
                            <img src={logo} alt="logo" />
                        </div>
                        <ul className="flex flex-col gap-3 mt-[30px] lg:mt-[158px]">
                            <li className="relative">
                                <BsFillTelephoneFill className="text-[#303030] opacity-[75%] text-sm sm:text-base" />
                                <Link
                                    className="absolute top-1/2 -translate-y-1/2 left-[27px] text-[#303030] text-sm sm:text-base font-['Montserrat'] leading-6"
                                    to="tel:+X (XXX) XXX-XXXX"
                                >
                                    +X (XXX) XXX-XXXX
                                </Link>
                            </li>
                            <li className="relative">
                                <IoIosMail className="text-[#303030] sm:text-lg opacity-[75%]" />
                                <Link
                                    className="absolute top-1/2 -translate-y-1/2 left-[27px] text-[#303030] text-sm sm:text-base font-['Montserrat'] leading-6"
                                    to="mailto:email@example.com"
                                >
                                    email@example.com
                                </Link>
                            </li>
                            <li className="relative">
                                <FaLocationDot className="text-[#303030] text-sm sm:text-base opacity-[75%]" />
                                <Link
                                    className="absolute top-1/2 -translate-y-1/2 left-[27px] text-[#303030] text-sm sm:text-base font-['Montserrat'] leading-6"
                                    to="https://maps.app.goo.gl/DipLafPdoiQoKjnv7"
                                    target="_blank"
                                >
                                    123 Main Street, Anytown USA
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg sm:text-xl text-[#303030] font-semibold font-['Poppins'] leading-[30px]">Links</h4>
                        <ul className="flex flex-col gap-3 text-[#303030] font-['Montserrat'] leading-6 mt-6">
                            <li><Link to="#" className="text-sm sm:text-base hover:underline">Products List</Link></li>
                            <li><Link to="#" className="text-sm sm:text-base hover:underline">Order Tracking</Link></li>
                            <li><Link to="#" className="text-sm sm:text-base hover:underline">Products Guide</Link></li>
                            <li><Link to="#" className="text-sm sm:text-base hover:underline">Shopping Cart</Link></li>
                            <li><Link to="#" className="text-sm sm:text-base hover:underline">Tech Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg sm:text-xl text-[#303030] font-semibold font-['Poppins'] leading-[30px]">Supports</h4>
                        <ul className="flex flex-col gap-3 text-[#303030] font-['Montserrat'] leading-6 mt-6">
                            <li><Link to="#" className="text-sm sm:text-base hover:underline">About Us</Link></li>
                            <li><Link to="#" className="text-sm sm:text-base hover:underline">Privacy Policy</Link></li>
                            <li><Link to="#" className="text-sm sm:text-base hover:underline">Return Policy</Link></li>
                            <li><Link to="#" className="text-sm sm:text-base hover:underline">Help Centre</Link></li>
                            <li><Link to="#" className="text-sm sm:text-base hover:underline">Store Locations</Link></li>
                            <li><Link to="#" className="text-sm sm:text-base hover:underline">Careers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg sm:text-xl text-[#303030] font-semibold font-['Poppins'] leading-[30px]">Categories</h4>
                        <ul className="flex flex-col gap-3 text-[#303030] font-['Montserrat'] leading-6 mt-6">
                            {
                                categories.map(c => (
                                    <li>
                                        <Link to={c.url} className="text-sm sm:text-base hover:underline">{c.name}</Link>
                                    </li>
                                ))   
                            }
                        </ul>
                    </div>

                    <div>
                        <div>
                            <h4 className="text-lg sm:text-xl text-[#303030] font-semibold font-['Poppins'] leading-[30px]">Payments</h4>
                            <img className="mt-6" src="/images/payments.png" alt="payment methods" />
                        </div>
                        <div className="mt-8 sm:mt-[74px]">
                            <h4 className="text-lg sm:text-xl text-[#303030] font-semibold font-['Poppins'] leading-[30px]">Follow Us</h4>
                            <ul className="flex flex-col gap-3 text-[#303030] font-['Montserrat'] leading-6 mt-6">
                                <li><a href="https://x.com/" target="_blank" className="text-sm sm:text-base hover:underline">Twitter</a></li>
                                <li><a href="https://www.instagram.com/" target="_blank" className="text-sm sm:text-base hover:underline">Instagram</a></li>
                                <li><a href="https://www.facebook.com/" target="_blank" className="text-sm sm:text-base hover:underline">Facebook</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="h-[1px] bg-[#CBCBCB]"></div>

                <div className="text-[#303030] font-['Montserrat'] text-xs sm:text-sm leading-5 flex justify-between mt-2 mb-20 opacity-75 lg:px-4">
                    <Link className="" to="#">Copyright © 2023 e-shop. All Rights Reserved.</Link>

                    <div className="flex gap-2">
                        <Link>Privacy Policy</Link>
                        <span>|</span>
                        <Link>Terms & Condition</Link>
                        <span>|</span>
                        <Link>Sitemap</Link>
                    </div>
                </div>
            </footer>
        </Container>
    );
};

export default Footer;