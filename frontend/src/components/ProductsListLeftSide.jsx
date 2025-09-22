import { useEffect, useRef, useState } from "react";
import { TfiAngleDown } from "react-icons/tfi";
import { VscSettings } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { setMax, setMin } from "../slices/productsSlice";

const ProductsListLeftSide = ({ selectedCategories, setSelectedCategories, selectedBrands, setSelectedBrands }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [showCategories, setShowCategories] = useState(true);
    const [showBrands, setShowBrands] = useState(true);
    const [showPrice, setShowPrice] = useState(true);
    const [brandsLimit, setBrandsLimit] = useState(7);

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(5000);
    const [minInput, setMinInput] = useState("0");
    const [maxInput, setMaxInput] = useState("5000");

    const dispatch = useDispatch();
    const timerRef = useRef(null);

    const handleMinInputChange = (e) => {
        const value = e.target.value;
        setMinInput(value);

        const parse = parseInt(value);
        if (!isNaN(parse) && parse >= 0 && parse <= maxValue) {
            setMinValue(parse);
        }
    }

    const handleMaxInputChange = (e) => {
        const value = e.target.value;
        setMaxInput(value);

        const parse = parseInt(value);
        if (!isNaN(parse) && parse <= 5000 && parse >= minValue) {
            setMaxValue(parse);
        }
    }

    const handleSliderChange = (type, value) => {
        const parse = parseInt(value);

        if (type === "min" && parse <= maxValue) {
            setMinValue(parse);
            setMinInput(parse.toString());
        }
        else {
            if (parse >= minValue) {
                setMaxValue(parse);
                setMaxInput(parse.toString());
            }
        }
    }

    const minPercent = (minValue / 5000) * 100;
    const maxPercent = (maxValue / 5000) * 100;

    const categories = [
        {
            id: 1,
            title: "Computers & Tablets"
        },
        {
            id: 2,
            title: "Mobiles & Accessories"
        },
        {
            id: 3,
            title: "TV & Home Theater"
        },
        {
            id: 4,
            title: "Audio & Headphones"
        },
        {
            id: 5,
            title: "Cameras & Camcorders"
        },
        {
            id: 6,
            title: "Gaming Equipment"
        },
        {
            id: 7,
            title: "Home Appliances"
        }
    ];

    const brands = [
        {
            id: 1,
            title: "Apple",
            available: 11,
        },
        {
            id: 2,
            title: "Samsung",
            available: 11,
        },
        {
            id: 3,
            title: "ASUS",
            available: 11,
        },
        {
            id: 4,
            title: "Dell",
            available: 11,
        },
        {
            id: 5,
            title: "Lenovo",
            available: 22,
        },
        {
            id: 6,
            title: "HP",
            available: 23,
        },
        {
            id: 7,
            title: "Panasonic",
            available: 17,
        },
        {
            id: 8,
            title: "Sony",
            available: 11,
        },
        {
            id: 9,
            title: "LG",
            available: 11,
        },
        {
            id: 10,
            title: "Microsoft",
            available: 21,
        }
    ]

    // Category changing function
    const handleCategoryChange = (category) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(c => c !== category);
            }
            else {
                return [...prev, category];
            }
        })
    }

    // Brand changing function
    const handleBrandChange = (brand) => {
        setSelectedBrands(prev => {
            if (prev.includes(brand)) {
                return prev.filter(b => b !== brand);
            }
            else {
                return [...prev, brand];
            }
        })
    }

    // useEffect to implement debouncing on price slider
    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            dispatch(setMin(minValue));
            dispatch(setMax(maxValue));
        }, 500);
    }, [minValue, maxValue, dispatch])

    // useEffect to handle body scroll lock when the sidebar is open
    useEffect(() => {
        if (isFilterOpen) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        }

    }, [isFilterOpen])

    return (
        <>
            {/* ----Desktop Filters---- */}
            <div className="hidden xl:block min-w-[354px] p-12 bg-[#F4F4F4] rounded-[25px]" >
                {/* Categories */}
                <div className="flex items-center cursor-pointer justify-between mb-5" onClick={() => setShowCategories(!showCategories)}>
                    <h3 className="text-xl text-[#303030] font-['Montserrat'] font-bold leading-[30px]">Categories</h3>
                    <button className={`${showCategories ? "rotate-180" : ""} transition text-sm cursor-pointer text-[#303030]`} ><TfiAngleDown /></button>
                </div>

                {showCategories && (
                    <ul className="flex flex-col gap-3 border-b border-[#CFCFCF] pb-10">
                        {categories.map(category => (
                            <li key={category.id} className="flex items-center gap-2">
                                <input value={category.title} checked={selectedCategories.includes(category.title) || null} onChange={() => handleCategoryChange(category.title)} type="checkbox" id={category.title} />

                                <label className={`text-[#303030] font-['Montserrat'] leading-6 ${selectedCategories.includes(category.title) && "font-bold"}`} htmlFor={category.title}>{category.title}</label>
                            </li>
                        ))}
                    </ul>
                )}


                {/* Brands */}
                <div className="flex items-center justify-between mt-10 mb-5 cursor-pointer" onClick={() => setShowBrands(!showBrands)}>
                    <h3 className="text-xl text-[#303030] font-['Montserrat'] font-bold leading-[30px]">Brands</h3>
                    <button className={`${showBrands ? "rotate-180" : ""} transition cursor-pointer text-sm text-[#303030]`}><TfiAngleDown /></button>
                </div>

                {showBrands && (
                    <div className="border-b border-[#CFCFCF] pb-10">
                        <ul className="flex flex-col gap-3 ">
                            {brands.slice(0, brandsLimit).map(brand => (
                                <li key={brand.id} className="flex items-center gap-2 relative">
                                    <input value={brand.title} onChange={() => handleBrandChange(brand.title)} checked={selectedBrands.includes(brand.title)} type="checkbox" id={brand.title} />

                                    <label className={`text-[#303030] font-['Montserrat'] leading-6 ${selectedBrands.includes(brand.title) && "font-bold"}`} htmlFor={brand.title}>
                                        <span>{brand.title}</span>
                                        <span className="absolute top-0 right-0">({brand.available})</span>
                                    </label>
                                </li>
                            ))}
                        </ul>

                        {brands.length > brandsLimit && (
                            <button className="text-[#303030] inline font-['Montserrat'] font-bold leading-6 border-b border-[#303030] mt-5 cursor-pointer" onClick={() => setBrandsLimit(brands.length)}>More Brands</button>
                        )}
                    </div>
                )}

                {/* Price */}
                <div className="flex items-center justify-between mt-10 mb-5 cursor-pointer" onClick={() => setShowPrice(!showPrice)}>
                    <h3 className="text-xl text-[#303030] font-['Montserrat'] font-bold leading-[30px]">Price</h3>
                    <button className={`${showPrice ? "rotate-180" : ""} transition text-sm text-[#303030]`}><TfiAngleDown /></button>
                </div>

                {showPrice && (
                    <div>
                        <div className="flex gap-[11px]">
                            <div className="relative">
                                <input
                                    className="w-[123px] h-[74px] text-center border border-[#ABABAB] rounded-[10px] focus:outline-none font-['Montserrat'] text-[#303030] leading-6"
                                    type="text"
                                    value={`$${minInput}`}
                                    onChange={handleMinInputChange}
                                    disabled
                                />
                            </div>
                            <div className="relative">
                                <input
                                    className="w-[123px] h-[74px] text-center border border-[#ABABAB] rounded-[10px] focus:outline-none font-['Montserrat'] text-[#303030] leading-6"
                                    type="text"
                                    value={`$${maxInput}`}
                                    onChange={handleMaxInputChange}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="mt-[30px]">
                            <div className="relative w-full h-0.5 bg-[#C3C3C3]">
                                <div
                                    className="absolute h-full bg-[#FF624C]"
                                    style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
                                ></div>

                                <div className="relative">
                                    <input
                                        type="range"
                                        className="absolute top-0 left-0 w-full h-full appearance-none cursor-pointer pointer-events-none z-10"
                                        min={0}
                                        max={5000}
                                        value={minValue === "" ? "" : minValue}
                                        step={50}
                                        onChange={(e) => handleSliderChange("min", e.target.value)}
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type="range"
                                        className="absolute top-0 left-0 w-full h-full appearance-none cursor-pointer pointer-events-none z-10"
                                        min={0}
                                        max={5000}
                                        value={maxValue === "" ? "" : maxValue}
                                        step={50}
                                        onChange={(e) => handleSliderChange("max", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between xl:hidden">
                <div class="text-[22px] sm:text-4xl text-[#303030] font-['Poppins'] leading-[46px] font-semibold">Products</div>

                {/* Filter Opening Part for Mobile */}
                <div
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff8066] to-[#ff624c] text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
                    onClickCapture={() => setIsFilterOpen(true)}
                >
                    <VscSettings size={22} className="text-white" />
                    <span className="tracking-wide">Filters</span>
                </div>
            </div>

            {/* ----Mobile Filters---- */}
            {isFilterOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={() => setIsFilterOpen(false)}
                ></div>
            )}

            <div
                className={`fixed top-0 right-0 w-[75%] max-w-[320px] h-full z-50 bg-[#F4F4F4] xl:hidden rounded-l-2xl shadow-xl transform ${isFilterOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-500 ease-in-out flex flex-col`}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#ffffff] to-[#f9f9f9] border-gray-200 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-[#303030] tracking-wide">Filters</h2>
                    <button
                        onClick={() => setIsFilterOpen(false)}
                        className="text-3xl text-[#303030] hover:text-[#ff624c] transition duration-200"
                    >
                        &times;
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="px-6 py-6 space-y-8 overflow-y-auto flex-1">
                    {/* Categories */}
                    <div>
                        <div
                            className="flex items-center justify-between cursor-pointer mb-3"
                            onClick={() => setShowCategories(!showCategories)}
                        >
                            <h3 className="text-lg font-bold text-[#303030] font-['Montserrat']">
                                Categories
                            </h3>
                            <button
                                className={`${showCategories ? "rotate-180" : ""} transition text-sm text-[#303030]`}
                            >
                                <TfiAngleDown />
                            </button>
                        </div>
                        {showCategories && (
                            <ul className="flex flex-col gap-3 border-b border-[#CFCFCF] pb-5">
                                {categories.map((category) => (
                                    <li key={category.id} className="flex items-center gap-2">
                                        <input value={category.title} checked={selectedCategories.includes(category.title) || null} onChange={() => handleCategoryChange(category.title)} type="checkbox" id={`mobile-${category.title}`} />
                                        <label
                                            className={`text-[#303030] font-['Montserrat'] leading-6 ${selectedCategories.includes(category.title) && "font-bold"}`}
                                            htmlFor={`mobile-${category.title}`}
                                        >
                                            {category.title}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Brands */}
                    <div>
                        <div
                            className="flex items-center justify-between cursor-pointer mb-3"
                            onClick={() => setShowBrands(!showBrands)}
                        >
                            <h3 className="text-lg font-bold text-[#303030] font-['Montserrat']">
                                Brands
                            </h3>
                            <button
                                className={`${showBrands ? "rotate-180" : ""} transition text-sm text-[#303030]`}
                            >
                                <TfiAngleDown />
                            </button>
                        </div>
                        {showBrands && (
                            <div className="border-b border-[#CFCFCF] pb-5">
                                <ul className="flex flex-col gap-3">
                                    {brands.slice(0, brandsLimit).map((brand) => (
                                        <li key={brand.id} className="flex items-center gap-2 relative">
                                            <input value={brand.title} onChange={() => handleBrandChange(brand.title)} checked={selectedBrands.includes(brand.title)} type="checkbox" id={`mobile-${brand.title}`} />
                                            <label
                                                className={`text-[#303030] font-['Montserrat'] leading-6 ${selectedBrands.includes(brand.title) && "font-bold"}`}
                                                htmlFor={`mobile-${brand.title}`}
                                            >
                                                <span>{brand.title}</span>
                                                <span className="absolute top-0 right-0">
                                                    ({brand.available})
                                                </span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                                {brands.length > brandsLimit && (
                                    <button
                                        className="text-[#303030] font-['Montserrat'] font-bold leading-6 border-b border-[#303030] mt-3"
                                        onClick={() => setBrandsLimit(brands.length)}
                                    >
                                        More Brands
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <div
                            className="flex items-center justify-between cursor-pointer mb-3"
                            onClick={() => setShowPrice(!showPrice)}
                        >
                            <h3 className="text-lg font-bold text-[#303030] font-['Montserrat']">
                                Price
                            </h3>
                            <button
                                className={`${showPrice ? "rotate-180" : ""} transition text-sm text-[#303030]`}
                            >
                                <TfiAngleDown />
                            </button>
                        </div>
                        {showPrice && (
                            <div>
                                <div className="flex gap-3">
                                    <input
                                        className="w-[45%] h-[60px] text-center border border-[#ABABAB] rounded-[10px] focus:outline-none font-['Montserrat'] text-[#303030]"
                                        type="text"
                                        value={`$${minInput}`}
                                        onChange={handleMinInputChange}
                                        disabled
                                    />
                                    <input
                                        className="w-[45%] h-[60px] text-center border border-[#ABABAB] rounded-[10px] focus:outline-none font-['Montserrat'] text-[#303030]"
                                        type="text"
                                        value={`$${maxInput}`}
                                        onChange={handleMaxInputChange}
                                        disabled
                                    />
                                </div>
                                <div className="mt-6">
                                    <div className="relative w-full h-0.5 bg-[#C3C3C3]">
                                        <div
                                            className="absolute h-full bg-[#FF624C]"
                                            style={{
                                                left: `${minPercent}%`,
                                                width: `${maxPercent - minPercent}%`,
                                            }}
                                        ></div>

                                        <input
                                            type="range"
                                            className="absolute top-0 left-0 w-full h-full appearance-none cursor-pointer pointer-events-none z-10"
                                            min={0}
                                            max={5000}
                                            value={minValue === "" ? "" : minValue}
                                            step={50}
                                            onChange={(e) => handleSliderChange("min", e.target.value)}
                                        />
                                        <input
                                            type="range"
                                            className="absolute top-0 left-0 w-full h-full appearance-none cursor-pointer pointer-events-none z-10"
                                            min={0}
                                            max={5000}
                                            value={maxValue === "" ? "" : maxValue}
                                            step={50}
                                            onChange={(e) => handleSliderChange("max", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductsListLeftSide;