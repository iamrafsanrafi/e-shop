import { Link } from "react-router";
import { IoLocationOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import Container from "../commonLayouts/Container";
import { useEffect, useRef, useState } from "react";
import { TfiAngleDown } from "react-icons/tfi";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const TopPart = () => {
    const [selectedCountry, setSelectedCountry] = useState({ name: 'English (US)', value: 'US', flag: 'https://flagcdn.com/16x12/us.png' });
    const [isCountryOpen, setIsCountryOpen] = useState(false);

    const [currency, setCurrency] = useState({ name: 'US Dollar (USD)', value: 'USD' });
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

    const countryDropdownRef = useRef(null);
    const currencyDropdownRef = useRef(null);

    const countries = [
        { name: 'English (US)', value: 'US', flag: 'https://flagcdn.com/16x12/us.png' },
        { name: 'English (UK)', value: 'GB', flag: 'https://flagcdn.com/16x12/gb.png' },
        { name: 'English (CA)', value: 'CA', flag: 'https://flagcdn.com/16x12/ca.png' },
        { name: 'English (AU)', value: 'AU', flag: 'https://flagcdn.com/16x12/au.png' },
        { name: 'German', value: 'DE', flag: 'https://flagcdn.com/16x12/de.png' },
        { name: 'French', value: 'FR', flag: 'https://flagcdn.com/16x12/fr.png' },
    ]

    const currencies = [
        { name: 'US Dollar (USD)', value: 'USD' },
        { name: 'British Pound (GBP)', value: 'GBP' },
        { name: 'Canadian Dollar (CAD)', value: 'CAD' },
        { name: 'Australian Dollar (AUD)', value: 'AUD' },
        { name: 'Euro (EUR)', value: 'EUR' },
        { name: 'Bangladeshi Taka (BDT)', value: 'BDT' },
        { name: 'Indian Rupee (INR)', value: 'INR' },
    ];

    const handleSelectCountry = (country) => {
        setSelectedCountry(country);
        setIsCountryOpen(false);
    }

    const handleSelectCurrency = (currency) => {
        setCurrency(currency);
        setIsCurrencyOpen(false);
    }

    useEffect(() => {
        const handleCloseCountryDropdown = (e) => {
            if(countryDropdownRef.current && !countryDropdownRef.current.contains(e.target)) {
                setIsCountryOpen(false);
            }
        }

        const handleCloseCurrencyDropdown = (e) => {
            if(currencyDropdownRef.current && !currencyDropdownRef.current.contains(e.target)) {
                setIsCurrencyOpen(false);
            }
        }

        document.addEventListener("mousedown", handleCloseCountryDropdown);
        document.addEventListener("mousedown", handleCloseCurrencyDropdown);

        return () => {
            document.removeEventListener("mousedown", handleCloseCountryDropdown);
            document.removeEventListener("mousedown", handleCloseCurrencyDropdown);
        }
    }, []);

    return (
        <div id="top-part" className="border-b border-[#BFBFBF] py-[10px] sm:py-[22px] sm:px-5">
            <Container>
                <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-y-[10px] sm:gap-0">
                    {/* Left part */}
                    <div className="flex justify-center gap-10 sm:gap-[50px]">
                        <Link className="flex items-center gap-2 font-['Montserrat'] leading-5 text-[#303030] relative after:content-[''] after:absolute after:w-[1px] after:h-5 sm:after:h-[32px] after:bg-[#CBCBCB] after:right-[-22px] md:after:right-[-25px] after:top-[50%] after:-translate-1/2 text-[12px] sm:text-[13px] md:text-sm" to="https://maps.app.goo.gl/DipLafPdoiQoKjnv7" target="_blank">
                            <IoLocationOutline size={20} className="hidden sm:inline" />
                            123 Main Street, Anytown USA
                        </Link>

                        <Link className="flex items-center gap-2 font-['Montserrat'] leading-5 text-[#303030] text-[12px] sm:text-[13px] md:text-sm" to="tel:++XX (XXX) XXX-XXXX">
                            <BsTelephone size={18} className="hidden sm:inline" />
                            +X (XXX) XXX-XXXX
                        </Link>
                    </div>

                    {/* Right part */}
                    <div className="flex items-center gap-10 sm:gap-[50px] text-sm text-[#303030]">
                        {/* ----Currency Selection---- */}
                        <div className="relative after:content-[''] after:absolute after:w-[1px] after:h-5 sm:after:h-[32px] after:top-[50%] after:right-[-20px] sm:after:right-[-25px] after:bg-[#CBCBCB] after:-translate-y-1/2" ref={currencyDropdownRef}>
                            <select
                                className="w-[55px] appearance-none cursor-pointer outline-none text-[11.5px] sm:text-base hidden"
                                name="currency"
                                value={currency?.value || ""}
                            >
                                {
                                    currencies.map(currency => <option key={currency?.value} value={currency?.value}>{currency?.value}</option>)
                                }
                            </select>


                            {/* ----Currency Custom Dropdown---- */}
                            <div
                                className="p-2 cursor-pointer flex items-center"
                                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}>
                                {currency &&
                                    <>
                                        <span className="mr-2 text-[11.5px] sm:text-base">{currency?.value}</span>
                                        <TfiAngleDown className={`text-[#303030] text-[11px] sm:text-base ${isCurrencyOpen ? "rotate-180" : ""} transition`} />
                                    </>
                                }
                            </div>

                            {/* ----Currency List---- */}
                            {isCurrencyOpen && (
                                <ul className="absolute w-[70px] border border-gray-300 bg-white shadow-lg z-10">
                                    {currencies.map(currency => (
                                        <li className="p-2 hover:bg-gray-200 cursor-pointer text-center"
                                            key={currency?.value}
                                            onClick={() => handleSelectCurrency(currency)} >                                            
                                            <span className="text-[11.5px] sm:text-base">{currency?.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* ----Language Selection---- */}
                        <div className="relative after:content-[''] after:absolute after:w-[1px] after:h-5 sm:after:h-[32px]  after:top-[50%] after:right-[-19px] sm:after:right-[-25px] after:bg-[#CBCBCB] after:-translate-y-1/2" ref={countryDropdownRef}>
                            <select
                                className="w-[112px] hidden"
                                name="country"
                                value={selectedCountry?.value || ""}
                            >
                            </select>

                            {/* ----Language Custom Dropdown---- */}
                            <div
                                className="p-2 cursor-pointer flex items-center"
                                onClick={() => setIsCountryOpen(!isCountryOpen)}>
                                {selectedCountry &&
                                    <>
                                        <img className="w-[27px] h-[16px] mr-2" src={selectedCountry?.flag} alt={`${selectedCountry?.name} country flag`} />
                                        <span className="mr-2 text-[11.5px] sm:text-base">{selectedCountry?.name}</span>
                                        <TfiAngleDown className={`text-[#303030] text-[11px] sm:text-base ${isCountryOpen ? "rotate-180" : ""} transition`} />
                                    </>
                                }
                            </div>

                            {/* Country list */}
                            {isCountryOpen && (
                                <ul className="absolute w-[125px] sm:w-[150px] border border-gray-300 bg-white shadow-lg z-10">
                                    {countries.map(country => (
                                        <li className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer"
                                            key={country?.value}
                                            onClick={() => handleSelectCountry(country)} >
                                            <img className="w-[27px] h-[16px] mr-2" src={country?.flag} alt={`${country?.name} country flag`} />
                                            
                                            <span className="text-[11.5px] sm:text-base">{country?.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Social media links */}
                        <div className="flex items-center gap-4 sm:gap-6 text-lg">
                            <a href="https://www.facebook.com/" target="_blank">
                                <FaFacebookF className="text-sm sm:text-base" />
                            </a>
                            <a href="https://x.com/" target="_blank">
                                <FaTwitter className="text-sm sm:text-base" />
                            </a>
                            <a href="https://www.instagram.com/" target="_blank">
                                <FaInstagram className="text-sm sm:text-base" />
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default TopPart;