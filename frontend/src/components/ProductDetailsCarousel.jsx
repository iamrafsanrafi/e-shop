import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import FullscreenIcon from "../icons/FullscreenIcon";

const ProductDetailsCarousel = ({images}) => {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [showFullScreen, setShowFullScreen] = useState(false);
    const modalRef = useRef(null);

    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);

    // useEffec to sync two sliers
    useEffect(() => {
        setNav1(sliderRef1);
        setNav2(sliderRef2);
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

    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    const settings2 = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        focusOnSelect: true,
        arrows: false
    };

    return (
        <div>
            {/* First Slider */}
            <Slider className="max-w-[370px] md:max-w-[530px] 2xl:max-w-[833px] pl-2" {...settings} asNavFor={nav2} ref={slider => (sliderRef1 = slider)}>
                <div className="relative max-w-[370px] sm:max-w-full">
                    <img className="w-full h-auto" src={images[1]} alt="Product Image" />
                    <div
                        className="absolute top-2 right-2 cursor-pointer"
                        onClick={() => setShowFullScreen(true)}
                    >
                        <FullscreenIcon />
                    </div>
                </div>
                <div className="relative max-w-[370px] sm:max-w-full">
                    <img className="w-full h-auto" src={images[1]} alt="Product Image" />
                    <div
                        className="absolute top-2 right-2 cursor-pointer"
                        onClick={() => setShowFullScreen(true)}
                    >
                        <FullscreenIcon />
                    </div>
                </div>
                <div className="relative max-w-[370px] sm:max-w-full">
                    <img className="w-full h-auto" src={images[1]} alt="Product Image" />
                    <div
                        className="absolute top-2 right-2 cursor-pointer"
                        onClick={() => setShowFullScreen(true)}
                    >
                        <FullscreenIcon />
                    </div>
                </div>
            </Slider>

            {/* Second Slider */}
            <Slider
                className="w-[350px] mt-8 bg-[#f4f4f4] pt-1 pl-5"
                asNavFor={nav1}
                ref={slider => (sliderRef2 = slider)}
                {...settings2}
            >
                <div className="">
                    <img className="w-[93px] h-[81px]" src={images[0]} alt="Product Details Preview" />
                </div>
                <div className="">
                    <img className="w-[93px] h-[81px]" src={images[0]} alt="Product Details Preview" />
                </div>
                <div className="">
                    <img className="w-[93px] h-[81px]" src={images[0]} alt="Product Details Preview" />
                </div>
            </Slider>

            {/* Fullscreen Modal */}
            {showFullScreen && (
                <div className="fixed inset-0 bg-black/50 w-full h-screen flex items-center justify-center z-10">
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