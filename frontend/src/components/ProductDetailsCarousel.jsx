import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import FullscreenIcon from "../icons/FullscreenIcon";
import { useMediaQuery } from "react-responsive"
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";


function NextArrow(props) {
    const { className, style, onClick } = props;
    const [hover, setHover] = useState(false);
    const isTablet = useMediaQuery({ maxWidth: 767 });

    return (
        <div
            style={{
                ...style,
                display: "flex",
                background: hover ? "#FF624C" : "white",
                justifyContent: "center",
                alignItems: "center",
                width: isTablet ? "30px" : "45px",
                height: isTablet ? "30px" : "45px",
                border: hover ? "1px solid " : "1px solid #303030",
                borderRadius: "50%",
                right: isTablet ? "10px" : "20px",
                zIndex: 10
            }}
            className={className}
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <LiaAngleRightSolid className={`${hover ? "text-white" : "text-[#303030]"} absolute left-1/2 -translate-x-1/2`} size={20} />
        </div>
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    const [hover, setHover] = useState(false);
    const isTablet = useMediaQuery({ maxWidth: 767 });

    return (
        <div
            className={className}
            style={{
                ...style,
                display: "flex",
                background: hover ? "#FF624C" : "white",
                justifyContent: "center",
                alignItems: "center",
                width: isTablet ? "30px" : "45px",
                height: isTablet ? "30px" : "45px",
                border: hover ? "1px solid " : "1px solid #303030",
                borderRadius: "50%",
                left: isTablet ? "10px" : "20px",
                zIndex: 10,
            }}
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <LiaAngleLeftSolid className={`${hover ? "text-white" : "text-[#303030]"} absolute left-1/2 -translate-x-1/2`} size={20} />
        </div>
    );
}

const ProductDetailsCarousel = ({ images }) => {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [showFullScreen, setShowFullScreen] = useState(false);
    const [showImage, setShowImage] = useState(0);
    const modalRef = useRef(null);

    const isSmallMobile = useMediaQuery({ maxWidth: 380 });

    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);

    // useEffect to sync two sliers
    useEffect(() => {
        setNav1(sliderRef1);
        setNav2(sliderRef2);
    }, []);

    // Show images after 1 second for each image
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowImage(1);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    // useEffect to handle body scroll lock when the sidebar is open
    useEffect(() => {
        if (showFullScreen) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        }

    }, [showFullScreen]);

    // useEffect to close the modal when clicked outside
    useEffect(() => {
        const handleCloseModal = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setShowFullScreen(false);
            }
        }

        document.addEventListener("mousedown", handleCloseModal);

        return () => document.removeEventListener("mousedown", handleCloseModal);
    }, [])

    useEffect(() => {
        // Force React Slick to recalculate slider dimensions after component mounts
        if (sliderRef1.current) {
            setTimeout(() => {
                sliderRef1.current.slickGoTo(0);
            }, 100);
        }
    }, []);

    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    const settings2 = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        focusOnSelect: true,
        arrows: false
    };

    return (
        <div className="flex flex-col items-center">
            {/* First Slider */}
            <Slider className={`border rounded-xl border-[#CBCBCB] ${isSmallMobile ? "w-[320px]" : "w-[370px]"} sm:w-[500px] md:w-[530px] lg:w-[600px] 2xl:w-[833px] px-2 py-1`} {...settings} asNavFor={nav2} ref={slider => (sliderRef1 = slider)}>
                <div className="relative max-w-[370px] sm:max-w-full rounded-xl pt-1">
                    <div className={`relative w-full overflow-hidden rounded-xl ${isSmallMobile ? "min-h-[220px]" : "min-h-[250px]"} sm:min-h-[333px] md:min-h-[343px] lg:min-h-[387px] xl:min-h-[410px] 2xl:min-h-[550px]`}>
                        {/* {!showImage[0] ? (
                            <div className="absolute inset-0 shimmer rounded-xl"></div>
                        ) : (
                            <img
                                fetchPriority="high"
                                className="w-full h-full rounded-xl transition-opacity duration-300"
                                src={images[1]}
                                alt="Product Image"
                            />
                        )} */}

                        <div className={`absolute inset-0 shimmer rounded-xl z-100 ${showImage && "hidden"}`}></div>

                        <img
                            fetchPriority="high"
                            className="w-full h-full rounded-xl transition-opacity duration-300"
                            src={images[1]}
                            alt="Product Image"
                        />

                    </div>
                    <div
                        className="absolute top-1 right-0 cursor-pointer"
                        onClick={() => setShowFullScreen(true)}
                    >
                        <FullscreenIcon />
                    </div>
                </div>

                <div className="relative max-w-[370px] sm:max-w-full rounded-xl pt-1">
                    <div className={`relative w-full overflow-hidden rounded-xl ${isSmallMobile ? "min-h-[220px]" : "min-h-[250px]"} sm:min-h-[333px] md:min-h-[343px] lg:min-h-[387px] xl:min-h-[410px] 2xl:min-h-[550px]`} >
                        <div className={`absolute inset-0 shimmer rounded-xl z-100 ${showImage && "hidden"}`}></div>

                        <img
                            fetchPriority="high"
                            className="w-full h-full rounded-xl transition-opacity duration-300"
                            src={images[1]}
                            alt="Product Image"
                        />
                    </div>
                    <div
                        className="absolute top-1 right-0 cursor-pointer"
                        onClick={() => setShowFullScreen(true)}
                    >
                        <FullscreenIcon />
                    </div>
                </div>

                <div className="relative max-w-[370px] sm:max-w-full rounded-xl pt-1">
                    <div className={`relative w-full overflow-hidden rounded-xl ${isSmallMobile ? "min-h-[220px]" : "min-h-[250px]"} sm:min-h-[333px] md:min-h-[343px] lg:min-h-[387px] xl:min-h-[410px] 2xl:min-h-[550px]`}>
                        <div className={`absolute inset-0 shimmer rounded-xl z-100 ${showImage && "hidden"}`}></div>

                        <img
                            fetchPriority="high"
                            className="w-full h-full rounded-xl transition-opacity duration-300"
                            src={images[1]}
                            alt="Product Image"
                        />
                    </div>
                    <div
                        className="absolute top-1 right-0 cursor-pointer"
                        onClick={() => setShowFullScreen(true)}
                    >
                        <FullscreenIcon />
                    </div>
                </div>
            </Slider>

            {/* Second Slider */}
            <Slider
                className={`border rounded-xl border-[#CBCBCB] ${isSmallMobile ? "w-[320px] pl-2" : "w-[350px] pl-4"} mt-8 bg-[#f4f4f4] pt-1`}
                asNavFor={nav1}
                ref={slider => (sliderRef2 = slider)}
                {...settings2}
            >
                <div>
                    <img className="w-[93px] h-[81px] rounded-xl" src={images[0]} alt="Product Details Preview" />
                </div>
                <div>
                    <img className="w-[93px] h-[81px] rounded-xl" src={images[0]} alt="Product Details Preview" />
                </div>
                <div>
                    <img className="w-[93px] h-[81px] rounded-xl" src={images[0]} alt="Product Details Preview" />
                </div>
            </Slider>

            {/* Fullscreen Modal */}
            {showFullScreen && (
                <div className="fixed inset-0 bg-black/50 w-full min-h-screen flex items-center justify-center z-10">
                    <div className="relative">
                        <img ref={modalRef} className="xl:scale-120" src={images[1]} alt="Product Image" />
                        <button className="absolute top-[10px] right-[20px] xl:top-[-30px] xl:right-[-50px] sm:text-2xl cursor-pointer font-bold transition text-[#FF624C]" onClick={() => setShowFullScreen(false)}>&#10005;</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailsCarousel;